"use client";

import { useState } from "react";

interface QuickCheckProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** Short retrieval-practice checkpoint with immediate explanatory feedback. */
export function QuickCheck({ question, options, correctIndex, explanation }: QuickCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === correctIndex;

  return (
    <section className="quick-check my-7 rounded-xl border border-border px-5 py-5 sm:px-6" aria-label="Quick knowledge check">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Quick check
      </div>
      <h4 className="mb-4 text-base font-semibold leading-relaxed text-ink">{question}</h4>
      <div className="space-y-2">
        {options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = index === correctIndex;
          let stateClass = "border-border text-ink-dim hover:border-ink-dim hover:text-ink";
          if (answered && isCorrect) stateClass = "border-accent/70 bg-accent/10 text-ink";
          else if (isSelected && answered) stateClass = "border-rose/70 bg-rose/10 text-ink";

          return (
            <button key={option} type="button" disabled={answered} onClick={() => setSelected(index)}
              className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default ${stateClass}`}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">{String.fromCharCode(65 + index)}</span>
              <span className="pt-0.5">{option}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`mt-4 rounded-lg border-l-2 py-1 pl-3 text-sm leading-relaxed ${correct ? "border-accent" : "border-rose"}`}>
          <p className="mb-1 font-semibold text-ink">{correct ? "Correct." : "Not quite."}</p>
          <p className="text-ink-dim">{explanation}</p>
          <button type="button" onClick={() => setSelected(null)} className="mt-3 text-sm font-medium text-accent underline-offset-4 hover:underline">Try again</button>
        </div>
      )}
    </section>
  );
}
