// Mentor.AI — Personalized Plan Generator
// Uses Lovable AI Gateway (Gemini) with tool-calling to return a structured plan.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Profile {
  grade: string;
  gpa: number;
  ielts?: number;
  sat?: number;
  unt?: number;
  countries: string[];
  major: string;
  budget: string;
  interests: string;
  achievements: string;
}

const SYSTEM = `You are Mentor.AI — a senior university admissions strategist for Kazakhstani students applying both locally (UNT/ЕНТ, NU, KBTU, Satbayev) and abroad (USA, UK, EU, South Korea).

You operate as a Decision Tree:
1. Read the student profile (grade, GPA, language scores, target countries, major, budget, interests, achievements).
2. Match the profile to admission requirements of typical universities in the chosen countries/major.
3. Compute the gap (academic, language, profile, documents).
4. Build a MODULAR action plan split into three blocks:
   - Block A — Academic Foundation: tests (SAT/IELTS/TestAS/UNT) scheduled so results land 2 months BEFORE deadlines.
   - Block B — Profile Development (extracurriculars): tailored to major (Business → case championships; Engineering → tech projects; Medicine → shadowing/volunteering; CS → open-source/hackathons).
   - Block C — Documents: recommendations, transcripts, motivation letter structure tailored to target universities.

For EACH task return: month (e.g. "January 2026"), short title, concrete action, category (A/B/C), priority (high/medium/low), and estimated hours.

Also include:
- "readiness": integer 0-100 showing overall application readiness.
- "gaps": top 3 specific gaps to close.
- "deadlines": realistic application deadlines for chosen countries (Oxbridge Oct 15, US ED Nov 1, NU Nov 20, US RD Jan 1-15, EU Jan-Mar, UNT June).
- "alternatives": 3 SAFETY universities matching the major+budget if reach schools look risky.

Be specific to Kazakhstan context where relevant. Keep titles short, actions actionable, max 12 tasks total.`;

const planTool = {
  type: "function",
  function: {
    name: "return_admission_plan",
    description: "Return a structured personalized admission plan",
    parameters: {
      type: "object",
      properties: {
        readiness: { type: "integer", minimum: 0, maximum: 100 },
        summary: { type: "string", description: "2-3 sentence overview of the student's situation and strategy" },
        gaps: {
          type: "array",
          items: { type: "string" },
          description: "Top 3 specific gaps to close",
        },
        tasks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              month: { type: "string" },
              title: { type: "string" },
              action: { type: "string" },
              category: { type: "string", enum: ["A", "B", "C"] },
              priority: { type: "string", enum: ["high", "medium", "low"] },
              hours: { type: "integer" },
            },
            required: ["month", "title", "action", "category", "priority", "hours"],
            additionalProperties: false,
          },
        },
        deadlines: {
          type: "array",
          items: {
            type: "object",
            properties: {
              date: { type: "string" },
              label: { type: "string" },
              daysAway: { type: "integer" },
            },
            required: ["date", "label", "daysAway"],
            additionalProperties: false,
          },
        },
        alternatives: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              country: { type: "string" },
              why: { type: "string" },
            },
            required: ["name", "country", "why"],
            additionalProperties: false,
          },
        },
      },
      required: ["readiness", "summary", "gaps", "tasks", "deadlines", "alternatives"],
      additionalProperties: false,
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const profile = (await req.json()) as Profile;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const userPrompt = `Build a personalized admission plan for this student:

- Current grade: ${profile.grade}
- GPA: ${profile.gpa}/4.0
- IELTS: ${profile.ielts ?? "not taken"}
- SAT: ${profile.sat ?? "not taken"}
- UNT (ЕНТ): ${profile.unt ?? "not taken"}
- Target countries: ${profile.countries.join(", ") || "not specified"}
- Intended major: ${profile.major}
- Budget: ${profile.budget}
- Interests: ${profile.interests || "—"}
- Achievements / Olympiads: ${profile.achievements || "—"}

Today's date: ${new Date().toISOString().slice(0, 10)}.
Plan must cover the next 12-18 months. Use Lovable Cloud + concrete months. Schedule SAT/IELTS so results land 2 months before the earliest deadline.`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userPrompt },
        ],
        tools: [planTool],
        tool_choice: { type: "function", function: { name: "return_admission_plan" } },
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a minute." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Lovable Cloud → Workspace → Usage." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const call = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) {
      return new Response(JSON.stringify({ error: "No structured plan returned" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const plan = JSON.parse(call.function.arguments);

    return new Response(JSON.stringify({ plan }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-plan error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
