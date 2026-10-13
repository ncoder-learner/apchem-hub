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
function BalanceEquation() {
  const [iron,setIron]=useState(4); const [oxygen,setOxygen]=useState(3); const [oxide,setOxide]=useState(2);
  const leftFe=iron, rightFe=2*oxide, leftO=2*oxygen, rightO=3*oxide;
  const balanced=leftFe===rightFe && leftO===rightO;
  return <Frame unit="4 · Representing reactions" title="Hands-on: balance an equation" takeaway="A balanced equation has the same number of each type of atom on both sides. Change coefficients in front of formulas; never change subscripts, because that would change the chemical substances.">
    <div className="rounded-xl border border-border bg-bg/50 p-4">
      <div className="flex flex-wrap items-center justify-center gap-2 py-4 text-2xl font-bold sm:text-3xl">
        <span>{iron} Fe</span><span className="text-ink-dim">+</span><span>{oxygen} O₂</span><span className="text-ink-dim">→</span><span>{oxide} Fe₂O₃</span>
      </div>
      <p className="mb-3 text-center text-xs text-ink-dim">Adjust the coefficients to balance Fe + O₂ → Fe₂O₃.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Slider label="Coefficient before Fe" min={1} max={8} step={1} value={iron} onChange={setIron}/>
        <Slider label="Coefficient before O₂" min={1} max={8} step={1} value={oxygen} onChange={setOxygen}/>
        <Slider label="Coefficient before Fe₂O₃" min={1} max={8} step={1} value={oxide} onChange={setOxide}/>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Iron atoms · left / right</div><div className="text-xl font-bold">{leftFe} / {rightFe}</div></div>
        <div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Oxygen atoms · left / right</div><div className="text-xl font-bold">{leftO} / {rightO}</div></div>
      </div>
      <p aria-live="polite" className={balanced?"mt-4 rounded-lg border border-emerald-300/40 bg-emerald-300/10 p-3 font-semibold text-emerald-300":"mt-4 rounded-lg border border-amber-300/30 bg-amber-300/5 p-3 text-sm text-amber-200"}>{balanced?"Balanced. The simplest whole-number ratio is 4 : 3 : 2.":"Not balanced yet. Match both atom counts, then reduce to the smallest whole-number ratio."}</p>
    </div>
  </Frame>;
}
function NetIonicLab() {
  const [showSpectators,setShowSpectators]=useState(false);
  return <Frame unit="4 · Net ionic equations" title="Remove spectator ions" takeaway="Spectator ions appear unchanged on both sides of the complete ionic equation, so cancel them to obtain the net ionic equation. Only species that undergo a chemical change remain.">
    <div className="rounded-xl border border-border bg-bg/50 p-4"><p className="text-center text-lg font-semibold">AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)</p><div className="my-4 grid gap-3 sm:grid-cols-2"><div className="rounded-lg border border-border p-3"><div className="mb-2 text-xs uppercase tracking-wide text-ink-dim">Complete ionic equation</div><p>Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ → AgCl(s) + Na⁺ + NO₃⁻</p></div><div className="rounded-lg border border-border p-3"><div className="mb-2 text-xs uppercase tracking-wide text-ink-dim">Net ionic equation</div><p className="font-semibold text-emerald-300">Ag⁺(aq) + Cl⁻(aq) → AgCl(s)</p></div></div><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showSpectators} onChange={e=>setShowSpectators(e.target.checked)} className="accent-emerald-400"/> Highlight the spectator ions in the complete equation</label>{showSpectators&&<p className="mt-3 rounded-lg border border-amber-300/30 bg-amber-300/5 p-3 text-sm text-amber-200">Na⁺ and NO₃⁻ stay dissolved and unchanged. They cancel; Ag⁺ and Cl⁻ form the precipitate.</p>}</div>
  </Frame>;
}
function TitrationLab() {
  const [volume,setVolume]=useState(25); const [acid,setAcid]=useState(.1); const [base,setBase]=useState(.1);
  const calc=(v:number)=>{const h=25*acid/1000,oh=v*base/1000,total=(25+v)/1000;const excess=h-oh;if(Math.abs(excess)<1e-9)return 7;return excess>0?-Math.log10(excess/total):14+Math.log10((-excess)/total);};
  const ph=calc(volume);
  const pts=Array.from({length:51},(_,i)=>({x:i,y:Math.max(0,Math.min(14,calc(i)))}));
  const path=pts.map((p,i)=>(i?"L":"M")+(35+p.x*7.5)+","+(15+(14-p.y)/14*145)).join(" ");
  return <Frame unit="4 · Titration" title="Follow pH through a strong-acid/strong-base titration" takeaway="Before equivalence, excess acid controls pH; at equivalence, stoichiometric amounts have reacted; after equivalence, excess base controls pH. The steep change is why indicators work only over suitable pH ranges.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="NaOH added" min={0} max={50} step={1} value={volume} onChange={setVolume} suffix=" mL"/><Slider label="Initial strong-acid concentration" min={.05} max={.2} step={.01} value={acid} onChange={setAcid} suffix=" M"/><Slider label="Strong-base concentration" min={.05} max={.2} step={.01} value={base} onChange={setBase} suffix=" M"/><div className="rounded-lg border border-border p-4"><div className="text-xs text-ink-dim">Estimated pH</div><div className="text-3xl font-bold">{ph.toFixed(2)}</div><div className="text-xs text-ink-dim">{Math.abs(25*acid-volume*base)<1e-8?"At equivalence":25*acid>volume*base?"Excess strong acid":"Excess strong base"}</div></div></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 440 210" className="w-full" role="img" aria-label="Strong acid and strong base titration curve"><line x1="35" y1="160" x2="420" y2="160" stroke="var(--color-ink-dim)"/><line x1="35" y1="15" x2="35" y2="160" stroke="var(--color-ink-dim)"/><path d={path} fill="none" stroke="#34d399" strokeWidth="3"/><line x1={35+volume*7.5} y1="15" x2={35+volume*7.5} y2="160" stroke="#f5c454" strokeDasharray="4 4"/><text x="225" y="192" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="12">NaOH added (mL)</text></svg><p className="text-xs text-ink-dim">Simplified strong acid–strong base model; ignores activity effects and assumes 25.0 mL initial acid.</p></div></div>
  </Frame>;
}
function ReactionTypeLab() {
  const [kind,setKind]=useState("precipitation");
  const items:Record<string,{equation:string;clue:string}>={"precipitation":{equation:"AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)",clue:"An insoluble ionic solid forms from aqueous ions."},"acid-base":{equation:"HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)",clue:"An acid and a base react to form water and a salt."},"redox":{equation:"Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)",clue:"Electrons transfer; zinc is oxidized and copper(II) is reduced."},"gas":{equation:"2 H₂O₂(aq) → 2 H₂O(l) + O₂(g)",clue:"One reactant breaks down into multiple products."}};
  return <Frame unit="4 · Reaction types" title="Classify the reaction from its evidence" takeaway="Classify using what changes in the equation: formation of a solid, acid–base neutralization, electron transfer, or decomposition. More than one useful description can sometimes apply to a real reaction.">
    <label className="mb-2 block text-sm text-ink-dim" htmlFor="reaction-kind">Choose a reaction pattern</label><select id="reaction-kind" value={kind} onChange={e=>setKind(e.target.value)} className="mb-4 w-full rounded-lg border border-border bg-bg px-3 py-2">{Object.keys(items).map(k=><option key={k} value={k}>{k==="gas"?"Decomposition":k==="acid-base"?"Acid–base":k==="redox"?"Oxidation–reduction":"Precipitation"}</option>)}</select><div className="rounded-xl border border-border bg-bg/50 p-4"><p className="text-center text-lg font-semibold">{items[kind].equation}</p><p className="mt-3 text-sm text-emerald-300">{items[kind].clue}</p></div>
  </Frame>;
}
function AcidBaseLab() {
  const [molarity,setMolarity]=useState(.1);const [volume,setVolume]=useState(25);const [baseM,setBaseM]=useState(.1);const [baseV,setBaseV]=useState(20);
  const acidMol=molarity*volume/1000,baseMol=baseM*baseV/1000;
  return <Frame unit="4 · Acid–base reactions" title="Track neutralization by moles" takeaway="For a 1:1 strong acid–strong base reaction, equivalence occurs when moles of H⁺ equal moles of OH⁻. Concentration alone is not enough; volume determines how many moles are present.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Acid concentration" min={.05} max={.2} step={.01} value={molarity} onChange={setMolarity} suffix=" M"/><Slider label="Acid volume" min={5} max={50} step={1} value={volume} onChange={setVolume} suffix=" mL"/><Slider label="Base concentration" min={.05} max={.2} step={.01} value={baseM} onChange={setBaseM} suffix=" M"/><Slider label="Base volume" min={5} max={50} step={1} value={baseV} onChange={setBaseV} suffix=" mL"/></div><div className="rounded-xl border border-border p-4"><p className="text-sm text-ink-dim">Initial acid amount</p><p className="text-xl font-bold">{(acidMol*1000).toFixed(2)} mmol</p><p className="mt-3 text-sm text-ink-dim">Added base amount</p><p className="text-xl font-bold">{(baseMol*1000).toFixed(2)} mmol</p><p className={Math.abs(acidMol-baseMol)<1e-8?"mt-4 font-semibold text-emerald-300":"mt-4 font-semibold text-amber-200"}>{Math.abs(acidMol-baseMol)<1e-8?"Stoichiometric equivalence":acidMol>baseMol?"Acid remains in excess":"Base remains in excess"}</p></div></div>
  </Frame>;
}
function RedoxLab() {
  const [fe,setFe]=useState(2);
  return <Frame unit="4 · Oxidation–reduction" title="Track electron transfer" takeaway="Oxidation is an increase in oxidation state and corresponds to loss of electrons; reduction is a decrease in oxidation state and corresponds to gain of electrons. The electrons lost and gained must balance.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Starting iron oxidation state" min={0} max={3} step={1} value={fe} onChange={setFe}/><div className="rounded-xl border border-border bg-bg/50 p-4"><p>Fe{fe===0?"(s)":fe===1?"⁺(aq)":fe===2?"²⁺(aq)":"³⁺(aq)"} → Fe³⁺(aq)</p><p className="mt-3 text-sm text-ink-dim">Change in oxidation state</p><p className="text-2xl font-bold">{3-fe>0?"+":""}{3-fe}</p></div></div><div className="rounded-xl border border-border p-4"><p className="font-semibold text-emerald-300">{fe<3?"Oxidation: iron loses "+(3-fe)+" electron"+(3-fe===1?"":"s"):"No oxidation-state change"}</p><p className="mt-3 text-sm text-ink-dim">In a complete redox equation, another species must accept the electrons released by iron. This model tracks only iron's oxidation half-reaction.</p></div></div>
  </Frame>;
}
function UnitFour({ topicNumber }: { topicNumber: string }) {
  if (topicNumber === "4.1" || topicNumber === "4.3") return <BalanceEquation />;
  if (topicNumber === "4.2") return <NetIonicLab />;
  if (topicNumber === "4.4") return <ReactionTypeLab />;
  if (topicNumber === "4.6") return <TitrationLab />;
  if (topicNumber === "4.7") return <ReactionTypeLab />;
  if (topicNumber === "4.8") return <AcidBaseLab />;
  if (topicNumber === "4.9") return <RedoxLab />;
  return <LimitingReactantLab />;
}
function LimitingReactantLab() {
  const [a,setA]=useState(4);const [b,setB]=useState(6);const extent=Math.min(a,b/2);const leftA=a-extent;const leftB=b-2*extent;
  return <Frame unit="4 · Reactions" title="Find the limiting reactant" takeaway="For A + 2B → products, each reaction event consumes one A and two B. The limiting reactant runs out first. Compare available amount divided by the stoichiometric coefficient, not just raw amounts.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Starting A" min={1} max={12} step={1} value={a} onChange={setA} suffix=" mol"/><Slider label="Starting B" min={1} max={20} step={1} value={b} onChange={setB} suffix=" mol"/><div className="mt-4 space-y-2 text-sm"><p>Product formed: <strong>{extent.toFixed(2)} mol</strong></p><p>A remaining: <strong>{leftA.toFixed(2)} mol</strong></p><p>B remaining: <strong>{leftB.toFixed(2)} mol</strong></p><p className="font-semibold text-emerald-300">Limiting reactant: {a<b/2?"A":b/2<a?"B":"Neither; exact ratio"}</p></div></div><Bars rows={[{label:"A initially",value:a,max:20,color:"#5aa9ff"},{label:"B initially",value:b,max:20,color:"#f5c454"},{label:"A remaining",value:leftA,max:20,color:"#5aa9ff"},{label:"B remaining",value:leftB,max:20,color:"#f5c454"}]}/></div>
  </Frame>;
}
function RateLawLab() {
  const [a,setA]=useState(1); const [b,setB]=useState(1); const [m,setM]=useState(1); const [n,setN]=useState(1); const [k,setK]=useState(.5);
  const rate=k*Math.pow(a,m)*Math.pow(b,n), doubledB=k*Math.pow(a,m)*Math.pow(2*b,n);
  return <Frame unit="5 · Experimental rate laws" title="Discover reaction order from concentration changes" takeaway="The exponent on each reactant tells how its concentration affects rate. If doubling B doubles the rate, the reaction is first order in B; if the rate quadruples, it is second order. Orders are determined experimentally, not copied from balanced-equation coefficients.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Reactant concentration [A]" min={.5} max={3} step={.5} value={a} onChange={setA} suffix=" M"/><Slider label="Reactant concentration [B]" min={.5} max={3} step={.5} value={b} onChange={setB} suffix=" M"/><Slider label="Order in A, m" min={0} max={2} step={1} value={m} onChange={setM}/><Slider label="Order in B, n" min={0} max={2} step={1} value={n} onChange={setN}/><Slider label="Rate constant k (illustrative)" min={.1} max={1} step={.1} value={k} onChange={setK}/></div><div className="space-y-3"><div className="rounded-lg border border-border p-4"><div className="text-xs text-ink-dim">Rate at current concentrations</div><div className="text-2xl font-bold">{rate.toFixed(3)} relative units</div><div className="mt-1 text-sm text-ink-dim">rate = k[A]^{m}[B]^{n}</div></div><div className="rounded-lg border border-border p-4"><div className="text-xs text-ink-dim">Rate if [B] doubles</div><div className="text-2xl font-bold">{doubledB.toFixed(3)} relative units</div><div className="mt-1 text-sm text-emerald-300">{(doubledB/rate).toFixed(2)}× the original rate</div></div><p className="text-xs text-ink-dim">This is a controlled mathematical experiment with user-selected orders, not measured chemical data.</p></div></div>
  </Frame>;
}
function CollisionLab() {
  const [temperature,setTemperature]=useState(300); const [ea,setEa]=useState(50);
  const fraction=Math.exp(-ea/(.008314*temperature))*100;
  const curve=Array.from({length:50},(_,i)=>{const e=i*3;return {e,y:Math.exp(-e/(.008314*temperature))*Math.exp(-Math.pow((e-35)/35,2))};});
  const max=Math.max(...curve.map(p=>p.y)); const path=curve.map((p,i)=>(i?"L":"M")+(35+i*7.8)+","+(160-p.y/max*130)).join(" ");
  return <Frame unit="5 · Collision theory" title="Temperature and the energy barrier" takeaway="Raising temperature shifts the molecular energy distribution toward higher energies, increasing the fraction of collisions that can overcome the activation barrier. Sufficient energy is necessary, but proper orientation also matters.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Temperature" min={200} max={800} step={25} value={temperature} onChange={setTemperature} suffix=" K"/><Slider label="Activation energy" min={10} max={100} step={5} value={ea} onChange={setEa} suffix=" kJ/mol"/><div className="rounded-lg border border-border p-4"><div className="text-xs text-ink-dim">Simplified energy-threshold estimate</div><div className="text-2xl font-bold">{fraction.toExponential(2)}%</div><p className="mt-1 text-xs text-ink-dim">Boltzmann factor exp(−Ea/RT), not the exact Maxwell–Boltzmann fraction of collisions in a real gas.</p></div></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 440 210" className="w-full" role="img" aria-label="Schematic molecular energy distribution and activation energy threshold"><line x1="35" y1="160" x2="420" y2="160" stroke="var(--color-ink-dim)"/><line x1="35" y1="15" x2="35" y2="160" stroke="var(--color-ink-dim)"/><path d={path} fill="none" stroke="#34d399" strokeWidth="3"/><line x1={35+ea/150*385} y1="15" x2={35+ea/150*385} y2="160" stroke="#f5c454" strokeWidth="2" strokeDasharray="5 4"/><text x={Math.min(375,45+ea/150*385)} y="25" fill="#f5c454" fontSize="11">Ea threshold</text><text x="225" y="192" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="12">Molecular energy →</text></svg></div></div>
  </Frame>;
}
function EnergyProfileLab() {
  const [reactants,setReactants]=useState(20);const [products,setProducts]=useState(0);const [barrier,setBarrier]=useState(60);const [catalyst,setCatalyst]=useState(false);
  const top=Math.max(100,reactants+barrier+10,products+barrier+10), scale=130/top;
  const peak=Math.max(reactants,products)+(catalyst?barrier*.55:barrier);
  const path="M 40 "+(165-reactants*scale)+" C 105 "+(165-reactants*scale)+", 115 "+(165-peak*scale)+", 220 "+(165-peak*scale)+" S 325 "+(165-products*scale)+", 400 "+(165-products*scale);
  return <Frame unit="5 · Energy profiles" title="Compare reaction pathways" takeaway="The reactant and product energy levels determine ΔH and do not change when a catalyst is added. A catalyst provides a pathway with lower activation energy; it changes rate, not the overall enthalpy change or equilibrium constant.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Reactant energy" min={0} max={50} step={5} value={reactants} onChange={setReactants}/><Slider label="Product energy" min={0} max={50} step={5} value={products} onChange={setProducts}/><Slider label="Uncatalyzed activation barrier" min={20} max={80} step={5} value={barrier} onChange={setBarrier}/><label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={catalyst} onChange={e=>setCatalyst(e.target.checked)} className="accent-emerald-400"/> Show catalyzed pathway</label><div className="rounded-lg border border-border p-3 text-sm"><p>ΔH = <strong>{products-reactants} relative energy units</strong></p><p>Activation energy = <strong>{peak-reactants} relative energy units</strong></p></div></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 440 210" className="w-full" role="img" aria-label="Interactive reaction energy profile"><line x1="35" y1="165" x2="420" y2="165" stroke="var(--color-ink-dim)"/><line x1="35" y1="15" x2="35" y2="165" stroke="var(--color-ink-dim)"/><path d={path} fill="none" stroke={catalyst?"#64748b":"#34d399"} strokeWidth="3"/>{catalyst&&<path d={"M 40 "+(165-reactants*scale)+" C 105 "+(165-reactants*scale)+", 125 "+(165-(Math.max(reactants,products)+barrier*.55)*scale)+", 220 "+(165-(Math.max(reactants,products)+barrier*.55)*scale)+" S 325 "+(165-products*scale)+", 400 "+(165-products*scale)} fill="none" stroke="#34d399" strokeWidth="3"/>}<text x="50" y={Math.max(14,160-reactants*scale)} fill="var(--color-ink-dim)" fontSize="11">Reactants</text><text x="335" y={Math.max(14,160-products*scale)} fill="var(--color-ink-dim)" fontSize="11">Products</text><text x="225" y="192" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="12">Reaction progress →</text></svg><p className="text-xs text-ink-dim">Schematic pathway; energy values are adjustable teaching units, not experimental measurements.</p></div></div>
  </Frame>;
}
function MechanismLab() {
  const [slow,setSlow]=useState(1);
  return <Frame unit="5 · Reaction mechanisms" title="Connect elementary steps to a rate law" takeaway="For this deliberately simple two-step example, the rate law of a slow elementary step is written from the reactants in that step. Real mechanisms may require a pre-equilibrium or steady-state treatment to eliminate intermediates, so never assume every proposed slow-step law automatically matches experimental data.">
    <div className="grid gap-5 md:grid-cols-2"><div><label className="mb-1 block text-sm text-ink-dim" htmlFor="slow-step">Rate-determining step in the model</label><select id="slow-step" value={slow} onChange={e=>setSlow(Number(e.target.value))} className="mb-4 w-full rounded-lg border border-border bg-bg px-3 py-2"><option value={1}>Step 1: A + B → I</option><option value={2}>Step 2: I + C → P</option></select><div className="space-y-3 rounded-xl border border-border bg-bg/50 p-4"><p className={slow===1?"font-semibold text-emerald-300":"text-ink-dim"}>1. A + B ⇌ I</p><p className={slow===2?"font-semibold text-emerald-300":"text-ink-dim"}>2. I + C → P</p><p className="text-xs text-ink-dim">I is an intermediate: produced in one step and consumed in another.</p></div></div><div className="flex flex-col justify-center rounded-xl border border-border p-5"><div className="text-xs text-ink-dim">Rate expression for the selected elementary slow step</div><div className="my-3 text-2xl font-bold">{slow===1?"rate = k₁[A][B]":"rate = k₂[I][C]"}</div><p className="text-sm text-ink-dim">{slow===1?"A and B are reactants in step 1, so their concentrations appear in this elementary-step rate law.":"I and C appear in step 2; I is an intermediate, so a complete experimentally testable rate law may need an additional derivation."}</p></div></div>
  </Frame>;
}
function ConcentrationLab() {
  const [order,setOrder]=useState(1);const [k,setK]=useState(.25);const [initial,setInitial]=useState(1);
  const points=Array.from({length:41},(_,i)=>{const time=i*.25;let c=initial;if(order===0)c=Math.max(0,initial-k*time);if(order===1)c=initial*Math.exp(-k*time);if(order===2)c=initial/(1+k*initial*time);return {time,c};});
  const value=points[20].c;const path=points.map((p,i)=>(i?"L":"M")+(35+i*9.3)+","+(15+(1-p.c/2)*145)).join(" ");
  return <Frame unit="5 · Kinetics" title="Change the rate law and watch concentration change" takeaway="Reaction order changes the mathematical shape of a concentration–time curve. The slope at a point is the instantaneous rate; the integrated law tells how concentration evolves over time.">
    <div className="grid gap-5 md:grid-cols-2"><div><label className="mb-1 block text-sm text-ink-dim" htmlFor="kinetics-order">Reaction order</label><select id="kinetics-order" value={order} onChange={e=>setOrder(Number(e.target.value))} className="mb-3 w-full rounded-lg border border-border bg-bg px-3 py-2"><option value={0}>Zero order</option><option value={1}>First order</option><option value={2}>Second order</option></select><Slider label="Rate constant (illustrative)" min={.05} max={.5} step={.05} value={k} onChange={setK}/><Slider label="Initial concentration" min={.5} max={2} step={.25} value={initial} onChange={setInitial} suffix=" M"/><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Concentration at t = 5</div><div className="text-2xl font-bold">{value.toFixed(3)} M</div><div className="mt-1 text-xs text-ink-dim">{order===0?"[A] = [A]₀ − kt":order===1?"[A] = [A]₀e⁻ᵏᵗ":"[A] = [A]₀/(1 + k[A]₀t)"}</div></div></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 440 210" className="w-full" role="img" aria-label="Concentration versus time curve"><line x1="35" y1="160" x2="420" y2="160" stroke="var(--color-ink-dim)"/><line x1="35" y1="15" x2="35" y2="160" stroke="var(--color-ink-dim)"/><path d={path} fill="none" stroke="#34d399" strokeWidth="3"/><text x="225" y="192" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="12">Time →</text><text x="15" y="88" transform="rotate(-90 15 88)" fill="var(--color-ink-dim)" fontSize="11">[A] (M)</text></svg><p className="text-xs text-ink-dim">Idealized model; compare shapes, not real-world rate constants across different orders.</p></div></div>
  </Frame>;
}
function UnitFive({ topicNumber }: { topicNumber: string }) {
  if (topicNumber === "5.2") return <RateLawLab />;
  if (topicNumber === "5.5") return <CollisionLab />;
  if (topicNumber === "5.6" || topicNumber === "5.10" || topicNumber === "5.11") return <EnergyProfileLab />;
  if (topicNumber === "5.4" || topicNumber === "5.7" || topicNumber === "5.8" || topicNumber === "5.9") return <MechanismLab />;
  return <ConcentrationLab />;
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
  const labs: Record<number, ReactNode> = {1:<UnitOne/>,2:<UnitTwo/>,3:<UnitThree/>,4:<UnitFour topicNumber={topicNumber}/>,5:<UnitFive topicNumber={topicNumber}/>,6:<UnitSix/>,7:<UnitSeven/>,8:<UnitEight/>,9:<UnitNine/>};
  return <div data-topic={topicNumber} data-title={title}>{labs[unitId] ?? null}</div>;
}
