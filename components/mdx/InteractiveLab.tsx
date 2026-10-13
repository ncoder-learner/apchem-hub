"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

type LabKind = "kinetics" | "rate-law" | "collision" | "energy-profile" | "balance" | "gas-law" | "ph" | "net-ionic" | "stoichiometry" | "titration" | "reaction-types" | "particles" | "redox" | "coulomb" | "bond-energy" | "beer-lambert" | "lewis" | "photon";

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
  if (kind === "net-ionic") return <NetIonicLab title={title} />;
  if (kind === "stoichiometry") return <StoichiometryLab title={title} />;
  if (kind === "titration") return <TitrationLab title={title} />;
  if (kind === "reaction-types") return <ReactionTypesLab title={title} />;
  if (kind === "particles") return <ParticleChangeLab title={title} />;
  if (kind === "redox") return <RedoxLab title={title} />;
  if (kind === "coulomb") return <CoulombLab title={title} />;
  if (kind === "bond-energy") return <BondEnergyLab title={title} />;
  if (kind === "beer-lambert") return <BeerLambertLab title={title} />;
  if (kind === "lewis") return <LewisLab title={title} />;
  if (kind === "photon") return <PhotonLab title={title} />;
  return <KineticsLab title={title} />;
}

function LabFrame({ title, children }: { title: string; children: ReactNode }) {
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


function NetIonicLab({ title }: { title?: string }) {
  const [mixed, setMixed] = useState(false);
  return <LabFrame title={title ?? "Mix solutions and identify spectator ions"}>
    <p className="text-sm text-ink-dim">Mix aqueous silver nitrate and sodium chloride. Select the button to see what happens when the ions meet.</p>
    <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-border bg-bg p-3"><p className="font-semibold">Solution A: AgNO₃(aq)</p><p className="mt-2 text-sm">Ag⁺(aq) + NO₃⁻(aq)</p><div className="mt-2 flex gap-2"><span className="rounded-full bg-white/10 px-3 py-1 text-sm">Ag⁺</span><span className="rounded-full bg-white/10 px-3 py-1 text-sm">NO₃⁻</span></div></div><div className="rounded-xl border border-border bg-bg p-3"><p className="font-semibold">Solution B: NaCl(aq)</p><p className="mt-2 text-sm">Na⁺(aq) + Cl⁻(aq)</p><div className="mt-2 flex gap-2"><span className="rounded-full bg-white/10 px-3 py-1 text-sm">Na⁺</span><span className="rounded-full bg-white/10 px-3 py-1 text-sm">Cl⁻</span></div></div></div>
    <button type="button" onClick={()=>setMixed(v=>!v)} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-white/[0.05]">{mixed ? "Separate the solutions" : "Mix the solutions"}</button>
    {mixed && <div className="rounded-xl border border-amber-300/30 bg-amber-300/5 p-4"><p className="font-semibold">AgCl(s) precipitates</p><p className="mt-2 text-sm">Ag⁺(aq) + Cl⁻(aq) → AgCl(s)</p><p className="mt-2 text-sm text-ink-dim">Na⁺ and NO₃⁻ remain dissolved and unchanged, so they are spectator ions and cancel from the complete ionic equation.</p><p className="mt-2 text-sm font-semibold">Net ionic equation: Ag⁺(aq) + Cl⁻(aq) → AgCl(s)</p></div>}
  </LabFrame>;
}

function StoichiometryLab({ title }: { title?: string }) {
  const [h2, setH2] = useState(4);
  const [o2, setO2] = useState(2);
  const water = Math.min(h2, 2*o2);
  const leftoverH = h2-water;
  const leftoverO = o2-water/2;
  return <LabFrame title={title ?? "Find the limiting reactant"}>
    <p className="text-sm text-ink-dim">For 2H₂ + O₂ → 2H₂O, compare the available mole amounts to the 2:1 ratio. These sliders represent moles, not coefficients.</p>
    <div className="grid gap-4 sm:grid-cols-2"><RangeControl label="Available H₂" value={h2} min={1} max={8} onChange={setH2} output={h2+" mol"} /><RangeControl label="Available O₂" value={o2} min={1} max={6} onChange={setO2} output={o2+" mol"} /></div>
    <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">Water formed (maximum)</p><p className="text-xl font-semibold">{water.toFixed(1)} mol</p></div><div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">H₂ left over</p><p className="text-xl font-semibold">{leftoverH.toFixed(1)} mol</p></div><div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">O₂ left over</p><p className="text-xl font-semibold">{leftoverO.toFixed(1)} mol</p></div></div>
    <p className="text-sm">{h2/2 < o2 ? "H₂ is limiting: it runs out first." : h2/2 > o2 ? "O₂ is limiting: it runs out first." : "The reactants are in the exact stoichiometric ratio; neither is in excess."}</p>
    <p className="text-xs text-ink-dim">Assumes the reaction goes to completion and uses the balanced equation's 2:1 H₂:O₂ mole ratio.</p>
  </LabFrame>;
}

function TitrationLab({ title }: { title?: string }) {
  const [baseVolume, setBaseVolume] = useState(20);
  const [baseM, setBaseM] = useState(0.1);
  const acidM = 0.1, acidMl = 25;
  const acidMoles = acidM*acidMl/1000, baseMoles = baseM*baseVolume/1000;
  const totalL = (acidMl+baseVolume)/1000;
  const excess = acidMoles-baseMoles;
  const ph = Math.abs(excess)<0.000001 ? 7 : excess>0 ? -Math.log10(excess/totalL) : 14+Math.log10((-excess)/totalL);
  const points=Array.from({length:51},(_,i)=>{const v=i;const m=acidM*acidMl/1000-baseM*v/1000;const tv=(acidMl+v)/1000;const p=Math.abs(m)<0.000001?7:m>0?-Math.log10(m/tv):14+Math.log10((-m)/tv);return {v,p:Math.max(0,Math.min(14,p))}});
  const curve=points.map((p,i)=>`${i?"L":"M"} ${35+p.v/50*280} ${145-p.p/14*120}`).join(" ");
  const eq=acidM*acidMl/baseM;
  return <LabFrame title={title ?? "Explore a strong acid–strong base titration"}>
    <p className="text-sm text-ink-dim">25.0 mL of 0.100 M strong acid is titrated with strong base. Adjust the base concentration and volume; the curve and pH estimate update.</p>
    <div className="grid gap-4 sm:grid-cols-2"><RangeControl label="Base added" value={baseVolume} min={0} max={50} onChange={setBaseVolume} output={baseVolume.toFixed(1)+" mL"} /><RangeControl label="Base concentration" value={baseM} min={0.05} max={0.2} step={0.025} onChange={setBaseM} output={baseM.toFixed(3)+" M"} /></div>
    <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-border bg-bg p-4"><p className="text-xs text-ink-dim">Approximate pH</p><p className="text-3xl font-semibold">{ph.toFixed(2)}</p><p className="mt-2 text-xs text-ink-dim">Equivalence point at about {eq.toFixed(1)} mL added.</p></div><div className="rounded-xl border border-border bg-bg p-2"><svg viewBox="0 0 330 175" role="img" aria-label="Strong acid strong base titration curve" className="w-full"><line x1="35" y1="15" x2="35" y2="145" stroke="var(--color-ink-dim)"/><line x1="35" y1="145" x2="315" y2="145" stroke="var(--color-ink-dim)"/>{[0,7,14].map(v=><g key={v}><line x1="35" x2="315" y1={145-v/14*120} y2={145-v/14*120} stroke="var(--color-border)" strokeDasharray="3 4"/><text x="28" y={149-v/14*120} fontSize="10" textAnchor="end" fill="var(--color-ink-dim)">{v}</text></g>)}<path d={curve} fill="none" stroke="var(--color-emerald)" strokeWidth="3"/><text x="175" y="166" fontSize="10" textAnchor="middle" fill="var(--color-ink-dim)">Base added (mL)</text></svg></div></div>
    <p className="text-xs text-ink-dim">Idealized calculation for a strong monoprotic acid and strong base at 25 °C; ignores activity effects and water autoionization except at equivalence. It is a learning model, not experimental titration data.</p>
  </LabFrame>;
}

function ReactionTypesLab({ title }: { title?: string }) {
  const [kind, setKind] = useState("combustion");
  const data: Record<string,{name:string;eq:string;why:string}> = {
    synthesis:{name:"Synthesis",eq:"2Mg + O₂ → 2MgO",why:"Two reactant substances combine to form one product compound."},
    decomposition:{name:"Decomposition",eq:"2H₂O₂ → 2H₂O + O₂",why:"One reactant breaks into multiple products."},
    replacement:{name:"Single replacement",eq:"Zn + CuSO₄ → ZnSO₄ + Cu",why:"Zinc replaces copper in the compound."},
    exchange:{name:"Double replacement",eq:"AgNO₃ + NaCl → AgCl + NaNO₃",why:"Ions exchange partners; AgCl forms a precipitate in aqueous solution."},
    combustion:{name:"Combustion",eq:"CH₄ + 2O₂ → CO₂ + 2H₂O",why:"A hydrocarbon reacts with oxygen to form carbon dioxide and water in complete combustion."}
  };
  const d=data[kind];
  return <LabFrame title={title ?? "Classify reaction patterns"}>
    <label className="block space-y-1.5 text-sm"><span className="text-ink-dim">Choose a reaction pattern</span><select value={kind} onChange={e=>setKind(e.target.value)} className="w-full rounded-lg border border-border bg-bg px-3 py-2">{Object.entries(data).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}</select></label>
    <div className="rounded-xl border border-border bg-bg p-4"><p className="text-xs text-ink-dim">{d.name}</p><p className="my-3 text-xl font-semibold">{d.eq}</p><p className="text-sm">{d.why}</p></div>
    <p className="text-xs text-ink-dim">Pattern recognition is a starting point, not a replacement for checking physical states, solubility, oxidation states, and whether a reaction is actually driven under the stated conditions.</p>
  </LabFrame>;
}


function ParticleChangeLab({ title }: { title?: string }) {
  const [change, setChange] = useState("physical");
  const physical = change === "physical";
  const water = (x:number,y:number,key:string) => <g key={key}><line x1={x-5} y1={y+3} x2={x} y2={y} stroke="var(--color-ink)" strokeWidth="2"/><line x1={x+5} y1={y+3} x2={x} y2={y} stroke="var(--color-ink)" strokeWidth="2"/><circle cx={x} cy={y} r="6" fill="#fb7185"/><circle cx={x-7} cy={y+6} r="4.5" fill="#60a5fa"/><circle cx={x+7} cy={y+6} r="4.5" fill="#60a5fa"/></g>;
  const pair = (x:number,y:number,color:string,key:string) => <g key={key}><line x1={x-5} y1={y} x2={x+5} y2={y} stroke="var(--color-ink)" strokeWidth="2"/><circle cx={x-5} cy={y} r="6" fill={color}/><circle cx={x+5} cy={y} r="6" fill={color}/></g>;
  return <LabFrame title={title ?? "Physical change or chemical reaction?"}>
    <div className="flex flex-wrap gap-2"><button type="button" onClick={()=>setChange("physical")} className={`rounded-lg border px-3 py-2 text-sm ${physical?"border-emerald-400 text-emerald-300":"border-border"}`}>Melting ice (physical)</button><button type="button" onClick={()=>setChange("chemical")} className={`rounded-lg border px-3 py-2 text-sm ${!physical?"border-emerald-400 text-emerald-300":"border-border"}`}>Forming water (chemical)</button></div>
    <div className="rounded-xl border border-border bg-bg p-3"><svg viewBox="0 0 320 145" role="img" aria-label="Particle-level before and after model" className="w-full"><text x="70" y="15" fontSize="11" textAnchor="middle" fill="var(--color-ink-dim)">Before</text><text x="250" y="15" fontSize="11" textAnchor="middle" fill="var(--color-ink-dim)">After</text>
      {physical ? <>{[[42,42],[82,42],[42,83],[82,83]].map(([x,y],i)=>water(x,y,`wb${i}`))}{[[207,39],[253,55],[211,91],[268,96]].map(([x,y],i)=>water(x,y,`wa${i}`))}</> : <>{pair(48,48,"#60a5fa","h1")}{pair(48,88,"#60a5fa","h2")}{pair(104,68,"#fb7185","o2")}{water(218,53,"w1")}{water(270,87,"w2")}</>}
    </svg></div>
    <p className="text-sm">{physical ? "During melting, H₂O molecules remain H₂O. Their arrangement and freedom of motion change, but the chemical identity and covalent bonds within each molecule do not." : "The equation 2H₂ + O₂ → 2H₂O rearranges bonds: two H₂ molecules and one O₂ molecule form two water molecules. The number of each type of atom is conserved."}</p>
    <p className="text-xs text-ink-dim">Particle drawings are schematic, not to scale. A physical change alters arrangement or phase; a chemical reaction changes which atoms are bonded together.</p>
  </LabFrame>;
}

function RedoxLab({ title }: { title?: string }) {
  const [showProducts, setShowProducts] = useState(false);
  return <LabFrame title={title ?? "Track electron transfer in a redox reaction"}>
    <p className="text-sm text-ink-dim">Model: Mg(s) + Cu²⁺(aq) → Mg²⁺(aq) + Cu(s). Toggle the reaction to track oxidation numbers and electrons.</p>
    <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-border bg-bg p-4"><p className="text-xs text-ink-dim">{showProducts?"Product":"Reactant"} 1</p><p className="text-xl font-semibold">{showProducts?"Mg²⁺":"Mg(s)"}</p><p className="text-sm">Oxidation number: {showProducts?"+2":"0"}</p><p className="mt-2 text-sm">{showProducts?"Lost 2 e⁻ (oxidized)":"Can lose 2 e⁻"}</p></div><div className="rounded-xl border border-border bg-bg p-4"><p className="text-xs text-ink-dim">{showProducts?"Product":"Reactant"} 2</p><p className="text-xl font-semibold">{showProducts?"Cu(s)":"Cu²⁺(aq)"}</p><p className="text-sm">Oxidation number: {showProducts?"0":"+2"}</p><p className="mt-2 text-sm">{showProducts?"Gained 2 e⁻ (reduced)":"Can gain 2 e⁻"}</p></div></div>
    <button type="button" onClick={()=>setShowProducts(v=>!v)} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-white/[0.05]">{showProducts?"Reset to reactants":"Show electron transfer"}</button>
    {showProducts&&<p className="rounded-lg bg-emerald-400/10 p-3 text-sm">Mg is the reducing agent because it donates electrons. Cu²⁺ is the oxidizing agent because it accepts electrons. Two electrons lost equal two electrons gained.</p>}
  </LabFrame>;
}


function CoulombLab({ title }: { title?: string }) {
  const [q1,setQ1]=useState(1),[q2,setQ2]=useState(1),[r,setR]=useState(2);
  const force=q1*q2/(r*r);
  return <LabFrame title={title ?? "Explore Coulomb's law"}>
    <p className="text-sm text-ink-dim">Coulomb's law: the magnitude of electrostatic force is proportional to the product of charge magnitudes and inversely proportional to distance squared.</p>
    <div className="grid gap-4 sm:grid-cols-3"><RangeControl label="Charge magnitude 1" value={q1} min={1} max={3} onChange={setQ1} output={q1+" relative units"}/><RangeControl label="Charge magnitude 2" value={q2} min={1} max={3} onChange={setQ2} output={q2+" relative units"}/><RangeControl label="Separation distance" value={r} min={1} max={5} step={0.5} onChange={setR} output={r.toFixed(1)+" relative units"}/></div>
    <div className="rounded-xl border border-border bg-bg p-4"><svg viewBox="0 0 320 80" role="img" aria-label="Two charges with adjustable separation" className="w-full"><line x1={45} y1="40" x2={275} y2="40" stroke="var(--color-border)" strokeDasharray="4 4"/><circle cx={160-r*22} cy="40" r={10+q1*3} fill="#60a5fa"/><circle cx={160+r*22} cy="40" r={10+q2*3} fill="#fb7185"/><text x={160-r*22} y="44" fontSize="11" fill="#0a0e16" textAnchor="middle">+</text><text x={160+r*22} y="44" fontSize="11" fill="#0a0e16" textAnchor="middle">+</text><text x="160" y="13" fontSize="10" fill="var(--color-ink-dim)" textAnchor="middle">r = {r.toFixed(1)}</text></svg><p className="text-xs text-ink-dim">Schematic shows two positive charges, so the force is repulsive. Changing either charge changes force linearly; doubling distance makes force one-fourth as large.</p></div>
    <p className="text-sm">Relative force magnitude: <strong className="text-lg">{force.toFixed(3)}</strong> (proportional to |q₁q₂|/r²).</p>
    <p className="text-xs text-ink-dim">This compares magnitudes only; it omits Coulomb's constant and uses relative units, not SI force values.</p>
  </LabFrame>;
}

function BondEnergyLab({ title }: { title?: string }) {
  const [depth,setDepth]=useState(50),[r0,setR0]=useState(1.5);
  const pts=Array.from({length:51},(_,i)=>{const r=0.5+i*0.06;const y=depth*((1-Math.exp(-1.4*(r-r0)))**2-1);return {r,y}});
  const yMin=-100,yMax=100;
  const d=pts.map((p,i)=>`${i?"L":"M"} ${30+(p.r-0.5)/3*275} ${15+(yMax-p.y)/(yMax-yMin)*125}`).join(" ");
  return <LabFrame title={title ?? "Explore a bond potential-energy curve"}>
    <div className="grid gap-4 sm:grid-cols-2"><RangeControl label="Well depth (bond strength)" value={depth} min={20} max={90} step={5} onChange={setDepth} output={depth+" relative energy units"}/><RangeControl label="Equilibrium distance" value={r0} min={1} max={2.5} step={0.1} onChange={setR0} output={r0.toFixed(1)+" relative distance units"}/></div>
    <div className="rounded-xl border border-border bg-bg p-2"><svg viewBox="0 0 320 180" role="img" aria-label="Potential energy versus internuclear distance graph" className="w-full"><line x1="30" y1="78" x2="305" y2="78" stroke="var(--color-ink-dim)" strokeDasharray="3 4"/><line x1="30" y1="15" x2="30" y2="145" stroke="var(--color-ink-dim)"/><line x1="30" y1="145" x2="305" y2="145" stroke="var(--color-ink-dim)"/><path d={d} fill="none" stroke="var(--color-blue)" strokeWidth="3"/><line x1={30+(r0-0.5)/3*275} y1="15" x2={30+(r0-0.5)/3*275} y2="145" stroke="var(--color-amber)" strokeDasharray="4 4"/><text x="170" y="168" fontSize="10" fill="var(--color-ink-dim)" textAnchor="middle">Internuclear distance →</text><text x="10" y="82" fontSize="10" fill="var(--color-ink-dim)" textAnchor="middle" transform="rotate(-90 10 82)">Potential energy</text></svg></div>
    <p className="text-sm">The minimum marks the most stable separation. A deeper well means more energy is required to separate the atoms; moving too close raises energy sharply because repulsion dominates.</p>
    <p className="text-xs text-ink-dim">Schematic Morse-like potential; units are illustrative. It teaches the shape and relationships, not a fit to a specific molecule.</p>
  </LabFrame>;
}

function BeerLambertLab({ title }: { title?: string }) {
  const [c,setC]=useState(0.01),[length,setLength]=useState(1);
  const epsilon=120, absorbance=epsilon*c*length;
  const points=Array.from({length:21},(_,i)=>({c:i/20*0.02,a:epsilon*(i/20*0.02)*length}));
  const d=points.map((p,i)=>`${i?"L":"M"} ${35+p.c/0.02*275} ${140-p.a/Math.max(2,epsilon*0.02*length)*115}`).join(" ");
  return <LabFrame title={title ?? "Explore the Beer–Lambert relationship"}>
    <div className="grid gap-4 sm:grid-cols-2"><RangeControl label="Concentration" value={c} min={0} max={0.02} step={0.001} onChange={setC} output={c.toFixed(3)+" mol/L"}/><RangeControl label="Path length" value={length} min={0.5} max={2} step={0.5} onChange={setLength} output={length.toFixed(1)+" cm"}/></div>
    <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-border bg-bg p-4"><p className="text-xs text-ink-dim">Calculated absorbance</p><p className="text-3xl font-semibold">{absorbance.toFixed(3)}</p><p className="mt-2 text-xs text-ink-dim">A = εℓc; ε = 120 L·mol⁻¹·cm⁻¹ (illustrative)</p></div><div className="rounded-xl border border-border bg-bg p-2"><svg viewBox="0 0 320 165" role="img" aria-label="Absorbance versus concentration graph" className="w-full"><line x1="35" y1="15" x2="35" y2="140" stroke="var(--color-ink-dim)"/><line x1="35" y1="140" x2="310" y2="140" stroke="var(--color-ink-dim)"/><path d={d} fill="none" stroke="var(--color-emerald)" strokeWidth="3"/><circle cx={35+c/0.02*275} cy={140-absorbance/Math.max(2,epsilon*0.02*length)*115} r="5" fill="var(--color-amber)"/><text x="170" y="159" fontSize="10" fill="var(--color-ink-dim)" textAnchor="middle">Concentration (mol/L)</text></svg></div></div>
    <p className="text-sm">At fixed wavelength, ε, and path length, absorbance is directly proportional to concentration. Doubling path length also doubles absorbance in this ideal model.</p>
    <p className="text-xs text-ink-dim">Assumes a dilute solution within the linear range and a constant molar absorptivity; real measurements can deviate because of instrument and chemical effects.</p>
  </LabFrame>;
}


function LewisLab({ title }: { title?: string }) {
  const [molecule,setMolecule]=useState("water");
  const details:Record<string,{name:string;formula:string;electrons:number;description:string}> = {
    water:{name:"Water",formula:"H₂O",electrons:8,description:"Oxygen forms two single bonds and retains two lone pairs. The Lewis structure shows electron accounting, not the 3D bent shape."},
    carbonDioxide:{name:"Carbon dioxide",formula:"CO₂",electrons:16,description:"Carbon forms two double bonds. Each oxygen has two lone pairs; carbon has an octet with no lone pairs."},
    ammonia:{name:"Ammonia",formula:"NH₃",electrons:8,description:"Nitrogen forms three single bonds and retains one lone pair. That lone pair affects the molecular shape."},
    ozone:{name:"Ozone (one resonance contributor)",formula:"O₃",electrons:18,description:"One contributor has one single bond and one double bond, with formal charges. The second contributor swaps the bond positions; the real molecule is a resonance hybrid."}
  };
  const d=details[molecule];
  return <LabFrame title={title ?? "Explore Lewis structures"}>
    <label className="block space-y-1.5 text-sm"><span className="text-ink-dim">Choose a molecule</span><select value={molecule} onChange={e=>setMolecule(e.target.value)} className="w-full rounded-lg border border-border bg-bg px-3 py-2"><option value="water">H₂O — water</option><option value="carbonDioxide">CO₂ — carbon dioxide</option><option value="ammonia">NH₃ — ammonia</option><option value="ozone">O₃ — ozone resonance contributor</option></select></label>
    <div className="rounded-xl border border-border bg-bg p-3"><svg viewBox="0 0 340 150" role="img" aria-label={`Schematic Lewis structure for ${d.name}`} className="w-full">
      {molecule==="water"&&<><line x1="130" y1="82" x2="85" y2="112" stroke="var(--color-ink)" strokeWidth="3"/><line x1="210" y1="82" x2="255" y2="112" stroke="var(--color-ink)" strokeWidth="3"/><text x="170" y="87" fontSize="24" textAnchor="middle" fill="var(--color-emerald)">O</text><text x="75" y="122" fontSize="21" textAnchor="middle" fill="var(--color-ink)">H</text><text x="265" y="122" fontSize="21" textAnchor="middle" fill="var(--color-ink)">H</text>{[[160,45],[180,45],[160,105],[180,105]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.5" fill="var(--color-amber)"/>)}</>}
      {molecule==="carbonDioxide"&&<><line x1="90" y1="70" x2="140" y2="70" stroke="var(--color-ink)" strokeWidth="3"/><line x1="90" y1="78" x2="140" y2="78" stroke="var(--color-ink)" strokeWidth="3"/><line x1="200" y1="70" x2="250" y2="70" stroke="var(--color-ink)" strokeWidth="3"/><line x1="200" y1="78" x2="250" y2="78" stroke="var(--color-ink)" strokeWidth="3"/><text x="70" y="80" fontSize="23" fill="var(--color-emerald)">O</text><text x="170" y="80" fontSize="23" textAnchor="middle" fill="var(--color-ink)">C</text><text x="260" y="80" fontSize="23" fill="var(--color-emerald)">O</text>{[[55,45],[70,45],[55,105],[70,105],[270,45],[285,45],[270,105],[285,105]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.5" fill="var(--color-amber)"/>)}</>}
      {molecule==="ammonia"&&<><line x1="170" y1="73" x2="170" y2="32" stroke="var(--color-ink)" strokeWidth="3"/><line x1="150" y1="83" x2="105" y2="110" stroke="var(--color-ink)" strokeWidth="3"/><line x1="190" y1="83" x2="235" y2="110" stroke="var(--color-ink)" strokeWidth="3"/><text x="170" y="86" fontSize="23" textAnchor="middle" fill="var(--color-emerald)">N</text><text x="170" y="25" fontSize="20" textAnchor="middle" fill="var(--color-ink)">H</text><text x="95" y="123" fontSize="20" textAnchor="middle" fill="var(--color-ink)">H</text><text x="245" y="123" fontSize="20" textAnchor="middle" fill="var(--color-ink)">H</text><circle cx="162" cy="48" r="3.5" fill="var(--color-amber)"/><circle cx="178" cy="48" r="3.5" fill="var(--color-amber)"/></>}
      {molecule==="ozone"&&<><text x="65" y="82" fontSize="23" fill="var(--color-emerald)">O</text><text x="170" y="82" fontSize="23" textAnchor="middle" fill="var(--color-emerald)">O</text><text x="260" y="82" fontSize="23" fill="var(--color-emerald)">O</text><line x1="90" y1="70" x2="145" y2="70" stroke="var(--color-ink)" strokeWidth="3"/><line x1="195" y1="70" x2="250" y2="70" stroke="var(--color-ink)" strokeWidth="3"/><line x1="195" y1="78" x2="250" y2="78" stroke="var(--color-ink)" strokeWidth="3"/><text x="60" y="48" fontSize="12" fill="var(--color-amber)">−</text><text x="170" y="48" fontSize="12" fill="var(--color-amber)" textAnchor="middle">+</text></>}
    </svg></div>
    <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">Valence electrons</p><p className="text-xl font-semibold">{d.electrons}</p></div><div className="rounded-lg bg-white/[0.04] p-3"><p className="text-xs text-ink-dim">Structure to notice</p><p className="text-sm">{d.description}</p></div></div>
    <p className="text-xs text-ink-dim">Schematic 2D Lewis structures emphasize connectivity and valence-electron accounting. Use a separate geometry model to reason about 3D shape.</p>
  </LabFrame>;
}


function PhotonLab({ title }: { title?: string }) {
  const [wavelength,setWavelength]=useState(500);
  const h=6.62607015e-34,cLight=2.99792458e8,na=6.02214076e23;
  const meters=wavelength*1e-9, frequency=cLight/meters, energy=h*frequency, molar=energy*na/1000;
  return <LabFrame title={title ?? "Explore photon energy"}>
    <RangeControl label="Wavelength" value={wavelength} min={100} max={1000} step={10} onChange={setWavelength} output={wavelength+" nm"}/>
    <div className="rounded-xl border border-border bg-bg p-4"><div className="mb-3 h-5 rounded-full" style={{background:"linear-gradient(90deg,#8b5cf6,#3b82f6,#22c55e,#eab308,#f97316,#ef4444)"}}/><div className="grid gap-3 sm:grid-cols-3"><div><p className="text-xs text-ink-dim">Frequency</p><p className="text-lg font-semibold">{(frequency/1e14).toFixed(2)} × 10¹⁴ Hz</p></div><div><p className="text-xs text-ink-dim">Energy per photon</p><p className="text-lg font-semibold">{(energy/1e-19).toFixed(3)} × 10⁻¹⁹ J</p></div><div><p className="text-xs text-ink-dim">Energy per mole of photons</p><p className="text-lg font-semibold">{molar.toFixed(1)} kJ/mol</p></div></div></div>
    <p className="text-sm">Shorter wavelength means higher frequency and higher photon energy: E = hν = hc/λ. Doubling wavelength halves photon energy.</p>
    <p className="text-xs text-ink-dim">The color strip is a schematic guide to the visible spectrum. Wavelengths below about 400 nm are ultraviolet and above about 700 nm are infrared; the numeric slider includes both nonvisible regions.</p>
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
  const productY = reactantY - deltaH * 0.8;
  const peakY = reactantY - ea * 0.8;
  const catalyzedBarrier = Math.max(deltaH + 5, ea * 0.48);
  const catPeakY = reactantY - catalyzedBarrier * 0.8;
  const path = `M 34 ${reactantY} C 85 ${reactantY}, 95 ${catalyst ? catPeakY : peakY}, 145 ${catalyst ? catPeakY : peakY} S 205 ${productY}, 270 ${productY}`;
  return <LabFrame title={title ?? "Explore a reaction energy profile"}>
    <div className="grid gap-4 sm:grid-cols-3">
      <RangeControl label="Forward activation energy" value={ea} min={55} max={100} step={5} onChange={setEa} output={ea + " kJ/mol"} />
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
  const maxPressure = moles * 0.082057 * temp / 3;
  const curve = Array.from({ length: 25 }, (_, i) => {
    const v = 3 + i * (22 / 24);
    const p = moles * 0.082057 * temp / v;
    return `${i ? "L" : "M"} ${35 + (v-3)/22*280} ${20 + (maxPressure-p)/maxPressure*115}`;
  }).join(" ");
  const selectedX = 35 + (volume - 3) / 22 * 280;
  const selectedY = 20 + (maxPressure - pressure) / maxPressure * 115;
  return <LabFrame title={title ?? "Explore the ideal gas law"}>
    <div className="grid gap-4 sm:grid-cols-3">
      <RangeControl label="Temperature" value={temp} min={150} max={600} step={25} onChange={setTemp} output={temp + " K"} />
      <RangeControl label="Amount of gas" value={moles} min={0.5} max={3} step={0.5} onChange={setMoles} output={moles + " mol"} />
      <RangeControl label="Volume" value={volume} min={3} max={25} step={1} onChange={setVolume} output={volume + " L"} />
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-border bg-bg p-4"><p className="text-xs text-ink-dim">Calculated pressure</p><p className="mt-1 text-2xl font-semibold">{pressure.toFixed(2)} atm</p><p className="mt-1 text-xs text-ink-dim">PV = nRT; R = 0.082057 L·atm·mol⁻¹·K⁻¹</p></div>
      <div className="rounded-xl border border-border bg-bg p-2"><svg viewBox="0 0 330 170" role="img" aria-label="Pressure versus volume graph for selected temperature and amount" className="w-full"><line x1="35" y1="15" x2="35" y2="145" stroke="var(--color-ink-dim)" /><line x1="35" y1="145" x2="315" y2="145" stroke="var(--color-ink-dim)" /><path d={curve} fill="none" stroke="var(--color-blue)" strokeWidth="3" /><circle cx={selectedX} cy={selectedY} r="4.5" fill="var(--color-amber)" /><text x="175" y="164" fill="var(--color-ink-dim)" fontSize="10" textAnchor="middle">Volume (L)</text><text x="12" y="80" fill="var(--color-ink-dim)" fontSize="10" textAnchor="middle" transform="rotate(-90 12 80)">Pressure (atm)</text></svg></div>
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
    <p className="text-sm">Here the slider represents the final hydrogen-ion concentration, so pH = −log[H⁺]. Changing [H⁺] by a factor of 10 changes pH by one unit in the opposite direction. If you are predicting [H⁺] from an extremely dilute acid concentration, water autoionization must also be considered; this simplified model does not calculate that equilibrium.</p>
  </LabFrame>;
}
