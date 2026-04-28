import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Sparkles, Loader2, GraduationCap, BookOpen, Trophy, FileEdit,
  CalendarClock, Target, ShieldCheck, CheckCircle2, Circle, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Profile = {
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
};

type Task = {
  month: string;
  title: string;
  action: string;
  category: "A" | "B" | "C";
  priority: "high" | "medium" | "low";
  hours: number;
};

type PlanData = {
  readiness: number;
  summary: string;
  gaps: string[];
  tasks: Task[];
  deadlines: { date: string; label: string; daysAway: number }[];
  alternatives: { name: string; country: string; why: string }[];
};

const COUNTRIES = ["Kazakhstan", "USA", "UK", "Germany", "Netherlands", "South Korea", "France"];
const MAJORS = ["Computer Science", "Engineering", "Business", "Medicine", "Physics", "Economics", "Design", "Liberal Arts"];
const BUDGETS = ["Free / scholarship only", "Up to $10k / year", "$10k–25k / year", "$25k+ / year"];

const STORAGE_KEY = "mentor.plan.v1";
const PROFILE_KEY = "mentor.profile.v1";
const PROGRESS_KEY = "mentor.progress.v1";

const categoryMeta = {
  A: { label: "Academic Foundation", icon: BookOpen, tone: "bg-primary/10 text-primary border-primary/20" },
  B: { label: "Profile Development", icon: Trophy, tone: "bg-accent/15 text-accent-foreground border-accent/30" },
  C: { label: "Documents & Essays", icon: FileEdit, tone: "bg-success/15 text-success border-success/30" },
} as const;

const priorityTone: Record<Task["priority"], string> = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/15 text-foreground border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</span>
    {children}
  </label>
);

