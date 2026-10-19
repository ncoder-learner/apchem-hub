"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { FRQ_PART_PAGE_CANDIDATES } from "@/lib/frq-part-page-candidates";

type FrqPacket = {
  unit: number;
  title: string;
  topics: string;
  file: string;
};

const FRQ_PACKETS: FrqPacket[] = [
  { unit: 1, title: "Topics 1.1–1.3", topics: "Moles, mass spectra, elemental composition", file: "topic-1-1-1-3.pdf" },
  { unit: 1, title: "Topics 1.4–1.6", topics: "Mixtures, electron configuration, photoelectron spectroscopy", file: "topic-1-4-1-6.pdf" },
  { unit: 1, title: "Topics 1.7–1.8", topics: "Periodic trends and valence electrons", file: "topic-1-7-1-8.pdf" },
  { unit: 2, title: "Topics 2.1–2.4", topics: "Chemical bonding, ionic solids, metals and alloys", file: "topic-2-1-2-4.pdf" },
  { unit: 2, title: "Topics 2.5–2.6", topics: "Lewis diagrams, resonance and formal charge", file: "topic-2-5-2-6.pdf" },
  { unit: 2, title: "Topic 2.7", topics: "VSEPR and hybridization", file: "topic-2-7.pdf" },
  { unit: 3, title: "Topic 3.1", topics: "Intermolecular forces", file: "topic-3-1.pdf" },
  { unit: 3, title: "Topics 3.2–3.4", topics: "Solids, liquids, gases and the ideal gas law", file: "topic-3-2-3-4.pdf" },
  { unit: 3, title: "Topics 3.5–3.8", topics: "Kinetic molecular theory, solutions and mixtures", file: "topic-3-5-3-8.pdf" },
  { unit: 3, title: "Topics 3.9–3.13", topics: "Separations, solubility, spectroscopy and Beer–Lambert law", file: "topic-3-9-3-13.pdf" },
  { unit: 4, title: "Topics 4.1–4.4", topics: "Reactions, net ionic equations and representations", file: "topic-4-1-4-4.pdf" },
  { unit: 4, title: "Topics 4.5–4.6", topics: "Stoichiometry and titration", file: "topic-4-5-4-6.pdf" },
  { unit: 4, title: "Topics 4.7–4.9", topics: "Reaction types, acid–base and redox", file: "topic-4-7-4-9.pdf" },
  { unit: 5, title: "Topics 5.1–5.3", topics: "Rates, rate laws and concentration over time", file: "topic-5-1-5-3.pdf" },
  { unit: 5, title: "Topics 5.4–5.11", topics: "Elementary steps, mechanisms, energy profiles and catalysis", file: "topic-5-4-5-11.pdf" },
  { unit: 6, title: "Topics 6.1–6.5", topics: "Thermochemistry, calorimetry and phase changes", file: "topic-6-1-6-5.pdf" },
  { unit: 6, title: "Topics 6.6–6.9", topics: "Enthalpy, bond energies, formation and Hess's law", file: "topic-6-6-6-9.pdf" },
  { unit: 7, title: "Topics 7.1–7.5", topics: "Equilibrium and reaction quotient foundations", file: "topic-7-1-7-5.pdf" },
  { unit: 7, title: "Topics 7.6–7.10", topics: "Equilibrium calculations and shifts", file: "topic-7-6-7-10.pdf" },
  { unit: 7, title: "Topics 7.11–7.12", topics: "Equilibrium applications", file: "topic-7-11-7-12.pdf" },
  { unit: 8, title: "Topics 8.1–8.3", topics: "Acids, bases and pH", file: "topic-8-1-8-3.pdf" },
  { unit: 8, title: "Topics 8.4–8.5", topics: "Acid–base reactions and titration", file: "topic-8-4-8-5.pdf" },
  { unit: 8, title: "Topics 8.6–8.11", topics: "Buffers, titration curves and acid–base structure", file: "topic-8-6-8-11.pdf" },
  { unit: 9, title: "Topics 9.1–9.7", topics: "Entropy, Gibbs free energy and thermodynamic favorability", file: "topic-9-1-9-7.pdf" },
  { unit: 9, title: "Topics 9.8–9.11", topics: "Electrochemistry and thermodynamics", file: "topic-9-8-9-11.pdf" },
];

