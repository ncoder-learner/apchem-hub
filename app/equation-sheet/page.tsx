"use client";

import Link from "next/link";

const GROUPS = [
  { unit: 1, title: "Atomic structure and composition", rows: [
    ["Moles", "n = m / M", "Convert between sample mass and amount of substance; M is molar mass in g·mol⁻¹."],
    ["Percent composition", "% element = (mass of element / total sample mass) × 100", "Use when the sample composition is known or a formula must be checked."],
    ["Photon energy", "E = hν = hc/λ", "Use for light absorption/emission and photoelectron spectroscopy; frequency and energy increase as wavelength decreases."],
  ]},
  { unit: 2, title: "Bonding and structure", rows: [
    ["Coulombic potential energy", "E ∝ q₁q₂ / r", "Compare electrostatic interactions qualitatively. Opposite charges attract; greater charge magnitude and shorter distance strengthen the interaction."],
    ["Formal charge", "FC = valence e⁻ − nonbonding e⁻ − ½(bonding e⁻)", "Evaluate Lewis structures; prefer plausible structures with minimized formal charges and appropriate charge placement."],
  ]},
  { unit: 3, title: "Gases, solutions, and intermolecular forces", rows: [
    ["Ideal gas law", "PV = nRT", "Relate pressure, volume, moles, and absolute temperature for an ideal-gas model. Match R units to the quantities."],
    ["Molarity", "M = n / V", "Convert moles of dissolved solute to solution volume in liters; do not use solvent volume."],
    ["Beer–Lambert law", "A = εℓc", "Relate absorbance to concentration when path length and molar absorptivity are fixed."],
  ]},
  { unit: 4, title: "Reactions and stoichiometry", rows: [
    ["Mole ratio", "n(product) = n(limiting reactant) × coefficient ratio", "Use a balanced equation; determine the limiting reactant before calculating theoretical yield."],
    ["Dilution", "M₁V₁ = M₂V₂", "Use when adding solvent changes concentration but the amount of dissolved solute remains constant."],
  ]},
  { unit: 5, title: "Kinetics", rows: [
    ["Average rate", "rate = −Δ[reactant]/Δt = Δ[product]/Δt", "Use concentration change over a time interval; account for stoichiometric coefficients when defining reaction rate."],
    ["Integrated first-order law", "ln[A]ₜ = −kt + ln[A]₀", "Use when first-order behavior is established; ln[A] versus time is linear and slope = −k."],
    ["First-order half-life", "t₁/₂ = 0.693 / k", "Use only for first-order kinetics; half-life does not depend on initial concentration."],
  ]},
  { unit: 6, title: "Thermochemistry", rows: [
    ["Heating/cooling", "q = mcΔT", "Use when temperature changes without a phase change; define system and surroundings and track heat signs."],
    ["Phase change", "q = nΔHₜᵣₐₙₛ", "Use for melting, freezing, vaporization, or condensation at the phase-change temperature."],
    ["Reaction enthalpy from formation data", "ΔH°rxn = ΣnΔH°f(products) − ΣnΔH°f(reactants)", "Use balanced-equation coefficients and subtract reactants from products."],
    ["Bond enthalpies", "ΔHrxn ≈ ΣE(bonds broken) − ΣE(bonds formed)", "Use for an estimate from gas-phase bond energies; breaking bonds costs energy, forming bonds releases energy."],
  ]},
  { unit: 7, title: "Equilibrium", rows: [
    ["Equilibrium constant", "Kc = [products]ᶜ / [reactants]ᵃ (each raised to its coefficient)", "Write from the balanced equation; omit pure solids and pure liquids."],
    ["Reaction quotient", "Q has the same expression as K, using current values", "Compare Q with K to determine the direction of net change: Q<K forward, Q>K reverse, Q=K at equilibrium."],
    ["Free-energy relation", "ΔG° = −RT ln K", "Connect thermodynamic favorability under standard conditions to equilibrium; use Kelvin and consistent energy units."],
  ]},
  { unit: 8, title: "Acids and bases", rows: [
    ["pH and pOH", "pH = −log[H₃O⁺]; pOH = −log[OH⁻]", "Use concentrations in mol·L⁻¹ under the AP model; at 25 °C, pH + pOH = 14.00."],
    ["Acid ionization constant", "Ka = [H₃O⁺][A⁻] / [HA]", "Use equilibrium concentrations for a weak acid; pure liquids are omitted."],
    ["Buffer relationship", "pH = pKa + log([A⁻]/[HA])", "Use for a buffer with appreciable weak acid/conjugate base amounts; use the ratio after stoichiometric neutralization."],
    ["Titration equivalence", "n(acid) × acid coefficient = n(base) × base coefficient", "Use stoichiometry at equivalence; equivalence pH is not always 7."],
  ]},
  { unit: 9, title: "Thermodynamics and electrochemistry", rows: [
    ["Entropy and free energy", "ΔG = ΔH − TΔS", "Predict spontaneity at the stated temperature; keep units consistent, especially J versus kJ."],
    ["Cell potential", "E°cell = E°red(cathode) − E°red(anode)", "Use reduction potentials from tables; do not multiply electrode potentials by stoichiometric coefficients."],
    ["Free energy and voltage", "ΔG° = −nFE°cell", "Relate cell voltage to reaction free energy; n is electrons transferred per balanced reaction."],
  ]},
];

export default function EquationSheetPage() {
  return <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-7 sm:py-12">
    <nav aria-label="Breadcrumb" className="mb-7 text-sm text-ink-dim print:hidden"><Link href="/" className="hover:text-accent">AP Chem Hub</Link> / Equation sheet</nav>
    <header className="mb-7 rounded-2xl border border-border bg-card p-6 sm:p-9 print:border-0 print:p-0">
      <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-accent print:hidden">Printable quick reference</p>
      <h1 className="text-3xl font-bold sm:text-4xl">AP Chemistry equation sheet</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-dim print:text-black">Equations with decision rules: what each relationship is for, when it applies, and common traps. This is a study aid, not a substitute for the official exam reference sheet or checking assumptions.</p>
      <button type="button" onClick={() => window.print()} className="mt-4 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-[#06251b] print:hidden">Print / save as PDF</button>
    </header>
    <div className="space-y-5">
      {GROUPS.map(group=><section key={group.unit} className="break-inside-avoid rounded-xl border border-border bg-card/70 p-4 sm:p-6 print:border print:border-gray-300 print:bg-white print:p-3">
        <h2 className="mb-3 text-lg font-bold">Unit {group.unit}: {group.title}</h2>
        <div className="space-y-3">{group.rows.map(([name,equation,when])=><article key={name} className="break-inside-avoid border-l-2 border-accent/50 pl-3">
          <h3 className="font-semibold">{name}</h3>
          <p className="my-1 font-mono text-sm">{equation}</p>
          <p className="text-sm leading-relaxed text-ink-dim print:text-gray-700"><strong>When to use it:</strong> {when}</p>
        </article>)}</div>
      </section>)}
    </div>
    <p className="mt-6 text-xs text-ink-dim print:text-gray-700">Always check units, temperature scale, balanced-equation coefficients, phase assumptions, and whether the problem asks for a rate, equilibrium quantity, or thermodynamic prediction.</p>
  </main>;
}
