import Link from "next/link";
import { UNITS } from "@/lib/units";
import { getUnitTopics, getUnitsWithContent } from "@/lib/content";

const UNIT_ACCENTS = [
  "from-sky-400/20 to-blue-500/5",
  "from-emerald-400/20 to-teal-500/5",
  "from-violet-400/20 to-indigo-500/5",
  "from-amber-400/20 to-orange-500/5",
  "from-rose-400/20 to-pink-500/5",
  "from-cyan-400/20 to-sky-500/5",
  "from-fuchsia-400/20 to-purple-500/5",
  "from-lime-400/20 to-green-500/5",
  "from-orange-400/20 to-red-500/5",
];

export default function HomePage() {
  const populatedUnitIds = new Set(getUnitsWithContent());
  const unitTwoTopics = getUnitTopics(2);
  const totalLessons = [...populatedUnitIds].reduce((sum, id) => sum + getUnitTopics(id).length, 0);

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <nav className="mb-12 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="AP Chem Hub home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent-soft text-lg font-black text-accent">A</span>
            <span>
              <span className="block text-sm font-bold tracking-tight text-ink">AP CHEM HUB</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-dim">Understand the why</span>
            </span>
          </Link>
          <span className="hidden rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-ink-dim sm:inline-flex">
            AP Chemistry · 9 units
          </span>
        </nav>

        <section className="hero-panel relative mb-12 overflow-hidden rounded-[2rem] border border-border px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Built for the AP Chemistry exam
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Learn the chemistry.
              <span className="block text-ink-dim">Understand the patterns.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-dim sm:text-lg">
              Clear explanations, visual models, worked examples, and quick checks that help you reason through unfamiliar AP questions instead of memorizing disconnected facts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {unitTwoTopics[0] && (
                <Link href={`/units/2/${unitTwoTopics[0].slug}`} className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-[#06251b] shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-300">
                  Continue Unit 2 <span aria-hidden="true">→</span>
                </Link>
              )}
              <a href="#course-map" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/[0.03] px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink-dim/50 hover:bg-white/[0.06]">
                Explore course <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-molecule" aria-hidden="true">
            <svg viewBox="0 0 340 300" className="w-full">
              <g fill="none" stroke="var(--color-accent)" strokeOpacity=".38" strokeWidth="2">
                <path d="M170 150 L90 91 L65 183 L170 150 L255 89 L278 184 L170 150 L170 50" />
                <path d="M90 91 L170 50 L255 89" strokeOpacity=".2" />
              </g>
              {[[170,150,27],[90,91,18],[65,183,14],[255,89,21],[278,184,15],[170,50,14]].map(([x,y,r],i)=><g key={i}>
                <circle cx={x} cy={y} r={r+8} fill="var(--color-accent)" fillOpacity=".05" />
                <circle cx={x} cy={y} r={r} fill={i===0?"var(--color-accent)":"var(--color-blue)"} fillOpacity=".9" />
                <circle cx={x-r*.3} cy={y-r*.35} r={r*.3} fill="white" fillOpacity=".45" />
              </g>)}
            </svg>
          </div>
        </section>

        <section className="mb-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="stat-card">
            <span className="stat-label">Course structure</span>
            <span className="stat-value">9 <span>units</span></span>
            <span className="stat-note">Full AP Chemistry map</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Lessons available</span>
            <span className="stat-value">{totalLessons.toString().padStart(2,"0")}</span>
            <span className="stat-note">Detailed guided lessons</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Practice style</span>
            <span className="stat-value">Active</span>
            <span className="stat-note">Quick checks with reasoning</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Study approach</span>
            <span className="stat-value">Why first</span>
            <span className="stat-note">Models → evidence → answer</span>
          </div>
        </section>

        <section id="course-map" className="scroll-mt-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Your course map</p>
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Pick up where you need to learn</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-dim">The units follow the College Board course framework. More units will become available as their lessons are built and reviewed.</p>
            </div>
            <span className="rounded-full border border-border px-3 py-1.5 text-xs text-ink-dim">{populatedUnitIds.size} of 9 units started</span>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {UNITS.map((unit) => {
              const hasContent = populatedUnitIds.has(unit.id);
              const topics = hasContent ? getUnitTopics(unit.id) : [];
              const firstTopic = topics[0];
              const featured = unit.id === 2 && hasContent;

              const card = (
                <div className={`unit-card group relative h-full overflow-hidden rounded-2xl border transition-all duration-200 ${hasContent ? "border-border bg-card hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-black/20" : "border-border/70 bg-card/40"}`}>
                  <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-br ${UNIT_ACCENTS[unit.id-1]} `} aria-hidden="true" />
                  <div className="relative p-5 sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 font-mono text-sm font-bold text-ink">0{unit.id}</span>
                      {hasContent ? <span className="rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">Available</span> : <span className="rounded-full border border-border bg-black/10 px-2.5 py-1 text-[11px] font-medium text-ink-dim">In development</span>}
                    </div>
                    <h3 className={`max-w-md text-lg font-bold leading-snug ${hasContent ? "text-ink" : "text-ink-dim"}`}>{unit.title}</h3>
                    <p className="mt-2 text-sm text-ink-dim">{hasContent ? `${topics.length} guided lesson${topics.length===1?"":"s"}` : "Lessons are being prepared"}</p>
                    {featured && (
                      <div className="mt-5 border-t border-border/80 pt-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-semibold text-ink">Unit 2 lessons</span>
                          <span className="text-xs text-ink-dim">{topics.length}/7 topics</span>
                        </div>
                        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-border">
                          <div className="h-full rounded-full bg-accent" style={{width:`${Math.min(topics.length/7,1)*100}%`}} />
                        </div>
                        <div className="grid gap-1.5 sm:grid-cols-2">
                          {topics.map((topic) => (
                            <span key={topic.slug} className="flex min-w-0 items-center gap-2 rounded-lg bg-white/[0.025] px-2.5 py-2 text-xs text-ink-dim">
                              <span className="font-mono text-[10px] text-accent">{topic.topicNumber}</span>
                              <span className="truncate">{topic.title}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {!featured && hasContent && <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-accent">Open unit <span aria-hidden="true">→</span></div>}
                  </div>
                </div>
              );

              return hasContent && firstTopic ? (
                <Link key={unit.id} href={`/units/${unit.id}/${firstTopic.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  {card}
                </Link>
              ) : <div key={unit.id}>{card}</div>;
            })}
          </div>
        </section>

        <footer className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-ink-dim sm:flex-row sm:items-center sm:justify-between">
          <span>AP Chem Hub · Learn concepts, not just lists.</span>
          <span>Aligned to the AP Chemistry Course and Exam Description.</span>
        </footer>
      </div>
    </main>
  );
}