// Candidate question-start pages extracted from PDF text for all 25 packets.
// These are navigation aids, not answer-key mappings; verify the PDF page visually.
const FRQ_PAGE_CANDIDATES: Record<string, Record<string, number>> = {
  "topic-1-1-1-3.pdf": {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 2,
    6: 2,
    7: 2,
    8: 3,
    9: 3,
    10: 4,
    11: 4,
    12: 5,
    13: 5,
    14: 5,
    15: 5,
    16: 6,
    17: 6,
    18: 6,
    19: 7,
    20: 8,
    21: 8,
    22: 8
  },
  "topic-1-4-1-6.pdf": {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 3,
    8: 4,
    9: 5,
    10: 5,
    11: 6,
    12: 6,
    13: 7,
    14: 7,
    15: 7,
    16: 8
  },
  "topic-1-7-1-8.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 3,
    7: 3,
    8: 4,
    9: 4,
    10: 6,
    11: 6,
    12: 7,
    13: 7,
    14: 8,
    15: 9,
    16: 9
  },
  "topic-2-1-2-4.pdf": {
    1: 2,
    2: 2,
    3: 3,
    4: 3,
    5: 5,
    6: 8,
    7: 8,
    8: 9,
    9: 9,
    10: 10,
    11: 10,
    12: 11,
    13: 11,
    14: 11,
    15: 11,
    16: 12,
    17: 13
  },
  "topic-2-5-2-6.pdf": {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
    6: 6,
    7: 7,
    8: 7,
    9: 7,
    10: 8,
    11: 8,
    12: 9
  },
  "topic-2-7.pdf": {
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 3,
    7: 4,
    8: 5,
    9: 7,
    10: 8,
    11: 8,
    12: 9
  },
  "topic-3-1.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 4,
    5: 4,
    6: 5,
    7: 5,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 7,
    13: 8,
    14: 9,
    15: 9,
    16: 10,
    17: 10,
    18: 10,
    19: 10,
    20: 11,
    21: 11,
    22: 12,
    23: 13
  },
  "topic-3-2-3-4.pdf": {
    1: 2,
    2: 3,
    3: 3,
    4: 4,
    5: 6,
    6: 6,
    7: 7,
    8: 7,
    9: 10,
    10: 11,
    11: 12,
    12: 12,
    13: 13,
    14: 14
  },
  "topic-3-5-3-8.pdf": {
    1: 2,
    2: 2,
    3: 3,
    4: 3,
    5: 3,
    6: 4,
    7: 5,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 8,
    13: 8,
    14: 9,
    15: 9,
    16: 9,
    17: 10,
    18: 10
  },
  "topic-3-9-3-13.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 6,
    9: 8,
    10: 9,
    11: 10,
    12: 10,
    13: 14,
    14: 15,
    15: 16
  },
  "topic-4-1-4-4.pdf": {
    1: 2,
    2: 2,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 5,
    8: 6,
    9: 6,
    10: 7,
    11: 7,
    12: 9,
    13: 9,
    14: 9,
    15: 10,
    16: 10,
    17: 11,
    18: 11,
    19: 12,
    20: 12,
    21: 13,
    22: 13
  },
  "topic-4-5-4-6.pdf": {
    1: 1,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 4,
    7: 5,
    8: 6,
    9: 6,
    10: 7,
    11: 8,
    12: 9,
    13: 11,
    14: 12
  },
  "topic-4-7-4-9.pdf": {
    1: 1,
    2: 3,
    3: 4,
    4: 4,
    5: 5,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    10: 10,
    11: 11,
    12: 12,
    13: 12
  },
  "topic-5-1-5-3.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 3,
    6: 4,
    7: 5,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 9,
    13: 11,
    14: 13,
    15: 14,
    16: 14,
    17: 15,
    18: 16,
    19: 17,
    20: 18
  },
  "topic-5-4-5-11.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    10: 9,
    11: 10,
    12: 10,
    13: 11,
    14: 11,
    15: 13,
    16: 15,
    17: 17
  },
  "topic-6-1-6-5.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 4,
    5: 5,
    6: 6,
    7: 8,
    8: 8,
    9: 9,
    10: 9,
    11: 10,
    12: 10
  },
  "topic-6-6-6-9.pdf": {
    1: 2,
    2: 3,
    3: 6,
    4: 7,
    5: 7,
    6: 8,
    7: 8,
    8: 9,
    9: 9,
    10: 9,
    11: 10,
    12: 11,
    13: 12,
    14: 13
  },
  "topic-7-1-7-5.pdf": {
    1: 2,
    2: 4,
    3: 4,
    4: 6,
    5: 7,
    6: 8,
    7: 10,
    8: 11,
    9: 12,
    10: 12,
    11: 13,
    12: 13,
    13: 13
  },
  "topic-7-11-7-12.pdf": {
    1: 2,
    2: 2,
    3: 4,
    4: 4,
    5: 5,
    6: 5,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11
  },
  "topic-7-6-7-10.pdf": {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 5,
    8: 7,
    9: 8,
    10: 10,
    11: 11,
    12: 12,
    13: 13,
    14: 14,
    15: 14,
    16: 15
  },
  "topic-8-1-8-3.pdf": {
    1: 1,
    2: 2,
    3: 3,
    4: 3,
    5: 4,
    6: 4,
    7: 4,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 8,
    13: 9,
    14: 10,
    15: 11,
    16: 12,
    17: 13,
    18: 14,
    19: 15,
    20: 16
  },
  "topic-8-4-8-5.pdf": {
    1: 2,
    2: 2,
    3: 2,
    4: 3,
    5: 7,
    6: 11,
    7: 12,
    8: 14,
    9: 15,
    10: 16,
    11: 17,
    12: 18,
    13: 19
  },
  "topic-8-6-8-11.pdf": {
    1: 1,
    2: 2,
    3: 3,
    4: 3,
    5: 4,
    6: 5,
    7: 7,
    8: 7,
    9: 11,
    10: 13,
    11: 13,
    12: 14,
    13: 15,
    14: 16,
    15: 17,
    16: 17,
    17: 18,
    18: 19,
    19: 20
  },
  "topic-9-1-9-7.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 3,
    6: 5,
    7: 5,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 8,
    13: 9,
    14: 10,
    15: 11,
    16: 12,
    17: 12,
    18: 13,
    19: 14,
    20: 15,
    21: 16,
    22: 17,
    23: 17
  },
  "topic-9-8-9-11.pdf": {
    1: 1,
    2: 4,
    3: 5,
    4: 6,
    5: 7,
    6: 9,
    7: 10,
    8: 12,
    9: 14,
    10: 17,
    11: 18,
    12: 19,
    13: 20
  }
};

