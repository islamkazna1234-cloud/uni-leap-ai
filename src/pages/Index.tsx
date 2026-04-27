import { Link } from "react-router-dom";
import { ArrowRight, Calculator, FileText, GraduationCap, Sparkles, ShieldCheck, Globe2 } from "lucide-react";
import Layout from "@/components/Layout";
import hero from "@/assets/hero-campus.jpg";

const features = [
  {
    icon: Calculator,
    title: "Admission Calculator",
    desc: "Your Readiness Score with Reach / Match / Safety schools — built for KZ and international students.",
    to: "/calculator",
    cta: "Find Schools",
  },
  {
    icon: FileText,
    title: "AI Essay Checker",
    desc: "Live feedback on grammar, narrative, and university fit for IELTS 7.0+ band writing.",
    to: "/essay",
    cta: "Check Now",
  },
  {
    icon: Globe2,
    title: "University Database",
    desc: "Compare Kazakhstan and international schools side by side — UNT, SAT and IELTS aware.",
    to: "/universities",
    cta: "Explore",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-soft">
        <div className="container grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              AI Mentor for ambitious students
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
              Your Path to University, <span className="text-primary">Simplified</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl text-balance">
              AI-driven mentoring for local success in Kazakhstan and global excellence abroad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 h-12 rounded-lg bg-primary px-6 font-medium text-primary-foreground hover:bg-primary-glow transition-colors shadow-elev"
              >
                Start My Application <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/universities"
                className="inline-flex items-center gap-2 h-12 rounded-lg border border-border bg-card px-6 font-medium hover:bg-secondary transition-colors"
              >
                Browse Universities
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "120+", l: "Universities" },
                { n: "4", l: "Regions" },
                { n: "AI", l: "Mentor 24/7" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-bold text-primary">{s.n}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl rounded-3xl" aria-hidden />
            <img
              src={hero}
              alt="Modern university campus at golden hour"
              width={1600}
              height={1024}
              className="relative rounded-2xl shadow-elev w-full h-auto object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl shadow-card p-4 w-56 hidden md:block">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-success" />
                Readiness Score
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">87</span>
                <span className="text-sm text-success font-medium">Strong</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "87%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">Tools</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Everything you need to apply with confidence.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all"
            >
              <div className="h-11 w-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {f.cta} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="container pb-20">
        <div className="rounded-2xl bg-hero text-primary-foreground p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-elev">
          <div className="max-w-xl">
            <GraduationCap className="h-8 w-8 mb-3 opacity-80" />
            <h3 className="text-2xl md:text-3xl font-bold">Ready to find your match?</h3>
            <p className="mt-2 opacity-85">Get a personalized Readiness Score and a curated Reach / Match / Safety list in under a minute.</p>
          </div>
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 h-12 rounded-lg bg-accent px-6 font-medium text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Calculate My Chances <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
