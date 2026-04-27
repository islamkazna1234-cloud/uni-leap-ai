import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import UniversityArt from "@/components/UniversityArt";
import { universities, University } from "@/data/universities";
import { openMentorChat } from "@/lib/mentorBus";
import { Search, MessageSquare, Award, Globe2, MapPin } from "lucide-react";

type Region = "All" | "Kazakhstan" | "International";

const buildContextPrompt = (u: University) => {
  if (u.region === "Kazakhstan") {
    return `Tell me about ${u.name}: local grant requirements (UNT ${u.unt ?? "?"}+), IELTS ${u.ielts ?? "n/a"}, strong majors (${u.majors.join(", ")}), and any Physics-specific perks.`;
  }
  return `Tell me about ${u.name} (${u.country}, ${u.rankingLabel}): how to get in with SAT ${u.sat ?? "?"}, IELTS ${u.ielts ?? "?"}, and which majors are strongest (${u.majors.join(", ")}).`;
};

const Universities = () => {
  const [tab, setTab] = useState<Region>("All");
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("All");

  const countries = useMemo(() => {
    const s = new Set<string>();
    universities.forEach((u) => s.add(u.country));
    return ["All", ...Array.from(s).sort()];
  }, []);

  const list = useMemo(() => {
    return universities
      .filter((u) => {
        const tabOk = tab === "All" ? true : u.region === tab;
        const countryOk = country === "All" ? true : u.country === country;
        const q = query.trim().toLowerCase();
        const qOk =
          !q ||
          u.name.toLowerCase().includes(q) ||
          u.country.toLowerCase().includes(q) ||
          u.majors.join(" ").toLowerCase().includes(q);
        return tabOk && countryOk && qOk;
      })
      .sort((a, b) => a.rankingValue - b.rankingValue);
  }, [tab, query, country]);

  const stats = useMemo(() => {
    const kz = universities.filter((u) => u.region === "Kazakhstan").length;
    const intl = universities.length - kz;
    return { total: universities.length, kz, intl };
  }, []);

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            <Award className="h-4 w-4" /> University Database
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">{stats.total}+ universities, ranked & filtered.</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            From Nazarbayev University and Satbayev to Oxford, Yonsei and TU Delft — every card shows QS rank, SAT, IELTS and UNT (ЕНТ) requirements.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary"><Globe2 className="h-3.5 w-3.5" /> {stats.intl} International</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary"><MapPin className="h-3.5 w-3.5" /> {stats.kz} Kazakhstan</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="inline-flex p-1 rounded-lg border border-border bg-card shadow-card">
            {(["All", "Kazakhstan", "International"] as Region[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setCountry("All"); }}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t === "Kazakhstan" ? "Kazakhstan Schools" : t === "International" ? "International Schools" : "All Schools"}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-11 rounded-md border border-input bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {countries.map((c) => <option key={c} value={c}>{c === "All" ? "All countries" : c}</option>)}
            </select>
            <div className="relative md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, country, major…"
                className="w-full h-11 pl-9 pr-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((u) => (
            <article key={u.id} className="group rounded-xl border border-border bg-card shadow-card overflow-hidden hover:shadow-elev hover:-translate-y-1 transition-all flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <UniversityArt u={u} className="w-full h-full" />
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap max-w-[80%]">
                  <span className="px-2.5 py-1 rounded-md bg-card/95 backdrop-blur text-xs font-semibold text-primary">
                    {u.rankingLabel}
                  </span>
                  {u.unt && (
                    <span className="px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-semibold">
                      UNT {u.unt}+
                    </span>
                  )}
                </div>
                {u.ielts && u.ielts >= 7.0 && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-danger/90 text-primary-foreground text-xs font-semibold">
                    IELTS {u.ielts.toFixed(1)}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg leading-tight">{u.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{u.country} • {u.region}</p>

                <div className="mt-3 rounded-md bg-secondary/60 px-3 py-2 text-xs">
                  <span className="font-semibold text-foreground">Requirements:</span>{" "}
                  <span className="text-muted-foreground">{u.requirement}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {u.majors.slice(0, 3).map((m) => (
                    <span key={m} className="px-2 py-0.5 rounded text-[11px] bg-primary/10 text-primary font-medium">
                      {m}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => openMentorChat({ topic: u.name, prompt: buildContextPrompt(u) })}
                  className="mt-5 inline-flex items-center justify-center gap-2 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-glow transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat with AI about {u.name.split(" ")[0]}
                </button>
              </div>
            </article>
          ))}
        </div>

        {list.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No universities match your filters.</div>
        )}
      </section>
    </Layout>
  );
};

export default Universities;
