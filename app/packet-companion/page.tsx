import Link from "next/link";
import { PacketCompanionLookup } from "@/components/PacketCompanionLookup";
import { FrqWorkspace } from "@/components/FrqWorkspace";

export default function PacketCompanionPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-7 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-ink-dim">
        <Link href="/" className="hover:text-accent">AP Chem Hub</Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">Packet Companion</span>
      </nav>
      <header className="mb-8 rounded-2xl border border-border bg-card/70 p-6 sm:p-9">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Study alongside your physical packet</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Packet Companion</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-dim">Open your multiple-choice or free-response packet beside structured chemistry help. The workspace keeps the original document visible while you work.</p>
      </header>
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2" aria-label="Packet type">
          <a href="#mcq-workspace" className="rounded-xl border border-border bg-card/60 p-4 transition hover:border-accent/50">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Practice type 01</p>
            <h2 className="mt-1 text-lg font-bold">Multiple Choice</h2>
            <p className="mt-1 text-sm text-ink-dim">Navigate indexed questions and reveal available hints and worked answers.</p>
          </a>
          <a href="#frq-workspace" className="rounded-xl border border-border bg-card/60 p-4 transition hover:border-accent/50">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Practice type 02</p>
            <h2 className="mt-1 text-lg font-bold">Free Response</h2>
            <p className="mt-1 text-sm text-ink-dim">Open topic-based FRQ PDFs and use a structured response checklist.</p>
          </a>
        </div>
        <section id="mcq-workspace" className="scroll-mt-6"><PacketCompanionLookup /></section>
        <section id="frq-workspace" className="scroll-mt-6"><FrqWorkspace /></section>
      </div>
      <section className="mt-8 rounded-xl border border-border p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Need help with the underlying chemistry?</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">Use the related unit lesson for concept explanations, visual models, and worked examples. Question-specific FRQ solutions will be labeled only after their prompts are mapped and checked.</p>
        <Link href="/#course-map" className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-[#06251b] transition hover:opacity-90">Browse AP Chemistry lessons</Link>
      </section>
    </main>
  );
}
