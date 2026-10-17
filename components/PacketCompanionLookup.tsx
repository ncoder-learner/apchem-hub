"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PACKET_QUESTION_INDEX, findPacketQuestion } from "@/lib/packet-companion";

export function PacketCompanionLookup() {
  const [unitId, setUnitId] = useState("");
  const [questionType, setQuestionType] = useState<"mcq" | "frq">("mcq");
  const [packetId, setPacketId] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  const packets = Array.from(new Map(
    PACKET_QUESTION_INDEX
      .filter((entry) => entry.unitId === Number(unitId) && entry.questionType === questionType)
      .map((entry) => [entry.packetId, entry.packetTitle] as const)
  ).entries());

  const match =
    submitted && unitId && questionNumber.trim()
      ? findPacketQuestion({
          unitId: Number(unitId),
          questionType,
          questionNumber: questionNumber.trim(),
          ...(packetId ? { packetId } : {}),
        })
      : undefined;

  const hints = match
    ? [match.conceptHint, match.strategyHint, match.nextStepHint].filter(
        (hint): hint is string => Boolean(hint?.trim())
      )
    : [];
  const revealableSteps = hints.length + (match?.solution ? 1 : 0);
  const nextHintLabel = hintLevel < hints.length
    ? hintLevel === 0 ? "Reveal first hint" : "Reveal next hint"
    : "Reveal full explanation";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHintLevel(0);
    setSubmitted(true);
  }

  return (
    <section className="rounded-2xl border border-border bg-card/40 p-5 sm:p-7">
      <h2 className="text-xl font-semibold">Find your question</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-dim">
        Use the unit and number printed on your physical packet. Question-specific guidance appears only when that exact entry has been checked.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-medium" htmlFor="packet-unit">
            AP Chemistry unit
            <select
              id="packet-unit"
              required
              value={unitId}
              onChange={(event) => {
                setUnitId(event.target.value);
                setPacketId("");
                setHintLevel(0);
                setSubmitted(false);
              }}
              className="mt-2 block min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink"
            >
              <option value="">Choose a unit</option>
              {Array.from({ length: 9 }, (_, index) => (
                <option key={index + 1} value={String(index + 1)}>
                  Unit {index + 1}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium" htmlFor="packet-question-type">
            Question type
            <select
              id="packet-question-type"
              value={questionType}
              onChange={(event) => {
                setQuestionType(event.target.value as "mcq" | "frq");
                setPacketId("");
                setHintLevel(0);
                setSubmitted(false);
              }}
              className="mt-2 block min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink"
            >
              <option value="mcq">Multiple choice</option>
              <option value="frq">Free response</option>
            </select>
          </label>

          {packets.length > 0 && (
            <label className="block text-sm font-medium" htmlFor="packet-source">
              Packet or resource
              <select
                id="packet-source"
                value={packetId}
                onChange={(event) => {
                  setPacketId(event.target.value);
                  setHintLevel(0);
                  setSubmitted(false);
                }}
                className="mt-2 block min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink"
              >
                <option value="">Choose a packet (if known)</option>
                {packets.map(([id, title]) => (
                  <option key={id} value={id}>{title}</option>
                ))}
              </select>
            </label>
          )}

          <label className="block text-sm font-medium" htmlFor="packet-question-number">
            Printed question number
            <input
              id="packet-question-number"
              required
              value={questionNumber}
              onChange={(event) => {
                setQuestionNumber(event.target.value);
                setHintLevel(0);
                setSubmitted(false);
              }}
              placeholder="e.g. 12 or 2(b)"
              autoComplete="off"
              className="mt-2 block min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink placeholder:text-ink-dim/70"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={!unitId || !questionNumber.trim()}
          className="mt-4 min-h-11 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-[#06251b] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Find help
        </button>
      </form>

      <div className="mt-5" aria-live="polite" aria-atomic="true">
        {submitted && match && (
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Indexed packet match</p>
                <h3 className="mt-1 font-semibold">{match.packetTitle} · Question {match.questionNumber}{match.partLabel ? ` (${match.partLabel})` : ""}</h3>
                <p className="mt-1 text-sm text-ink-dim">Packet topic range: {match.topicRange.replace("-", "–")}{match.topicNumber ? ` · mapped topic: ${match.topicNumber}` : ""}</p>
              </div>
              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-ink-dim">
                {hintLevel === revealableSteps && match.solution ? "Explanation revealed" : `Help stage ${Math.min(hintLevel, hints.length)} of ${revealableSteps}`}
              </span>
            </div>

            {hintLevel === 0 && (
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                {match.topicNumber
                  ? hints.length > 0
                    ? match.solution
                      ? `This question is mapped to Topic ${match.topicNumber}. Reveal the original hints below one at a time, then reveal the independently written worked explanation.`
                      : `This question is mapped to Topic ${match.topicNumber}. Original hints are available below; a complete worked explanation is still being prepared.`
                    : match.solution
                      ? `This question is mapped to Topic ${match.topicNumber}. Reveal the independently written worked explanation below.`
                      : `This question is mapped to Topic ${match.topicNumber}. Question-specific hints and a worked explanation are still being prepared. Try it first, then use the lesson or Unit Review to check the underlying chemistry.`
                  : hints.length > 0
                    ? "The printed question is indexed and original hints are available below. The exact subtopic mapping is still being reviewed."
                    : "This identifies the printed question number in the selected packet index. The exact subtopic mapping and question-specific hints are still being reviewed. Try the question first, then use the lesson links or Unit Review while detailed help is prepared."}
              </p>
            )}

            {hints.slice(0, hintLevel).map((hint, index) => (
              <div key={index} className="mt-4 rounded-lg border border-border/70 bg-bg/40 p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-accent">
                  {index === 0 ? "Concept hint" : index === 1 ? "Strategy hint" : "Next step"}
                </p>
                <p className="mt-1 text-sm leading-relaxed">{hint}</p>
              </div>
            ))}

            {match.solution && hintLevel > hints.length && (
              <div className="mt-4 rounded-lg border border-accent/30 bg-accent-soft/30 p-4">
                <h4 className="font-semibold">Worked explanation</h4>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{match.solution}</p>
                {match.commonMistakes && match.commonMistakes.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold">Common mistakes</h5>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                      {match.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {revealableSteps > 0 && hintLevel < revealableSteps && (
              <button
                type="button"
                onClick={() => setHintLevel((level) => Math.min(level + 1, revealableSteps))}
                className="mt-4 min-h-11 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-[#06251b] transition hover:opacity-90"
              >
                {nextHintLabel}
              </button>
            )}

            {match.topicSlugs.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-dim">{match.topicNumber ? "Mapped lesson" : "Lessons in this packet's topic range"}</p>
                <div className="flex flex-wrap gap-2">
                {match.topicSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/units/${match.unitId}/${slug}`}
                    className="inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-semibold text-accent hover:bg-card"
                  >
                    Open lesson {slug.split("-").slice(0, 2).join(".")}
                  </Link>
                ))}
                </div>
              </div>
            )}

            {revealableSteps === 0 && (
              <p className="mt-4 text-sm text-ink-dim">Question-specific hints and a worked explanation are not available yet. The source match is verified, but this is not an answer key.</p>
            )}

            <div className="mt-4 border-t border-border pt-4">
              <Link
                href={`/units/${match.unitId}/review`}
                className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                Open Unit {match.unitId} Review <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        )}

        {submitted && !match && (
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold">No indexed match yet</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">
              {PACKET_QUESTION_INDEX.length === 0
                ? "The question index has not been populated with verified packet mappings yet. Rather than risk showing help for a different question, start with the relevant unit lesson."
                : packets.length > 1 && !packetId
                  ? "Question numbers repeat across packet sets. Choose the packet or resource that matches the title on your PDF, then search again."
                  : "That unit, question type, and number do not match an indexed entry. Check the printed number or use the relevant unit review."}
            </p>
            <Link
              href="/#course-map"
              className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:underline"
            >
              Browse AP Chemistry lessons →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
