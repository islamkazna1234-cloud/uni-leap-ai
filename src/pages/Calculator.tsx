import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { universities, University } from "@/data/universities";
import { Calculator as CalcIcon, Target, CheckCircle2, ShieldCheck, Trophy, Plus, X } from "lucide-react";

const tierConfig = {
  Reach: { label: "Reach", color: "text-danger", bg: "bg-danger/10", border: "border-danger/20", desc: "Ambitious — go for it." },
  Match: { label: "Match", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", desc: "Strong fit for your profile." },
  Safety: { label: "Safety", color: "text-success", bg: "bg-success/10", border: "border-success/20", desc: "Highly likely admit." },
} as const;

type Olympiad = {
  id: string;
  name: string;
  level: "School" | "City" | "Regional (Oblast)" | "National (Republic)" | "International";
  achievement: "Participant" | "3rd place" | "2nd place" | "1st place" | "Gold medal";
  subject: string; // Physics, Math, CS, Chemistry, Biology, Other
};

const STEM_MAJORS = ["Physics", "CS", "Computer Science", "Engineering", "Mathematics", "Math", "Mechanical Eng", "Aerospace", "Robotics", "Materials"];

// Compute olympiad bonus (0–25 points)
const olympiadBonus = (olys: Olympiad[], targetMajor: string) => {
  if (olys.length === 0) return 0;
  const isStem = STEM_MAJORS.some((m) => targetMajor.toLowerCase().includes(m.toLowerCase()));
  let total = 0;
  for (const o of olys) {
    let base = 0;
    switch (o.level) {
      case "School": base = 1; break;
      case "City": base = 3; break;
      case "Regional (Oblast)": base = 6; break;
      case "National (Republic)": base = 12; break;
      case "International": base = 18; break;
    }
    const ach = o.achievement === "Gold medal" ? 1.4
      : o.achievement === "1st place" ? 1.3
      : o.achievement === "2nd place" ? 1.15
      : o.achievement === "3rd place" ? 1.05
      : 0.6;
    let pts = base * ach;
    // STEM subject + STEM target = full credit; otherwise damp.
    const subjectStem = ["physics", "math", "cs", "computer", "chemistry", "informatics"].some((s) => o.subject.toLowerCase().includes(s));
    if (isStem && subjectStem) pts *= 1.0;
    else if (isStem || subjectStem) pts *= 0.7;
    else pts *= 0.5;
    total += pts;
  }
  return Math.min(25, Math.round(total));
};

const Calculator = () => {
  const [gpa, setGpa] = useState("3.8");
  const [sat, setSat] = useState("1350");
  const [ielts, setIelts] = useState("6.5");
  const [major, setMajor] = useState("Physics");
  const [budget, setBudget] = useState("Local KZT");
  const [region, setRegion] = useState("All");
  const [olys, setOlys] = useState<Olympiad[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const baseScore = useMemo(() => {
    const g = (parseFloat(gpa) / 4) * 35;
    const s = (parseFloat(sat) / 1600) * 35;
    const i = (parseFloat(ielts) / 9) * 30;
    return Math.min(100, Math.round(g + s + i));
  }, [gpa, sat, ielts]);

  const bonus = useMemo(() => olympiadBonus(olys, major), [olys, major]);
  const score = Math.min(100, baseScore + bonus);

  // Reach/Match/Safety re-tiering: high olympiad bonus pushes some Reach STEM schools into Match.
  const grouped = useMemo(() => {
    const filtered = universities.filter((u) => {
      if (region === "All") return true;
      if (region === "Kazakhstan") return u.region === "Kazakhstan";
      return u.country === region;
    });
    const isStemTarget = STEM_MAJORS.some((m) => major.toLowerCase().includes(m.toLowerCase()));

    const reTier = (u: University): "Reach" | "Match" | "Safety" => {
      let tier: "Reach" | "Match" | "Safety" = u.tier;
      // Olympiad lift for STEM-heavy schools when student has strong olympiad record
      if (isStemTarget && bonus >= 15 && u.tier === "Reach" && u.majors.some((m) => STEM_MAJORS.includes(m))) {
        tier = "Match";
      } else if (isStemTarget && bonus >= 8 && u.tier === "Reach" && u.rankingValue > 30 && u.majors.some((m) => STEM_MAJORS.includes(m))) {
        tier = "Match";
      }
      // Score-based safety lift
      if (score >= 90 && tier === "Match" && u.rankingValue > 200) tier = "Safety";
      return tier;
    };

    const tiered = filtered.map((u) => ({ ...u, tier: reTier(u) }));
    return {
      Reach: tiered.filter((u) => u.tier === "Reach").slice(0, 12),
      Match: tiered.filter((u) => u.tier === "Match").slice(0, 12),
      Safety: tiered.filter((u) => u.tier === "Safety").slice(0, 12),
    };
  }, [region, score, bonus, major]);

  const scoreLabel = score >= 90 ? "Elite" : score >= 80 ? "Strong" : score >= 70 ? "Competitive" : score >= 55 ? "Developing" : "Early stage";

  const addOlympiad = () => {
    setOlys((o) => [...o, {
      id: crypto.randomUUID(),
      name: "Republican Physics Olympiad",
      level: "Regional (Oblast)",
      achievement: "Participant",
      subject: "Physics",
    }]);
  };

  const updateOly = (id: string, patch: Partial<Olympiad>) => {
    setOlys((o) => o.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const removeOly = (id: string) => setOlys((o) => o.filter((x) => x.id !== id));

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            <CalcIcon className="h-4 w-4" /> Admission & Chance Calculator
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Where do I really stand?</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Add your scores, target region <strong>and Olympiad record</strong> — Republic/IPhO medalists get a real boost on STEM Reach schools.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 rounded-2xl border border-border bg-card shadow-card p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Standardized scores</h3>
              <div className="space-y-4">
                <Field label="GPA (0–4.0)" value={gpa} onChange={setGpa} type="number" step="0.01" max="4" />
                <Field label="SAT score (400–1600)" value={sat} onChange={setSat} type="number" step="10" max="1600" />
                <Field label="IELTS / TOEFL (band 0–9)" value={ielts} onChange={setIelts} type="number" step="0.5" max="9" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Profile</h3>
              <div className="space-y-4">
                <SelectField label="Intended major" value={major} onChange={setMajor}
                  options={["Physics", "Computer Science", "Engineering", "Economics", "Medicine", "Mathematics", "Business", "Law", "Humanities"]} />
                <SelectField label="Budget" value={budget} onChange={setBudget}
                  options={["Local KZT (≤ 2M ₸/year)", "Local KZT", "International USD ($20k–$60k)", "International USD ($60k+)"]} />
                <SelectField label="Target region" value={region} onChange={setRegion}
                  options={["All", "Kazakhstan", "USA", "UK", "Netherlands", "Germany", "France", "South Korea", "Singapore", "Canada", "Australia"]} />
              </div>
            </div>
          </div>

          {/* Olympiad Tracker */}
          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-accent" /> Olympiad Tracker
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Republic / IPhO-level medals significantly boost STEM Readiness.</p>
              </div>
              <button
                onClick={addOlympiad}
                className="inline-flex items-center gap-2 h-9 rounded-md border border-border bg-card px-3 text-sm font-medium hover:bg-secondary"
              >
                <Plus className="h-4 w-4" /> Add olympiad
              </button>
            </div>

            {olys.length === 0 && (
              <p className="text-sm text-muted-foreground italic">No olympiads added yet. Add your school/city/regional/national competition results.</p>
            )}

            <div className="space-y-3">
              {olys.map((o) => (
                <div key={o.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end p-3 rounded-lg bg-secondary/40 border border-border">
                  <div className="md:col-span-4">
                    <label className="text-[11px] font-medium text-muted-foreground">Name</label>
                    <input value={o.name} onChange={(e) => updateOly(o.id, { name: e.target.value })}
                      className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm" placeholder="e.g. Zhautykov, IPhO" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-medium text-muted-foreground">Subject</label>
                    <select value={o.subject} onChange={(e) => updateOly(o.id, { subject: e.target.value })}
                      className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">
                      {["Physics", "Mathematics", "Computer Science", "Chemistry", "Biology", "Other"].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-[11px] font-medium text-muted-foreground">Level / Stage</label>
                    <select value={o.level} onChange={(e) => updateOly(o.id, { level: e.target.value as Olympiad["level"] })}
                      className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">
                      {(["School", "City", "Regional (Oblast)", "National (Republic)", "International"] as const).map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-medium text-muted-foreground">Achievement</label>
                    <select value={o.achievement} onChange={(e) => updateOly(o.id, { achievement: e.target.value as Olympiad["achievement"] })}
                      className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">
                      {(["Participant", "3rd place", "2nd place", "1st place", "Gold medal"] as const).map((a) => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <button onClick={() => removeOly(o.id)} className="md:col-span-1 h-9 rounded-md border border-border hover:bg-destructive/10 hover:text-destructive flex items-center justify-center" aria-label="Remove">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="mt-8 inline-flex items-center gap-2 h-12 rounded-lg bg-primary px-8 font-medium text-primary-foreground hover:bg-primary-glow transition-colors shadow-elev"
          >
            Calculate <Target className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        {submitted && (
          <div className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="rounded-2xl bg-hero text-primary-foreground p-8 md:p-10 shadow-elev">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-wider opacity-80 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Your Readiness Score
                  </p>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-6xl font-bold">{score}</span>
                    <span className="text-xl opacity-90">/ 100</span>
                  </div>
                  <p className="mt-2 text-lg opacity-90">{scoreLabel} profile for {major}</p>
                  {bonus > 0 && (
                    <p className="mt-1 text-sm text-accent font-medium inline-flex items-center gap-1.5">
                      <Trophy className="h-4 w-4" /> +{bonus} pts olympiad boost applied
                    </p>
                  )}
                </div>
                <div className="w-full md:w-72">
                  <div className="h-3 rounded-full bg-white/15 overflow-hidden">
                    <div className="h-full bg-accent transition-all duration-700" style={{ width: `${score}%` }} />
                  </div>
                  <p className="mt-3 text-xs opacity-80">
                    Base {baseScore} + Olympiads {bonus}. Republic/IPhO medals lift Reach STEM schools to Match.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {(["Reach", "Match", "Safety"] as const).map((tier) => (
                <TierColumn key={tier} tier={tier} schools={grouped[tier]} />
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

const Field = ({
  label, value, onChange, ...rest
}: {
  label: string; value: string; onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) => (
  <label className="block">
    <span className="text-sm font-medium text-foreground">{label}</span>
    <input {...rest} value={value} onChange={(e) => onChange(e.target.value)}
      className="mt-1.5 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
  </label>
);

const SelectField = ({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <label className="block">
    <span className="text-sm font-medium text-foreground">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="mt-1.5 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </label>
);

const TierColumn = ({ tier, schools }: { tier: keyof typeof tierConfig; schools: University[] }) => {
  const c = tierConfig[tier];
  return (
    <div className={`rounded-xl border ${c.border} bg-card p-5 shadow-card`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-lg font-bold ${c.color}`}>{c.label}</h3>
          <p className="text-xs text-muted-foreground">{c.desc}</p>
        </div>
        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${c.bg} ${c.color}`}>{schools.length}</span>
      </div>
      <ul className="space-y-3">
        {schools.length === 0 && <li className="text-sm text-muted-foreground">No schools in this tier for current filters.</li>}
        {schools.map((s) => (
          <li key={s.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <CheckCircle2 className={`h-5 w-5 mt-0.5 ${c.color}`} />
            <div>
              <p className="font-medium text-sm">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.country} • {s.rankingLabel}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.requirement}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calculator;
