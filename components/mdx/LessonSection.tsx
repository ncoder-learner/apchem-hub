import type { ReactNode } from "react";

interface LessonSectionProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/** A quiet, collapsible lesson segment that lets students focus on one idea at a time. */
export function LessonSection({ title, description, defaultOpen = false, children }: LessonSectionProps) {
  return (
    <details open={defaultOpen} className="lesson-section group my-5 overflow-hidden rounded-xl border border-border bg-card/50">
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 hover:bg-white/[0.025] [&::-webkit-details-marker]:hidden">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold text-accent">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-ink">{title}</span>
          {description && <span className="mt-1 block text-sm font-normal text-ink-dim">{description}</span>}
        </span>
      </summary>
      <div className="lesson-section-content border-t border-border px-5 py-5 sm:px-7">{children}</div>
    </details>
  );
}
