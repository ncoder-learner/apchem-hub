"use client";

import { useMemo, useState } from "react";

type LabKind = "kinetics" | "energy-profile" | "gas-law" | "calorimetry" | "equilibrium" | "stoichiometry";

const labels: Record<LabKind, { title: string; goal: string }> = {
  kinetics: { title: "Reaction-rate explorer", goal: "Change the starting concentration, rate constant, and reaction order. Watch the concentration–time curve respond." },
  "energy-profile": { title: "Reaction energy-profile explorer", goal: "Change the activation barrier and reaction enthalpy. The pathway peak and product energy move independently." },
  "gas-law": { title: "Ideal-gas relationship explorer", goal: "Change temperature and amount of gas to see how pressure depends on volume at fixed conditions." },
  calorimetry: { title: "Calorimetry explorer", goal: "Change heat transferred and sample mass. Compare how much the temperature changes for the same material." },
  equilibrium: { title: "Equilibrium composition explorer", goal: "For the simplified model A ⇌ B with equal stoichiometric coefficients and initially pure A, vary K to see how the equilibrium mixture shifts." },
  stoichiometry: { title: "Balance-the-equation lab", goal: "Adjust coefficients for H₂ + O₂ → H₂O. The equation is balanced only when both atom counts match." },
};

function RangeControl({ label, value, min, max, step = 1, onChange, format = (v: number) => String(v) }: {
  label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; format?: (v: number) => string;
}) {
  return <label className="block min-w-0">
    <span className="mb-1 flex items-center justify-between gap-3 text-sm text-ink-dim"><span>{label}</span><strong className="tabular-nums text-ink">{format(value)}</strong></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full accent-[var(--color-accent)]" />
    <span className="flex justify-between text-[11px] text-ink-dim"><span>{format(min)}</span><span>{format(max)}</span></span>
  </label>;
}

