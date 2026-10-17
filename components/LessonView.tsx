import Link from "next/link";
import type { ReactNode } from "react";
import type { TopicMeta } from "@/lib/content";
import { LessonOutline } from "@/components/LessonOutline";

interface LessonViewProps {
  unitId: number;
  unitTitle: string;
  topics: TopicMeta[];
  activeSlug: string;
  title: string;
  topicNumber: string;
  summary?: string;
  children: ReactNode;
}

export function LessonView({
  unitId,
  unitTitle,
  topics,
  activeSlug,
  title,
  topicNumber,
  summary,
  children,
}: LessonViewProps) {
  const activeIndex = topics.findIndex((t) => t.slug === activeSlug);
  const prev = activeIndex > 0 ? topics[activeIndex - 1] : undefined;
  const next = activeIndex >= 0 && activeIndex < topics.length - 1 ? topics[activeIndex + 1] : undefined;
  const progress = activeIndex >= 0 ? ((activeIndex + 1) / Math.max(topics.length, 1)) * 100 : 0;

  return (
    <div className="lesson-page mx-auto flex min-h-screen max-w-[1480px] flex-col gap-5 px-3 py-3 sm:px-5 md:flex-row md:gap-6 md:px-6 md:py-5 xl:px-8">
      <aside className="lesson-sidebar h-fit w-full shrink-0 rounded-2xl border border-border p-4 md:sticky md:top-4 md:w-[300px] md:max-h-[calc(100vh-2rem)] md:overflow-y-auto">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-ink-dim transition hover:bg-white/[0.04] hover:text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-white/[0.025]" aria-hidden="true">←</span>
          Course dashboard
        </Link>

        <div className="mb-5 rounded-xl border border-border/80 bg-white/[0.02] p-3.5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Unit {unitId}</span>
            <span className="text-[10px] tabular-nums text-ink-dim">{Math.max(activeIndex + 1, 1)} / {topics.length}</span>
          </div>
          <h2 className="text-sm font-bold leading-snug text-ink">{unitTitle}</h2>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-ink-dim">Course progress through this unit</p>
        </div>

        <div className="mb-2 flex items-center justify-between px-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-dim">Lessons</p>
          <span className="text-[10px] text-ink-dim">Jump to topic</span>
        </div>
        <nav aria-label="Topics in this unit" className="flex max-h-44 flex-col gap-1 overflow-y-auto pr-1 md:max-h-56">
          {topics.map((t) => {
            const active = t.slug === activeSlug;
            return (
              <Link
                key={t.slug}
                href={`/units/${unitId}/${t.slug}`}
                aria-current={active ? "page" : undefined}
                className={`group flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm leading-snug transition-colors ${
                  active
                    ? "border-accent/20 bg-accent-soft font-semibold text-accent"
                    : "border-transparent text-ink-dim hover:border-border hover:bg-white/[0.035] hover:text-ink"
                }`}
              >
                <span className={`mt-0.5 flex h-5 min-w-7 items-center justify-center rounded-md font-mono text-[10px] tabular-nums ${
                  active ? "bg-accent/10 text-accent" : "bg-white/[0.035] text-ink-dim"
                }`}>{t.topicNumber}</span>
                <span>{t.title}</span>
                {active && <span className="ml-auto mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
              </Link>
            );
          })}
        </nav>

        <Link
          href={`/units/${unitId}/review`}
          className="mt-3 flex items-center justify-between rounded-xl border border-accent/20 bg-accent-soft px-3 py-3 text-sm font-semibold text-accent transition hover:border-accent/40"
        >
          <span>Unit {unitId} Review</span>
          <span aria-hidden="true">→</span>
        </Link>

        <Link
          href="/packet-companion"
          className="mt-2 flex items-center justify-between rounded-xl border border-border px-3 py-3 text-sm font-semibold text-ink-dim transition hover:border-accent/40 hover:text-accent"
        >
          <span>Help with a packet question</span>
          <span aria-hidden="true">↗</span>
        </Link>

        <LessonOutline articleId="lesson-article" />
      </aside>

      <main className="min-w-0 flex-1">
        <div className="lesson-main-panel min-h-full rounded-2xl border border-border/70 px-4 py-5 sm:px-7 sm:py-7 lg:px-10 lg:py-9">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-ink-dim">
            <Link href="/" className="transition hover:text-accent">AP Chem Hub</Link>
            <span aria-hidden="true">/</span>
            <span>Unit {unitId}</span>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-ink">{topicNumber}</span>
          </nav>

          <header className="lesson-header relative mb-8 overflow-hidden rounded-2xl border border-border/80 px-5 py-6 sm:px-7 sm:py-8">
            <div className="lesson-header-glow" aria-hidden="true" />
            <div className="relative z-10">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-accent">Topic {topicNumber}</span>
                <span className="rounded-full border border-border bg-black/10 px-3 py-1 text-[11px] text-ink-dim">Lesson {Math.max(activeIndex + 1, 1)} of {topics.length}</span>
              </div>
              <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.65rem]">{title}</h1>
              {summary && <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-dim sm:text-base">{summary}</p>}
            </div>
          </header>

          <article id="lesson-article" className="lesson-prose mx-auto w-full max-w-4xl">{children}</article>

          <nav aria-label="Previous and next topic" className="mt-12 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
            {prev ? (
              <Link href={`/units/${unitId}/${prev.slug}`} className="topic-nav-card group rounded-xl border border-border p-4 transition-colors hover:border-accent/40">
                <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-ink-dim"><span aria-hidden="true">←</span> Previous lesson</span>
                <span className="block text-sm font-semibold leading-snug text-ink group-hover:text-accent">{prev.topicNumber} · {prev.title}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/units/${unitId}/${next.slug}`} className="topic-nav-card group rounded-xl border border-border p-4 transition-colors hover:border-accent/40 sm:text-right">
                <span className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-ink-dim sm:justify-end">Next lesson <span aria-hidden="true">→</span></span>
                <span className="block text-sm font-semibold leading-snug text-ink group-hover:text-accent">{next.topicNumber} · {next.title}</span>
              </Link>
            ) : <div />}
          </nav>
        </div>
      </main>
    </div>
  );
}
