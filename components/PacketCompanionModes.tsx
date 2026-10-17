"use client";

import { useState } from "react";
import { PacketCompanionLookup } from "@/components/PacketCompanionLookup";
import { FrqWorkspace } from "@/components/FrqWorkspace";

type Mode = "mcq" | "frq";

export function PacketCompanionModes() {
  const [mode, setMode] = useState<Mode>("mcq");

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2" role="tablist" aria-label="Choose practice type">
        <button type="button" role="tab" aria-selected={mode === "mcq"} onClick={() => setMode("mcq")} className={"rounded-xl border p-4 text-left transition " + (mode === "mcq" ? "border-accent bg-accent-soft/15" : "border-border bg-card/50 hover:border-accent/40")}>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Practice type 01</p>
          <span className="mt-1 block text-lg font-bold">Multiple Choice</span>
          <span className="mt-1 block text-sm leading-5 text-ink-dim">Navigate indexed questions and reveal available hints and worked answers.</span>
        </button>
        <button type="button" role="tab" aria-selected={mode === "frq"} onClick={() => setMode("frq")} className={"rounded-xl border p-4 text-left transition " + (mode === "frq" ? "border-accent bg-accent-soft/15" : "border-border bg-card/50 hover:border-accent/40")}>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Practice type 02</p>
          <span className="mt-1 block text-lg font-bold">Free Response</span>
          <span className="mt-1 block text-sm leading-5 text-ink-dim">Open topic-based FRQ PDFs and use a structured response checklist.</span>
        </button>
      </div>
      <section role="tabpanel" aria-label={mode === "mcq" ? "Multiple-choice workspace" : "Free-response workspace"}>
        {mode === "mcq" ? <PacketCompanionLookup /> : <FrqWorkspace />}
      </section>
    </div>
  );
}
