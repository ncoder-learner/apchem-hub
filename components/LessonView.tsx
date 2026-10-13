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

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col gap-5 px-4 py-4 sm:px-6 md:flex-row md:gap-7 md:px-8 md:py-6">
      <aside className="lesson-sidebar h-fit w-full shrink-0 rounded-2xl border border-border bg-sidebar/90 p-4 md:sticky md:top-4 md:w-[292px] md:max-h-[calc(100vh-2rem)] md:overflow-y-auto">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-ink-dim transition hover:text-accent">
          <span aria-hidden="true">←</span> All units
        </Link>

        <div className="mb-4">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-dim">Unit {unitId}</p>
          <h2 className="text-sm font-semibold leading-snug text-ink">{unitTitle}</h2>
        </div>

        <div className="mb-2 flex items-center justify-between px-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-dim">Topics</p>
          <span className="text-xs tabular-nums text-ink-dim">{Math.max(activeIndex + 1, 1)} of {topics.length}</span>
        </div>
        <nav aria-label="Topics in this unit" className="flex max-h-36 flex-col gap-1 overflow-y-auto pr-1 md:max-h-48">
          {topics.map((t) => {
            const active = t.slug === activeSlug;
            return (
              <Link
                key={t.slug}
                href={`/units/${unitId}/${t.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm leading-snug transition-colors ${
                  active
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-ink-dim hover:bg-white/[0.04] hover:text-ink"
                }`}
              >
                <span className="shrink-0 font-mono text-xs tabular-nums">{t.topicNumber}</span>
                <span>{t.title}</span>
              </Link>
            );
          })}
        </nav>

        <LessonOutline articleId="lesson-article" />
      </aside>

      <main className="min-w-0 flex-1">
        <header className="mb-7 border-b border-border pb-6 sm:mb-8 sm:pb-7">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-accent">Topic {topicNumber}</span>
            {activeIndex >= 0 && <span className="text-ink-dim">Topic {activeIndex + 1} of {topics.length}</span>}
          </div>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">{title}</h1>
          {summary && <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-dim sm:text-lg">{summary}</p>}
        </header>

        <article id="lesson-article" className="lesson-prose mx-auto w-full max-w-4xl">{children}</article>

        <nav aria-label="Previous and next topic" className="mt-12 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/units/${unitId}/${prev.slug}`}
              className="group rounded-xl border border-border p-4 transition-colors hover:border-accent/50 hover:bg-white/[0.02]"
            >
              <span className="mb-1 block text-xs text-ink-dim">← Previous topic</span>
              <span className="block text-sm font-medium leading-snug text-ink group-hover:text-accent">{prev.topicNumber} · {prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/units/${unitId}/${next.slug}`}
              className="group rounded-xl border border-border p-4 text-left transition-colors hover:border-accent/50 hover:bg-white/[0.02] sm:text-right"
            >
              <span className="mb-1 block text-xs text-ink-dim">Next topic →</span>
              <span className="block text-sm font-medium leading-snug text-ink group-hover:text-accent">{next.topicNumber} · {next.title}</span>
            </Link>
          ) : <div />}
        </nav>
      </main>
    </div>
  );
}
