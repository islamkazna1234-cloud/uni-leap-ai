import { useMemo, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import UniversityArt from "@/components/UniversityArt";
import {
  universities,
  University,
  TUITION_BUCKETS,
  PROGRAM_STRENGTHS,
  REGIONS_FILTER,
  macroRegion,
} from "@/data/universities";
import { openMentorChat } from "@/lib/mentorBus";
import { Search, MessageSquare, Award, Globe2, MapPin, Sparkles, X, GraduationCap, DollarSign, Languages, Target } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

const buildContextPrompt = (u: University) => {
  if (u.region === "Kazakhstan") {
    return `Tell me about ${u.name}: local grant requirements (UNT ${u.unt ?? "?"}+), IELTS ${u.ielts ?? "n/a"}, strong majors (${u.majors.join(", ")}), and any Physics-specific perks.`;
  }
  return `Tell me about ${u.name} (${u.country}, ${u.rankingLabel}): how to get in with SAT ${u.sat ?? "?"}, IELTS ${u.ielts ?? "?"}, tuition ~$${u.tuitionUSD}/yr, and which majors are strongest (${u.majors.join(", ")}).`;
};

const formatTuition = (t: number) => (t === 0 ? "Free" : t < 1000 ? `$${t}` : `$${(t / 1000).toFixed(t % 1000 === 0 ? 0 : 1)}K`);

const tierColor = (t: University["tier"]) =>
  t === "Reach" ? "bg-danger/10 text-danger border-danger/20" : t === "Match" ? "bg-accent/10 text-accent border-accent/20" : "bg-success/10 text-success border-success/20";

const UniversityCard = ({ u, onView }: { u: University; onView: (u: University) => void }) => {
  const highCompat = (u.ielts ?? 0) >= 7.0 || (u.sat ?? 0) >= 1400;
  return (
    <article className="group rounded-xl border border-border bg-card shadow-card overflow-hidden hover:shadow-elev hover:-translate-y-1 transition-all flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <UniversityArt u={u} className="w-full h-full" />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap max-w-[80%]">
          <span className="px-2 py-0.5 rounded-md bg-card/95 backdrop-blur text-[11px] font-semibold text-primary">{u.rankingLabel}</span>
          {u.hiddenGem && (
            <span className="px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-[11px] font-semibold inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Hidden Gem
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <span className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold ${tierColor(u.tier)}`}>{u.tier}</span>
          {highCompat && (
            <span className="px-2 py-0.5 rounded-md bg-success/90 text-primary-foreground text-[11px] font-semibold">High Compatibility</span>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-base leading-tight">{u.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {u.country} • {u.region}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-md bg-secondary/60 px-2 py-1.5">
            <p className="text-muted-foreground">Tuition</p>
            <p className="font-semibold text-foreground inline-flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {formatTuition(u.tuitionUSD)}/yr
            </p>
          </div>
          <div className="rounded-md bg-secondary/60 px-2 py-1.5">
            <p className="text-muted-foreground">English</p>
            <p className="font-semibold text-foreground inline-flex items-center gap-1">
              <Languages className="h-3 w-3" />
              {u.ielts ? `IELTS ${u.ielts.toFixed(1)}` : "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {u.programStrength.slice(0, 3).map((p) => (
            <span key={p} className="px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-medium">{p}</span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs" onClick={() => onView(u)}>View Details</Button>
          <Button size="sm" className="text-xs" onClick={() => openMentorChat({ topic: u.name, prompt: buildContextPrompt(u) })}>
            <MessageSquare className="h-3.5 w-3.5" /> Ask AI
          </Button>
        </div>
      </div>
    </article>
  );
};

const Universities = () => {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<typeof REGIONS_FILTER[number]>("All");
  const [tuition, setTuition] = useState<string>("all");
  const [tier, setTier] = useState<"all" | "Reach" | "Match" | "Safety">("all");
  const [strength, setStrength] = useState<string>("all");
  const [highCompatOnly, setHighCompatOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);

  // Reset to first page whenever filters change
  useEffect(() => {
    setPage(1);
  }, [query, region, tuition, tier, strength, highCompatOnly]);

  const list = useMemo(() => {
    return universities
      .filter((u) => {
        if (region !== "All" && macroRegion(u) !== region) return false;
        if (tier !== "all" && u.tier !== tier) return false;
        if (strength !== "all" && !u.programStrength.includes(strength as never)) return false;
        if (tuition !== "all") {
          const bucket = TUITION_BUCKETS.find((b) => b.id === tuition);
          if (bucket && !bucket.test(u.tuitionUSD)) return false;
        }
        if (highCompatOnly) {
          const hc = (u.ielts ?? 0) >= 7.0 || (u.sat ?? 0) >= 1400;
          if (!hc) return false;
        }
        const q = query.trim().toLowerCase();
        if (q) {
          const hay = `${u.name} ${u.country} ${u.majors.join(" ")} ${u.programStrength.join(" ")}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => a.rankingValue - b.rankingValue);
  }, [query, region, tuition, tier, strength, highCompatOnly]);

  const visible = list.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < list.length;

  const hiddenGems = useMemo(() => universities.filter((u) => u.hiddenGem).sort((a, b) => a.tuitionUSD - b.tuitionUSD).slice(0, 6), []);

  const stats = useMemo(() => {
    const kz = universities.filter((u) => u.region === "Kazakhstan").length;
    return { total: universities.length, kz, intl: universities.length - kz, gems: universities.filter((u) => u.hiddenGem).length };
  }, []);

  const open = openId ? universities.find((u) => u.id === openId) : null;

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">
            <Award className="h-4 w-4" /> University Database
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">{stats.total}+ universities, ranked & filtered.</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            A truly global catalog — from Nazarbayev University and KAIST to ETH Zürich, Oxford and IIT Bombay. Filter by region, tuition, difficulty and program strength.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary"><Globe2 className="h-3.5 w-3.5" /> {stats.intl} International</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary"><MapPin className="h-3.5 w-3.5" /> {stats.kz} Kazakhstan</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/10 text-accent"><Sparkles className="h-3.5 w-3.5" /> {stats.gems} Hidden Gems</span>
          </div>
        </div>

        {/* Hidden Gems strip */}
        <div className="mt-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold inline-flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent" /> Hidden Gems</h2>
              <p className="text-sm text-muted-foreground">Highly-ranked universities with low tuition in Europe and Asia.</p>
            </div>
            <button onClick={() => { setRegion("All"); setTuition("low"); }} className="text-sm font-medium text-primary hover:underline hidden md:block">See all affordable</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hiddenGems.map((u) => (
              <button key={u.id} onClick={() => setOpenId(u.id)} className="text-left group rounded-lg border border-border bg-card p-4 hover:shadow-elev transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-primary">{u.rankingLabel}</span>
                  <span className="text-[11px] font-semibold text-accent inline-flex items-center gap-1"><DollarSign className="h-3 w-3" />{formatTuition(u.tuitionUSD)}/yr</span>
                </div>
                <h3 className="font-semibold mt-1 group-hover:text-primary transition-colors">{u.name}</h3>
                <p className="text-xs text-muted-foreground">{u.country}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {u.programStrength.slice(0, 3).map((p) => (
                    <span key={p} className="px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-medium">{p}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Smart Filters */}
        <div className="mt-10 rounded-xl border border-border bg-card p-4 md:p-5 shadow-card">
          <div className="grid md:grid-cols-12 gap-3">
            <div className="md:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, country, major…"
                  className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <select value={region} onChange={(e) => setRegion(e.target.value as typeof region)} className="md:col-span-2 h-10 rounded-md border border-input bg-background px-3 text-sm">
              {REGIONS_FILTER.map((r) => <option key={r} value={r}>{r === "All" ? "All Regions" : r}</option>)}
            </select>
            <select value={tuition} onChange={(e) => setTuition(e.target.value)} className="md:col-span-2 h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="all">Any Tuition</option>
              {TUITION_BUCKETS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
            </select>
            <select value={tier} onChange={(e) => setTier(e.target.value as typeof tier)} className="md:col-span-2 h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="all">Any Difficulty</option>
              <option value="Reach">Reach</option>
              <option value="Match">Match</option>
              <option value="Safety">Safety</option>
            </select>
            <select value={strength} onChange={(e) => setStrength(e.target.value)} className="md:col-span-2 h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="all">Any Program</option>
              {PROGRAM_STRENGTHS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 justify-between">
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
              <input type="checkbox" checked={highCompatOnly} onChange={(e) => setHighCompatOnly(e.target.checked)} className="h-4 w-4 accent-primary" />
              <Target className="h-4 w-4 text-success" /> High Compatibility only (IELTS 7.0 / SAT 1400+)
            </label>
            <p className="text-xs text-muted-foreground">{list.length} results</p>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((u) => (
            <UniversityCard key={u.id} u={u} onView={(uu) => setOpenId(uu.id)} />
          ))}
        </div>

        {list.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No universities match your filters.</div>
        )}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => setPage((p) => p + 1)}>
              Load more ({list.length - visible.length} remaining)
            </Button>
          </div>
        )}
        {!hasMore && list.length > PAGE_SIZE && (
          <p className="mt-8 text-center text-sm text-muted-foreground">End of results — {list.length} universities shown.</p>
        )}
      </section>

      {/* Details Dialog */}
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-w-2xl">
          {open && (
            <>
              <div className="aspect-[16/7] -mx-6 -mt-6 mb-2 overflow-hidden rounded-t-lg">
                <UniversityArt u={open} className="w-full h-full" />
              </div>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <DialogTitle className="text-2xl">{open.name}</DialogTitle>
                    <DialogDescription className="inline-flex items-center gap-2 mt-1">
                      <MapPin className="h-3.5 w-3.5" /> {open.country} • {open.region} • {open.rankingLabel}
                    </DialogDescription>
                  </div>
                  <button onClick={() => setOpenId(null)} className="p-1 rounded hover:bg-secondary"><X className="h-4 w-4" /></button>
                </div>
              </DialogHeader>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={tierColor(open.tier)}>{open.tier}</Badge>
                {open.hiddenGem && <Badge className="bg-accent text-accent-foreground"><Sparkles className="h-3 w-3 mr-1" /> Hidden Gem</Badge>}
                {((open.ielts ?? 0) >= 7.0 || (open.sat ?? 0) >= 1400) && <Badge className="bg-success text-primary-foreground">High Compatibility</Badge>}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                <div className="rounded-md border border-border p-3">
                  <p className="text-[11px] text-muted-foreground uppercase">Tuition</p>
                  <p className="font-semibold">{formatTuition(open.tuitionUSD)}/yr</p>
                </div>
                <div className="rounded-md border border-border p-3">
                  <p className="text-[11px] text-muted-foreground uppercase">IELTS</p>
                  <p className="font-semibold">{open.ielts?.toFixed(1) ?? "—"}</p>
                </div>
                <div className="rounded-md border border-border p-3">
                  <p className="text-[11px] text-muted-foreground uppercase">SAT</p>
                  <p className="font-semibold">{open.sat ?? "—"}</p>
                </div>
                <div className="rounded-md border border-border p-3">
                  <p className="text-[11px] text-muted-foreground uppercase">UNT/ЕНТ</p>
                  <p className="font-semibold">{open.unt ?? "—"}</p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm font-semibold mb-1.5 inline-flex items-center gap-1.5"><GraduationCap className="h-4 w-4 text-primary" /> Admissions Requirements</p>
                <p className="text-sm text-muted-foreground">{open.requirement}</p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1.5">Program Strength</p>
                <div className="flex flex-wrap gap-1.5">
                  {open.programStrength.map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded-md text-xs bg-primary/10 text-primary font-medium">{p}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1.5">Notable Majors</p>
                <div className="flex flex-wrap gap-1.5">
                  {open.majors.map((m) => (
                    <span key={m} className="px-2 py-0.5 rounded-md text-xs bg-secondary text-foreground">{m}</span>
                  ))}
                </div>
              </div>

              {(open.highlights?.length || open.notes) && (
                <div className="rounded-md bg-secondary/60 p-3 text-sm">
                  {open.highlights?.map((h) => <p key={h}>• {h}</p>)}
                  {open.notes && <p className="mt-1 text-muted-foreground">{open.notes}</p>}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setOpenId(null)}>Close</Button>
                <Button onClick={() => { openMentorChat({ topic: open.name, prompt: buildContextPrompt(open) }); setOpenId(null); }}>
                  <MessageSquare className="h-4 w-4" /> Chat with AI
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Universities;
