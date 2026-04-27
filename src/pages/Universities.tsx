import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { universities } from "@/data/universities";
import { Search, MessageSquare, Award } from "lucide-react";

const Universities = () => {
  const [tab, setTab] = useState<"All" | "Kazakhstan" | "International">("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    return universities.filter((u) => {
      const tabOk = tab === "All" ? true : u.region === tab;
      const q = query.trim().toLowerCase();
      const qOk = !q || u.name.toLowerCase().includes(q) || u.majors.join(" ").toLowerCase().includes(q);
      return tabOk && qOk;
    });
  }, [tab, query]);

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            <Award className="h-4 w-4" /> University Database
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Compare schools, side by side.</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Toggle between Kazakhstan and international schools. Each card surfaces ranking, key requirement and a chat with your AI Mentor.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="inline-flex p-1 rounded-lg border border-border bg-card shadow-card">
            {(["All", "Kazakhstan", "International"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t === "Kazakhstan" ? "Kazakhstan Schools" : t === "International" ? "International Schools" : "All Schools"}
              </button>
            ))}
          </div>

          <div className="relative md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or major (e.g. Physics)…"
              className="w-full h-11 pl-9 pr-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((u) => (
            <article key={u.id} className="group rounded-xl border border-border bg-card shadow-card overflow-hidden hover:shadow-elev hover:-translate-y-1 transition-all flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={u.image}
                  alt={`${u.name} campus`}
                  loading="lazy"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-card/95 backdrop-blur text-xs font-semibold text-primary">
                    {u.rankingLabel}
                  </span>
                  {u.unt && (
                    <span className="px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-semibold">
                      UNT
                    </span>
                  )}
                </div>
                {u.ielts && u.ielts >= 7.0 && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-danger/90 text-primary-foreground text-xs font-semibold">
                    IELTS {u.ielts.toFixed(1)} Required
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{u.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{u.country} • {u.region}</p>
                  </div>
                </div>

                <div className="mt-3 rounded-md bg-secondary/60 px-3 py-2 text-xs">
                  <span className="font-semibold text-foreground">Key requirement:</span>{" "}
                  <span className="text-muted-foreground">{u.requirement}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {u.majors.slice(0, 3).map((m) => (
                    <span key={m} className="px-2 py-0.5 rounded text-[11px] bg-primary/10 text-primary font-medium">
                      {m}
                    </span>
                  ))}
                </div>

                <button className="mt-5 inline-flex items-center justify-center gap-2 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-glow transition-colors">
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
