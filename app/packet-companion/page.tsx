import Link from "next/link";
import { PacketCompanionLookup } from "@/components/PacketCompanionLookup";

export default function PacketCompanionPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-6 sm:px-7 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs text-ink-dim">
        <Link href="/" className="hover:text-accent">AP Chem Hub</Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink">Packet Companion</span>
      </nav>

      <header className="mb-8 rounded-2xl border border-border bg-card/70 p-6 sm:p-9">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">Study alongside your physical packet</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Packet Companion</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-dim">
          Keep your packet on the desk. Enter the unit and printed question number to find targeted help, then reveal hints one step at a time.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-dim">
          The lookup is being prepared. Until packet questions are mapped and checked, this page will not guess a match or show an unrelated solution.
        </p>
      </header>

      <PacketCompanionLookup />

      <section className="mt-8 rounded-xl border border-border p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Need help before your packet is indexed?</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">
          Choose the chemistry topic you are stuck on and use the lesson's explanation, model, and worked examples.
        </p>
        <Link href="/#course-map" className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-[#06251b] transition hover:opacity-90">
          Browse AP Chemistry lessons
        </Link>
      </section>
    </main>
  );
}
