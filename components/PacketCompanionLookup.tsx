"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { PACKET_QUESTION_INDEX, findPacketQuestion } from "@/lib/packet-companion";
import { MCQ_PAGE_CANDIDATES } from "@/lib/mcq-page-candidates";

const PACKET_PDF_PATHS: Record<string, string> = {
  "topics-1-1-1-3-mcq": "/packets/topics-1-1-1-3-mcq.pdf",
  "topics-1-4-1-6-mcq": "/packets/topics-1-4-1-6-mcq.pdf",
  "topics-1-7-1-8-mcq": "/packets/topics-1-7-1-8-mcq.pdf",
  "topics-2-1-2-4-mcq": "/packets/topics-2-1-2-4-mcq.pdf",
  "topics-2-5-2-7-mcq": "/packets/topics-2-5-2-7-mcq.pdf",
  "topics-3-1-3-2-mcq": "/packets/topics-3-1-3-2-mcq.pdf",
  "topics-3-3-3-6-mcq": "/packets/topics-3-3-3-6-mcq.pdf",
  "topics-3-7-3-13-mcq": "/packets/topics-3-7-3-13-mcq.pdf",
  "topics-4-1-4-4-mcq": "/packets/topics-4-1-4-4-mcq.pdf",
  "topics-4-7-4-9-mcq": "/packets/topics-4-7-4-9-mcq.pdf",
  "topics-5-1-5-3-mcq": "/packets/topics-5-1-5-3-mcq.pdf",
  "topics-5-4-5-11-mcq": "/packets/topics-5-4-5-11-mcq.pdf",
  "topics-6-1-6-5-mcq": "/packets/topics-6-1-6-5-mcq.pdf",
  "topics-6-6-6-9-mcq": "/packets/topics-6-6-6-9-mcq.pdf",
  "topics-7-1-7-5-mcq": "/packets/topics-7-1-7-5-mcq.pdf",
  "topics-7-11-7-12-mcq": "/packets/topics-7-11-7-12-mcq.pdf",
  "topics-7-6-7-10-mcq": "/packets/topics-7-6-7-10-mcq.pdf",
  "topics-8-1-8-3-mcq": "/packets/topics-8-1-8-3-mcq.pdf",
  "topics-8-4-8-5-mcq": "/packets/topics-8-4-8-5-mcq.pdf",
  "topics-8-6-8-11-mcq": "/packets/topics-8-6-8-11-mcq.pdf",
  "topics-9-1-9-7-mcq": "/packets/topics-9-1-9-7-mcq.pdf",
  "topics-9-8-9-11-mcq": "/packets/topics-9-8-9-11-mcq.pdf",
};


