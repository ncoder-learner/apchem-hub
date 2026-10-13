"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface TopicLabProps { unitId: number; topicNumber: string; title: string; }
type Change = (value: number) => void;

function Slider({ label, min, max, step, value, onChange, suffix = "" }: {
  label: string; min: number; max: number; step: number; value: number; onChange: Change; suffix?: string;
}) {
  return <label className="block py-2">
    <span className="mb-1 flex justify-between gap-3 text-sm text-ink-dim"><span>{label}</span><strong className="text-ink">{Number(value.toFixed(3))}{suffix}</strong></span>
    <input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full accent-emerald-400" />
    <span className="flex justify-between text-xs text-ink-dim"><span>{min}{suffix}</span><span>{max}{suffix}</span></span>
  </label>;
}
function Frame({ unit, title, takeaway, children }: { unit: string; title: string; takeaway: string; children: ReactNode }) {
  return <section className="my-10 rounded-2xl border border-emerald-400/30 bg-card p-5 sm:p-7" aria-label={title}>
    <div className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-emerald-300">Interactive lab · {unit}</div>
    <h2 className="mb-2 text-xl font-bold text-ink">{title}</h2>
    <p className="mb-5 text-sm leading-relaxed text-ink-dim">Change one variable at a time. Predict the result first, then use the live model to check your reasoning. Values are illustrative unless identified as calculated from a stated equation.</p>
    {children}
    <div className="mt-5 rounded-lg border-l-2 border-emerald-300 bg-emerald-300/5 px-4 py-3 text-sm leading-relaxed text-ink"><strong>What to notice:</strong> {takeaway}</div>
  </section>;
}
function Bars({ rows }: { rows: {label:string;value:number;max:number;color:string}[] }) {
  return <div className="space-y-4 rounded-xl border border-border bg-bg/50 p-4">{rows.map(r=><div key={r.label}><div className="mb-1 flex justify-between text-xs"><span>{r.label}</span><span>{Number(r.value.toFixed(2))}</span></div><div className="h-3 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full" style={{width:Math.max(0,Math.min(100,r.value/r.max*100))+"%",background:r.color}} /></div></div>)}</div>;
}
function UnitOne() {
  const [across,setAcross]=useState(3); const [shells,setShells]=useState(2);
  const radius=180-across*13+(shells-1)*35, ie=450+across*115-(shells-1)*95;
  return <Frame unit="1 · Atomic structure" title="Explore periodic trends" takeaway="Across a period, effective nuclear charge generally increases while the principal energy level stays the same, so atomic radius tends to decrease and first ionization energy tends to increase. Added shells change the comparison down a group.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Position across a period" min={0} max={6} step={1} value={across} onChange={setAcross}/><Slider label="Occupied principal shells" min={1} max={4} step={1} value={shells} onChange={setShells}/><Bars rows={[{label:"Illustrative atomic radius (pm)",value:radius,max:220,color:"#5aa9ff"},{label:"Illustrative first ionization energy",value:ie,max:1200,color:"#34d399"}]}/><p className="mt-2 text-xs text-ink-dim">Schematic trend model; these are not measured values for a particular element.</p></div><div className="flex items-center justify-center rounded-xl border border-border bg-bg/50"><svg viewBox="0 0 280 220" className="w-full max-w-xs" role="img" aria-label="Schematic atom with adjustable electron shells">{Array.from({length:shells},(_,i)=><circle key={i} cx="140" cy="105" r={30+i*24} fill="none" stroke="#5aa9ff" strokeDasharray="4 4"/>)}<circle cx="140" cy="105" r="15" fill="#f5c454"/>{Array.from({length:shells},(_,i)=><circle key={i} cx={140+Math.cos(across*.7+i*2)*(30+i*24)} cy={105+Math.sin(across*.7+i*2)*(30+i*24)} r="5" fill="#34d399"/>)}<text x="140" y="198" textAnchor="middle" fontSize="11" fill="var(--color-ink-dim)">Schematic, not to scale</text></svg></div></div>
  </Frame>;
}
function UnitTwo() {
  const [distance,setDistance]=useState(1.2); const [depth,setDepth]=useState(70);
  const energy=depth*(Math.pow(1/distance,12)-2*Math.pow(1/distance,6));
  const points=Array.from({length:80},(_,i)=>{const x=.72+i*2.8/79;const y=depth*(1/Math.pow(x,12)-2/Math.pow(x,6));return {x,y};});
  const minY=-depth,maxY=depth*2.5; const path=points.map((p,i)=>(i?"L":"M")+(35+i*4.8)+","+(15+(maxY-p.y)/(maxY-minY)*145)).join(" ");
  return <Frame unit="2 · Bonding" title="Bond potential-energy curve" takeaway="The minimum is the most stable internuclear distance. Moving atoms closer than this causes strong repulsion; separating them requires energy to overcome attraction. A deeper well corresponds to a stronger bond in this simplified model.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Internuclear distance" min={.8} max={3.5} step={.05} value={distance} onChange={setDistance} suffix=" relative"/><Slider label="Potential well depth" min={30} max={100} step={5} value={depth} onChange={setDepth}/><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Energy at current distance</div><div className="text-2xl font-bold">{Number(energy.toFixed(2))} relative units</div></div></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 440 210" className="w-full" role="img" aria-label="Schematic bond potential energy curve"><line x1="35" y1="160" x2="420" y2="160" stroke="var(--color-ink-dim)"/><line x1="35" y1="15" x2="35" y2="160" stroke="var(--color-ink-dim)"/><path d={path} fill="none" stroke="#34d399" strokeWidth="3"/><text x="225" y="192" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="12">Internuclear distance →</text><circle cx={35+(distance-.72)/2.8*379} cy={15+(maxY-energy)/(maxY-minY)*145} r="5" fill="#f5c454"/></svg><p className="text-xs text-ink-dim">Lennard-Jones-style shape, scaled for visualization; not a fitted molecular potential.</p></div></div>
  </Frame>;
}
function UnitThree() {
  const [v,setV]=useState(5);const [t,setT]=useState(300);const [n,setN]=useState(1);const p=n*.082057*t/v;
  return <Frame unit="3 · States of matter" title="Ideal-gas relationship explorer" takeaway="For a fixed amount of gas at constant temperature, increasing volume lowers pressure. Raising absolute temperature increases pressure if volume is fixed. Use kelvin in PV = nRT.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Volume" min={2} max={10} step={.5} value={v} onChange={setV} suffix=" L"/><Slider label="Temperature" min={200} max={600} step={10} value={t} onChange={setT} suffix=" K"/><Slider label="Amount of gas" min={.5} max={3} step={.5} value={n} onChange={setN} suffix=" mol"/><div className="rounded-lg border border-border p-4"><div className="text-xs text-ink-dim">Calculated pressure</div><div className="text-3xl font-bold">{p.toFixed(2)} atm</div><div className="text-xs text-ink-dim">P = nRT/V</div></div></div><Bars rows={[{label:"Pressure",value:p,max:25,color:"#34d399"},{label:"Temperature (scaled)",value:t/25,max:24,color:"#f5c454"},{label:"Volume (scaled inverse)",value:10/v*5,max:25,color:"#5aa9ff"}]}/></div>
  </Frame>;
}
function UnitFour() {
  const [a,setA]=useState(4);const [b,setB]=useState(6);const extent=Math.min(a,b/2);const leftA=a-extent;const leftB=b-2*extent;
  return <Frame unit="4 · Reactions" title="Find the limiting reactant" takeaway="For A + 2B → products, each reaction event consumes one A and two B. The limiting reactant runs out first. Compare available amount divided by the stoichiometric coefficient, not just raw amounts.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Starting A" min={1} max={12} step={1} value={a} onChange={setA} suffix=" mol"/><Slider label="Starting B" min={1} max={20} step={1} value={b} onChange={setB} suffix=" mol"/><div className="mt-4 space-y-2 text-sm"><p>Product formed: <strong>{extent.toFixed(2)} mol</strong></p><p>A remaining: <strong>{leftA.toFixed(2)} mol</strong></p><p>B remaining: <strong>{leftB.toFixed(2)} mol</strong></p><p className="font-semibold text-emerald-300">Limiting reactant: {a<b/2?"A":b/2<a?"B":"Neither; exact ratio"}</p></div></div><Bars rows={[{label:"A initially",value:a,max:20,color:"#5aa9ff"},{label:"B initially",value:b,max:20,color:"#f5c454"},{label:"A remaining",value:leftA,max:20,color:"#5aa9ff"},{label:"B remaining",value:leftB,max:20,color:"#f5c454"}]}/></div>
  </Frame>;
}
function UnitFive() {
  const [order,setOrder]=useState(1);const [k,setK]=useState(.25);const [initial,setInitial]=useState(1);
  const points=Array.from({length:41},(_,i)=>{const time=i*.25;let c=initial;if(order===0)c=Math.max(0,initial-k*time);if(order===1)c=initial*Math.exp(-k*time);if(order===2)c=initial/(1+k*initial*time);return {time,c};});
  const value=points[20].c;const path=points.map((p,i)=>(i?"L":"M")+(35+i*9.3)+","+(15+(1-p.c/2)*145)).join(" ");
  return <Frame unit="5 · Kinetics" title="Change the rate law and watch concentration change" takeaway="Reaction order changes the mathematical shape of a concentration–time curve. The slope at a point is the instantaneous rate; the integrated law tells how concentration evolves over time.">
    <div className="grid gap-5 md:grid-cols-2"><div><label className="mb-1 block text-sm text-ink-dim" htmlFor="kinetics-order">Reaction order</label><select id="kinetics-order" value={order} onChange={e=>setOrder(Number(e.target.value))} className="mb-3 w-full rounded-lg border border-border bg-bg px-3 py-2"><option value={0}>Zero order</option><option value={1}>First order</option><option value={2}>Second order</option></select><Slider label="Rate constant (illustrative)" min={.05} max={.5} step={.05} value={k} onChange={setK}/><Slider label="Initial concentration" min={.5} max={2} step={.25} value={initial} onChange={setInitial} suffix=" M"/><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Concentration at t = 5</div><div className="text-2xl font-bold">{value.toFixed(3)} M</div><div className="mt-1 text-xs text-ink-dim">{order===0?"[A] = [A]₀ − kt":order===1?"[A] = [A]₀e⁻ᵏᵗ":"[A] = [A]₀/(1 + k[A]₀t)"}</div></div></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 440 210" className="w-full" role="img" aria-label="Concentration versus time curve"><line x1="35" y1="160" x2="420" y2="160" stroke="var(--color-ink-dim)"/><line x1="35" y1="15" x2="35" y2="160" stroke="var(--color-ink-dim)"/><path d={path} fill="none" stroke="#34d399" strokeWidth="3"/><text x="225" y="192" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="12">Time →</text><text x="15" y="88" transform="rotate(-90 15 88)" fill="var(--color-ink-dim)" fontSize="11">[A] (M)</text></svg><p className="text-xs text-ink-dim">Idealized model; compare shapes, not real-world rate constants across different orders.</p></div></div>
  </Frame>;
}
function UnitSix() {
  const [h,setH]=useState(-40);const [temp,setTemp]=useState(298);const [s,setS]=useState(-80);const dg=h-temp*s/1000;
  return <Frame unit="6 · Thermodynamics" title="Test spontaneity with Gibbs energy" takeaway="At a specified temperature, ΔG = ΔH − TΔS. Negative ΔG means thermodynamically favorable under the stated conditions, not necessarily fast. Temperature is in kelvin and entropy units must be converted to match enthalpy.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Enthalpy change ΔH" min={-100} max={100} step={5} value={h} onChange={setH} suffix=" kJ/mol"/><Slider label="Temperature" min={100} max={800} step={10} value={temp} onChange={setTemp} suffix=" K"/><Slider label="Entropy change ΔS" min={-200} max={200} step={10} value={s} onChange={setS} suffix=" J/(mol·K)"/></div><div className="flex flex-col justify-center rounded-xl border border-border p-5"><div className="text-sm text-ink-dim">Calculated Gibbs energy</div><div className="my-2 text-3xl font-bold">{dg.toFixed(2)} kJ/mol</div><div className={dg<0?"text-emerald-300":dg>0?"text-rose-300":"text-amber-300"}>{dg<0?"Thermodynamically favorable":dg>0?"Not favorable as written":"At boundary (ΔG = 0)"}</div><p className="mt-3 text-sm text-ink-dim">ΔG = {h} − ({temp} × {s}/1000)</p></div></div>
  </Frame>;
}
function UnitSeven() {
  const [k,setK]=useState(10);const [q,setQ]=useState(4);
  return <Frame unit="7 · Equilibrium" title="Compare Q with K" takeaway="Q and K use the same expression but different current conditions. Q < K favors the forward direction; Q > K favors the reverse direction; Q = K means equilibrium. This predicts direction, not final concentrations.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Equilibrium constant K" min={1} max={20} step={1} value={k} onChange={setK}/><Slider label="Reaction quotient Q" min={1} max={20} step={1} value={q} onChange={setQ}/></div><div className="flex flex-col justify-center rounded-xl border border-border p-5"><div className="flex items-baseline gap-5"><div><div className="text-xs text-ink-dim">Q</div><div className="text-3xl font-bold">{q}</div></div><div className="text-xl text-ink-dim">vs.</div><div><div className="text-xs text-ink-dim">K</div><div className="text-3xl font-bold">{k}</div></div></div><p className="mt-4 text-lg font-semibold text-emerald-300">{q<k?"Shift forward, toward products":q>k?"Shift reverse, toward reactants":"At equilibrium; no net shift"}</p></div></div>
  </Frame>;
}
function UnitEight() {
  const [c,setC]=useState(.01);const [ka,setKa]=useState(.000018);
  const x=(-ka+Math.sqrt(ka*ka+4*ka*c))/2;const ph=-Math.log10(x);
  return <Frame unit="8 · Acids and bases" title="Explore a weak-acid equilibrium" takeaway="Diluting a weak acid changes hydrogen-ion concentration and percent ionization. Solve Ka = x²/(C − x) instead of assuming complete dissociation as you would for a strong acid.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Initial HA concentration" min={.001} max={.1} step={.001} value={c} onChange={setC} suffix=" M"/><Slider label="Acid ionization constant Ka" min={.000001} max={.001} step={.000001} value={ka} onChange={setKa}/></div><div className="grid grid-cols-2 gap-3"><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Estimated pH</div><div className="text-2xl font-bold">{ph.toFixed(2)}</div></div><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Percent ionized</div><div className="text-2xl font-bold">{(x/c*100).toFixed(1)}%</div></div><p className="col-span-2 rounded-lg border border-border p-3 text-xs text-ink-dim">Calculated from the quadratic solution to Ka = x²/(C − x), assuming ideal dilute-solution behavior.</p></div></div>
  </Frame>;
}
function UnitNine() {
  const [cathode,setCathode]=useState(.8);const [anode,setAnode]=useState(-.34);const [n,setN]=useState(2);const e=cathode-anode;const dg=-n*96485*e/1000;
  return <Frame unit="9 · Electrochemistry" title="Build a galvanic cell" takeaway="E°cell = E°cathode − E°anode when both values are reduction potentials. Positive E°cell gives negative ΔG° for the spontaneous forward reaction. Do not multiply electrode potentials by stoichiometric coefficients.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Cathode reduction potential" min={-1.5} max={1.5} step={.01} value={cathode} onChange={setCathode} suffix=" V"/><Slider label="Anode reduction potential" min={-1.5} max={1.5} step={.01} value={anode} onChange={setAnode} suffix=" V"/><Slider label="Electrons transferred n" min={1} max={6} step={1} value={n} onChange={setN}/></div><div className="rounded-xl border border-border p-5"><div className="text-sm text-ink-dim">Cell potential</div><div className="text-3xl font-bold">{e.toFixed(2)} V</div><div className="mt-4 text-sm text-ink-dim">ΔG° = −nFE°cell</div><div className="text-2xl font-semibold">{dg.toFixed(2)} kJ/mol</div><p className={e>0?"mt-3 text-emerald-300":e<0?"mt-3 text-rose-300":"mt-3 text-amber-300"}>{e>0?"Spontaneous as written":e<0?"Nonspontaneous as written":"At standard-state boundary"}</p></div></div>
  </Frame>;
}
export function TopicLab({ unitId, topicNumber, title }: TopicLabProps) {
  const labs: Record<number, React.ReactNode> = {1:<UnitOne/>,2:<UnitTwo/>,3:<UnitThree/>,4:<UnitFour/>,5:<UnitFive/>,6:<UnitSix/>,7:<UnitSeven/>,8:<UnitEight/>,9:<UnitNine/>};
  return <div data-topic={topicNumber} data-title={title}>{labs[unitId] ?? null}</div>;
}
