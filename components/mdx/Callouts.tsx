import type { ReactNode } from "react";

interface CalloutProps {
  title?: string;
  children: ReactNode;
}

function Callout({
  title,
  children,
  colorVar,
  softVar,
  icon,
  defaultLabel,
}: CalloutProps & {
  colorVar: string;
  softVar: string;
  icon: ReactNode;
  defaultLabel: string;
}) {
  return (
    <div
      className="my-6 rounded-lg border-l-4 p-4"
      style={{
        borderColor: `var(${colorVar})`,
        backgroundColor: `var(${softVar})`,
      }}
    >
      <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold" style={{ color: `var(${colorVar})` }}>
        {icon}
        <span>{title ?? defaultLabel}</span>
      </div>
      <div className="text-[0.95rem] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

/** Builds intuition: the "why" behind a rule, before or after it's named. */
export function Lightbulb({ title, children }: CalloutProps) {
  return (
    <Callout
      title={title}
      colorVar="--color-amber"
      softVar="--color-amber-soft"
      defaultLabel="Why this is true"
      icon={<span aria-hidden>💡</span>}
    >
      {children}
    </Callout>
  );
}

/** A fully worked problem, solved step by step. */
export function WorkedExample({ title, children }: CalloutProps) {
  return (
    <Callout
      title={title}
      colorVar="--color-blue"
      softVar="--color-blue-soft"
      defaultLabel="Worked example"
      icon={<span aria-hidden>✏️</span>}
    >
      {children}
    </Callout>
  );
}

/** A specific wrong-answer path, walked through and corrected — not just
 * named. This is where most of the actual AP-exam-reasoning risk lives. */
export function Mistake({ title, children }: CalloutProps) {
  return (
    <Callout
      title={title}
      colorVar="--color-rose"
      softVar="--color-rose-soft"
      defaultLabel="Where this trips people up"
      icon={<span aria-hidden>⚠️</span>}
    >
      {children}
    </Callout>
  );
}

/** Links a concept forward/backward to other units or topics. */
export function Connects({ title, children }: CalloutProps) {
  return (
    <Callout
      title={title}
      colorVar="--color-emerald"
      softVar="--color-emerald-soft"
      defaultLabel="Connects to"
      icon={<span aria-hidden>🔗</span>}
    >
      {children}
    </Callout>
  );
}
