import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { FileText, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

const SAMPLE = `My fascination with physics began when I built a small Tesla coil in my bedroom in Almaty. I wanted to understand why the air glowed. Since then, I have spent every weekend exploring electromagnetism through olympiad problems and small experiments.`;

const Essay = () => {
  const [text, setText] = useState(SAMPLE);
  const [target, setTarget] = useState("Nazarbayev University");

  const metrics = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1;
    const avg = words / sentences;
    const longWords = text.split(/\s+/).filter((w) => w.length > 7).length;

    const grammar = Math.max(40, Math.min(98, 95 - (avg > 28 ? 15 : 0) - (text.match(/\bi\b/g)?.length || 0) * 2));
    const narrative = Math.max(30, Math.min(95, 50 + Math.min(40, words / 8)));
    const clarity = Math.max(30, Math.min(95, 100 - Math.abs(avg - 18) * 3));
    const fit = Math.max(35, Math.min(95, 60 + (text.toLowerCase().includes("physics") ? 15 : 0) + (text.toLowerCase().includes(target.split(" ")[0].toLowerCase()) ? 15 : 0) + Math.min(10, longWords / 3)));

    return {
      grammar: Math.round(grammar),
      narrative: Math.round(narrative),
      clarity: Math.round(clarity),
      fit: Math.round(fit),
      words,
    };
  }, [text, target]);

  const advice = useMemo(() => {
    const tips: { type: "good" | "warn"; text: string }[] = [];
    if (metrics.words < 200) tips.push({ type: "warn", text: "Aim for 250–650 words to develop your story with specific scenes and reflection." });
    else tips.push({ type: "good", text: "Length is on track for a personal statement." });

    if (!text.toLowerCase().includes("because") && !text.toLowerCase().includes("therefore"))
      tips.push({ type: "warn", text: "Add at least one cause-and-effect link (because, therefore) — IELTS 7.0+ writing rewards logical cohesion." });
    else tips.push({ type: "good", text: "Good use of cohesive devices — keeps the reader oriented." });

    if (!text.toLowerCase().includes(target.split(" ")[0].toLowerCase()))
      tips.push({ type: "warn", text: `Mention something specific about ${target} (a lab, a professor, a course) to lift the "Specific University Fit" score.` });
    else tips.push({ type: "good", text: `Nice — your essay references ${target}, strengthening the fit signal.` });

    tips.push({ type: "warn", text: "Replace any generic adjectives ('amazing', 'great') with sensory detail to push narrative strength toward Band 8." });
    return tips;
  }, [text, target, metrics]);

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            <FileText className="h-4 w-4" /> AI Essay Checker
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Write essays admissions remember.</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Get instant feedback on grammar, narrative, clarity and university fit — calibrated for IELTS 7.0+ writing.
          </p>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden flex flex-col">
            <div className="border-b border-border px-5 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-sm">Your Essay</h3>
              <span className="text-xs text-muted-foreground">{metrics.words} words</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or write your personal statement here…"
              className="flex-1 min-h-[420px] p-5 text-sm leading-relaxed bg-background focus:outline-none resize-none"
            />
            <div className="border-t border-border p-3 flex items-center gap-2 bg-soft">
              <label className="text-xs text-muted-foreground">Target university:</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="h-8 rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {["Nazarbayev University", "Harvard University", "University of Oxford", "TU Delft", "TU Munich"].map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Insights */}
          <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
            <div className="border-b border-border px-5 py-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h3 className="font-semibold text-sm">Mentor AI Insights</h3>
            </div>
            <div className="p-5 space-y-5">
              <Meter label="Grammar" value={metrics.grammar} />
              <Meter label="Narrative Strength" value={metrics.narrative} />
              <Meter label="Clarity" value={metrics.clarity} />
              <Meter label={`Fit for ${target}`} value={metrics.fit} />

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold text-sm mb-3">Suggestions to reach Band 8</h4>
                <ul className="space-y-2.5">
                  {advice.map((a, i) => (
                    <li key={i} className="flex gap-2.5 text-sm">
                      {a.type === "good" ? (
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                      )}
                      <span className="text-muted-foreground leading-relaxed">{a.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Meter = ({ label, value }: { label: string; value: number }) => {
  const color = value >= 80 ? "bg-success" : value >= 60 ? "bg-primary" : "bg-warning";
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-semibold tabular-nums">{value}/100</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

export default Essay;
