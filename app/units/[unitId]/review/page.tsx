import Link from "next/link";
import { notFound } from "next/navigation";
import { getUnitTopics } from "@/lib/content";
import { getUnit } from "@/lib/units";
import { UNIT_REVIEWS } from "@/lib/unit-reviews";

interface PageProps {
  params: Promise<{ unitId: string }>;
}

export default async function UnitReviewPage({ params }: PageProps) {
  const { unitId: rawUnitId } = await params;
  const unitId = Number(rawUnitId);
  const unit = getUnit(unitId);
  const review = UNIT_REVIEWS[unitId];
  if (!unit || !review) return notFound();

  const topics = getUnitTopics(unitId);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-6 sm:px-7 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-ink-dim">
        <Link href="/" className="hover:text-accent">AP Chem Hub</Link>
        <span aria-hidden="true">/</span>
        <span>Unit {unitId}</span>
        <span aria-hidden="true">/</span>
        <span className="text-ink">Unit Review</span>
      </nav>

      <header className="mb-8 rounded-2xl border border-border bg-card/70 p-6 sm:p-9">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Unit {unitId} · Review and test prep</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{unit.title} Review</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-dim">{review.focus}</p>
        <p className="mt-4 max-w-3xl leading-relaxed">{review.connect}</p>
        <p className="mt-5 text-sm text-ink-dim">Use this page after studying the lessons. It consolidates unit-wide strategies; topic-specific explanations and worked examples remain in their lessons.</p>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">How to solve recurring question types</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {review.strategies.map((strategy) => (
            <article key={strategy.title} className="rounded-xl border border-border bg-card/50 p-5">
              <h3 className="text-base font-semibold">{strategy.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{strategy.summary}</p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
                {strategy.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-xl border border-border p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Common traps to check</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {review.traps.map((trap) => (
            <li key={trap} className="flex gap-3 text-sm leading-relaxed">
              <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber" />
              <span>{trap}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-border bg-card/40 p-5">
          <h2 className="text-lg font-semibold">FRQ response checklist</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {review.frqChecklist.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-accent">✓</span><span>{item}</span></li>)}
          </ul>
        </article>
        <article className="rounded-xl border border-border bg-card/40 p-5">
          <h2 className="text-lg font-semibold">Am I ready for the unit test?</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed">
            {review.readiness.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-accent">□</span><span>{item}</span></li>)}
          </ul>
        </article>
      </section>

      <section className="mb-8 rounded-xl border border-border bg-card/40 p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Return to a lesson</h2>
        <p className="mt-2 text-sm text-ink-dim">Use the relevant lesson for concept explanations, diagrams, interactive models, and worked examples.</p>
        {topics.length > 0 ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {topics.map((topic) => (
              <Link key={topic.slug} href={`/units/${unitId}/${topic.slug}`} className="rounded-lg border border-border px-3 py-3 text-sm transition hover:border-accent/40 hover:bg-white/[0.025]">
                <span className="mr-2 font-mono text-xs text-accent">{topic.topicNumber}</span>{topic.title}
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-ink-dim">Lesson links will appear here when this unit's lessons are published.</p>
        )}
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-sm">
        <Link href="/" className="text-ink-dim hover:text-accent">← All units</Link>
        {topics[0] && <Link href={`/units/${unitId}/${topics[0].slug}`} className="font-semibold text-accent hover:underline">Start this unit’s lessons →</Link>}
      </footer>
    </main>
  );
}
