"use client";

import { useMemo, useState } from "react";

type LabKind = "kinetics" | "rate-law" | "collision" | "energy-profile" | "balance" | "gas-law" | "ph";

interface InteractiveLabProps {
  kind: LabKind;
  title?: string;
}

/**
 * Small, self-contained chemistry labs for use inside MDX lessons.
 * Every control updates the model immediately; diagrams are explanatory
 * schematics and all numerical assumptions are stated in the UI.
 */
export function InteractiveLab({ kind, title }: InteractiveLabProps) {
  if (kind === "balance") return <BalanceLab title={title} />;
  if (kind === "rate-law") return <RateLawLab title={title} />;
  if (kind === "collision") return <CollisionLab title={title} />;
  if (kind === "energy-profile") return <EnergyProfileLab title={title} />;
  if (kind === "gas-law") return <GasLawLab title={title} />;
  if (kind === "ph") return <PhLab title={title} />;
  return <KineticsLab title={title} />;
}

function LabFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="my-8 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border bg-white/[0.03] px-4 py-3">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-xs text-ink-dim">Interactive model · change a control and observe the result</p>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </section>
  );
}

function RangeControl({ label, value, min, max, step = 1, onChange, output }: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (n: number) => void; output?: string;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="flex items-center justify-between gap-3 text-ink-dim">
        <span>{label}</span><strong className="font-semibold tabular-nums text-ink">{output ?? value}</strong>
      </span>
      <input aria-label={label} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-400" />
    </label>
  );
}


function RateLawLab({ title }: { title?: string }) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [m, setM] = useState(1);
  const [n, setN] = useState(1);
  const rate = 0.5 * a ** m * b ** n;
  return <LabFrame title={title ?? "Experiment with a rate law"}>
    <p className="text-sm text-ink-dim">Model: rate = k[A]ᵐ[B]ⁿ, with k = 0.50 in consistent units. Change concentrations or reaction orders and watch the calculated rate update.</p>
    <div className="grid gap-4 sm:grid-cols-2">
      <RangeControl label="Reactant A concentration" value={a} min={0.5} max={3} step={0.5} onChange={setA} output={a.toFixed(1) + " M"} />
      <RangeControl label="Reactant B concentration" value={b} min={0.5} max={3} step={0.5} onChange={setB} output={b.toFixed(1) + " M"} />
      <label className="block space-y-1.5 text-sm"><span className="text-ink-dim">Order in A (m)</span><select value={m} onChange={e=>setM(Number(e.target.value))} className="w-full rounded-lg border border-border bg-bg px-3 py-2"><option value={0}>0 — zero order</option><option value={1}>1 — first order</option><option value={2}>2 — second order</option></select></label>
      <label className="block space-y-1.5 text-sm"><span className="text-ink-dim">Order in B (n)</span><select value={n} onChange={e=>setN(Number(e.target.value))} className="w-full rounded-lg border border-border bg-bg px-3 py-2"><option value={0}>0 — zero order</option><option value={1}>1 — first order</option><option value={2}>2 — second order</option></select></label>
    </div>
    <div className="rounded-xl border border-border bg-bg p-4"><p className="text-xs text-ink-dim">Predicted relative rate</p><p className="text-3xl font-semibold tabular-nums">{rate.toFixed(3)}</p><div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{width: Math.min(100,rate/40*100)+"%"}} /></div><p className="mt-3 text-sm">Doubling [A] changes rate by a factor of <strong>{2 ** m}</strong> for the selected order. If m = 0, changing [A] has no effect on rate.</p></div>
    <p className="text-xs text-ink-dim">This is a mathematical sandbox, not a claim about a particular reaction. Real reaction orders must be determined experimentally; they are not generally copied from the balanced equation.</p>
  </LabFrame>;
}