const Plan = () => {
  const [profile, setProfile] = useState<Profile>({
    grade: "11th",
    gpa: 3.7,
    ielts: undefined,
    sat: undefined,
    unt: undefined,
    countries: ["Kazakhstan", "USA"],
    major: "Computer Science",
    budget: "Up to $10k / year",
    interests: "",
    achievements: "",
  });
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});

  // Restore from localStorage
  useEffect(() => {
    try {
      const p = localStorage.getItem(PROFILE_KEY);
      if (p) setProfile(JSON.parse(p));
      const pl = localStorage.getItem(STORAGE_KEY);
      if (pl) setPlan(JSON.parse(pl));
      const pg = localStorage.getItem(PROGRESS_KEY);
      if (pg) setDone(JSON.parse(pg));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); }, [profile]);
  useEffect(() => { if (plan) localStorage.setItem(STORAGE_KEY, JSON.stringify(plan)); }, [plan]);
  useEffect(() => { localStorage.setItem(PROGRESS_KEY, JSON.stringify(done)); }, [done]);

  const toggleCountry = (c: string) =>
    setProfile((p) => ({
      ...p,
      countries: p.countries.includes(c) ? p.countries.filter((x) => x !== c) : [...p.countries, c],
    }));

  const generate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-plan", { body: profile });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setPlan(data.plan as PlanData);
      setDone({});
      toast({ title: "Plan ready", description: "Your personal admission plan was generated." });
    } catch (e: any) {
      const msg = e?.message ?? "Failed to generate plan";
      toast({
        title: msg.includes("Rate limit") ? "Slow down" : msg.includes("credits") ? "Out of AI credits" : "Generation failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const progress = useMemo(() => {
    if (!plan) return { pct: 0, completed: 0, total: 0 };
    const total = plan.tasks.length;
    const completed = plan.tasks.filter((_, i) => done[String(i)]).length;
    return { pct: total ? Math.round((completed / total) * 100) : 0, completed, total };
  }, [plan, done]);

  const grouped = useMemo(() => {
    if (!plan) return null;
    return (["A", "B", "C"] as const).map((cat) => ({
      cat,
      tasks: plan.tasks.map((t, i) => ({ t, i })).filter((x) => x.t.category === cat),
    }));
  }, [plan]);

  return (
    <Layout>
      <section className="container py-12 md:py-16 max-w-6xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" /> AI Plan — Decision Tree Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Your personal admission roadmap.</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Tell us about yourself. Our AI matches your profile against admission requirements,
            calculates the gap, and returns a month-by-month To-Do list with deadlines, progress tracker,
            and safety alternatives.
          </p>
        </div>

        {/* Profile form */}
        <div className="mt-10 grid gap-6 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
          <div className="grid md:grid-cols-3 gap-5">
            <Field label="Current grade">
              <select
                value={profile.grade}
                onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option>9th</option><option>10th</option><option>11th</option><option>12th / Gap year</option>
              </select>
            </Field>
            <Field label="GPA (out of 4.0)">
              <input
                type="number" step="0.01" min={0} max={4} value={profile.gpa}
                onChange={(e) => setProfile({ ...profile, gpa: parseFloat(e.target.value) || 0 })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </Field>
            <Field label="Intended major">
              <select
                value={profile.major}
                onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {MAJORS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <Field label="IELTS (optional)">
              <input
                type="number" step="0.5" min={0} max={9} placeholder="e.g. 6.5"
                value={profile.ielts ?? ""}
                onChange={(e) => setProfile({ ...profile, ielts: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </Field>
            <Field label="SAT (optional)">
              <input
                type="number" min={400} max={1600} placeholder="e.g. 1350"
                value={profile.sat ?? ""}
                onChange={(e) => setProfile({ ...profile, sat: e.target.value ? parseInt(e.target.value) : undefined })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </Field>
            <Field label="UNT / ЕНТ (optional)">
              <input
                type="number" min={0} max={140} placeholder="e.g. 110"
                value={profile.unt ?? ""}
                onChange={(e) => setProfile({ ...profile, unt: e.target.value ? parseInt(e.target.value) : undefined })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </Field>
          </div>

          <Field label="Target countries">
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((c) => {
                const on = profile.countries.includes(c);
                return (
                  <button
                    key={c} type="button" onClick={() => toggleCountry(c)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm border transition-colors",
                      on ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:bg-secondary"
                    )}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Budget">
              <select
                value={profile.budget}
                onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Interests / soft skills">
              <input
                type="text" placeholder="robotics club, debate, music…"
                value={profile.interests}
                onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </Field>
          </div>

          <Field label="Achievements / Olympiads">
            <textarea
              rows={3} placeholder="Republic Physics olympiad — silver, Zhautykov bronze, hackathon winner…"
              value={profile.achievements}
              onChange={(e) => setProfile({ ...profile, achievements: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </Field>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
            <p className="text-xs text-muted-foreground">
              Your profile and progress are saved locally. Regenerate anytime to refresh your plan.
            </p>
            <button
              onClick={generate}
              disabled={loading}
              className="inline-flex items-center gap-2 h-11 rounded-lg bg-primary px-6 font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-60 transition-colors shadow-elev"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> :
                <><Sparkles className="h-4 w-4" /> {plan ? "Regenerate Plan" : "Generate My Plan"}</>}
            </button>
          </div>
        </div>

        {/* Plan output */}
        {plan && (
          <div className="mt-12 space-y-10">
            {/* Summary + Tracker */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  <GraduationCap className="h-3.5 w-3.5" /> Strategy summary
                </div>
                <p className="text-foreground/90 leading-relaxed">{plan.summary}</p>
                {plan.gaps.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      <AlertTriangle className="h-3.5 w-3.5" /> Top gaps to close
                    </div>
                    <ul className="space-y-1.5">
                      {plan.gaps.map((g, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <span className="text-accent">•</span><span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border bg-hero text-primary-foreground p-6 shadow-elev">
                <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Readiness</div>
                <div className="mt-1 text-5xl font-bold">{plan.readiness}<span className="text-2xl opacity-70">/100</span></div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs opacity-90 mb-1.5">
                    <span>Plan progress</span>
                    <span>{progress.completed}/{progress.total}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/15 overflow-hidden">
                    <div className="h-full bg-accent transition-all" style={{ width: `${progress.pct}%` }} />
                  </div>
                  <div className="mt-1.5 text-xs opacity-80">{progress.pct}% complete</div>
                </div>
              </div>
            </div>

            {/* Deadlines */}
            {plan.deadlines.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-2 text-sm font-semibold mb-4">
                  <CalendarClock className="h-4 w-4 text-primary" /> Deadline Engine
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {plan.deadlines.map((d, i) => (
                    <div key={i} className="rounded-lg border border-border bg-soft p-4">
                      <div className="text-xs font-semibold text-primary">{d.date}</div>
                      <div className="text-sm font-medium mt-1">{d.label}</div>
                      <div className="text-xs text-muted-foreground mt-1.5">
                        {d.daysAway > 0 ? `${d.daysAway} days away` : "Past due"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks by block */}
            {grouped?.map(({ cat, tasks }) => {
              if (tasks.length === 0) return null;
              const meta = categoryMeta[cat];
              const Icon = meta.icon;
              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold", meta.tone)}>
                      <Icon className="h-4 w-4" /> Block {cat} — {meta.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{tasks.length} tasks</span>
                  </div>
                  <div className="space-y-2.5">
                    {tasks.map(({ t, i }) => {
                      const isDone = !!done[String(i)];
                      return (
                        <button
                          key={i}
                          onClick={() => setDone({ ...done, [String(i)]: !isDone })}
                          className={cn(
                            "w-full text-left rounded-xl border p-4 flex gap-4 transition-all hover:shadow-card",
                            isDone ? "bg-success/5 border-success/30" : "bg-card border-border"
                          )}
                        >
                          {isDone
                            ? <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                            : <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-semibold text-primary">{t.month}</span>
                              <span className={cn("text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border", priorityTone[t.priority])}>
                                {t.priority}
                              </span>
                              <span className="text-[11px] text-muted-foreground">~{t.hours}h</span>
                            </div>
                            <div className={cn("font-semibold mt-1", isDone && "line-through text-muted-foreground")}>{t.title}</div>
                            <p className="text-sm text-muted-foreground mt-1">{t.action}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Alternatives */}
            {plan.alternatives.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <h2 className="text-xl font-bold">Alternative routes — Safety schools</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {plan.alternatives.map((a, i) => (
                    <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-card">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{a.country}</div>
                      <div className="text-lg font-bold mt-1">{a.name}</div>
                      <p className="text-sm text-muted-foreground mt-2">{a.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!plan && !loading && (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-soft p-8 text-center">
            <Target className="h-8 w-8 text-primary mx-auto" />
            <p className="mt-3 font-medium">Fill in your profile and click <span className="text-primary">Generate My Plan</span>.</p>
            <p className="text-sm text-muted-foreground mt-1">The AI will return a month-by-month plan tailored to your major, budget, and target countries.</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Plan;
