import Link from "next/link";
import type { ReactNode } from "react";
import type { TopicMeta } from "@/lib/content";

interface LessonViewProps {
  unitId: number;
  unitTitle: string;
  topics: TopicMeta[];
  activeSlug: string;
  title: string;
  topicNumber: string;
  children: ReactNode;
}

export function LessonView({
  unitId,
  unitTitle,
  topics,
  activeSlug,
  title,
  topicNumber,
  children,
}: LessonViewProps) {
  const activeIndex = topics.findIndex((t) => t.slug === activeSlug);
  const prev = activeIndex > 0 ? topics[activeIndex - 1] : undefined;
  const next = activeIndex >= 0 && activeIndex < topics.length - 1 ? topics[activeIndex + 1] : undefined;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl gap-8 px-6 py-8">
      {/* Sidebar: topic list for this unit */}
      <aside className="sticky top-8 h-fit w-64 shrink-0 rounded-xl border border-border bg-sidebar p-4">
        <Link href="/" className="mb-4 block text-xs text-ink-dim hover:text-accent">
          ← All units
        </Link>
        <h2 className="mb-1 text-sm font-semibold text-ink-dim">Unit {unitId}</h2>
        <p className="mb-4 text-sm text-ink">{unitTitle}</p>
        <nav className="flex flex-col gap-1">
          {topics.map((t) => {
            const active = t.slug === activeSlug;
            return (
              <Link
                key={t.slug}
                href={`/units/${unitId}/${t.slug}`}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft text-accent font-medium"
                    : "text-ink-dim hover:bg-white/[0.04] hover:text-ink"
                }`}
              >
                <span className="mr-1.5 tabular-nums">{t.topicNumber}</span>
                {t.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Lesson content */}
      <main className="min-w-0 flex-1">
        <div className="mb-6">
          <p className="mb-1 text-sm font-medium text-accent">Topic {topicNumber}</p>
          <h1 className="text-3xl font-bold text-ink">{title}</h1>
        </div>

        <article className="lesson-prose">{children}</article>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          {prev ? (
            <Link
              href={`/units/${unitId}/${prev.slug}`}
              className="rounded-lg border border-border px-4 py-2 text-sm text-ink-dim hover:border-accent hover:text-accent"
            >
              ← {prev.topicNumber} {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/units/${unitId}/${next.slug}`}
              className="rounded-lg border border-border px-4 py-2 text-sm text-ink-dim hover:border-accent hover:text-accent"
            >
              {next.topicNumber} {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>
    </div>
  );
}
