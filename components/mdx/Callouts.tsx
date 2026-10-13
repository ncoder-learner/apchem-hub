import type { ReactNode } from "react";

interface CalloutProps {
  title?: string;
  children: ReactNode;
}

function Callout({ title, children, label }: CalloutProps & { label: string }) {
  return (
    <aside className="lesson-callout my-6 border-l-2 border-accent pl-4 py-1">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">{label}</p>
      {title && <h4 className="mb-2 text-base font-semibold text-ink">{title}</h4>}
      <div className="text-[0.95rem] leading-relaxed text-ink-dim">{children}</div>
    </aside>
  );
}

/** Explains the reasoning behind a rule. */
export function Lightbulb({ title, children }: CalloutProps) {
  return <Callout title={title} label="The reasoning">{children}</Callout>;
}

/** A fully worked problem, solved step by step. */
export function WorkedExample({ title, children }: CalloutProps) {
  return <Callout title={title} label="Worked example">{children}</Callout>;
}

/** Corrects a common incorrect line of reasoning. */
export function Mistake({ title, children }: CalloutProps) {
  return <Callout title={title} label="Common trap">{children}</Callout>;
}

/** Connects this concept to other topics. */
export function Connects({ title, children }: CalloutProps) {
  return <Callout title={title} label="Why it matters next">{children}</Callout>;
}
