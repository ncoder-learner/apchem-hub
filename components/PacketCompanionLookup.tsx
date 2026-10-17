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
  const packets = Array.from(new Map(
    PACKET_QUESTION_INDEX
      .filter((entry) => entry.unitId === Number(unitId) && entry.questionType === questionType)
      .map((entry) => [entry.packetId, entry.packetTitle])
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold">
              {match.packetTitle} · Question {match.questionNumber}
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              {match.conceptHint ?? "A question-specific concept hint has not been written yet."}
            </p>
            {match.strategyHint && (
              <p className="mt-3 text-sm leading-relaxed">{match.strategyHint}</p>
            )}
            {match.nextStepHint && (
              <p className="mt-3 text-sm leading-relaxed">{match.nextStepHint}</p>
            )}
            {match.topicSlugs.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {match.topicSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/units/${match.unitId}/${slug}`}
                    className="inline-flex min-h-10 items-center rounded-lg border border-border px-3 py-2 text-sm font-semibold text-accent hover:bg-card"
                  >
                    Open related lesson
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {submitted && !match && (
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold">No verified match yet</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">
              {PACKET_QUESTION_INDEX.length === 0
                ? "The question index has not been populated with verified packet mappings yet. Rather than risk showing help for a different question, start with the relevant unit lesson."
                : "That unit, question type, and number do not match a verified entry. Check the printed number or use the relevant unit lesson."}
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