function CollisionLab({ title }: { title?: string }) {
  const [temperature, setTemperature] = useState(300);
  const [concentration, setConcentration] = useState(8);
  const speed = 0.7 + (temperature - 200) / 250;
  const dots = Array.from({length: concentration}, (_,i)=>({x:28+(i*47)%264,y:26+((i*61+31)%100),dx:((i%3)-1)*speed*8,dy:((i%4)-1.5)*speed*5}));
  const relative = (concentration/8)**2 * Math.exp(-1200/temperature) / Math.exp(-1200/300);
  return <LabFrame title={title ?? "Explore collision frequency"}>
    <div className="grid gap-4 sm:grid-cols-2"><RangeControl label="Temperature" value={temperature} min={200} max={500} step={25} onChange={setTemperature} output={temperature+" K"} /><RangeControl label="Particle concentration" value={concentration} min={4} max={16} onChange={setConcentration} output={concentration+" particles (schematic)"} /></div>
    <div className="rounded-xl border border-border bg-bg p-2"><svg viewBox="0 0 320 155" role="img" aria-label="Schematic gas particles with motion arrows" className="w-full">{dots.map((d,i)=><g key={i}><line x1={d.x} y1={d.y} x2={d.x+d.dx} y2={d.y+d.dy} stroke="var(--color-blue)" strokeWidth="2" strokeLinecap="round"/><circle cx={d.x} cy={d.y} r="7" fill={i%2?"var(--color-emerald)":"var(--color-amber)"} /></g>)}</svg></div>
    <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">Relative collision opportunity</p><p className="text-xl font-semibold">{relative.toFixed(2)}× baseline</p></div><div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">Particle motion</p><p className="text-sm">{temperature < 300 ? "Lower temperature: slower average motion and fewer collisions with sufficient energy." : temperature > 300 ? "Higher temperature: faster average motion and a larger fraction of collisions can overcome the activation barrier." : "Baseline conditions for comparison."}</p></div></div>
    <p className="text-xs text-ink-dim">Particle positions and arrows are schematic, not a molecular-dynamics simulation. The relative index is an illustrative teaching model, not a measured rate law. Temperature can increase the fraction of collisions energetic enough to react; concentration mainly changes how often particles encounter one another.</p>
  </LabFrame>;
}

function KineticsLab({ title }: { title?: string }) {
  const [order, setOrder] = useState(1);
  const [k, setK] = useState(0.35);
  const [initial, setInitial] = useState(1);
  const points = useMemo(() => Array.from({ length: 41 }, (_, i) => {
    const t = i / 4;
    let c = initial;
    if (order === 0) c = Math.max(0, initial - k * t);
    if (order === 1) c = initial * Math.exp(-k * t);
    if (order === 2) c = initial / (1 + k * initial * t);
    return { t, c };
  }), [order, k, initial]);
  const path = points.map((p, i) => `${i ? "L" : "M"} ${42 + p.t / 10 * 300} ${18 + (1 - p.c) * 150}`).join(" ");
  const sample = points.find((p) => p.t === 5) ?? points[20];
  return <LabFrame title={title ?? "Explore concentration–time curves"}>
    <div className="grid gap-4 sm:grid-cols-3">
      <label className="block space-y-1.5 text-sm"><span className="text-ink-dim">Reaction order</span>
        <select value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-ink">
          <option value={0}>Zero order</option><option value={1}>First order</option><option value={2}>Second order</option>
        </select>
      </label>
      <RangeControl label="Rate constant k" value={k} min={0.05} max={0.8} step={0.05} onChange={setK} output={k.toFixed(2)} />
      <RangeControl label="Initial concentration [A]₀" value={initial} min={0.4} max={1} step={0.1} onChange={setInitial} output={initial.toFixed(1) + " M"} />
    </div>
    <div className="rounded-xl border border-border bg-bg p-2">
      <svg viewBox="0 0 370 205" role="img" aria-label="Interactive concentration versus time graph" className="w-full">
        {[0, .25, .5, .75, 1].map((v) => <g key={v}><line x1="42" x2="342" y1={18 + (1-v)*150} y2={18 + (1-v)*150} stroke="var(--color-border)" strokeDasharray="3 4" /><text x="34" y={22+(1-v)*150} fill="var(--color-ink-dim)" fontSize="10" textAnchor="end">{v.toFixed(2)}</text></g>)}
        <line x1="42" y1="18" x2="42" y2="168" stroke="var(--color-ink-dim)" /><line x1="42" y1="168" x2="342" y2="168" stroke="var(--color-ink-dim)" />
        <path d={path} fill="none" stroke="var(--color-emerald)" strokeWidth="3" strokeLinecap="round" />
        <text x="192" y="195" fill="var(--color-ink-dim)" fontSize="11" textAnchor="middle">Time (arbitrary units)</text>
        <text x="12" y="90" fill="var(--color-ink-dim)" fontSize="11" textAnchor="middle" transform="rotate(-90 12 90)">[A] (M)</text>
      </svg>
    </div>
    <div className="grid gap-2 sm:grid-cols-3">
      <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">At t = 5</p><p className="text-lg font-semibold tabular-nums">{sample.c.toFixed(3)} M</p></div>
      <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">Model</p><p className="text-sm font-medium">{order === 0 ? "[A] = [A]₀ − kt" : order === 1 ? "[A] = [A]₀e⁻ᵏᵗ" : "1/[A] = 1/[A]₀ + kt"}</p></div>
      <div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">What to notice</p><p className="text-sm">{order === 0 ? "A constant amount disappears per unit time until the reactant is depleted." : order === 1 ? "The same fraction disappears per equal time interval." : "The rate slows as concentration falls; doubling [A] has a squared effect on rate."}</p></div>
    </div>
    <p className="text-xs leading-relaxed text-ink-dim">Illustrative single-reactant models at constant temperature. Time and k use arbitrary but internally consistent units; this model is for comparing curve shapes, not fitting experimental data.</p>
  </LabFrame>;
}

