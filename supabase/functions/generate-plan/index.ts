// Mentor.AI — Personalized Plan Generator
// Uses Google Gemini API (OpenAI-compatible endpoint) with tool-calling to return a structured plan.

import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ALLOWED_GRADES = ["8", "9", "10", "11", "12", "Gap year", "University"] as const;
const ALLOWED_BUDGETS = [
  "Free / Grant only",
  "< $5,000/yr",
  "$5,000–$15,000/yr",
  "$15,000–$30,000/yr",
  "$30,000+/yr",
  "Flexible",
] as const;

// Coerce empty strings / null to undefined so optional numeric fields don't fail validation
const optionalNumber = (min: number, max: number, label: string) =>
  z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z
      .coerce.number({ invalid_type_error: `${label} must be a number` })
      .min(min, { message: `${label} must be at least ${min}` })
      .max(max, { message: `${label} must be at most ${max}` })
      .optional(),
  );

const ProfileSchema = z.object({
  grade: z.enum(ALLOWED_GRADES, {
    errorMap: () => ({ message: `Grade must be one of: ${ALLOWED_GRADES.join(", ")}` }),
  }),
  gpa: z.coerce
    .number({ invalid_type_error: "GPA must be a number" })
    .min(0, { message: "GPA cannot be negative" })
    .max(4, { message: "GPA must be on a 4.0 scale (max 4.0)" }),
  ielts: optionalNumber(0, 9, "IELTS"),
  sat: optionalNumber(400, 1600, "SAT"),
  unt: optionalNumber(0, 140, "UNT (ЕНТ)"),
  countries: z
    .array(z.string().trim().min(1).max(60))
    .min(1, { message: "Select at least one target country" })
    .max(10, { message: "Pick at most 10 target countries" }),
  major: z.string().trim().min(2, { message: "Major is required" }).max(80),
  budget: z.enum(ALLOWED_BUDGETS, {
    errorMap: () => ({ message: `Budget must be one of: ${ALLOWED_BUDGETS.join(", ")}` }),
  }),
  interests: z.string().trim().max(1000, { message: "Interests must be under 1000 characters" }).optional().default(""),
  achievements: z.string().trim().max(2000, { message: "Achievements must be under 2000 characters" }).optional().default(""),
});

type Profile = z.infer<typeof ProfileSchema>;

// Normalize grade: "11th" -> "11", "11 grade" -> "11", "gap year" -> "Gap year", etc.
function normalizeGrade(input: unknown): string {
  if (typeof input !== "string") return String(input ?? "");
  const s = input.trim();
  const digitMatch = s.match(/^\d{1,2}/);
  if (digitMatch) return digitMatch[0];
  if (/gap/i.test(s)) return "Gap year";
  if (/univ/i.test(s)) return "University";
  return s;
}

// Normalize budget: map free-form phrasing (e.g. "Up to $10k / year") to the canonical bucket
function normalizeBudget(input: unknown): string {
  if (typeof input !== "string") return String(input ?? "");
  const s = input.toLowerCase();
  if (/free|grant/.test(s)) return "Free / Grant only";
  if (/flexible/.test(s)) return "Flexible";

  // Extract numbers, expanding "10k" -> 10000
  const matches = s.match(/[\d,.]+\s*k?/g) || [];
  const nums = matches.map((m) => {
    const isK = /k/.test(m);
    const n = parseFloat(m.replace(/[^\d.]/g, ""));
    return isK ? n * 1000 : n;
  }).filter((n) => !isNaN(n));

  if (nums.length) {
    const max = Math.max(...nums);
    if (max < 5000) return "< $5,000/yr";
    if (max <= 15000) return "$5,000–$15,000/yr";
    if (max <= 30000) return "$15,000–$30,000/yr";
    return "$30,000+/yr";
  }
  return input.trim();
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

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Use POST with a JSON profile body." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY missing");
      return new Response(
        JSON.stringify({ error: "Server is not configured. Please contact support." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Request body must be valid JSON." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (raw && typeof raw === "object") {
      const r = raw as Record<string, unknown>;
      if ("grade" in r) r.grade = normalizeGrade(r.grade);
      if ("budget" in r) r.budget = normalizeBudget(r.budget);
    }

    const parsed = ProfileSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstField = Object.keys(fieldErrors)[0];
      const firstMsg = firstField ? fieldErrors[firstField]?.[0] : "Invalid profile data";
      return new Response(
        JSON.stringify({
          error: firstMsg ?? "Invalid profile data",
          fieldErrors,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const profile: Profile = parsed.data;

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
Plan must cover the next 12-18 months. Use concrete months. Schedule SAT/IELTS so results land 2 months before the earliest deadline.`;

    const resp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM },
            { role: "user", content: userPrompt },
          ],
          tools: [planTool],
          tool_choice: { type: "function", function: { name: "return_admission_plan" } },
        }),
      },
    );

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a minute." }), {
        status: 429,
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
