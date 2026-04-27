import Layout from "@/components/Layout";
import { CalendarDays, Trophy, BookOpen, FileEdit, Target, Flag, Sparkles } from "lucide-react";

type Phase = {
  grade: string;
  season: string;
  title: string;
  icon: typeof Trophy;
  tone: "olympiad" | "foundation" | "exam" | "final";
  bullets: string[];
  deadlines?: { date: string; label: string }[];
  exams?: { name: string; window: string }[];
};

const phases: Phase[] = [
  {
    grade: "10th Grade",
    season: "Spring",
    title: "Olympiad Season",
    icon: Trophy,
    tone: "olympiad",
    bullets: [
      "Compete at City → Oblast (Regional) → Republic stages.",
      "Maintain GPA ≥ 3.7 — top universities filter on academic baseline.",
      "Document every result: medals lift Readiness Score for STEM Reach schools.",
    ],
    deadlines: [
      { date: "Feb–Mar", label: "City stage (Almaty/Astana)" },
      { date: "Mar–Apr", label: "Oblast (Regional) stage" },
      { date: "Apr–May", label: "Republic stage + Zhautykov Olympiad" },
    ],
  },
  {
    grade: "10th Grade",
    season: "Summer",
    title: "Foundation Phase",
    icon: BookOpen,
    tone: "foundation",
    bullets: [
      "Start IELTS prep — target Band 7.0+ for top UK/US schools.",
      "Begin SAT prep — aim for 1400+ baseline by autumn.",
      "Build target list: 3 Reach, 4 Match, 3 Safety using the University Database.",
    ],
    exams: [
      { name: "IELTS", window: "Summer practice tests, register August" },
      { name: "SAT", window: "Practice with Khan Academy; register for August/October sitting" },
    ],
  },
  {
    grade: "11th Grade",
    season: "Autumn",
    title: "Exam & Draft Phase",
    icon: FileEdit,
    tone: "exam",
    bullets: [
      "Take official IELTS and SAT (allow one retake window).",
      "Draft Common App / UCAS / NU essays in the Essay AI tool.",
      "Request teacher recommendation letters early.",
    ],
    deadlines: [
      { date: "Oct 15", label: "Oxbridge & UK Medicine (UCAS)" },
      { date: "Nov 1", label: "USA Early Decision / Early Action" },
      { date: "Nov 20", label: "Nazarbayev University — First Wave" },
    ],
    exams: [
      { name: "SAT", window: "Aug / Oct / Nov / Dec sittings" },
      { name: "IELTS", window: "Monthly — book 6+ weeks ahead" },
    ],
  },
  {
    grade: "11th Grade",
    season: "Winter & Spring",
    title: "Final Push",
    icon: Flag,
    tone: "final",
    bullets: [
      "Submit Regular Decision applications (USA & EU).",
      "Prepare intensively for UNT (ЕНТ) — unlocks state grants (грант).",
      "Negotiate financial aid offers; confirm enrollment by May 1.",
    ],
    deadlines: [
      { date: "Jan 1–15", label: "USA Regular Decision deadlines" },
      { date: "Mar–Apr", label: "EU & Asia rolling decisions" },
      { date: "Jun", label: "UNT (ЕНТ) — Kazakhstan state grants" },
      { date: "May 1", label: "USA Decision Day (commit to one school)" },
    ],
  },
];

const toneStyles: Record<Phase["tone"], { dot: string; chip: string; ring: string }> = {
  olympiad: { dot: "bg-accent", chip: "bg-accent/15 text-accent-foreground border-accent/30", ring: "ring-accent/30" },
  foundation: { dot: "bg-primary", chip: "bg-primary/10 text-primary border-primary/20", ring: "ring-primary/20" },
  exam: { dot: "bg-warning", chip: "bg-warning/15 text-foreground border-warning/30", ring: "ring-warning/30" },
  final: { dot: "bg-success", chip: "bg-success/15 text-success border-success/30", ring: "ring-success/30" },
};

const Roadmap = () => {
  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            <CalendarDays className="h-4 w-4" /> My Path — Admission Roadmap
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Your 18-month plan to admission.</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            From 10th-grade Olympiads to Decision Day. Every phase shows what to do, when to register for SAT/IELTS, and which deadlines matter for KZ and abroad.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-12 pl-6 md:pl-8 border-l-2 border-border space-y-12">
          {phases.map((p) => {
            const t = toneStyles[p.tone];
            const Icon = p.icon;
            return (
              <article key={p.grade + p.season} className="relative">
                <span className={`absolute -left-[34px] md:-left-[42px] top-1 h-7 w-7 rounded-full ${t.dot} text-white flex items-center justify-center ring-4 ${t.ring}`}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${t.chip}`}>{p.grade}</span>
                  <span className="text-xs font-medium text-muted-foreground">{p.season}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">{p.title}</h2>

                <ul className="mt-4 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-foreground/90">
                      <Sparkles className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid md:grid-cols-2 gap-4 mt-5">
                  {p.deadlines && (
                    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        <Target className="h-3.5 w-3.5" /> Key Deadlines
                      </div>
                      <ul className="space-y-2">
                        {p.deadlines.map((d) => (
                          <li key={d.label} className="flex items-start gap-3 text-sm">
                            <span className="font-semibold text-primary min-w-[80px]">{d.date}</span>
                            <span className="text-foreground/85">{d.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {p.exams && (
                    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        <BookOpen className="h-3.5 w-3.5" /> Exam Registration
                      </div>
                      <ul className="space-y-2">
                        {p.exams.map((e) => (
                          <li key={e.name} className="flex items-start gap-3 text-sm">
                            <span className="font-semibold text-primary min-w-[60px]">{e.name}</span>
                            <span className="text-foreground/85">{e.window}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Roadmap;
