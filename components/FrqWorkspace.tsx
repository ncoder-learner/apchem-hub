"use client";

import { useMemo, useState } from "react";

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
    setLocalPdfUrl(null);
    setLocalPdfName("");
  }

  function chooseLocalPdf(event: React.ChangeEvent<HTMLInputElement>) {
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
              <select id="frq-packet" value={selected?.file ?? ""} onChange={(e) => { setSelectedFile(e.target.value); setPage("1"); setLocalPdfUrl(null); setLocalPdfName(""); }} className="mt-2 min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink">
                {packets.map((packet) => <option key={packet.file} value={packet.file}>{packet.title}</option>)}
              </select>
            </label>
          </div>
        </div>
        {selected && <p className="mt-4 rounded-xl border border-border bg-bg/60 p-3 text-sm leading-6 text-ink-dim"><span className="font-semibold text-ink">Topics covered:</span> {selected.topics}</p>}
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