function Plot({ title, xLabel, yLabel, paths, xTicks, yTicks }: {
  title: string; xLabel: string; yLabel: string; paths: { d: string; color: string; label: string }[]; xTicks: string[]; yTicks: string[];
}) {
  const left = 46, right = 570, top = 20, bottom = 190;
  return <div className="rounded-xl border border-border bg-black/10 p-3">
    <p className="mb-2 text-sm font-semibold text-ink">{title}</p>
    <svg viewBox="0 0 600 235" role="img" aria-label={title} className="block w-full">
      {yTicks.map((tick, i) => { const y = top + (bottom - top) * i / Math.max(1, yTicks.length - 1); return <g key={tick}><line x1={left} x2={right} y1={y} y2={y} stroke="var(--color-border)" strokeDasharray="3 5"/><text x={left - 8} y={y + 4} textAnchor="end" fill="var(--color-ink-dim)" fontSize="10">{tick}</text></g>; })}
      {xTicks.map((tick, i) => { const x = left + (right - left) * i / Math.max(1, xTicks.length - 1); return <g key={tick}><line x1={x} x2={x} y1={top} y2={bottom} stroke="var(--color-border)" strokeDasharray="3 5"/><text x={x} y={bottom + 16} textAnchor="middle" fill="var(--color-ink-dim)" fontSize="10">{tick}</text></g>; })}
      <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="var(--color-ink-dim}"/>
      <line x1={left} x2={left} y1={top} y2={bottom} stroke="var(--color-ink-dim}"/>
      {paths.map(p => <path key={p.label} d={p.d} fill="none" stroke={p.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>)}
      <text x={(left + right) / 2} y="230" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="11">{xLabel}</text>
      <text x="12" y={(top + bottom) / 2} transform={`rotate(-90 12 ${(top + bottom) / 2})`} textAnchor="middle" fill="var(--color-ink-dim)" fontSize="11">{yLabel}</text>
    </svg>
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">{paths.map(p => <span key={p.label} className="flex items-center gap-2 text-xs text-ink-dim"><i className="inline-block h-0.5 w-4" style={{ background: p.color }} />{p.label}</span>)}</div>
  </div>;
}

function makePath(values: number[], minY: number, maxY: number) {
  const left = 46, right = 570, top = 20, bottom = 190;
  return values.map((v, i) => {
    const x = left + (right - left) * i / Math.max(1, values.length - 1);
    const y = bottom - (Math.max(minY, Math.min(maxY, v)) - minY) / (maxY - minY || 1) * (bottom - top);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

export function InteractiveLab({ kind }: { kind: LabKind }) {
  const [order, setOrder] = useState(1);
  const [k, setK] = useState(0.35);
  const [initial, setInitial] = useState(1.0);
  const [ea, setEa] = useState(60);
  const [deltaH, setDeltaH] = useState(-25);
  const [temp, setTemp] = useState(300);
  const [moles, setMoles] = useState(1);
  const [heat, setHeat] = useState(2500);
  const [mass, setMass] = useState(100);
  const [equilibriumK, setEquilibriumK] = useState(1);
  const [h2, setH2] = useState(2);
  const [o2, setO2] = useState(1);
  const [h2o, setH2O] = useState(2);

  const kineticsValues = useMemo(() => Array.from({ length: 41 }, (_, i) => {
    const t = i / 4;
    if (order === 0) return Math.max(0, initial - k * t);
    if (order === 1) return initial * Math.exp(-k * t);
    return initial / (1 + k * initial * t);
  }), [order, k, initial]);
  const energyPath = useMemo(() => {
    const start = 0, peak = ea, product = deltaH;
    const points = [start, start + peak * 0.35, peak, peak * 0.62 + product * 0.38, product];
    return makePath(points, Math.min(-30, product - 10), Math.max(100, peak + 10));
  }, [ea, deltaH]);
  const gasValues = useMemo(() => Array.from({ length: 41 }, (_, i) => {
    const volume = 2 + i * 0.5;
    return moles * 0.082057 * temp / volume;
  }), [moles, temp]);
  const dT = heat / (mass * 4.184);
  const fractionB = equilibriumK / (1 + equilibriumK);
  const balanced = 2 * h2 === 2 * h2o && 2 * o2 === h2o;
  const cfg = labels[kind];

  return <section className="my-8 overflow-hidden rounded-2xl border border-border bg-card/70" aria-label={cfg.title}>
    <header className="border-b border-border bg-white/[0.025] px-4 py-4 sm:px-5">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent"><span className="h-2 w-2 rounded-full bg-accent" /> Interactive lab</div>
      <h3 className="!m-0 text-lg font-semibold text-ink">{cfg.title}</h3>
      <p className="mb-0 mt-2 text-sm leading-relaxed text-ink-dim">{cfg.goal}</p>
    </header>
    <div className="grid gap-4 p-4 sm:p-5">
      {kind === "kinetics" && <>
        <div className="grid gap-4 sm:grid-cols-3">
          <RangeControl label="Initial concentration [A]₀" value={initial} min={0.2} max={2} step={0.1} onChange={setInitial} format={v => `${v.toFixed(1)} M`} />
          <RangeControl label="Rate constant k" value={k} min={0.05} max={0.8} step={0.05} onChange={setK} format={v => v.toFixed(2)} />
          <label className="block text-sm text-ink-dim">Reaction order<select value={order} onChange={e => setOrder(Number(e.target.value))} className="mt-1 block w-full rounded-lg border border-border bg-bg px-3 py-2 text-ink"><option value={0}>Zero order</option><option value={1}>First order</option><option value={2}>Second order</option></select></label>
        </div>
        <Plot title="Reactant concentration vs. time" xLabel="Time (arbitrary units)" yLabel="[A] (M)" xTicks={["0", "2.5", "5", "7.5", "10"]} yTicks={["2.0", "1.5", "1.0", "0.5", "0"]} paths={[{ d: makePath(kineticsValues, 0, 2), color: "#5aa9ff", label: "Reactant A" }]} />
        <p className="mb-0 text-sm text-ink-dim">Model: {order === 0 ? "[A] = max(0, [A]₀ − kt)" : order === 1 ? "[A] = [A]₀e⁻ᵏᵗ" : "[A] = [A]₀ / (1 + k[A]₀t)"}. This idealized single-reactant model assumes constant conditions and the selected integrated rate law applies.</p>
      </>}
      {kind === "energy-profile" && <>
        <div className="grid gap-4 sm:grid-cols-2">
          <RangeControl label="Forward activation energy" value={ea} min={20} max={100} step={5} onChange={setEa} format={v => `${v} kJ/mol`} />
          <RangeControl label="Reaction enthalpy ΔH" value={deltaH} min={-30} max={40} step={5} onChange={setDeltaH} format={v => `${v > 0 ? "+" : ""}${v} kJ/mol`} />
        </div>
        <Plot title="Potential-energy profile (schematic)" xLabel="Reaction coordinate (not time)" yLabel="Potential energy" xTicks={["Reactants", "", "Transition state", "", "Products"]} yTicks={["High", "", "Middle", "", "Low"]} paths={[{ d: energyPath, color: "#f5c454", label: "Reaction pathway" }]} />
        <div className="grid gap-2 sm:grid-cols-3"><div className="rounded-lg bg-black/10 p-3 text-sm"><span className="text-ink-dim">Reactants</span><p className="mb-0 font-semibold">0 kJ/mol (reference)</p></div><div className="rounded-lg bg-black/10 p-3 text-sm"><span className="text-ink-dim">Products</span><p className="mb-0 font-semibold">{deltaH > 0 ? "+" : ""}{deltaH} kJ/mol</p></div><div className="rounded-lg bg-black/10 p-3 text-sm"><span className="text-ink-dim">Forward Eₐ</span><p className="mb-0 font-semibold">{ea} kJ/mol</p></div></div>
        <p className="mb-0 text-sm text-ink-dim">The endpoint difference is ΔH; the reactant-to-peak difference is Eₐ. The diagram is schematic and does not predict an actual rate by itself.</p>
      </>}
      {kind === "gas-law" && <>
        <div className="grid gap-4 sm:grid-cols-2">
          <RangeControl label="Temperature" value={temp} min={200} max={600} step={10} onChange={setTemp} format={v => `${v} K`} />
          <RangeControl label="Amount of gas" value={moles} min={0.25} max={2} step={0.25} onChange={setMoles} format={v => `${v.toFixed(2)} mol`} />
        </div>
        <Plot title="Pressure vs. volume (ideal gas)" xLabel="Volume (L)" yLabel="Pressure (atm)" xTicks={["2", "6", "10", "14", "18"]} yTicks={["High", "", "Middle", "", "Low"]} paths={[{ d: makePath(gasValues, 0, Math.max(...gasValues)), color: "#34d399", label: `T = ${temp} K, n = ${moles} mol` }]} />
        <p className="mb-0 text-sm text-ink-dim">P = nRT/V, using R = 0.082057 L·atm·mol⁻¹·K⁻¹. At a fixed volume, increasing T or n raises pressure; at fixed T and n, increasing volume lowers pressure.</p>
      </>}
      {kind === "calorimetry" && <>
        <div className="grid gap-4 sm:grid-cols-2">
          <RangeControl label="Heat absorbed q" value={heat} min={500} max={10000} step={250} onChange={setHeat} format={v => `${v} J`} />
          <RangeControl label="Water mass" value={mass} min={50} max={500} step={25} onChange={setMass} format={v => `${v} g`} />
        </div>
        <div className="rounded-xl border border-border p-4"><p className="mb-1 text-sm text-ink-dim">Predicted temperature change (water, c = 4.184 J g⁻¹ °C⁻¹)</p><p className="mb-2 text-3xl font-semibold text-ink">+{dT.toFixed(2)} °C</p><div className="h-3 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-rose" style={{ width: `${Math.min(100, dT / 48 * 100)}%` }} /></div><p className="mb-0 mt-3 text-sm text-ink-dim">q = mcΔT, so ΔT = q/(mc). For the same heat input, a larger mass has a smaller temperature change.</p></div>
      </>}
      {kind === "equilibrium" && <>
        <RangeControl label="Equilibrium constant K (for A ⇌ B)" value={equilibriumK} min={0.1} max={10} step={0.1} onChange={setEquilibriumK} format={v => v.toFixed(1)} />
        <div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-border p-4"><p className="text-sm text-ink-dim">A at equilibrium</p><p className="mb-0 text-2xl font-semibold">{(100 * (1 - fractionB)).toFixed(1)}%</p><div className="mt-2 h-3 rounded-full bg-border"><div className="h-full rounded-full bg-blue" style={{ width: `${100 * (1 - fractionB)}%` }} /></div></div><div className="rounded-xl border border-border p-4"><p className="text-sm text-ink-dim">B at equilibrium</p><p className="mb-0 text-2xl font-semibold">{(100 * fractionB).toFixed(1)}%</p><div className="mt-2 h-3 rounded-full bg-border"><div className="h-full rounded-full bg-emerald" style={{ width: `${100 * fractionB}%` }} /></div></div></div>
        <p className="mb-0 text-sm text-ink-dim">For this simplified 1:1 model, K = [B]/[A]. Real equilibrium calculations must account for stoichiometry, initial amounts, and the correct equilibrium expression.</p>
      </>}
      {kind === "stoichiometry" && <>
        <div className="grid gap-4 sm:grid-cols-3">
          <RangeControl label="H₂ coefficient" value={h2} min={1} max={4} onChange={setH2} />
          <RangeControl label="O₂ coefficient" value={o2} min={1} max={4} onChange={setO2} />
          <RangeControl label="H₂O coefficient" value={h2o} min={1} max={4} onChange={setH2O} />
        </div>
        <div className="rounded-xl border border-border p-4 text-center"><p className="mb-4 text-xl font-semibold sm:text-2xl"><span className="text-blue">{h2}H₂</span> + <span className="text-emerald">{o2}O₂</span> → <span className="text-amber">{h2o}H₂O</span></p><div className="grid grid-cols-2 gap-3 text-sm"><div className="rounded-lg bg-black/10 p-3"><p className="text-ink-dim">Hydrogen atoms</p><p className="mb-0 font-semibold">Left: {2*h2} · Right: {2*h2o}</p></div><div className="rounded-lg bg-black/10 p-3"><p className="text-ink-dim">Oxygen atoms</p><p className="mb-0 font-semibold">Left: {2*o2} · Right: {h2o}</p></div></div><p className={`mb-0 mt-4 rounded-lg px-3 py-2 text-sm font-semibold ${balanced ? "bg-emerald/10 text-emerald" : "bg-rose/10 text-rose"}`}>{balanced ? "Balanced: each element has the same atom count on both sides." : "Not balanced yet: change coefficients until both atom counts match."}</p></div>
        <button type="button" onClick={() => { setH2(2); setO2(1); setH2O(2); }} className="justify-self-start rounded-lg border border-border px-3 py-2 text-sm text-ink hover:border-accent">Show balanced equation</button>
        <p className="mb-0 text-sm text-ink-dim">Coefficients scale whole molecules; subscripts are fixed parts of each chemical formula and must never be changed to balance an equation.</p>
      </>}
    </div>
  </section>;
}
