import { useState } from "react";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "ai"; text: string };

const seeded: Msg[] = [
  { role: "ai", text: "Hi! I'm your AI Mentor. Ask me about universities, essays, IELTS, or your readiness score." },
];

const canned = (q: string) => {
  const t = q.toLowerCase();
  if (t.includes("ielts")) return "For most top UK programs aim for IELTS 7.0+ overall with no band below 6.5. I can suggest a 6-week plan if you'd like.";
  if (t.includes("nazarbayev") || t.includes("nu")) return "Nazarbayev University requires strong English (IELTS 6.5+) and competitive SAT/UNT scores. STEM admits favor strong math and physics.";
  if (t.includes("essay")) return "A standout essay tells one specific story with sensory detail, then ties it to your intended major. Try the Essay AI tool for live feedback.";
  if (t.includes("physics") || t.includes("stem")) return "For Physics, highlight olympiads, research, and any independent projects. Reach: MIT, Cambridge. Match: NU, TU Delft. Safety: strong regional STEM programs.";
  return "Great question! Try our Admission Calculator for a personalized Reach / Match / Safety list, or open the Essay AI tool for instant feedback.";
};

const MentorChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(seeded);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: canned(q) }]);
    }, 500);
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
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] rounded-xl border border-border bg-card shadow-elev flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-hero text-primary-foreground px-4 py-3 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-sm">AI Mentor</p>
              <p className="text-xs opacity-80">Online • answers in seconds</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-soft">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                  m.role === "ai"
                    ? "bg-card border border-border text-foreground"
                    : "bg-primary text-primary-foreground ml-auto"
                )}
              >
                {m.text}
              </div>
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
