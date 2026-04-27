import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { universities, University } from "@/data/universities";
import { Calculator as CalcIcon, Target, CheckCircle2, ShieldCheck } from "lucide-react";

const tierConfig = {
  Reach: { label: "Reach", color: "text-danger", bg: "bg-danger/10", border: "border-danger/20", desc: "Ambitious — go for it." },
  Match: { label: "Match", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", desc: "Strong fit for your profile." },
  Safety: { label: "Safety", color: "text-success", bg: "bg-success/10", border: "border-success/20", desc: "Highly likely admit." },
} as const;

const Calculator = () => {
  const [gpa, setGpa] = useState("3.8");
  const [sat, setSat] = useState("1350");
  const [ielts, setIelts] = useState("6.5");
  const [major, setMajor] = useState("Physics");
  const [budget, setBudget] = useState("Local KZT");
  const [region, setRegion] = useState("All");
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    const g = (parseFloat(gpa) / 4) * 35;
    const s = (parseFloat(sat) / 1600) * 35;
    const i = (parseFloat(ielts) / 9) * 30;
    return Math.min(100, Math.round(g + s + i));
  }, [gpa, sat, ielts]);

  const grouped = useMemo(() => {
    const filtered = universities.filter((u) =>
      region === "All" ? true : region === "Kazakhstan" ? u.region === "Kazakhstan" : u.country === region
    );
    return {
      Reach: filtered.filter((u) => u.tier === "Reach"),
      Match: filtered.filter((u) => u.tier === "Match"),
      Safety: filtered.filter((u) => u.tier === "Safety"),
    };
  }, [region]);

  const scoreLabel = score >= 85 ? "Strong" : score >= 70 ? "Competitive" : score >= 55 ? "Developing" : "Early stage";

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            <CalcIcon className="h-4 w-4" /> Admission & Chance Calculator
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Where do I really stand?</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Enter your scores and target region. We'll compute your Readiness Score and shortlist Reach, Match, and Safety schools for you.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 rounded-2xl border border-border bg-card shadow-card p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Standardized */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Standardized scores</h3>
              <div className="space-y-4">
                <Field label="GPA (0–4.0)" value={gpa} onChange={setGpa} type="number" step="0.01" max="4" />
                <Field label="SAT score (400–1600)" value={sat} onChange={setSat} type="number" step="10" max="1600" />
                <Field label="IELTS / TOEFL (band 0–9)" value={ielts} onChange={setIelts} type="number" step="0.5" max="9" />
              </div>
            </div>

            {/* Right: Profile */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Profile</h3>
              <div className="space-y-4">
                <SelectField
                  label="Intended major"
                  value={major}
                  onChange={setMajor}
                  options={["Physics", "Computer Science", "Engineering", "Economics", "Medicine", "Mathematics"]}
                />
                <SelectField
                  label="Budget"
                  value={budget}
                  onChange={setBudget}
                  options={["Local KZT (≤ 2M ₸/year)", "Local KZT", "International USD ($20k–$60k)", "International USD ($60k+)"]}
                />
                <SelectField
                  label="Target region"
                  value={region}
                  onChange={setRegion}
                  options={["All", "Kazakhstan", "USA", "UK", "Netherlands", "Germany"]}
                />
              </div>
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
            {/* Score */}
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
                </div>
                <div className="w-full md:w-72">
                  <div className="h-3 rounded-full bg-white/15 overflow-hidden">
                    <div className="h-full bg-accent transition-all duration-700" style={{ width: `${score}%` }} />
                  </div>
                  <p className="mt-3 text-xs opacity-80">
                    Based on GPA, SAT and IELTS. Add olympiads or research to boost your Reach chances.
                  </p>
                </div>
              </div>
            </div>

            {/* Tiers */}
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

const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement> & { onChange: (v: string) => void }) => {
  const { onChange, ...rest } = props as any;
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        {...rest}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
};

const SelectField = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <label className="block">
    <span className="text-sm font-medium text-foreground">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1.5 w-full h-11 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
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
