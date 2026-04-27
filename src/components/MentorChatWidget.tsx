import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { onMentorChatOpen } from "@/lib/mentorBus";
import { findUniversity } from "@/data/universities";

type Msg = { role: "user" | "ai"; text: string };

const seeded: Msg[] = [
  { role: "ai", text: "Hi! I'm your AI Mentor. Ask me about universities, essays, IELTS, your readiness score, or click any university card for context." },
];

const universityAnswer = (q: string): string | null => {
  const t = q.toLowerCase();
  if (t.includes("satbayev")) {
    const u = findUniversity("satbayev")!;
    return `**Satbayev University** (Almaty) — strong in Physics, Mining & Petroleum Engineering.\n\n• **Local grant:** UNT (ЕНТ) ${u.unt}+ qualifies for state grants.\n• **English:** IELTS ${u.ielts}+ recommended for English-track programs (optional otherwise).\n• **Physics perks:** Active research labs in applied physics & geophysics; strong industry pipeline to KazMunayGas and mining majors.\n• **Tip:** Republic-level Physics olympiad winners often get priority admission + scholarship top-up.`;
  }
  if (t.includes("nazarbayev") || /\bnu\b/.test(t)) {
    return `**Nazarbayev University** (Astana) — Kazakhstan's flagship, English-medium.\n\n• **Entry:** SAT 1300+, IELTS 6.5, UNT 130+ recommended.\n• **STEM bias:** Physics, Engineering, CS admits favor strong Math + Olympiad records.\n• **Scholarships:** Most admits receive full tuition + stipend.\n• **Boost:** Republic / IPhO / Zhautykov medalists get a major Readiness Score lift on the Calculator.`;
  }
  if (t.includes("kbtu")) {
    return `**KBTU** — top private tech university in Almaty. UNT 110+, IELTS 5.5+. Strong in Petroleum Engineering, Finance and CS. State grants available for top UNT scorers.`;
  }
  if (t.includes("aitu") || t.includes("astana it")) {
    return `**AITU (Astana IT University)** — focused on CS, Cybersecurity and Data Science. UNT 100+, IELTS 5.5. Modern Astana campus, strong industry ties.`;
  }
  if (t.includes("iitu")) {
    return `**IITU** — International IT University in Almaty. UNT 95+, IELTS 5.5. Affordable IT pathway with state grants.`;
  }
  return null;
};

const canned = (q: string) => {
  const u = universityAnswer(q);
  if (u) return u;
  const t = q.toLowerCase();
  if (t.includes("ielts")) return "For most top UK programs aim for IELTS 7.0+ overall with no band below 6.5. I can suggest a 6-week plan if you'd like.";
  if (t.includes("unt") || t.includes("ент")) return "UNT (ЕНТ) thresholds vary by university: KazNU ~90, Satbayev ~100, KBTU ~110, NU ~130. Higher UNT unlocks state grants (грант).";
  if (t.includes("essay")) return "A standout essay tells one specific story with sensory detail, then ties it to your intended major. Try the Essay AI tool for live feedback.";
  if (t.includes("physics") || t.includes("stem")) return "For Physics, highlight olympiads (Zhautykov, IPhO, Republican), research, and any independent projects. Reach: MIT, Cambridge, Caltech. Match: NU, TU Delft, KAIST. Safety: Satbayev, KazNU.";
  if (t.includes("olympiad") || t.includes("zhautykov") || t.includes("ipho")) return "Olympiad rank matters! Republic / IPhO / IMO medals can lift your Reach chances by 10–15 points and qualify you for Presidential / Bolashak scholarships.";
  if (t.includes("roadmap") || t.includes("timeline") || t.includes("path")) return "Open the **My Path** page for the 10th–11th grade timeline with deadlines (Oxbridge Oct 15, ED Nov 1, NU first wave Nov 20, RD Jan 1–15).";
  return "Great question! Try the Admission Calculator for a personalized Reach / Match / Safety list, the Essay AI for instant feedback, or My Path for your application timeline.";
};

const MentorChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(seeded);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return onMentorChatOpen(({ topic, prompt }) => {
      setOpen(true);
      setMessages((m) => [
        ...m,
        { role: "user", text: `Context: ${topic}` },
        { role: "ai", text: canned(prompt) },
      ]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: canned(q) }]);
    }, 400);
  };

  return (
    <>
      <button
        aria-label="Open AI Mentor chat"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-elev flex items-center justify-center hover:bg-primary-glow transition-all",
          open && "rotate-90"
        )}
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] rounded-xl border border-border bg-card shadow-elev flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-hero text-primary-foreground px-4 py-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-sm">AI Mentor</p>
              <p className="text-xs opacity-80">Context-aware • answers in seconds</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-soft">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[88%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-line",
                  m.role === "ai"
                    ? "bg-card border border-border text-foreground"
                    : "bg-primary text-primary-foreground ml-auto"
                )}
                dangerouslySetInnerHTML={{
                  __html: m.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            ))}
          </div>

          <div className="border-t border-border p-3 flex gap-2 bg-card">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about a university, essay, IELTS…"
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={send}
              className="h-10 w-10 flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary-glow"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorChatWidget;
