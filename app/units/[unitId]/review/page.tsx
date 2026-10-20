import Link from "next/link";
import { notFound } from "next/navigation";
import { getUnit } from "@/lib/units";
import { UNIT_REVIEWS } from "@/lib/unit-reviews";
import { UnitReviewStudySession } from "@/components/UnitReviewStudySession";

interface PageProps {
  params: Promise<{ unitId: string }>;
}

export default async function UnitReviewPage({ params }: PageProps) {
  const { unitId: rawUnitId } = await params;
  const unitId = Number(rawUnitId);
  const unit = getUnit(unitId);
  const review = UNIT_REVIEWS[unitId];
  if (!unit || !review) return notFound();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-7 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-ink-dim">
        <Link href="/" className="hover:text-accent">AP Chem Hub</Link>
        <span aria-hidden="true">/</span>
        <span>Unit {unitId}</span>
        <span aria-hidden="true">/</span>
        <span className="text-ink">Unit Review</span>
      </nav>

      <header className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-card/70 p-6 sm:p-9">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-accent/15" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-accent/20" />
        <div className="relative">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Unit {unitId} · Review and test prep</p>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{unit.title}: the test-prep session</h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-dim">{review.focus}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/60 px-3 py-1.5 text-sm"><span className="h-2 w-2 rounded-full bg-accent" />60-minute guided review</span>
            <span className="rounded-full border border-border bg-bg/60 px-3 py-1.5 text-sm text-ink-dim">{review.examWeight} of MCQ</span>
            <a href="https://apcentral.collegeboard.org/courses/ap-chemistry/exam/past-exam-questions" target="_blank" rel="noreferrer" className="text-sm font-semibold text-accent hover:underline">Released AP FRQs ↗</a>
          </div>
        </div>
      </header>

      <UnitReviewStudySession unitId={unitId} review={review} />

      <footer className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-sm">
        <Link href="/" className="text-ink-dim hover:text-accent">← All units</Link>
        {topics[0] && <Link href={"/units/" + unitId + "/" + topics[0].slug} className="font-semibold text-accent hover:underline">Start this unit’s lessons →</Link>}
      </footer>
    </main>
  );
}