const RESPONSE_FRAMES = [
  { title: "Explain", prompt: "Make a claim, then connect it to a specific chemical principle or particle-level model. State why the evidence supports the claim." },
  { title: "Calculate", prompt: "Write the governing equation, substitute values with units, show the calculation, and report a correctly rounded answer with units." },
  { title: "Justify / predict", prompt: "State the prediction first. Then justify it using a relevant relationship, equilibrium principle, collision model, or particle-level explanation." },
  { title: "Draw / represent", prompt: "Label species, axes, charges, units, and relevant features. Make the representation consistent with the chemistry and the conditions in the prompt." },
];

export function FrqWorkspace() {
  const [unit, setUnit] = useState("1");
  const [selectedFile, setSelectedFile] = useState("");
  const [page, setPage] = useState("1");
  const [questionNumber, setQuestionNumber] = useState("1");
  const [partLabel, setPartLabel] = useState("");
  const [responseType, setResponseType] = useState("explain");
  const [helpLevel, setHelpLevel] = useState(0);
  const [workNotes, setWorkNotes] = useState("");
  const [navigationMessage, setNavigationMessage] = useState("");
  const [showFramework, setShowFramework] = useState(true);
  const [localPdfUrl, setLocalPdfUrl] = useState<string | null>(null);
  const [localPdfName, setLocalPdfName] = useState("");

  const packets = useMemo(() => FRQ_PACKETS.filter((packet) => packet.unit === Number(unit)), [unit]);
  const selected = FRQ_PACKETS.find((packet) => packet.file === selectedFile) ?? packets[0];
  const pdfUrl = localPdfUrl ?? (selected ? `/frq/${selected.file}#page=${Math.max(1, Number(page) || 1)}&toolbar=1&navpanes=0` : "");

  function chooseUnit(value: string) {
    setUnit(value);
    setSelectedFile("");
    setPage("1");
    setQuestionNumber("1");
    setPartLabel("");
    setHelpLevel(0);
    setWorkNotes("");
    setNavigationMessage("");
    setLocalPdfUrl(null);
    setLocalPdfName("");
  }

  function chooseLocalPdf(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return;
    if (localPdfUrl) URL.revokeObjectURL(localPdfUrl);
    setLocalPdfUrl(URL.createObjectURL(file));
    setLocalPdfName(file.name);
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Free-response practice</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">FRQ Packet Workspace</h2>
            <p className="mt-2 text-sm leading-6 text-ink-dim">Open a topic packet, work through it in the PDF reader, and use the response framework to check what a strong chemistry explanation should contain.</p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-xl">
            <label className="text-sm font-semibold" htmlFor="frq-unit">AP Chemistry unit
              <select id="frq-unit" value={unit} onChange={(e) => chooseUnit(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink">
                {Array.from({ length: 9 }, (_, i) => <option key={i + 1} value={String(i + 1)}>Unit {i + 1}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold" htmlFor="frq-packet">Topic packet
              <select id="frq-packet" value={selected?.file ?? ""} onChange={(e) => { setSelectedFile(e.target.value); setPage("1"); setQuestionNumber("1"); setPartLabel(""); setHelpLevel(0); setWorkNotes(""); setNavigationMessage(""); setLocalPdfUrl(null); setLocalPdfName(""); }} className="mt-2 min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink">
                {packets.map((packet) => <option key={packet.file} value={packet.file}>{packet.title}</option>)}
              </select>
            </label>
          </div>
        </div>
        {selected && <p className="mt-4 rounded-xl border border-border bg-bg/60 p-3 text-sm leading-6 text-ink-dim"><span className="font-semibold text-ink">Topics covered:</span> {selected.topics}</p>}
        <div className="mt-4 grid gap-3 rounded-xl border border-border bg-bg/50 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="text-sm font-semibold" htmlFor="frq-question-number">Printed question number
            <input id="frq-question-number" inputMode="numeric" value={questionNumber} onChange={(e) => { setQuestionNumber(e.target.value); setHelpLevel(0); }} placeholder="e.g. 4" className="mt-2 min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2 text-ink" />
          </label>
          <label className="text-sm font-semibold" htmlFor="frq-question-part">Lettered part (optional)
            <input id="frq-question-part" value={partLabel} onChange={(e) => { setPartLabel(e.target.value); setHelpLevel(0); }} placeholder="e.g. b(ii)" className="mt-2 min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2 text-ink" />
          </label>
          <button type="button" onClick={() => { const pages = selected ? FRQ_PAGE_CANDIDATES[selected.file] : undefined; const question = questionNumber.trim(); const part = partLabel.trim().toLowerCase().match(/[a-h]/)?.[0] ?? ""; const partPage = selected ? FRQ_PART_PAGE_CANDIDATES[selected.file]?.[question]?.[part] : undefined; const targetPage = partPage ?? pages?.[question]; if (targetPage) { setPage(String(targetPage)); setNavigationMessage(part && !partPage ? `Jumped to Q${question}'s candidate page ${targetPage}; no separate page candidate was found for part ${partLabel.trim()}. Confirm the printed part in the PDF.` : `Jumped to candidate page ${targetPage}. Confirm the printed question/part in the PDF.`); } else { setNavigationMessage("No question-start candidate was detected for this entry. Use the PDF page control to find it manually."); } setHelpLevel(0); }} className="min-h-11 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#06251b]">Find question page</button>
          <p className="text-xs leading-5 text-ink-dim sm:col-span-3">Question-start candidates are extracted for all 25 packets. Because PDF text extraction can miss headings or capture continuation pages, confirm the printed question in the PDF before relying on a jump.</p>
          {navigationMessage && <p role="status" className="text-sm leading-5 text-ink-dim sm:col-span-3">{navigationMessage}</p>}
        </div>
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
        <section className="overflow-hidden rounded-2xl border border-border bg-card/40">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 sm:px-5">
            <div><h3 className="font-semibold">Packet PDF</h3><p className="mt-1 text-xs text-ink-dim">{localPdfName ? `Using local copy: ${localPdfName}` : "Hosted packet · use the PDF toolbar to zoom, print, or download"}</p></div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="cursor-pointer rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-accent/50" htmlFor="frq-local-pdf">Open local PDF</label>
              <input id="frq-local-pdf" type="file" accept="application/pdf,.pdf" onChange={chooseLocalPdf} className="sr-only" />
              <a href={localPdfUrl ?? (selected ? `/frq/${selected.file}` : "#")} target="_blank" rel="noreferrer" className="rounded-lg bg-accent px-3 py-2 text-xs font-bold text-[#06251b]">Open in new tab</a>
            </div>
          </div>
          {pdfUrl ? <iframe key={pdfUrl.split("#")[0] + (localPdfUrl ?? "")} title="AP Chemistry FRQ packet PDF" src={pdfUrl} className="block h-[76vh] min-h-[620px] w-full bg-white" /> : <div className="flex min-h-[500px] items-center justify-center p-8 text-center text-sm text-ink-dim">Select a packet to open the PDF.</div>}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
            <p className="text-xs leading-5 text-ink-dim">Page jump works with browsers that support the PDF viewer fragment. It may not work in every embedded PDF viewer.</p>
            <label className="flex items-center gap-2 text-sm font-semibold">Go to page
              <input type="number" min="1" value={page} onChange={(e) => setPage(e.target.value)} className="w-20 rounded-lg border border-border bg-card px-3 py-2 text-ink" />
            </label>
            <button type="button" onClick={() => { const url = localPdfUrl ?? (selected ? `/frq/${selected.file}` : ""); if (url) window.open(url + `#page=${Math.max(1, Number(page) || 1)}&toolbar=1`, "_blank", "noopener,noreferrer"); }} className="rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:border-accent/50">Jump in new tab</button>
          </div>
        </section>

        <aside className="space-y-4 xl:sticky xl:top-4">
          <section className="rounded-2xl border border-border bg-card/60 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-accent">Question help</p>
            <h3 className="mt-1 text-xl font-bold">Q{questionNumber.trim() || "—"}{partLabel.trim() ? ` · ${partLabel.trim()}` : ""}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-dim">Work through the prompt first. These are staged problem-solving cues, not a question-specific answer key.</p>
            <label className="mt-4 block text-sm font-semibold" htmlFor="frq-response-type">What is the task asking you to do?
              <select id="frq-response-type" value={responseType} onChange={(e) => { setResponseType(e.target.value); setHelpLevel(0); }} className="mt-2 min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2 text-ink">
                <option value="explain">Explain / justify</option>
                <option value="calculate">Calculate</option>
                <option value="predict">Predict / compare</option>
                <option value="draw">Draw / represent</option>
                <option value="graph">Analyze a graph or data</option>
              </select>
            </label>
            <label className="mt-4 block text-sm font-semibold" htmlFor="frq-work-notes">Prompt details or your attempt (optional)
              <textarea id="frq-work-notes" value={workNotes} onChange={(e) => setWorkNotes(e.target.value)} rows={3} placeholder="Paste the relevant part of the prompt or note what you tried…" className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-normal leading-6 text-ink" />
            </label>
            {helpLevel >= 1 && <div className="mt-4 rounded-xl border border-border bg-bg/60 p-4"><p className="text-xs font-bold uppercase tracking-wide text-accent">Hint 1 · Identify</p><p className="mt-2 text-sm leading-6 text-ink-dim">{({
              explain: "Underline the claim the prompt asks you to support. Identify the chemical principle and the specific evidence from the prompt that connects to it.",
              calculate: "List the target quantity, the given values, and their units. Choose an equation that relates the target to the given information before substituting.",
              predict: "State what changes and what stays constant. Identify the relationship or chemical principle that determines the direction of the change.",
              draw: "List every required species, particle, charge, label, axis, and unit. Decide which features must be shown for the representation to communicate the chemistry.",
              graph: "Read the axes and units first. Identify the trend, compare relevant values, and distinguish what the data show from what you infer."
            } as Record<string,string>)[responseType]}</p></div>}
            {helpLevel >= 2 && <div className="mt-3 rounded-xl border border-border bg-bg/60 p-4"><p className="text-xs font-bold uppercase tracking-wide text-accent">Hint 2 · Build the reasoning</p><p className="mt-2 text-sm leading-6 text-ink-dim">{({
              explain: "Use a claim → evidence → chemistry link structure. Name the particles, interactions, or governing principle; avoid repeating the evidence without explaining why it matters.",
              calculate: "Write the equation symbolically, substitute values with units, show the algebra, and check the result's units and significant figures.",
              predict: "Make the prediction explicit, then justify it using a cause-and-effect relationship. If comparing trials, identify which variable changed and which were controlled.",
              draw: "Construct the representation from the required constraints, then audit atom counts, charge, geometry, labels, and consistency with the prompt.",
              graph: "Use a specific comparison or trend as evidence, then explain it with the relevant chemical model. Include calculations when the prompt asks for a rate, slope, or quantitative comparison."
            } as Record<string,string>)[responseType]}</p></div>}
            {helpLevel >= 3 && <div className="mt-3 rounded-xl border border-accent/30 bg-accent-soft/10 p-4"><p className="text-xs font-bold uppercase tracking-wide text-accent">Final self-check</p><p className="mt-2 text-sm leading-6 text-ink-dim">{({
              explain: "Can a reader point to your claim, the evidence, and the sentence that explains the chemistry connecting them?",
              calculate: "Are the equation, substitutions, units, sign, significant figures, and final answer all visible?",
              predict: "Did you answer the direction or comparison directly and justify it with the correct principle rather than intuition alone?",
              draw: "Would another student be able to interpret your drawing without guessing what the symbols, axes, or labels mean?",
              graph: "Did you cite actual data or a visible trend and connect it to chemistry without claiming more than the data support?"
            } as Record<string,string>)[responseType]}</p></div>}
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => setHelpLevel((level) => Math.min(3, level + 1))} disabled={helpLevel >= 3} className="rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-[#06251b] disabled:cursor-not-allowed disabled:opacity-50">{helpLevel === 0 ? "Reveal first hint" : helpLevel === 1 ? "Reveal next hint" : helpLevel === 2 ? "Show final check" : "All hints shown"}</button>
              <button type="button" onClick={() => setHelpLevel(0)} className="rounded-lg border border-border px-3 py-2.5 text-sm font-semibold">Reset hints</button>
            </div>
            <p className="mt-3 text-xs leading-5 text-ink-dim">No worked solution is shown because the printed prompt has not been verified against an answer or scoring guide. Use the <a href={`/units/${unit}/review`} className="font-semibold text-accent underline underline-offset-2">Unit {unit} review</a> for related chemistry review.</p>
          </section>
          <section className="rounded-2xl border border-border bg-card/60 p-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-accent">Writing support</p><h3 className="mt-1 text-xl font-bold">Build a point-worthy response</h3></div>
              <button type="button" onClick={() => setShowFramework((shown) => !shown)} aria-expanded={showFramework} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold">{showFramework ? "Collapse" : "Expand"}</button>
            </div>
            {showFramework && <div className="mt-4 space-y-3">
              {RESPONSE_FRAMES.map((frame, index) => <article key={frame.title} className="rounded-xl border border-border bg-bg/60 p-4">
                <div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft/25 text-xs font-bold text-accent">{index + 1}</span><h4 className="text-sm font-bold">{frame.title}</h4></div>
                <p className="mt-2 text-sm leading-6 text-ink-dim">{frame.prompt}</p>
              </article>)}
            </div>}
          </section>

          <section className="rounded-2xl border border-border bg-card/60 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-accent">Before you submit</p>
            <h3 className="mt-1 text-lg font-bold">FRQ self-check</h3>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-ink-dim">
              <li>□ Answer every lettered part and follow the command verb.</li>
              <li>□ Show equations, substitutions, units, and appropriate significant figures for calculations.</li>
              <li>□ Explain the chemical reasoning, not just the final result.</li>
              <li>□ Use particle-level reasoning when asked to explain molecular behavior.</li>
              <li>□ Label graphs, diagrams, species, axes, and units.</li>
            </ul>
            <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-ink-dim">This framework is general study guidance, not an official College Board scoring rubric or a verified answer key. Question-specific hints and worked solutions will be added after each prompt is mapped and checked.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
