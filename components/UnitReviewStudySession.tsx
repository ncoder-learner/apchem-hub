"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { UnitReviewData } from "@/lib/unit-reviews";
import { UNIT_REVIEW_PRACTICE } from "@/lib/unit-review-practice";

interface TopicLink {
  slug: string;
  topicNumber: string;
  title: string;
}

interface Props {
  unitId: number;
  topics: TopicLink[];
  review: UnitReviewData;
}

const STUDY_BLOCKS = [
  { id: "map", time: "0–8 min", title: "Build the unit map", detail: "Read the three mental models. Explain each in your own words before moving on." },
  { id: "recall", time: "8–18 min", title: "Retrieve from memory", detail: "Hide the lesson links. Write the key relationships, symbols, and decision rules from memory." },
  { id: "mcq", time: "18–38 min", title: "Practice and correct", detail: "Answer every question without notes. For each miss, identify the exact assumption or step that failed." },
  { id: "frq", time: "38–55 min", title: "Write like an AP student", detail: "Attempt one released FRQ part on paper. Explain the chemistry, show work, and label units." },
  { id: "finish", time: "55–60 min", title: "Close the gaps", detail: "Revisit one lesson, then redo missed questions without looking at the explanation." },
] as const;

export function UnitReviewStudySession({ unitId, topics, review }: Props) {
  const practice = UNIT_REVIEW_PRACTICE[unitId];
  const [activeTab, setActiveTab] = useState<"map" | "practice" | "frq">("map");
  const [checkedBlocks, setCheckedBlocks] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<number[]>([]);
  const [readiness, setReadiness] = useState<string[]>([]);
  const [weakTopic, setWeakTopic] = useState("");
  const [frqResponses, setFrqResponses] = useState<Record<string, string>>({});
  const [revealedRubrics, setRevealedRubrics] = useState<string[]>([]);

  const score = useMemo(
    () => checkedAnswers.filter((index) => answers[index] === practice.questions[index]?.correctIndex).length,
    [answers, checkedAnswers, practice.questions],
  );
  const checkedCount = checkedBlocks.length + checkedAnswers.length + readiness.filter((item) => item.startsWith("ready:")).length;
  const totalProgressItems = STUDY_BLOCKS.length + practice.questions.length + review.readiness.length;
  const progress = Math.round((checkedCount / totalProgressItems) * 100);

  function toggle(list: string[], value: string, setList: (next: string[]) => void) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-border bg-card/40">
        <div className="flex flex-col gap-5 border-b border-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Your 60-minute review</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Learn it. Retrieve it. Prove it.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-dim">This is a guided study session, not another lesson. Work on paper, use the checks to find gaps, then revisit only the lesson that fixes them.</p>
          </div>
          <div className="w-full shrink-0 sm:max-w-48">
            <div className="flex items-center justify-between text-xs text-ink-dim"><span>Session progress</span><span>{progress}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg"><div className="h-full rounded-full bg-accent transition-all" style={{ width: progress + "%" }} /></div>
          </div>
        </div>
        <div className="grid gap-0 md:grid-cols-5">
          {STUDY_BLOCKS.map((block, index) => (
            <button key={block.id} type="button" onClick={() => toggle(checkedBlocks, block.id, setCheckedBlocks)} className={"border-b border-border p-4 text-left transition hover:bg-white/[0.03] md:border-b-0 md:border-r md:last:border-r-0 " + (checkedBlocks.includes(block.id) ? "bg-accent-soft/25" : "")}>
              <span className="text-xs font-bold text-accent">{block.time}</span>
              <span className="mt-2 flex items-start gap-2 text-sm font-semibold"><span className={"mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] " + (checkedBlocks.includes(block.id) ? "border-accent bg-accent text-[#06251b]" : "border-border")}>{checkedBlocks.includes(block.id) ? "✓" : ""}</span>{block.title}</span>
              <span className="mt-2 block text-xs leading-relaxed text-ink-dim">{block.detail}</span>
              <span className="mt-3 block text-[11px] font-semibold text-ink-dim">{checkedBlocks.includes(block.id) ? "Marked complete" : "Mark complete"}</span>
            </button>
          ))}
        </div>
      </section>

      <nav aria-label="Review sections" className="flex flex-wrap gap-2">
        {([
          ["map", "01 · Mental models"],
          ["practice", "02 · MCQ practice"],
          ["frq", "03 · FRQ workshop"],
        ] as const).map(([id, label]) => (
          <button key={id} type="button" onClick={() => setActiveTab(id)} className={"min-h-11 rounded-lg border px-4 py-2.5 text-sm font-semibold transition " + (activeTab === id ? "border-accent bg-accent-soft/35 text-accent" : "border-border text-ink-dim hover:text-ink")}>{label}</button>
        ))}
      </nav>

      {activeTab === "map" && (
        <section className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">A different way to think about Unit {unitId}</p>
            <h2 className="mt-2 text-2xl font-bold">Three mental models to carry into the test</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-dim">Don’t memorize isolated facts. Match the model to the evidence in the prompt, then explain the connection.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {practice.mentalModels.map((model, index) => (
              <article key={model.title} className="rounded-xl border border-border bg-card/50 p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft/40 font-mono text-sm font-bold text-accent">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 text-lg font-semibold">{model.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{model.idea}</p>
                <div className="mt-4 rounded-lg bg-bg/70 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-accent">Use this when</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim">{model.useWhen}</p>
                </div>
              </article>
            ))}
          </div>
          <details className="rounded-xl border border-border bg-card/30 p-5">
            <summary className="cursor-pointer list-none text-base font-semibold">Common traps to actively test yourself against <span className="ml-2 text-xs font-normal text-ink-dim">({review.traps.length})</span></summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">For each one, explain why it is wrong and what evidence or relationship should replace it.</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {review.traps.map((trap) => <li key={trap} className="flex gap-3 rounded-lg border border-border p-3 text-sm leading-relaxed"><span className="mt-0.5 text-amber">!</span><span>{trap}</span></li>)}
            </ul>
          </details>
          <section className="rounded-xl border border-border p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><h3 className="text-lg font-semibold">Pick the lesson that fixes the gap</h3><p className="mt-1 text-sm text-ink-dim">Use these as targeted repairs, not as a requirement to reread everything.</p></div>
              <span className="text-xs text-ink-dim">{topics.length} lessons available</span>
            </div>
            {topics.length > 0 ? (
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {topics.map((topic) => <Link key={topic.slug} href={"/units/" + unitId + "/" + topic.slug} className="group flex min-h-14 items-center justify-between gap-3 rounded-lg border border-border px-4 py-3 transition hover:border-accent/50 hover:bg-accent-soft/10"><span><span className="mr-2 font-mono text-xs text-accent">{topic.topicNumber}</span><span className="text-sm font-medium">{topic.title}</span></span><span className="text-ink-dim transition group-hover:translate-x-0.5 group-hover:text-accent">↗</span></Link>)}
              </div>
            ) : <p className="mt-3 text-sm text-ink-dim">Unit lessons are being added. Use the mental models, practice set, and official FRQ resource below while coverage is completed.</p>}
          </section>
          <section className="rounded-xl border border-border bg-card/30 p-5">
            <h3 className="text-lg font-semibold">Before you start the questions</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">Say the central connection out loud without reading it:</p>
            <blockquote className="mt-3 border-l-2 border-accent pl-4 text-base leading-relaxed">{review.connect}</blockquote>
          </section>
        </section>
      )}

      {activeTab === "practice" && (
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Original practice · not copied from the AP exam</p><h2 className="mt-2 text-2xl font-bold">Check whether you can apply it</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-dim">Answer before checking. Read the explanation even when correct, then redo every missed question from a blank page.</p></div>
            <div className="rounded-lg border border-border px-4 py-2 text-sm"><span className="font-bold">{score}/{checkedAnswers.length || 0}</span><span className="ml-1 text-ink-dim">correct checked</span></div>
          </div>
          <div className="space-y-4">
            {practice.questions.map((question, index) => {
              const checked = checkedAnswers.includes(index);
              const selected = answers[index];
              const correct = selected === question.correctIndex;
              return (
                <article key={question.prompt} className="rounded-xl border border-border bg-card/40 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-bold uppercase tracking-wide text-accent">Question {index + 1} · {question.skill}</span>{checked && <span className={"rounded-full px-2.5 py-1 text-xs font-semibold " + (correct ? "bg-accent-soft/40 text-accent" : "bg-amber/10 text-amber")}>{correct ? "Correct" : "Review this"}</span>}</div>
                  <h3 className="mt-3 text-base font-semibold leading-relaxed">{question.prompt}</h3>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => (
                      <button key={option} type="button" disabled={checked} onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className={"flex min-h-12 items-start gap-3 rounded-lg border p-3 text-left text-sm leading-relaxed transition disabled:cursor-default " + (selected === optionIndex ? "border-accent bg-accent-soft/20" : "border-border hover:border-accent/40")}>
                        <span className={"flex h-6 w-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs " + (selected === optionIndex ? "border-accent text-accent" : "border-border text-ink-dim")}>{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>
                      </button>
                    ))}
                  </div>
                  {!checked ? <button type="button" disabled={selected === undefined} onClick={() => setCheckedAnswers((current) => [...current, index])} className="mt-4 min-h-10 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#06251b] disabled:cursor-not-allowed disabled:opacity-40">Check answer</button> : <div className={"mt-4 rounded-lg border p-4 " + (correct ? "border-accent/30 bg-accent-soft/15" : "border-amber/30 bg-amber/5")}><p className="text-xs font-bold uppercase tracking-wide">{correct ? "Why it works" : "Correction"}</p><p className="mt-2 text-sm leading-relaxed">{question.explanation}</p><button type="button" onClick={() => { setCheckedAnswers((current) => current.filter((item) => item !== index)); setAnswers((current) => { const next = { ...current }; delete next[index]; return next; }); }} className="mt-3 text-xs font-semibold text-accent hover:underline">Try again from scratch</button></div>}
                </article>
              );
            })}
          </div>
          <section className="mt-6 rounded-xl border border-border p-5">
            <h3 className="font-semibold">Target your next 10 minutes</h3>
            <p className="mt-1 text-sm text-ink-dim">Which area felt least automatic? Choose one and open only that lesson.</p>
            <select value={weakTopic} onChange={(event) => setWeakTopic(event.target.value)} className="mt-3 min-h-11 w-full rounded-lg border border-border bg-card px-3 text-sm sm:max-w-lg">
              <option value="">Choose a topic to repair</option>
              {topics.map((topic) => <option key={topic.slug} value={topic.slug}>{topic.topicNumber} · {topic.title}</option>)}
            </select>
            {weakTopic && <Link href={"/units/" + unitId + "/" + weakTopic} className="mt-3 inline-flex min-h-10 items-center rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#06251b]">Open targeted lesson →</Link>}
          </section>
        </section>
      )}

      {activeTab === "frq" && (
        <section className="space-y-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Practice the written response</p><h2 className="mt-2 text-2xl font-bold">An FRQ is a chain of evidence</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-dim">Choose a released question on the official AP Central page, answer one relevant part on paper without notes, then score it with the official scoring guideline. Released FRQs can combine multiple units; use the focus list below to select a relevant prompt rather than assuming each question belongs to only one unit.</p></div>
          {practice.frqs && practice.frqs.length > 0 && (
            <section className="space-y-5">
              <div className="rounded-xl border border-accent/30 bg-accent-soft/10 p-4">
                <p className="text-sm font-semibold">Original AP-style practice · {practice.frqs.length} multi-part questions</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-dim">These are original practice questions, not copied College Board questions. Work them on paper or draft below. Reveal the scoring guidance only after you attempt each part; the bullets describe the evidence a strong answer needs.</p>
              </div>
              {practice.frqs.map((frq, frqIndex) => (
                <article key={frq.title} className="rounded-xl border border-border bg-card/35 p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">FRQ {frqIndex + 1} · {frq.parts.length} parts</p>
                  <h3 className="mt-2 text-xl font-semibold">{frq.title}</h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-dim">{frq.stimulus}</p>
                  <div className="mt-5 space-y-5">
                    {frq.parts.map((part) => {
                      const responseKey = unitId + "-" + frqIndex + "-" + part.label;
                      const rubricOpen = revealedRubrics.includes(responseKey);
                      return (
                        <section key={part.label} className="border-t border-border pt-4">
                          <h4 className="font-semibold">{part.label}. {part.prompt}</h4>
                          <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-ink-dim" htmlFor={"response-" + responseKey}>Your response / working</label>
                          <textarea id={"response-" + responseKey} value={frqResponses[responseKey] ?? ""} onChange={(event) => setFrqResponses((current) => ({ ...current, [responseKey]: event.target.value }))} rows={3} placeholder="Show equations, calculations, units, or particle-level reasoning..." className="mt-2 w-full rounded-lg border border-border bg-bg px-3 py-3 text-sm leading-relaxed outline-none focus:border-accent" />
                          <button type="button" onClick={() => setRevealedRubrics((current) => rubricOpen ? current.filter((key) => key !== responseKey) : [...current, responseKey])} className="mt-3 min-h-10 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:border-accent/50">{rubricOpen ? "Hide scoring guidance" : "Reveal scoring guidance"}</button>
                          {rubricOpen && <div className="mt-3 rounded-lg border border-accent/25 bg-accent-soft/10 p-4"><p className="text-xs font-bold uppercase tracking-wide text-accent">Self-scoring checklist</p><ul className="mt-2 space-y-2">{part.scoringGuidance.map((point) => <li key={point} className="flex gap-2 text-sm leading-relaxed"><span className="text-accent">•</span><span>{point}</span></li>)}</ul></div>}
                        </section>
                      );
                    })}
                  </div>
                </article>
              ))}
            </section>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <a href="https://apcentral.collegeboard.org/courses/ap-chemistry/exam/past-exam-questions" target="_blank" rel="noreferrer" className="rounded-xl border border-accent/40 bg-accent-soft/15 p-5 transition hover:bg-accent-soft/25"><p className="text-xs font-bold uppercase tracking-wide text-accent">Official College Board resource</p><h3 className="mt-2 text-lg font-semibold">Released AP Chemistry FRQs</h3><p className="mt-2 text-sm leading-relaxed text-ink-dim">Question PDFs, scoring guidelines, and sample responses from recent exam years.</p><span className="mt-4 inline-flex text-sm font-bold text-accent">Open FRQ archive ↗</span></a>
            <a href="https://apcentral.collegeboard.org/courses/ap-chemistry/classroom-resources" target="_blank" rel="noreferrer" className="rounded-xl border border-border p-5 transition hover:border-accent/40"><p className="text-xs font-bold uppercase tracking-wide text-ink-dim">Teacher-assigned practice</p><h3 className="mt-2 text-lg font-semibold">AP Classroom question bank</h3><p className="mt-2 text-sm leading-relaxed text-ink-dim">Your teacher may assign secure, unit-specific MCQ and FRQ sets here. Access can require a class join code and sign-in.</p><span className="mt-4 inline-flex text-sm font-bold text-accent">Open AP Classroom info ↗</span></a>
          </div>
          <section className="rounded-xl border border-border p-5 sm:p-6"><h3 className="text-lg font-semibold">What to practice for Unit {unitId}</h3><ul className="mt-4 space-y-3">{practice.frqFocus.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed"><span className="mt-0.5 text-accent">✓</span><span>{item}</span></li>)}</ul></section>
          <section className="rounded-xl border border-border bg-card/30 p-5"><h3 className="font-semibold">Self-score your response</h3><p className="mt-2 text-sm leading-relaxed text-ink-dim">After using the official scoring guideline, mark each statement you actually satisfied. Do not give yourself credit for an idea that is implied but not written.</p><div className="mt-4 space-y-3">{review.frqChecklist.map((item) => <label key={item} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed"><input type="checkbox" checked={readiness.includes(item)} onChange={() => toggle(readiness, item, setReadiness)} className="mt-1 h-4 w-4 accent-emerald-400" /><span>{item}</span></label>)}</div></section>
        </section>
      )}

      <section className="rounded-xl border border-border p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Final readiness check</h2>
        <p className="mt-1 text-sm text-ink-dim">Check a skill only if you can demonstrate it without looking at notes.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{review.readiness.map((item) => <label key={item} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm leading-relaxed transition hover:border-accent/40"><input type="checkbox" checked={readiness.includes("ready:" + item)} onChange={() => toggle(readiness, "ready:" + item, setReadiness)} className="mt-1 h-4 w-4 accent-emerald-400" /><span>{item}</span></label>)}</div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"><p className="text-sm text-ink-dim">{review.readiness.filter((item) => readiness.includes("ready:" + item)).length} of {review.readiness.length} skills demonstrated</p><Link href="/packet-companion" className="inline-flex min-h-10 items-center rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#06251b]">Practice with a packet →</Link></div>
      </section>
    </div>
  );
}
