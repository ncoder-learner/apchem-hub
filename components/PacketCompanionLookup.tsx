"use client";

import { useState } from "react";
import Link from "next/link";
import { PACKET_QUESTION_INDEX, findPacketQuestion } from "@/lib/packet-companion";

export function PacketCompanionLookup() {
  const [unitId, setUnitId] = useState("5");
  const [questionType, setQuestionType] = useState<"mcq" | "frq">("mcq");
  const [questionNumber, setQuestionNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const match = submitted && questionNumber.trim() ? findPacketQuestion({ unitId: Number(unitId), questionType, questionNumber }) : undefined;

  return <section className="rounded-2xl border border-border bg-card/40 p-5 sm:p-7"><h2 className="text-xl font-semibold">Find your question</h2><div className="mt-5 grid gap-4 sm:grid-cols-3"><label className="text-sm font-medium">AP Chemistry unit<select value={unitId} onChange={event => { setUnitId(event.target.value); setSubmitted(false); }} className="mt-2 block w-full rounded-lg border border-border bg-card px-3 py-3 text-ink">{Array.from({ length: 9 }, (_, index) => <option key={index + 1} value={String(index + 1)}>Unit {index + 1}</option>)}</select></label><label className="text-sm font-medium">Question type<select value={questionType} onChange={event => { setQuestionType(event.target.value as "mcq" | "frq"); setSubmitted(false); }} className="mt-2 block w-full rounded-lg border border-border bg-card px-3 py-3 text-ink"><option value="mcq">Multiple choice</option><option value="frq">Free response</option></select></label><label className="text-sm font-medium">Printed question number<input value={questionNumber} onChange={event => { setQuestionNumber(event.target.value); setSubmitted(false); }} placeholder="e.g. 12 or 2(b)" className="mt-2 block w-full rounded-lg border border-border bg-card px-3 py-3 text-ink" /></label></div><button type="button" onClick={() => setSubmitted(true)} disabled={!questionNumber.trim()} className="mt-4 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-[#06251b] disabled:cursor-not-allowed disabled:opacity-50">Find help</button>{submitted && (match ? <div className="mt-5 rounded-xl border border-border p-4"><h3 className="font-semibold">{match.packetTitle} · Question {match.questionNumber}</h3><p className="mt-2 text-sm">{match.conceptHint ?? "Concept hint not yet written."}</p></div> : <div className="mt-5 rounded-xl border border-border p-4"><h3 className="font-semibold">No verified match yet</h3><p className="mt-2 text-sm leading-relaxed text-ink-dim">{PACKET_QUESTION_INDEX.length === 0 ? "The question index is empty while packet numbers and walkthrough references are verified. Use the lessons rather than risk seeing a solution for a different question." : "That unit, question type, and number do not match a verified entry. Check the printed number or use the relevant lesson."}</p><Link href="/#course-map" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">Browse lessons →</Link></div>)}</section>;
}
