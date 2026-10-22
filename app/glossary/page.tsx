"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Term = { term: string; definition: string; unit: number; topic: string; example?: string };

const TERMS: Term[] = [
  {term:"Activation energy (Ea)",definition:"The minimum energy barrier reactant particles must overcome for a reaction event; a catalyst provides an alternate pathway with lower Ea.",unit:5,topic:"Kinetics",example:"A catalyst changes the rate constant, not the reaction's ΔG or equilibrium constant at a fixed temperature."},
  {term:"Amphoteric",definition:"Able to act as either an acid or a base, depending on the reaction partner.",unit:8,topic:"Acids and bases",example:"HCO₃⁻ can donate H⁺ to form CO₃²⁻ or accept H⁺ to form H₂CO₃."},
  {term:"Anode",definition:"The electrode where oxidation occurs. In a galvanic cell it is negative; in an electrolytic cell it is positive.",unit:9,topic:"Electrochemistry"},
  {term:"Atomic radius",definition:"A measure of atomic size. Across a period it generally decreases as effective nuclear charge increases; down a group it generally increases as occupied shells are added.",unit:1,topic:"Periodic trends"},
  {term:"Buffer",definition:"A solution containing appreciable amounts of a weak acid and its conjugate base, or a weak base and its conjugate acid, that resists pH change when small amounts of acid or base are added.",unit:8,topic:"Acids and bases"},
  {term:"Calorimetry",definition:"A method for measuring heat transfer from temperature change, commonly using q = mcΔT for a substance with known mass and specific heat.",unit:6,topic:"Thermochemistry"},
  {term:"Catalyst",definition:"A substance that increases reaction rate by providing a pathway with lower activation energy and is regenerated overall.",unit:5,topic:"Kinetics"},
  {term:"Cathode",definition:"The electrode where reduction occurs. In a galvanic cell it is positive; in an electrolytic cell it is negative.",unit:9,topic:"Electrochemistry"},
  {term:"Chemical equilibrium",definition:"A dynamic state in a closed system where forward and reverse reaction rates are equal; concentrations remain constant, but are not necessarily equal.",unit:7,topic:"Equilibrium"},
  {term:"Conjugate acid-base pair",definition:"Two species related by the gain or loss of one proton, H⁺.",unit:8,topic:"Acids and bases"},
  {term:"Effective nuclear charge",definition:"The net positive attraction experienced by an electron after shielding by other electrons is considered.",unit:1,topic:"Atomic structure"},
  {term:"Enthalpy (ΔH)",definition:"At constant pressure, the enthalpy change equals heat transferred to or from the system. Positive ΔH is endothermic; negative ΔH is exothermic.",unit:6,topic:"Thermochemistry"},
  {term:"Entropy (S)",definition:"A state function related to the number of accessible microscopic arrangements and the dispersal of energy; use particle, phase, and mixing changes to reason about trends.",unit:9,topic:"Thermodynamics"},
  {term:"Equilibrium constant (K)",definition:"The ratio of product to reactant activities at equilibrium, expressed for AP Chemistry using equilibrium concentrations or pressures and omitting pure solids and liquids.",unit:7,topic:"Equilibrium"},
  {term:"First-order reaction",definition:"A reaction whose rate is proportional to the concentration of one reactant to the first power; ln[A] versus time is linear for a single-reactant first-order process.",unit:5,topic:"Kinetics"},
  {term:"Formal charge",definition:"Valence electrons in the free atom minus nonbonding electrons and half the bonding electrons assigned to that atom in a Lewis structure.",unit:2,topic:"Lewis structures"},
  {term:"Gibbs free energy (ΔG)",definition:"At constant temperature and pressure, ΔG indicates thermodynamic favorability: negative forward ΔG is spontaneous under the stated conditions, and ΔG = 0 at equilibrium.",unit:9,topic:"Thermodynamics"},
  {term:"Half-life",definition:"The time required for a reactant concentration to fall to half its current value; for a first-order reaction, it is independent of initial concentration.",unit:5,topic:"Kinetics"},
  {term:"Hybridization",definition:"A bonding model that combines atomic orbitals into directional orbitals; AP explanations should connect it to electron-domain geometry and bonding, not treat it as a directly measured property.",unit:2,topic:"Bonding models"},
  {term:"Intermolecular forces",definition:"Attractions between separate particles, including London dispersion, dipole-dipole, and hydrogen bonding; stronger attractions generally raise boiling point and lower vapor pressure for comparable substances.",unit:3,topic:"Properties of substances"},
  {term:"Limiting reactant",definition:"The reactant consumed first that determines the maximum amount of product; compare product amounts calculated from each reactant, not just the starting masses.",unit:4,topic:"Stoichiometry"},
  {term:"Oxidation",definition:"Loss of electrons or an increase in oxidation number.",unit:9,topic:"Redox"},
  {term:"pH",definition:"pH = −log[H₃O⁺] for the AP Chemistry concentration model; a one-unit decrease means hydronium concentration increases by a factor of ten.",unit:8,topic:"Acids and bases"},
  {term:"Rate law",definition:"An experimentally determined relationship between reaction rate and reactant concentrations; reaction orders generally cannot be inferred from the balanced equation.",unit:5,topic:"Kinetics"},
  {term:"Reduction",definition:"Gain of electrons or a decrease in oxidation number.",unit:9,topic:"Redox"},
  {term:"Resonance",definition:"Multiple valid Lewis structures with the same atom arrangement but different electron placement represent a delocalized structure; the molecule does not switch between drawings.",unit:2,topic:"Lewis structures"},
  {term:"Standard cell potential (E°cell)",definition:"For a galvanic cell, E°cell = E°red(cathode) − E°red(anode); a positive value corresponds to a spontaneous cell reaction under standard conditions.",unit:9,topic:"Electrochemistry"},
  {term:"Titration equivalence point",definition:"The point where stoichiometrically equivalent amounts of titrant and analyte have reacted; it is not necessarily at pH 7.",unit:8,topic:"Acids and bases"},
  {term:"Transition state",definition:"A high-energy arrangement along the reaction pathway; the energy difference from reactants is the forward activation energy.",unit:5,topic:"Kinetics"},
  {term:"Vapor pressure",definition:"The pressure of vapor in dynamic equilibrium with its condensed phase at a given temperature; it rises with temperature and is lower when intermolecular attractions are stronger for comparable substances.",unit:3,topic:"Phase changes"},
];

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("all");
  const filtered = useMemo(() => TERMS.filter((item) =>
    (unit === "all" || String(item.unit) === unit) &&
    (item.term + " " + item.definition + " " + item.topic + " " + (item.example ?? "")).toLowerCase().includes(query.trim().toLowerCase())
  ).sort((a,b) => a.term.localeCompare(b.term)), [query, unit]);

  return <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-7 sm:py-12">
    <nav aria-label="Breadcrumb" className="mb-7 text-sm text-ink-dim"><Link href="/" className="hover:text-accent">AP Chem Hub</Link> / Glossary</nav>
    <header className="mb-7 rounded-2xl border border-border bg-card p-6 sm:p-9">
      <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-accent">Quick reference</p>
      <h1 className="text-3xl font-bold sm:text-4xl">Chemistry glossary</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-dim">Search essential AP Chemistry vocabulary, equations, and distinctions. Definitions are concise study aids; use the linked topic lessons for full explanations and assumptions.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_190px]">
        <label className="block"><span className="mb-1 block text-sm font-semibold">Search terms</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try “equilibrium”, “rate law”, or “pH”" className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-ink outline-none focus:border-accent" /></label>
        <label className="block"><span className="mb-1 block text-sm font-semibold">Filter by unit</span><select value={unit} onChange={e=>setUnit(e.target.value)} className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-ink"><option value="all">All 9 units</option>{Array.from({length:9},(_,i)=><option key={i+1} value={String(i+1)}>Unit {i+1}</option>)}</select></label>
      </div>
      <p className="mt-3 text-xs text-ink-dim" aria-live="polite">{filtered.length} of {TERMS.length} terms</p>
    </header>
    <section aria-label="Glossary results" className="space-y-3">
      {filtered.map(item=><article key={item.term} className="rounded-xl border border-border bg-card/70 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2"><h2 className="font-bold">{item.term}</h2><span className="rounded-full border border-border px-2 py-1 text-xs text-ink-dim">Unit {item.unit} · {item.topic}</span></div>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">{item.definition}</p>
        {item.example && <p className="mt-2 text-sm leading-relaxed"><strong>Example / trap:</strong> {item.example}</p>}
        <Link href={`/units/${item.unit}`} className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline">Open Unit {item.unit} lessons →</Link>
      </article>)}
      {filtered.length===0 && <p className="rounded-xl border border-border p-8 text-center text-ink-dim">No matching terms. Try a broader search or clear the unit filter.</p>}
    </section>
    <footer className="mt-8 border-t border-border pt-5 text-sm text-ink-dim"><Link href="/" className="font-semibold text-accent hover:underline">Return to course home</Link></footer>
  </main>;
}