function BalanceLab({ title }: { title?: string }) {
  const [h2, setH2] = useState(2);
  const [o2, setO2] = useState(1);
  const [h2o, setH2o] = useState(2);
  const hLeft = 2 * h2, oLeft = 2 * o2, hRight = 2 * h2o, oRight = h2o;
  const balanced = hLeft === hRight && oLeft === oRight;
  return <LabFrame title={title ?? "Balance the equation: build water"}>
    <p className="text-sm leading-relaxed text-ink-dim">Use the coefficient sliders to balance H₂ + O₂ → H₂O. Coefficients change the number of molecules, never the subscripts inside a molecule.</p>
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {[
        { name: "Hydrogen", formula: "H₂", value: h2, set: setH2, color: "#60a5fa" },
        { name: "Oxygen", formula: "O₂", value: o2, set: setO2, color: "#fb7185" },
        { name: "Water", formula: "H₂O", value: h2o, set: setH2o, color: "#34d399" },
      ].map((m) => <div key={m.formula} className="rounded-xl border border-border bg-bg p-3 text-center">
        <div className="mb-2 flex min-h-12 flex-wrap items-center justify-center gap-1" aria-label={`${m.value} molecules of ${m.name}`}>
          {Array.from({ length: m.value }, (_, i) => <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-slate-950" style={{ background: m.color }}>{m.formula}</span>)}
        </div>
        <p className="font-semibold">{m.formula}</p><p className="mb-3 text-xs text-ink-dim">{m.name} molecules</p>
        <input aria-label={`${m.name} coefficient`} type="range" min="1" max="6" value={m.value} onChange={(e) => m.set(Number(e.target.value))} className="w-full accent-emerald-400" />
        <p className="mt-1 text-sm">Coefficient: <strong>{m.value}</strong></p>
      </div>)}
    </div>
    <div className="rounded-xl border border-border p-4 text-center">
      <p className="text-2xl font-semibold tabular-nums">{h2}H₂ + {o2}O₂ → {h2o}H₂O</p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <p>Hydrogen atoms: <strong>{hLeft}</strong> left / <strong>{hRight}</strong> right {hLeft === hRight ? "✓" : "≠"}</p>
        <p>Oxygen atoms: <strong>{oLeft}</strong> left / <strong>{oRight}</strong> right {oLeft === oRight ? "✓" : "≠"}</p>
      </div>
      <p className={`mt-3 rounded-lg px-3 py-2 text-sm font-semibold ${balanced ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-200"}`}>{balanced ? "Balanced: each element has the same atom count on both sides." : "Not balanced yet. Adjust coefficients until both atom counts match."}</p>
    </div>
    <button type="button" onClick={() => { setH2(2); setO2(1); setH2o(2); }} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-white/[0.05]">Reset to balanced equation</button>
    <p className="text-xs leading-relaxed text-ink-dim">The coefficient 1 is normally omitted when writing a chemical equation. Atom counts must be conserved; the number of molecules may change.</p>
  </LabFrame>;
}

function EnergyProfileLab({ title }: { title?: string }) {
  const [ea, setEa] = useState(60);
  const [deltaH, setDeltaH] = useState(-25);
  const [catalyst, setCatalyst] = useState(true);
  const baseline = 142;
  const reactantY = baseline - 55;
  const productY = baseline - (55 + deltaH * 0.65);
  const peakY = baseline - 55 - ea * 0.8;
  const catPeakY = baseline - 55 - ea * 0.48;
  const path = `M 34 ${reactantY} C 85 ${reactantY}, 95 ${catalyst ? catPeakY : peakY}, 145 ${catalyst ? catPeakY : peakY} S 205 ${productY}, 270 ${productY}`;
  return <LabFrame title={title ?? "Explore a reaction energy profile"}>
    <div className="grid gap-4 sm:grid-cols-3">
      <RangeControl label="Forward activation energy" value={ea} min={25} max={100} step={5} onChange={setEa} output={ea + " kJ/mol"} />
      <RangeControl label="Reaction enthalpy ΔH" value={deltaH} min={-50} max={50} step={5} onChange={setDeltaH} output={(deltaH > 0 ? "+" : "") + deltaH + " kJ/mol"} />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={catalyst} onChange={(e) => setCatalyst(e.target.checked)} className="accent-emerald-400" /><span>Show catalyzed pathway</span></label>
    </div>
    <div className="rounded-xl border border-border bg-bg p-2">
      <svg viewBox="0 0 310 190" role="img" aria-label="Interactive reaction energy profile" className="w-full">
        {[45,85,125,165].map(y => <line key={y} x1="32" x2="286" y1={y} y2={y} stroke="var(--color-border)" strokeDasharray="3 4" />)}
        <line x1="32" y1="20" x2="32" y2="165" stroke="var(--color-ink-dim)" /><line x1="32" y1="165" x2="286" y2="165" stroke="var(--color-ink-dim)" />
        <path d={`M 34 ${reactantY} C 85 ${reactantY}, 95 ${peakY}, 145 ${peakY} S 205 ${productY}, 270 ${productY}`} fill="none" stroke="var(--color-amber)" strokeWidth={catalyst ? 1.8 : 3} strokeDasharray={catalyst ? "5 4" : "0"} />
        {catalyst && <path d={path} fill="none" stroke="var(--color-emerald)" strokeWidth="3" />}
        <text x="36" y={reactantY-7} fill="var(--color-ink)" fontSize="10">Reactants</text><text x="235" y={productY-7} fill="var(--color-ink)" fontSize="10">Products</text>
        <text x="154" y="183" fill="var(--color-ink-dim)" fontSize="10" textAnchor="middle">Reaction progress →</text><text x="11" y="90" fill="var(--color-ink-dim)" fontSize="10" textAnchor="middle" transform="rotate(-90 11 90)">Potential energy</text>
      </svg>
      <div className="flex flex-wrap gap-4 px-2 pb-2 text-xs text-ink-dim"><span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-300" />Uncatalyzed</span>{catalyst && <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />Catalyzed</span>}</div>
    </div>
    <p className="text-sm leading-relaxed">ΔH is {deltaH < 0 ? "negative: products are lower in energy (exothermic)." : deltaH > 0 ? "positive: products are higher in energy (endothermic)." : "zero: reactants and products have equal energy."} A catalyst lowers the pathway barrier; it does not change the energy of reactants or products, so ΔH stays the same.</p>
    <p className="text-xs leading-relaxed text-ink-dim">Schematic only; curve height is illustrative rather than a calibrated vertical scale. The reactant and product levels remain fixed relative to ΔH while the activation barrier control changes.</p>
  </LabFrame>;
}

function GasLawLab({ title }: { title?: string }) {
  const [temp, setTemp] = useState(300);
  const [moles, setMoles] = useState(1);
  const [volume, setVolume] = useState(10);
  const pressure = (moles * 0.082057 * temp) / volume;
  const curve = Array.from({ length: 25 }, (_, i) => {
    const v = 3 + i * 0.8;
    const p = moles * 0.082057 * temp / v;
    return `${i ? "L" : "M"} ${35 + (v-3)/19.2*280} ${20 + (10-p)/10*125}`;
  }).join(" ");
  return <LabFrame title={title ?? "Explore the ideal gas law"}>
    <div className="grid gap-4 sm:grid-cols-3">
      <RangeControl label="Temperature" value={temp} min={150} max={600} step={25} onChange={setTemp} output={temp + " K"} />
      <RangeControl label="Amount of gas" value={moles} min={0.5} max={3} step={0.5} onChange={setMoles} output={moles + " mol"} />
      <RangeControl label="Volume" value={volume} min={3} max={25} step={1} onChange={setVolume} output={volume + " L"} />
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-border bg-bg p-4"><p className="text-xs text-ink-dim">Calculated pressure</p><p className="mt-1 text-2xl font-semibold">{pressure.toFixed(2)} atm</p><p className="mt-1 text-xs text-ink-dim">PV = nRT; R = 0.082057 L·atm·mol⁻¹·K⁻¹</p></div>
      <div className="rounded-xl border border-border bg-bg p-2"><svg viewBox="0 0 330 170" role="img" aria-label="Pressure versus volume graph for selected temperature and amount" className="w-full"><line x1="35" y1="15" x2="35" y2="145" stroke="var(--color-ink-dim)" /><line x1="35" y1="145" x2="315" y2="145" stroke="var(--color-ink-dim)" /><path d={curve} fill="none" stroke="var(--color-blue)" strokeWidth="3" /><text x="175" y="164" fill="var(--color-ink-dim)" fontSize="10" textAnchor="middle">Volume (L)</text><text x="12" y="80" fill="var(--color-ink-dim)" fontSize="10" textAnchor="middle" transform="rotate(-90 12 80)">Pressure (atm)</text></svg></div>
    </div>
    <p className="text-sm">At fixed temperature and amount, increasing volume lowers pressure. Increasing temperature or moles raises pressure at the same volume.</p>
  </LabFrame>;
}

function PhLab({ title }: { title?: string }) {
  const [concentration, setConcentration] = useState(1e-7);
  const pH = -Math.log10(concentration);
  const color = pH < 7 ? "#fb7185" : pH > 7 ? "#60a5fa" : "#34d399";
  return <LabFrame title={title ?? "Explore strong-acid pH"}>
    <RangeControl label="Hydrogen ion concentration [H⁺]" value={Math.round(-Math.log10(concentration))} min={0} max={14} onChange={(v) => setConcentration(10 ** -v)} output={concentration.toExponential(0) + " M"} />
    <div className="rounded-xl border border-border bg-bg p-4">
      <div className="mb-3 flex items-baseline justify-between"><span className="text-sm text-ink-dim">Calculated pH</span><strong className="text-3xl" style={{ color }}>{pH.toFixed(1)}</strong></div>
      <div className="flex h-5 overflow-hidden rounded-full">{Array.from({length:14},(_,i)=><div key={i} className="flex-1" style={{background:`hsl(${350-i*13}, 75%, 60%)`}} />)}</div>
      <div className="mt-2 flex justify-between text-xs text-ink-dim"><span>More acidic</span><span>Neutral (7)</span><span>More basic</span></div>
    </div>
    <p className="text-sm">For a strong monoprotic acid in dilute water at 25 °C, assume complete dissociation so [H⁺] is approximately the acid concentration. pH = −log[H⁺]. Changing [H⁺] by a factor of 10 changes pH by one unit in the opposite direction.</p>
  </LabFrame>;
}
