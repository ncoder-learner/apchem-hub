"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface Props { topicNumber: string; }
function Slider({ label, min, max, step, value, onChange, suffix = "" }: {
  label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void; suffix?: string;
}) {
  return <label className="block py-2">
    <span className="mb-1 flex justify-between gap-3 text-sm text-ink-dim"><span>{label}</span><strong className="text-ink">{Number(value.toFixed(3))}{suffix}</strong></span>
    <input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full accent-emerald-400" />
    <span className="flex justify-between text-xs text-ink-dim"><span>{min}{suffix}</span><span>{max}{suffix}</span></span>
  </label>;
}
function LabFrame({ title, takeaway, children }: { title: string; takeaway: string; children: ReactNode }) {
  return <section className="my-10 rounded-2xl border border-emerald-400/30 bg-card p-5 sm:p-7" aria-label={title}>
    <div className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-emerald-300">Interactive lab · Unit 7</div>
    <h2 className="mb-2 text-xl font-bold text-ink">{title}</h2>
    <p className="mb-5 text-sm leading-relaxed text-ink-dim">Change a variable, predict the chemical response, and then compare your prediction with the model. Values are illustrative unless calculated from the displayed expression.</p>
    {children}
    <div className="mt-5 rounded-lg border-l-2 border-emerald-300 bg-emerald-300/5 px-4 py-3 text-sm leading-relaxed text-ink"><strong>What to notice:</strong> {takeaway}</div>
  </section>;
}
function Metric({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">{label}</div><div className="mt-1 text-2xl font-bold text-ink">{value}</div>{note && <p className="mt-1 text-xs text-ink-dim">{note}</p>}</div>;
}
export function UnitSevenLab({ topicNumber }: Props) {
  const [forwardRate, setForwardRate] = useState(6);
  const [reverseRate, setReverseRate] = useState(3);
  const [q, setQ] = useState(4);
  const [k, setK] = useState(10);
  const [a, setA] = useState(0.5);
  const [b, setB] = useState(0.2);
  const [c, setC] = useState(0.1);
  const [baseK, setBaseK] = useState(3);
  const [operation, setOperation] = useState(0);
  const [x, setX] = useState(0.3);
  const [time, setTime] = useState(5);
  const [added, setAdded] = useState(2);
  const [volume, setVolume] = useState(5);
  const [s, setS] = useState(0.02);
  const [common, setCommon] = useState(0.01);

  const direction = q < k ? "Net forward, toward products" : q > k ? "Net reverse, toward reactants" : "At equilibrium";
  const directionColor = q === k ? "text-amber-300" : "text-emerald-300";
  const kc = c / (a * b * b);
  const transformedK = operation === 0 ? 1 / baseK : operation === 1 ? baseK ** 2 : Math.sqrt(baseK);
  const qsp = s * common;
  const ksp = 0.0001;
  const phase = Number(time.toFixed(1));
  const [mode, setMode] = useState(0);

  if (topicNumber === "7.1") return <LabFrame title="Watch a dynamic equilibrium settle" takeaway="Equilibrium is reached when forward and reverse rates match. The rates do not have to be zero, and equilibrium concentrations need not be equal.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Forward rate" min={0} max={10} step={1} value={forwardRate} onChange={setForwardRate}/><Slider label="Reverse rate" min={0} max={10} step={1} value={reverseRate} onChange={setReverseRate}/></div><div className="space-y-3"><Metric label="Net rate" value={String(forwardRate-reverseRate)} note="Positive = net forward; negative = net reverse"/><div className="h-5 overflow-hidden rounded-full bg-white/5"><div className="h-full bg-emerald-400" style={{width:(Math.min(forwardRate,reverseRate)/10*100)+"%"}}/></div><p className="text-sm">{forwardRate===reverseRate?"Rates match: dynamic equilibrium.":"Not at equilibrium: the faster direction controls the net change."}</p></div></div>
  </LabFrame>;

  if (topicNumber === "7.2" || topicNumber === "7.3" || topicNumber === "7.10") return <LabFrame title={topicNumber==="7.2"?"Predict the net reaction direction":topicNumber==="7.3"?"Compare reaction quotient Q with K":"Model a disturbance with Q and K"} takeaway="Q and K use the same expression. Q < K means net forward reaction; Q > K means net reverse reaction; Q = K means equilibrium. At constant temperature, concentration disturbances change Q, not K.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Reaction quotient Q" min={0} max={20} step={0.5} value={q} onChange={setQ}/><Slider label="Equilibrium constant K" min={0} max={20} step={0.5} value={k} onChange={setK}/>{topicNumber==="7.10"&&<Slider label="Added product (illustrative)" min={0} max={5} step={0.5} value={added} onChange={v=>{setAdded(v);setQ(Math.min(20,q+v));}}/>}</div><div className="flex flex-col justify-center rounded-xl border border-border p-5"><div className="flex gap-8"><Metric label="Q" value={q.toFixed(1)}/><Metric label="K" value={k.toFixed(1)}/></div><p className={"mt-4 text-lg font-semibold "+directionColor}>{direction}</p></div></div>
  </LabFrame>;

  if (topicNumber === "7.4") return <LabFrame title="Calculate an equilibrium constant" takeaway="Build the expression from the balanced equation, use equilibrium concentrations, and keep coefficients as exponents.">
    <div className="grid gap-5 md:grid-cols-2"><div><p className="mb-2 text-sm font-semibold">For A + 2B ⇌ C, Kc = [C]/([A][B]²)</p><Slider label="[A] at equilibrium" min={0.1} max={2} step={0.1} value={a} onChange={setA} suffix=" M"/><Slider label="[B] at equilibrium" min={0.1} max={2} step={0.1} value={b} onChange={setB} suffix=" M"/><Slider label="[C] at equilibrium" min={0.1} max={2} step={0.1} value={c} onChange={setC} suffix=" M"/></div><Metric label="Calculated Kc" value={kc.toFixed(3)} note="Using the displayed concentration expression"/></div>
  </LabFrame>;

  if (topicNumber === "7.5") return <LabFrame title="Explore the magnitude of K" takeaway="Large K generally means products are favored, and small K generally means reactants are favored. K describes equilibrium composition, not reaction speed.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="K (logarithmic interpretation)" min={0.001} max={1000} step={1} value={k} onChange={setK}/><p className="text-sm text-ink-dim">Move K across several orders of magnitude to compare the qualitative equilibrium position.</p></div><div className="rounded-xl border border-border p-5"><Metric label="K" value={k.toPrecision(3)}/><p className="mt-3 text-lg font-semibold">{k>10?"Products strongly favored":k<0.1?"Reactants strongly favored":"Neither side is overwhelmingly favored by this value alone"}</p></div></div>
  </LabFrame>;

  if (topicNumber === "7.6") return <LabFrame title="Transform K when the equation changes" takeaway="Reverse a reaction to use 1/K; multiply all coefficients by n to use Kⁿ; add reactions to multiply their adjusted equilibrium constants.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Original K" min={0.1} max={10} step={0.1} value={baseK} onChange={setBaseK}/><label className="block text-sm text-ink-dim">Equation operation<select className="mt-1 block w-full rounded-lg border border-border bg-bg p-2 text-ink" value={operation} onChange={e=>setOperation(Number(e.target.value))}><option value={0}>Reverse reaction</option><option value={1}>Double coefficients</option><option value={2}>Halve coefficients</option></select></label></div><Metric label="Transformed K" value={transformedK.toFixed(4)} note={operation===0?"1/K":operation===1?"K²":"√K"}/></div>
  </LabFrame>;

  if (topicNumber === "7.7") return <LabFrame title="Build an ICE table for A ⇌ B" takeaway="For a 1:1 reaction, the change in A is −x and the change in B is +x. Use the equilibrium row in K and reject roots that produce impossible concentrations.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Reaction progress x" min={0} max={0.9} step={0.05} value={x} onChange={setX}/><p className="text-sm text-ink-dim">Assume initial [A] = 1.00 M and [B] = 0.00 M.</p></div><div className="overflow-x-auto rounded-xl border border-border"><table className="w-full text-sm"><thead><tr><th className="p-2 text-left">Row</th><th className="p-2">[A]</th><th className="p-2">[B]</th></tr></thead><tbody><tr><td className="p-2">Initial</td><td className="p-2">1.00</td><td className="p-2">0.00</td></tr><tr><td className="p-2">Change</td><td className="p-2">−{x.toFixed(2)}</td><td className="p-2">+{x.toFixed(2)}</td></tr><tr><td className="p-2">Equilibrium</td><td className="p-2">{(1-x).toFixed(2)} M</td><td className="p-2">{x.toFixed(2)} M</td></tr></tbody></table><div className="border-t border-border p-3 text-sm">K for this state = {(x/(1-x)).toFixed(3)}</div></div></div>
  </LabFrame>;

  if (topicNumber === "7.8") return <LabFrame title="Read an equilibrium concentration graph" takeaway="Concentrations plateau at equilibrium but can plateau at different values. After a disturbance, concentrations change again before settling.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Time" min={0} max={10} step={0.5} value={time} onChange={setTime} suffix=" s"/><Metric label="Model phase" value={phase<3?"Approaching":phase<7?"Settling":"Plateau"}/></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 320 180" className="w-full" role="img" aria-label="Schematic concentration-time curves approaching equilibrium"><line x1="30" y1="145" x2="300" y2="145" stroke="var(--color-ink-dim)"/><line x1="30" y1="15" x2="30" y2="145" stroke="var(--color-ink-dim)"/><path d="M30 30 Q100 130 290 130" fill="none" stroke="#5aa9ff" strokeWidth="3"/><path d="M30 135 Q100 40 290 40" fill="none" stroke="#34d399" strokeWidth="3"/><line x1={30+time*26} y1="15" x2={30+time*26} y2="145" stroke="#f5c454" strokeDasharray="4 3"/><text x="160" y="169" textAnchor="middle" fontSize="11" fill="var(--color-ink-dim)">Time →</text></svg><p className="text-xs text-ink-dim">Schematic curves; heights are illustrative, not data for a named reaction.</p></div></div>
  </LabFrame>;

  if (topicNumber === "7.9") return <LabFrame title="Test Le Châtelier responses" takeaway="At constant temperature, adding reactant or removing product usually shifts forward. A volume decrease favors the side with fewer gas moles only when the gas coefficients differ.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Added reactant (relative amount)" min={0} max={5} step={0.5} value={added} onChange={setAdded}/><Slider label="Container volume" min={2} max={10} step={0.5} value={volume} onChange={setVolume}/><label className="block text-sm text-ink-dim">Gas stoichiometry<select className="mt-1 block w-full rounded-lg border border-border bg-bg p-2 text-ink" value={mode} onChange={e=>setMode(Number(e.target.value))}><option value={0}>Fewer gas moles on product side</option><option value={1}>Equal gas moles on both sides</option><option value={2}>Fewer gas moles on reactant side</option></select></label></div><div className="rounded-xl border border-border p-5"><Metric label="Concentration effect" value={added>0?"Forward tendency":"No added-reactant disturbance"}/><Metric label="Volume effect" value={mode===1?"No favored side":(volume<5)===(mode===0)?"Forward tendency":"Reverse tendency"}/><p className="mt-2 text-xs text-ink-dim">Assumes temperature is constant and the reacting gases behave ideally.</p></div></div>
  </LabFrame>;

  if (topicNumber === "7.11") return <LabFrame title="Connect Ksp with molar solubility" takeaway="For MX(s) ⇌ M⁺ + X⁻, Ksp = s² in pure water. For MX₂(s) ⇌ M²⁺ + 2X⁻, Ksp = 4s³; the stoichiometry changes the solubility calculation.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Molar solubility s" min={0.001} max={0.1} step={0.001} value={s} onChange={setS} suffix=" M"/><label className="block text-sm text-ink-dim">Dissolution stoichiometry<select className="mt-1 block w-full rounded-lg border border-border bg-bg p-2 text-ink" value={mode} onChange={e=>setMode(Number(e.target.value))}><option value={0}>MX ⇌ M⁺ + X⁻</option><option value={1}>MX₂ ⇌ M²⁺ + 2X⁻</option></select></label></div><div className="grid grid-cols-2 gap-3"><Metric label="[M]" value={s.toFixed(3)+" M"}/><Metric label="[X]" value={(mode===0?s:2*s).toFixed(3)+" M"}/><div className="col-span-2"><Metric label="Calculated Ksp" value={(mode===0?s*s:4*s*s*s).toExponential(3)}/></div></div></div>
  </LabFrame>;

  return <LabFrame title="Model the common-ion effect" takeaway="Adding a common ion raises Qsp above Ksp, so precipitation is favored and the dissolved amount decreases. Ksp itself stays constant at fixed temperature.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Dissolved cation concentration" min={0.001} max={0.1} step={0.001} value={s} onChange={setS} suffix=" M"/><Slider label="Common-ion concentration" min={0.001} max={0.1} step={0.001} value={common} onChange={setCommon} suffix=" M"/></div><div className="rounded-xl border border-border p-5"><Metric label="Ion product Qsp (1:1 salt)" value={qsp.toExponential(3)}/><Metric label="Illustrative Ksp" value={ksp.toExponential(1)}/><p className={"mt-3 font-semibold "+(qsp>ksp?"text-amber-300":qsp<ksp?"text-emerald-300":"text-ink")}>{qsp>ksp?"Qsp > Ksp: precipitation favored":qsp<ksp?"Qsp < Ksp: solution unsaturated":"Qsp = Ksp: saturated equilibrium"}</p><p className="mt-2 text-xs text-ink-dim">Illustrative 1:1 salt; actual concentrations and Ksp must come from the problem.</p></div></div>
  </LabFrame>;
}