export function PacketCompanionLookup() {
  const [unitId, setUnitId] = useState("1");
  const [packetId, setPacketId] = useState("");
  const [questionNumber, setQuestionNumber] = useState("1");
  const [pdfPage, setPdfPage] = useState("1");
  const [pdfPageInput, setPdfPageInput] = useState("1");
  const [hintLevel, setHintLevel] = useState(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showReaderMenu, setShowReaderMenu] = useState(true);
  const [showWorkedAnswer, setShowWorkedAnswer] = useState(false);
  const [questionProgress, setQuestionProgress] = useState<Record<string, "attempted" | "review" | "mastered">>({});
  const progressStorageKey = "apchem-packet-companion-progress-v1";

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(progressStorageKey);
      if (saved) setQuestionProgress(JSON.parse(saved) as Record<string, "attempted" | "review" | "mastered">);
    } catch {
      // Progress is a convenience; the study tool still works if browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(progressStorageKey, JSON.stringify(questionProgress));
    } catch {
      // Do not block studying when browser storage is disabled or full.
    }
  }, [questionProgress]);

  function setQuestionStatus(status: "attempted" | "review" | "mastered" | "unmarked") {
    if (!match) return;
    setQuestionProgress((current) => {
      const next = { ...current };
      if (status === "unmarked") delete next[match.id];
      else next[match.id] = status;
      return next;
    });
  }

  const packets = useMemo(
    () => Array.from(new Map(PACKET_QUESTION_INDEX.filter((entry) => entry.unitId === Number(unitId) && entry.questionType === "mcq").map((entry) => [entry.packetId, entry.packetTitle] as const)).entries()),
    [unitId],
  );

  const packetEntries = useMemo(
    () => PACKET_QUESTION_INDEX.filter((entry) => entry.unitId === Number(unitId) && entry.questionType === "mcq" && entry.packetId === packetId),
    [unitId, packetId],
  );

  const match = packetId && questionNumber.trim()
    ? findPacketQuestion({ unitId: Number(unitId), questionType: "mcq", questionNumber: questionNumber.trim(), packetId })
    : undefined;

  const hints = match
    ? [match.conceptHint, match.strategyHint, match.nextStepHint].filter((hint): hint is string => Boolean(hint?.trim()))
    : [];
  const revealableSteps = hints.length + (match?.solution ? 1 : 0);
  const documentUrl = pdfUrl ?? PACKET_PDF_PATHS[packetId] ?? null;

  useEffect(() => {
    if (!pdfFile) {
      setPdfUrl(null);
      return;
    }
    const nextUrl = URL.createObjectURL(pdfFile);
    setPdfUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [pdfFile]);

  function changeUnit(value: string) {
    setUnitId(value);
    setPacketId("");
    setQuestionNumber("1");
    setPdfPage("1");
    setPdfPageInput("1");
    setHintLevel(0);
    setPdfFile(null);
    setPdfError("");
  }

  function changePacket(value: string) {
    setPacketId(value);
    setQuestionNumber("1");
    setPdfPage("1");
    setPdfPageInput("1");
    setHintLevel(0);
    setShowWorkedAnswer(false);
    setPdfFile(null);
    setPdfError("");
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setPdfError("Choose a PDF packet. Other file types are not supported.");
      setPdfFile(null);
      return;
    }
    setPdfError("");
    setPdfFile(file);
  }

  function selectQuestion(value: string) {
    setQuestionNumber(value);
    setHintLevel(0);
    setShowWorkedAnswer(false);
    // Use extracted page mappings only for the hosted source PDF. A local replacement may paginate differently.
    const candidatePage = !pdfFile ? MCQ_PAGE_CANDIDATES[packetId]?.[value.trim()] : undefined;
    if (candidatePage) {
      setPdfPage(String(candidatePage));
      setPdfPageInput(String(candidatePage));
    }
  }

  function goToPdfPage() {
    const nextPage = String(Math.max(1, Math.floor(Number(pdfPageInput) || 1)));
    setPdfPageInput(nextPage);
    setPdfPage(nextPage);
  }

  function moveQuestion(direction: -1 | 1) {
    const currentIndex = packetEntries.findIndex((entry) => entry.questionNumber === questionNumber);
    const nextIndex = Math.max(0, Math.min(packetEntries.length - 1, (currentIndex < 0 ? 0 : currentIndex) + direction));
    if (packetEntries[nextIndex]) selectQuestion(packetEntries[nextIndex].questionNumber);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card/40 p-5 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Packet reader</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Keep the whole packet beside your help</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-dim">Choose a packet and its PDF loads automatically in the reader. Scroll through the document while you work, then select the printed question to reveal hints and explanations in stages. You can load a different local copy if needed.</p>
          </div>
          <span className="inline-flex w-fit shrink-0 rounded-full border border-border px-3 py-1.5 text-xs text-ink-dim">{PACKET_QUESTION_INDEX.filter((entry) => entry.questionType === "mcq").length} indexed question numbers</span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-semibold" htmlFor="packet-unit">
            AP Chemistry unit
            <select id="packet-unit" value={unitId} onChange={(event) => changeUnit(event.target.value)} className="mt-2 block min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink">
              {Array.from({ length: 9 }, (_, index) => <option key={index + 1} value={String(index + 1)}>Unit {index + 1}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold" htmlFor="packet-source">
            Packet
            <select id="packet-source" value={packetId} onChange={(event) => changePacket(event.target.value)} className="mt-2 block min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink">
              <option value="">Choose packet</option>
              {packets.map(([id, title]) => <option key={id} value={id}>{title}</option>)}
            </select>
          </label>
          <div className="block text-sm font-semibold">
            Load packet PDF
            <label htmlFor="packet-pdf-file" className="mt-2 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-accent/40 bg-accent-soft/15 px-3 py-3 text-center text-sm font-bold text-accent transition hover:bg-accent-soft/25">
              <span aria-hidden="true">＋</span>{pdfFile ? "Choose a different PDF" : "Use a different PDF"}
            </label>
            <input id="packet-pdf-file" type="file" accept="application/pdf,.pdf" onChange={handleFile} className="sr-only" />
          </div>
        </div>
        {pdfError && <p role="alert" className="mt-3 text-sm text-amber">{pdfError}</p>}
        {pdfFile ? <p className="mt-3 text-xs text-ink-dim">Using your local copy: <span className="font-medium text-ink">{pdfFile.name}</span>.</p> : documentUrl && <p className="mt-3 text-xs text-ink-dim">Packet PDF loaded automatically. You can override it with a local copy if needed.</p>}
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_370px]">
        <section className={isFullscreen ? "fixed inset-0 z-[100] overflow-auto border border-border bg-card" : "overflow-hidden rounded-2xl border border-border bg-card/40"}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 sm:px-5">
            <div><h2 className="font-semibold">Packet document</h2><p className="mt-1 text-xs text-ink-dim">Scroll the original PDF as you work through the printed questions.</p></div>
            {documentUrl && <div className="flex flex-wrap gap-2"><a href={documentUrl} download={pdfFile?.name ?? "packet.pdf"} className="text-xs font-semibold text-accent hover:underline">Download a copy</a><button type="button" onClick={() => setIsFullscreen((value) => !value)} aria-pressed={isFullscreen} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold">{isFullscreen ? "Exit full screen" : "Expand reader"}</button>{match && <button type="button" onClick={() => setShowWorkedAnswer((value) => !value)} aria-pressed={showWorkedAnswer} className="rounded-lg bg-accent px-3 py-2 text-xs font-bold text-[#06251b]">{showWorkedAnswer ? "Hide question help" : match.solution ? "Show worked answer" : "Show question help"}</button>}</div>}
          </div>
          {documentUrl ? (
            <>
              <div className={isFullscreen ? "group relative h-[calc(100vh-64px)]" : "relative"}>
                <iframe
                  key={documentUrl + "#page=" + Math.max(1, Number(pdfPage) || 1)}
                  title="Loaded chemistry packet PDF"
                  src={documentUrl + "#toolbar=1&navpanes=0&scrollbar=1&page=" + Math.max(1, Number(pdfPage) || 1)}
                  className={isFullscreen ? "block h-full min-h-0 w-full bg-white" : "block h-[72vh] min-h-[560px] w-full bg-white"}
                />
                {isFullscreen && (
                  <aside
                    className={"absolute left-0 top-0 z-20 h-full w-72 max-w-[85vw] overflow-y-auto border-r border-border bg-card/95 p-4 shadow-2xl backdrop-blur transition-opacity " + (showReaderMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100")}
                    onMouseEnter={() => setShowReaderMenu(true)}
                  >
                    <button type="button" onClick={() => setShowReaderMenu((value) => !value)} className="mb-4 rounded-lg border border-border px-3 py-2 text-xs font-semibold">
                      {showReaderMenu ? "Hide menu" : "Show menu"}
                    </button>
                    <p className="text-xs font-bold uppercase tracking-wide text-accent">Packet navigation</p>
                    <label className="mt-3 block text-sm font-semibold">Unit
                      <select value={unitId} onChange={(event) => changeUnit(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2">
                        {Array.from(new Set(PACKET_QUESTION_INDEX.filter((entry) => entry.questionType === "mcq").map((entry) => entry.unitId))).sort((a, b) => a - b).map((unit) => <option key={unit} value={String(unit)}>Unit {unit}</option>)}
                      </select>
                    </label>
                    <label className="mt-3 block text-sm font-semibold">Packet
                      <select value={packetId} onChange={(event) => changePacket(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2">
                        <option value="">Choose packet</option>
                        {packets.map(([id, title]) => <option key={id} value={id}>{title}</option>)}
                      </select>
                    </label>
                    <label className="mt-3 block text-sm font-semibold">PDF page
                      <input value={pdfPageInput} onChange={(event) => setPdfPageInput(event.target.value)} inputMode="numeric" type="number" min="1" placeholder="e.g. 4" className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2" />
                    </label>
                    <button type="button" onClick={goToPdfPage} className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm font-semibold">Go to PDF page</button>
                    <label className="mt-3 block text-sm font-semibold">Search question number
                      <input value={questionNumber} onChange={(event) => selectQuestion(event.target.value)} inputMode="numeric" placeholder="e.g. 16" className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2" />
                    </label>
                    <label className="mt-3 block text-sm font-semibold">Or choose a question
                      <select value={questionNumber} onChange={(event) => selectQuestion(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2">
                        <option value="">Choose question</option>
                        {packetEntries.map((entry) => <option key={entry.id} value={entry.questionNumber}>Question {entry.questionNumber}</option>)}
                      </select>
                    </label>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => moveQuestion(-1)} disabled={packetEntries[0]?.questionNumber === questionNumber} className="rounded-lg border border-border px-2 py-2 text-sm disabled:opacity-35">← Previous</button>
                      <button type="button" onClick={() => moveQuestion(1)} disabled={packetEntries[packetEntries.length - 1]?.questionNumber === questionNumber} className="rounded-lg border border-border px-2 py-2 text-sm disabled:opacity-35">Next →</button>
                    </div>
                    {match && (
                      <div className="mt-4 rounded-xl border border-red-200 bg-white p-3 font-serif italic text-sm leading-6 text-red-700">
                        <p className="font-bold">Q{questionNumber} · {match.solution ? "Worked answer" : "Question help"}</p>
                        {match.solution ? <p className="mt-2">{match.solution}</p> : <><p className="mt-2 not-italic text-xs text-red-500">A verified final answer is not indexed for this question yet.</p>{hints.map((hint, index) => <p key={index} className="mt-2"><span className="font-bold">Hint {index + 1}:</span> {hint}</p>)}</>}
                      </div>
                    )}
                  </aside>
                )}
              </div>
              {showWorkedAnswer && match && (
                <div role="region" aria-label="Worked answer or question help" className="absolute right-4 top-4 z-30 max-h-[48%] w-[min(34rem,92%)] overflow-y-auto rounded-xl border-2 border-red-300 bg-white/95 px-5 py-4 text-red-700 shadow-2xl backdrop-blur-sm sm:px-8">
                  <div className="mx-auto max-w-4xl font-serif italic">
                    <p className="text-sm font-bold not-italic text-red-800">{match.solution ? "Worked answer" : "Question help"} · Question {questionNumber}</p>
                    {match.solution ? <p className="mt-3 whitespace-pre-wrap text-base leading-7">{match.solution}</p> : <><p className="mt-3 text-sm not-italic">A verified final answer is not indexed for this question yet. Use these staged hints while the answer is being verified.</p>{hints.map((hint, index) => <p key={index} className="mt-3 whitespace-pre-wrap text-base leading-7"><strong>Hint {index + 1}.</strong> {hint}</p>)}</>}
                    <p className="mt-3 text-xs not-italic text-red-500">Original study guidance, not an official College Board scoring guide.</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[560px]">
              <div aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-bg text-3xl">▤</div>
              <h3 className="mt-5 text-lg font-semibold">Your packet opens here</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-dim">Choose a packet above and its PDF will open here automatically. The built-in viewer lets you scroll through the whole document without leaving this study page.</p>
              <label htmlFor="packet-pdf-file" className="mt-5 inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-[#06251b]">Load a packet PDF</label>
              <p className="mt-4 max-w-md text-xs leading-relaxed text-ink-dim">Packet PDFs are hosted with the study site. If you are using a paper packet or a different version, you can load your own PDF instead.</p>
            </div>
          )}
          {documentUrl && !isFullscreen && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
              <p className="text-xs leading-5 text-ink-dim">Enter a printed PDF page number. Question-to-page links are not assumed unless verified for that packet.</p>
              <label className="flex items-center gap-2 text-sm font-semibold">Go to page
                <input type="number" min="1" value={pdfPageInput} onChange={(event) => setPdfPageInput(event.target.value)} aria-label="PDF page number" className="w-20 rounded-lg border border-border bg-card px-3 py-2 text-ink" /><button type="button" onClick={goToPdfPage} className="rounded-lg border border-border px-3 py-2 text-sm">Go</button>
              </label>
            </div>
          )}
        </section>

        <aside className="space-y-4 xl:sticky xl:top-4">
          <section className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-bold uppercase tracking-wide text-accent">Question navigator</p><h2 className="mt-1 text-lg font-semibold">{packets.find(([id]) => id === packetId)?.[1] ?? "Choose a packet"}</h2></div>
              {packetEntries.length > 0 && <span className="rounded-full border border-border px-2 py-1 text-xs text-ink-dim">{packetEntries.length} questions</span>}
            </div>
            {packetEntries.length > 0 ? (
              <>
                <label htmlFor="packet-question-select" className="mt-4 block text-sm font-semibold">Jump to printed question</label>
                <select id="packet-question-select" value={questionNumber} onChange={(event) => selectQuestion(event.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink">
                  {packetEntries.map((entry) => <option key={entry.id} value={entry.questionNumber}>Question {entry.questionNumber}{entry.topicNumber ? " · Topic " + entry.topicNumber : ""}</option>)}
                </select>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => moveQuestion(-1)} disabled={packetEntries[0]?.questionNumber === questionNumber} className="min-h-10 rounded-lg border border-border px-3 py-2 text-sm font-semibold disabled:opacity-35">← Previous</button>
                  <button type="button" onClick={() => moveQuestion(1)} disabled={packetEntries[packetEntries.length - 1]?.questionNumber === questionNumber} className="min-h-10 rounded-lg border border-border px-3 py-2 text-sm font-semibold disabled:opacity-35">Next →</button>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Jump to question">
                  {packetEntries.map((entry) => <button key={entry.id} type="button" aria-label={"Go to question " + entry.questionNumber + (questionProgress[entry.id] ? ", status " + questionProgress[entry.id] : "")} aria-current={entry.questionNumber === questionNumber ? "true" : undefined} onClick={() => selectQuestion(entry.questionNumber)} title={questionProgress[entry.id] ? questionProgress[entry.id] : "Not marked"} className={"relative flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-xs font-semibold transition " + (entry.questionNumber === questionNumber ? "border-accent bg-accent-soft/30 text-accent" : "border-border text-ink-dim hover:border-accent/40 hover:text-ink")}>{entry.questionNumber}{questionProgress[entry.id] && <span aria-hidden="true" className={"absolute -right-1 -top-1 h-2 w-2 rounded-full " + (questionProgress[entry.id] === "mastered" ? "bg-accent" : questionProgress[entry.id] === "review" ? "bg-amber" : "bg-ink-dim")} />}</button>)}
                </div>
              </>
            ) : <p className="mt-3 text-sm leading-relaxed text-ink-dim">Choose a unit and packet to load its question list. The reader does not assume question numbers from a different packet.</p>}
          </section>

          <section className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5" aria-live="polite" aria-atomic="true">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wide text-accent">Hints & explanation</p>
              {match && <span className="rounded-full border border-border px-2 py-1 text-[11px] text-ink-dim">{match.topicNumber ? "Topic mapped" : "Topic under review"}</span>}
            </div>
            {match ? (
              <>
                <h3 className="mt-2 text-base font-semibold">Question {match.questionNumber}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-dim">{match.packetTitle} · Topics {match.topicRange.replace("-", "–")}</p>
                <div className="mt-3 rounded-lg border border-border bg-bg/50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold">Your study progress</p>
                    <span className="text-[11px] text-ink-dim">{Object.values(questionProgress).filter((status) => status === "mastered").length} mastered · {Object.values(questionProgress).filter((status) => status === "review").length} to review</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
                    <button type="button" onClick={() => setQuestionStatus("attempted")} aria-pressed={questionProgress[match.id] === "attempted"} className={"min-h-9 rounded-md border px-2 py-2 text-xs font-semibold " + (questionProgress[match.id] === "attempted" ? "border-accent bg-accent-soft/20 text-accent" : "border-border")}>Attempted</button>
                    <button type="button" onClick={() => setQuestionStatus("review")} aria-pressed={questionProgress[match.id] === "review"} className={"min-h-9 rounded-md border px-2 py-2 text-xs font-semibold " + (questionProgress[match.id] === "review" ? "border-amber bg-amber/10 text-ink" : "border-border")}>Review again</button>
                    <button type="button" onClick={() => setQuestionStatus("mastered")} aria-pressed={questionProgress[match.id] === "mastered"} className={"min-h-9 rounded-md border px-2 py-2 text-xs font-semibold " + (questionProgress[match.id] === "mastered" ? "border-accent bg-accent-soft/20 text-accent" : "border-border")}>Mastered</button>
                    <button type="button" onClick={() => setQuestionStatus("unmarked")} className="min-h-9 rounded-md border border-border px-2 py-2 text-xs font-semibold text-ink-dim">Clear status</button>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-ink-dim">Saved in this browser on this device. Mark a question mastered only after you can explain the reasoning without help.</p>
                </div>
                {hintLevel === 0 && <p className="mt-3 text-sm leading-relaxed text-ink-dim">{hints.length ? "Try the question in the PDF first. Reveal one hint at a time, then open the worked explanation if one is available." : "This question number is indexed, but question-specific help is not available yet. Use the linked lesson or official practice resources rather than relying on a guessed answer."}</p>}
                {hints.slice(0, hintLevel).map((hint, index) => <div key={index} className="mt-3 rounded-lg border border-border bg-bg/60 p-3"><p className="text-[11px] font-bold uppercase tracking-wide text-accent">{index === 0 ? "Hint 1 · Concept" : index === 1 ? "Hint 2 · Strategy" : "Hint 3 · Next step"}</p><p className="mt-1 text-sm leading-relaxed">{hint}</p></div>)}
                {match.solution && hintLevel > hints.length && <div className="mt-3 rounded-lg border border-accent/30 bg-accent-soft/15 p-3"><p className="text-xs font-bold uppercase tracking-wide text-accent">Worked explanation</p><p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{match.solution}</p>{match.commonMistakes?.length ? <ul className="mt-3 list-disc space-y-1 pl-4 text-xs leading-relaxed">{match.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul> : null}</div>}
                {revealableSteps > 0 && hintLevel < revealableSteps && <button type="button" onClick={() => setHintLevel((level) => Math.min(level + 1, revealableSteps))} className="mt-4 min-h-11 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-[#06251b] transition hover:opacity-90">{hintLevel < hints.length ? (hintLevel === 0 ? "Reveal first hint" : "Reveal next hint") : "Reveal worked explanation"}</button>}
                {hintLevel > 0 && <button type="button" onClick={() => setHintLevel(0)} className="mt-3 w-full text-xs font-semibold text-ink-dim hover:text-accent">Hide help and try again</button>}
                {match.topicSlugs.length > 0 && <div className="mt-4 border-t border-border pt-4"><p className="text-[11px] font-bold uppercase tracking-wide text-ink-dim">Related lessons</p><div className="mt-2 flex flex-wrap gap-2">{match.topicSlugs.slice(0, 4).map((slug) => <Link key={slug} href={"/units/" + match.unitId + "/" + slug} className="rounded-md border border-border px-2.5 py-2 text-xs font-semibold text-accent hover:bg-bg">Lesson {slug.split("-").slice(0, 2).join(".")}</Link>)}</div></div>}
                {revealableSteps === 0 && <p className="mt-3 text-xs leading-relaxed text-ink-dim">The packet and printed question number are indexed, but the exact question match and answer have not been independently verified.</p>}
              </>
            ) : <p className="mt-3 text-sm leading-relaxed text-ink-dim">Select a packet and question to see available help. Hints are not fabricated when a verified question-specific explanation is missing.</p>}
          </section>

          <section className="rounded-xl border border-border p-4">
            <h3 className="text-sm font-semibold">Need released AP practice?</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-dim">Use official free-response questions and scoring guidelines, then compare your response against the rubric.</p>
            <a href="https://apcentral.collegeboard.org/courses/ap-chemistry/exam/past-exam-questions" target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline">Open AP Central FRQs ↗</a>
          </section>
        </aside>
      </div>
    </div>
  );
}
