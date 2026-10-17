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
function PeriodicTrendLab() {
  const [across,setAcross]=useState(3); const [shells,setShells]=useState(2);
  const radius=180-across*13+(shells-1)*35, ie=450+across*115-(shells-1)*95;
  return <Frame unit="1 · Atomic structure" title="Explore periodic trends" takeaway="Across a period, effective nuclear charge generally increases while the principal energy level stays the same, so atomic radius tends to decrease and first ionization energy tends to increase. Added shells change the comparison down a group.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Position across a period" min={0} max={6} step={1} value={across} onChange={setAcross}/><Slider label="Occupied principal shells" min={1} max={4} step={1} value={shells} onChange={setShells}/><Bars rows={[{label:"Illustrative atomic radius (pm)",value:radius,max:220,color:"#5aa9ff"},{label:"Illustrative first ionization energy",value:ie,max:1200,color:"#34d399"}]}/><p className="mt-2 text-xs text-ink-dim">Schematic trend model; these are not measured values for a particular element.</p></div><div className="flex items-center justify-center rounded-xl border border-border bg-bg/50"><svg viewBox="0 0 280 220" className="w-full max-w-xs" role="img" aria-label="Schematic atom with adjustable electron shells">{Array.from({length:shells},(_,i)=><circle key={i} cx="140" cy="105" r={30+i*24} fill="none" stroke="#5aa9ff" strokeDasharray="4 4"/>)}<circle cx="140" cy="105" r="15" fill="#f5c454"/>{Array.from({length:shells},(_,i)=><circle key={i} cx={140+Math.cos(across*.7+i*2)*(30+i*24)} cy={105+Math.sin(across*.7+i*2)*(30+i*24)} r="5" fill="#34d399"/>)}<text x="140" y="198" textAnchor="middle" fontSize="11" fill="var(--color-ink-dim)">Schematic, not to scale</text></svg></div></div>
  </Frame>;
}
function BondPotentialLab() {
  const [distance,setDistance]=useState(1.2); const [depth,setDepth]=useState(70);
  const energy=depth*(Math.pow(1/distance,12)-2*Math.pow(1/distance,6));
  const points=Array.from({length:80},(_,i)=>{const x=.72+i*2.8/79;const y=depth*(1/Math.pow(x,12)-2/Math.pow(x,6));return {x,y};});
  const minY=-depth,maxY=depth*2.5; const path=points.map((p,i)=>(i?"L":"M")+(35+i*4.8)+","+(15+(maxY-p.y)/(maxY-minY)*145)).join(" ");
  return <Frame unit="2 · Bonding" title="Bond potential-energy curve" takeaway="The minimum is the most stable internuclear distance. Moving atoms closer than this causes strong repulsion; separating them requires energy to overcome attraction. A deeper well corresponds to a stronger bond in this simplified model.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Internuclear distance" min={.8} max={3.5} step={.05} value={distance} onChange={setDistance} suffix=" relative"/><Slider label="Potential well depth" min={30} max={100} step={5} value={depth} onChange={setDepth}/><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Energy at current distance</div><div className="text-2xl font-bold">{Number(energy.toFixed(2))} relative units</div></div></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 440 210" className="w-full" role="img" aria-label="Schematic bond potential energy curve"><line x1="35" y1="160" x2="420" y2="160" stroke="var(--color-ink-dim)"/><line x1="35" y1="15" x2="35" y2="160" stroke="var(--color-ink-dim)"/><path d={path} fill="none" stroke="#34d399" strokeWidth="3"/><text x="225" y="192" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="12">Internuclear distance →</text><circle cx={35+(distance-.72)/2.8*379} cy={15+(maxY-energy)/(maxY-minY)*145} r="5" fill="#f5c454"/></svg><p className="text-xs text-ink-dim">Lennard-Jones-style shape, scaled for visualization; not a fitted molecular potential.</p></div></div>
  </Frame>;
}
function GasLawLab() {
  const [v,setV]=useState(5);const [t,setT]=useState(300);const [n,setN]=useState(1);const p=n*.082057*t/v;
  return <Frame unit="3 · States of matter" title="Ideal-gas relationship explorer" takeaway="For a fixed amount of gas at constant temperature, increasing volume lowers pressure. Raising absolute temperature increases pressure if volume is fixed. Use kelvin in PV = nRT.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Volume" min={2} max={10} step={.5} value={v} onChange={setV} suffix=" L"/><Slider label="Temperature" min={200} max={600} step={10} value={t} onChange={setT} suffix=" K"/><Slider label="Amount of gas" min={.5} max={3} step={.5} value={n} onChange={setN} suffix=" mol"/><div className="rounded-lg border border-border p-4"><div className="text-xs text-ink-dim">Calculated pressure</div><div className="text-3xl font-bold">{p.toFixed(2)} atm</div><div className="text-xs text-ink-dim">P = nRT/V</div></div></div><Bars rows={[{label:"Pressure",value:p,max:25,color:"#34d399"},{label:"Temperature (scaled)",value:t/25,max:24,color:"#f5c454"},{label:"Volume (scaled inverse)",value:10/v*5,max:25,color:"#5aa9ff"}]}/></div>
  </Frame>;
}
function MoleLab() {
  const [grams,setGrams]=useState(18); const [molarMass,setMolarMass]=useState(18);
  const moles=grams/molarMass, particles=moles*6.022e23;
  return <Frame unit="1 · Quantitative chemistry" title="Move between grams, moles, and particles" takeaway="Molar mass converts grams to moles, and Avogadro's constant converts moles to specified particles. Keep the units in each step so the conversion factors cancel correctly.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Sample mass" min={1} max={100} step={1} value={grams} onChange={setGrams} suffix=" g"/><Slider label="Molar mass" min={1} max={200} step={1} value={molarMass} onChange={setMolarMass} suffix=" g/mol"/></div><div className="grid grid-cols-2 gap-3"><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Amount</div><div className="text-2xl font-bold">{moles.toFixed(3)} mol</div></div><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Particles</div><div className="text-xl font-bold">{particles.toExponential(2)}</div></div><p className="col-span-2 text-xs text-ink-dim">The example treats molar mass as an input. Select the correct substance-specific molar mass before using this in a chemistry problem.</p></div></div>
  </Frame>;
}
function IsotopeLab() {
  const [p24,setP24]=useState(79); const [p25,setP25]=useState(10); const p26=Math.max(0,100-p24-p25); const avg=(p24*23.985+p25*24.986+p26*25.983)/100;
  return <Frame unit="1 · Isotopes" title="Build a weighted-average atomic mass" takeaway="The periodic-table atomic mass is a weighted average, not a simple mean. A more abundant isotope contributes more to the average. Abundances must sum to 100%.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="²⁴Mg abundance" min={60} max={90} step={1} value={p24} onChange={v=>{setP24(v);if(v+p25>100)setP25(100-v);}} suffix="%"/><Slider label="²⁵Mg abundance" min={0} max={100-p24} step={1} value={p25} onChange={setP25} suffix="%"/><p className="text-sm text-ink-dim">²⁶Mg abundance is the remainder: {p26}%.</p></div><div className="rounded-xl border border-border bg-bg/50 p-4"><div className="text-xs text-ink-dim">Weighted-average mass</div><div className="text-3xl font-bold">{avg.toFixed(3)} u</div><div className="mt-3 space-y-2 text-sm">{[{l:"²⁴Mg",v:p24,c:"#5aa9ff"},{l:"²⁵Mg",v:p25,c:"#34d399"},{l:"²⁶Mg",v:p26,c:"#f5c454"}].map(x=><div key={x.l}><div className="mb-1 flex justify-between"><span>{x.l}</span><span>{x.v}%</span></div><div className="h-2 rounded-full bg-white/5"><div className="h-2 rounded-full" style={{width:x.v+"%",background:x.c}}/></div></div>)}</div></div></div>
  </Frame>;
}
function CoulombLab() {
  const [q1,setQ1]=useState(1);const [q2,setQ2]=useState(-1);const [r,setR]=useState(2);const force=q1*q2/(r*r);
  return <Frame unit="1 · Electrostatic interactions" title="Test Coulomb's law" takeaway="The magnitude of electrostatic force increases with the product of charge magnitudes and decreases with the square of separation. Opposite signs attract; like signs repel. This relative model omits the constant and detailed atomic environment.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Charge q₁" min={-3} max={3} step={1} value={q1} onChange={setQ1}/><Slider label="Charge q₂" min={-3} max={3} step={1} value={q2} onChange={setQ2}/><Slider label="Separation r" min={1} max={5} step={.25} value={r} onChange={setR}/></div><div className="rounded-xl border border-border bg-bg/50 p-4"><svg viewBox="0 0 320 100" className="w-full" role="img" aria-label="Two charges separated by an adjustable distance"><line x1="40" y1="50" x2="280" y2="50" stroke="var(--color-ink-dim)" strokeDasharray="4 4"/><circle cx="80" cy="50" r="24" fill="#5aa9ff"/><circle cx="240" cy="50" r="24" fill="#f5c454"/><text x="80" y="55" textAnchor="middle" fill="#0a0e16" fontWeight="700">{q1>0?"+":""}{q1}</text><text x="240" y="55" textAnchor="middle" fill="#0a0e16" fontWeight="700">{q2>0?"+":""}{q2}</text></svg><div className="text-xs text-ink-dim">Relative signed force q₁q₂/r²</div><div className="text-2xl font-bold">{force.toFixed(3)}</div><p className={force<0?"text-sm text-emerald-300":"text-sm text-amber-200"}>{force<0?"Attractive interaction":force>0?"Repulsive interaction":"No electrostatic force when one charge is zero"}</p></div></div>
  </Frame>;
}
function LewisLab() {
  const [electrons,setElectrons]=useState(6);const dots=Array.from({length:electrons},(_,i)=>{const angles=[-90,-45,0,45,90,135,180,225];return {x:140+Math.cos(angles[i]*Math.PI/180)*48,y:90+Math.sin(angles[i]*Math.PI/180)*48};});
  return <Frame unit="2 · Lewis structures" title="Count and place valence electrons" takeaway="Lewis symbols show valence electrons, not all electrons. Place one electron on each side before pairing where possible; in a full Lewis structure, total valence electrons must match the sum from the atoms and any charge.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Valence electrons to display" min={0} max={8} step={1} value={electrons} onChange={setElectrons}/><p className="text-sm text-ink-dim">Practice symbol: a neutral main-group atom with {electrons} valence electron{electrons===1?"":"s"}.</p></div><div className="flex justify-center rounded-xl border border-border bg-bg/50 p-4"><svg viewBox="0 0 280 180" className="w-full max-w-xs" role="img" aria-label="Lewis dot symbol with adjustable valence electron count"><circle cx="140" cy="90" r="25" fill="#5aa9ff" fillOpacity=".2" stroke="#5aa9ff"/><text x="140" y="96" textAnchor="middle" fill="var(--color-ink)" fontSize="20" fontWeight="700">X</text>{dots.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" fill="#f5c454"/>)}</svg></div></div>
  </Frame>;
}
function GeometryLab() {
  const [domains,setDomains]=useState(4);const [lone,setLone]=useState(1);const atoms=Math.max(0,domains-lone);const labels:Record<number,string>={2:"Linear",3:"Trigonal planar",4:"Tetrahedral",5:"Trigonal bipyramidal",6:"Octahedral"};
  return <Frame unit="2 · Molecular geometry" title="Separate electron geometry from molecular shape" takeaway="Electron domains include bonding regions and lone pairs. Molecular geometry names the arrangement of atoms only, so adding lone pairs can change the molecular shape even when the electron-domain geometry stays the same.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Electron domains around central atom" min={2} max={6} step={1} value={domains} onChange={v=>{setDomains(v);if(lone>v-2)setLone(v-2);}}/><Slider label="Lone pairs" min={0} max={domains-2} step={1} value={lone} onChange={setLone}/><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Electron geometry</div><div className="font-semibold">{labels[domains]}</div><div className="mt-2 text-xs text-ink-dim">Bonded atoms shown: {atoms}</div></div></div><div className="flex items-center justify-center rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 280 220" className="w-full max-w-xs" role="img" aria-label="Schematic molecular shape with adjustable bonded atoms and lone pairs"><line x1="140" y1="110" x2="140" y2="35" stroke="var(--color-ink-dim)" strokeWidth="2"/><circle cx="140" cy="110" r="20" fill="#5aa9ff"/><text x="140" y="115" textAnchor="middle" fill="#0a0e16" fontWeight="700">A</text>{Array.from({length:domains},(_,i)=>{const angle=-Math.PI/2+i*2*Math.PI/domains;const x=140+Math.cos(angle)*75,y=110+Math.sin(angle)*75;const isLone=i<lone;return <g key={i}><line x1="140" y1="110" x2={x} y2={y} stroke={isLone?"#f5c454":"#34d399"} strokeWidth="2" strokeDasharray={isLone?"4 3":undefined}/><circle cx={x} cy={y} r={isLone?8:12} fill={isLone?"#f5c454":"#34d399"}/><text x={x} y={y+4} textAnchor="middle" fill="#0a0e16" fontSize="9" fontWeight="700">{isLone?"LP":"X"}</text></g>;})}</svg></div></div>
  </Frame>;
}
function PhotonLab() {
  const [wavelength,setWavelength]=useState(500);const energy=1240/wavelength;
  return <Frame unit="3 · Photons" title="Wavelength controls photon energy" takeaway="Photon energy is inversely proportional to wavelength: E = hc/λ. Shorter-wavelength light has higher-energy photons; increasing intensity changes the number of photons, not the energy of each photon.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Wavelength" min={100} max={800} step={10} value={wavelength} onChange={setWavelength} suffix=" nm"/><div className="rounded-lg border border-border p-4"><div className="text-xs text-ink-dim">Photon energy</div><div className="text-3xl font-bold">{energy.toFixed(3)} eV</div><div className="text-sm text-ink-dim">{(energy*96.485).toFixed(1)} kJ/mol of photons</div></div></div><div className="flex items-center justify-center rounded-xl border border-border bg-bg/50 p-4"><div className="w-full rounded-lg p-5 text-center" style={{background:"linear-gradient(90deg, rgba(90,169,255,.18), rgba(52,211,153,.16), rgba(245,196,84,.16))"}}><div className="text-sm text-ink-dim">Light wavelength</div><div className="my-3 text-4xl font-bold">{wavelength} nm</div><div className="text-sm">{wavelength<400?"Ultraviolet region":wavelength>700?"Near-infrared region":"Visible-light range (approximate)"}</div></div></div></div>
  </Frame>;
}
function BeerLambertLab() {
  const [c,setC]=useState(.4);const [length,setLength]=useState(1);const [epsilon,setEpsilon]=useState(2);const absorbance=epsilon*length*c;
  return <Frame unit="3 · Spectroscopy" title="Build a Beer–Lambert calibration curve" takeaway="At fixed wavelength and for a suitable dilute solution, absorbance is proportional to concentration and path length: A = εℓc. Doubling concentration doubles absorbance under those conditions.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Concentration" min={.1} max={1} step={.1} value={c} onChange={setC} suffix=" mol/L"/><Slider label="Path length" min={.5} max={2} step={.5} value={length} onChange={setLength} suffix=" cm"/><Slider label="Molar absorptivity (scaled)" min={.5} max={3} step={.5} value={epsilon} onChange={setEpsilon}/><div className="rounded-lg border border-border p-4"><div className="text-xs text-ink-dim">Absorbance</div><div className="text-3xl font-bold">{absorbance.toFixed(2)}</div></div></div><div className="rounded-xl border border-border bg-bg/50 p-4"><div className="mb-3 text-sm text-ink-dim">Absorbance vs. concentration</div><svg viewBox="0 0 320 200" className="w-full" role="img" aria-label="Beer Lambert linear calibration graph"><line x1="35" y1="160" x2="300" y2="160" stroke="var(--color-ink-dim)"/><line x1="35" y1="15" x2="35" y2="160" stroke="var(--color-ink-dim)"/><line x1="35" y1="160" x2="300" y2={160-Math.min(3,epsilon*length)*45} stroke="#34d399" strokeWidth="3"/><circle cx={35+c*265} cy={160-absorbance*45} r="5" fill="#f5c454"/><text x="165" y="190" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="11">Concentration →</text></svg></div></div>
  </Frame>;
}
function SolutionLab() {
  const [solute,setSolute]=useState(.5);const [volume,setVolume]=useState(1);
  return <Frame unit="3 · Solutions" title="Change solution concentration" takeaway="Molarity is moles of dissolved solute divided by liters of total solution. Adding solvent lowers concentration without changing the amount of solute, provided no solute is lost or reacts.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Amount of solute" min={.1} max={2} step={.1} value={solute} onChange={setSolute} suffix=" mol"/><Slider label="Final solution volume" min={.25} max={3} step={.25} value={volume} onChange={setVolume} suffix=" L"/></div><div className="rounded-xl border border-border bg-bg/50 p-4"><div className="text-xs text-ink-dim">Molarity</div><div className="text-3xl font-bold">{(solute/volume).toFixed(2)} M</div><div className="mt-3 h-4 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-emerald-300" style={{width:Math.min(100,solute/volume/8*100)+"%"}}/></div><p className="mt-2 text-xs text-ink-dim">Bar indicates relative concentration on this model's scale.</p></div></div>
  </Frame>;
}
function IntermolecularLab() {
  const [strength,setStrength]=useState(5);const [temperature,setTemperature]=useState(50);
  const boiling=20+strength*12;const particles=Array.from({length:16},(_,i)=>({x:28+(i%4)*34+(temperature/50)*(i%2?4:-4),y:24+Math.floor(i/4)*30+(temperature/50)*(i%3?3:-3)}));
  return <Frame unit="3 · Intermolecular forces" title="Relate particle attractions to phase behavior" takeaway="Stronger intermolecular attractions generally require more energy to separate particles, raising boiling point. At the same temperature, stronger attractions make escape into the gas phase less favorable.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Relative attraction strength" min={1} max={10} step={1} value={strength} onChange={setStrength}/><Slider label="Relative thermal motion" min={10} max={100} step={10} value={temperature} onChange={setTemperature}/><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Illustrative boiling-point index</div><div className="text-2xl font-bold">{boiling}</div></div></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 180 160" className="w-full" role="img" aria-label="Particle model with adjustable thermal motion">{particles.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r="7" fill="#5aa9ff" fillOpacity=".9"/>{i%4!==3&&<line x1={p.x} y1={p.y} x2={p.x+34} y2={p.y} stroke="#34d399" strokeOpacity={Math.max(.1,1-strength/12)} strokeDasharray="3 3"/>}</g>)}</svg><p className="text-xs text-ink-dim">Schematic particle model. The index is illustrative, not a prediction of a real substance's boiling point.</p></div></div>
  </Frame>;
}
function ElectronConfigLab() {
  const [electrons,setElectrons]=useState(10);const shells=[{name:"1s",cap:2},{name:"2s",cap:2},{name:"2p",cap:6},{name:"3s",cap:2},{name:"3p",cap:6}];let left=electrons;
  const filled=shells.map(s=>{const n=Math.min(left,s.cap);left-=n;return {...s,n};});
  return <Frame unit="1 · Electron configuration" title="Fill orbitals in energy order" takeaway="Electrons occupy lower-energy orbitals first, with at most two electrons per orbital and opposite spins. This simplified filling sequence covers the first 18 electrons; transition-metal exceptions are outside this model.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Number of electrons" min={1} max={18} step={1} value={electrons} onChange={setElectrons}/><p className="text-sm text-ink-dim">Filling sequence: 1s → 2s → 2p → 3s → 3p.</p></div><div className="space-y-3 rounded-xl border border-border bg-bg/50 p-4">{filled.map(s=><div key={s.name} className="flex items-center gap-3"><span className="w-8 text-sm font-semibold">{s.name}</span><div className="flex gap-1">{Array.from({length:s.cap/2},(_,i)=><div key={i} className="flex h-8 w-12 items-center justify-center gap-1 rounded border border-border bg-card text-sm">{s.n>i*2?"↑":""}{s.n>i*2+1?"↓":""}</div>)}</div><span className="text-xs text-ink-dim">{s.n}/{s.cap}</span></div>)}</div></div>
  </Frame>;
}
function PESTrendLab() {
  const [inner,setInner]=useState(2);const [outer,setOuter]=useState(1);
  return <Frame unit="1 · Photoelectron spectroscopy" title="Read a schematic PES spectrum" takeaway="Peak position indicates electron binding energy, while peak area reflects the number of electrons in a subshell. Inner-shell electrons generally have higher binding energies than outer-shell electrons.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Inner-shell electrons" min={1} max={2} step={1} value={inner} onChange={setInner}/><Slider label="Outer-shell electrons" min={1} max={8} step={1} value={outer} onChange={setOuter}/><p className="text-sm text-ink-dim">Adjust electron counts and compare peak areas; positions are schematic.</p></div><div className="rounded-xl border border-border bg-bg/50 p-4"><svg viewBox="0 0 320 200" className="w-full" role="img" aria-label="Schematic PES spectrum with inner and outer shell peaks"><line x1="25" y1="160" x2="300" y2="160" stroke="var(--color-ink-dim)"/><rect x="70" y={160-inner*35} width="48" height={inner*35} fill="#5aa9ff" rx="3"/><rect x="205" y={160-outer*15} width="48" height={outer*15} fill="#34d399" rx="3"/><text x="94" y="180" textAnchor="middle" fontSize="10" fill="var(--color-ink-dim)">Inner shell</text><text x="229" y="180" textAnchor="middle" fontSize="10" fill="var(--color-ink-dim)">Outer shell</text><text x="160" y="195" textAnchor="middle" fontSize="10" fill="var(--color-ink-dim)">Schematic binding-energy peaks</text></svg></div></div>
  </Frame>;
}
function IonicFormulaLab() {
  const [cat,setCat]=useState(2);const [an,setAn]=useState(3);const gcd=(a:number,b:number):number=>b===0?a:gcd(b,a%b);const total=cat*an/gcd(cat,an);const c=total/cat,a=total/an;
  return <Frame unit="1 · Ionic compounds" title="Build a neutral ionic formula" takeaway="An ionic formula represents the lowest whole-number ratio that makes total positive and negative charge sum to zero. The subscripts come from charge balance, not from the number of atoms in a Lewis drawing.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Cation charge magnitude" min={1} max={3} step={1} value={cat} onChange={setCat} suffix="+"/><Slider label="Anion charge magnitude" min={1} max={3} step={1} value={an} onChange={setAn} suffix="−"/></div><div className="rounded-xl border border-border bg-bg/50 p-4"><div className="text-xs text-ink-dim">Smallest neutral ratio</div><div className="my-2 text-3xl font-bold">{c===1?"M":"M"+c}{a===1?"X":"X"+a}</div><p className="text-sm">Positive charge: {c} × +{cat} = +{c*cat}</p><p className="text-sm">Negative charge: {a} × −{an} = −{a*an}</p><p className="mt-2 font-semibold text-emerald-300">Net charge = 0</p></div></div>
  </Frame>;
}
function BondTypeLab() {
  const [difference,setDifference]=useState(1.2);
  const type=difference<.4?"Mostly nonpolar covalent":difference<1.7?"Polar covalent":"Often modeled as ionic";
  return <Frame unit="2 · Chemical bonds" title="Use electronegativity difference as evidence" takeaway="Electronegativity difference is a useful guide to bond polarity, not a universal hard boundary. Bonding is a continuum, and context such as the atoms and structure also matters.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Electronegativity difference ΔEN" min={0} max={3.5} step={.1} value={difference} onChange={setDifference}/><div className="rounded-lg border border-border p-4"><div className="text-xs text-ink-dim">Approximate classification</div><div className="text-xl font-bold">{type}</div></div></div><div className="flex items-center justify-center rounded-xl border border-border bg-bg/50 p-4"><svg viewBox="0 0 300 130" className="w-full" role="img" aria-label="Schematic polar bond with adjustable electron density"><circle cx="75" cy="65" r="27" fill="#5aa9ff" fillOpacity=".55"/><circle cx="225" cy="65" r="27" fill="#f5c454" fillOpacity=".7"/><ellipse cx="150" cy="65" rx={35+difference*9} ry={14+difference*2} fill="#34d399" fillOpacity={Math.min(.55,.15+difference*.1)}/><text x="75" y="70" textAnchor="middle" fill="var(--color-ink)" fontWeight="700">δ+</text><text x="225" y="70" textAnchor="middle" fill="var(--color-ink)" fontWeight="700">δ−</text><text x="150" y="118" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="11">Schematic electron density</text></svg></div></div>
  </Frame>;
}
function IonicLatticeLab() {
  const [cation,setCation]=useState(1);const [anion,setAnion]=useState(1);const [distance,setDistance]=useState(2);const energy=-(cation*anion)/distance;
  return <Frame unit="2 · Ionic solids" title="Compare ionic attraction in a lattice" takeaway="Coulombic attraction strengthens when ion-charge magnitudes increase and when oppositely charged ions are closer. Real lattice energy depends on the full three-dimensional arrangement, not one ion pair alone.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Cation charge magnitude" min={1} max={3} step={1} value={cation} onChange={setCation}/><Slider label="Anion charge magnitude" min={1} max={3} step={1} value={anion} onChange={setAnion}/><Slider label="Separation" min={1} max={5} step={.25} value={distance} onChange={setDistance}/></div><div className="rounded-xl border border-border bg-bg/50 p-4"><div className="text-xs text-ink-dim">Relative pair potential energy</div><div className="text-3xl font-bold">{energy.toFixed(2)}</div><p className="mt-2 text-sm text-ink-dim">More negative means a stronger attractive interaction in this simplified pair model.</p></div></div>
  </Frame>;
}
function FormalChargeLab() {
  const [valence,setValence]=useState(5);const [nonbonding,setNonbonding]=useState(2);const [bonding,setBonding]=useState(6);const charge=valence-nonbonding-bonding/2;
  return <Frame unit="2 · Formal charge" title="Calculate formal charge from a Lewis structure" takeaway="Formal charge = valence electrons − nonbonding electrons − half the bonding electrons. Use the electron count shown in the structure; formal charge is bookkeeping for comparing valid Lewis structures, not a literal measurement of atomic charge.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Valence electrons for the neutral atom" min={1} max={8} step={1} value={valence} onChange={setValence}/><Slider label="Nonbonding electrons assigned" min={0} max={8} step={1} value={nonbonding} onChange={setNonbonding}/><Slider label="Bonding electrons" min={0} max={8} step={2} value={bonding} onChange={setBonding}/></div><div className="flex flex-col justify-center rounded-xl border border-border bg-bg/50 p-4"><div className="text-xs text-ink-dim">Formal charge</div><div className="text-3xl font-bold">{charge>0?"+":""}{charge}</div><p className="mt-2 text-sm text-ink-dim">{valence} − {nonbonding} − ({bonding}/2) = {charge}</p></div></div>
  </Frame>;
}
function ChromatographyLab() {
  const [spot,setSpot]=useState(4);const [front,setFront]=useState(8);
  return <Frame unit="3 · Separation techniques" title="Measure an Rf value" takeaway="Retention factor is the distance traveled by a component divided by the distance traveled by the solvent front, both measured from the same origin. Under the same conditions, Rf values can help compare components.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Spot distance from origin" min={1} max={front} step={.5} value={Math.min(spot,front)} onChange={setSpot} suffix=" cm"/><Slider label="Solvent-front distance" min={2} max={10} step={.5} value={front} onChange={setFront}/><div className="rounded-lg border border-border p-3"><div className="text-xs text-ink-dim">Rf = spot / solvent front</div><div className="text-3xl font-bold">{(Math.min(spot,front)/front).toFixed(2)}</div></div></div><div className="flex items-center justify-center rounded-xl border border-border bg-bg/50 p-4"><svg viewBox="0 0 180 240" className="w-full max-w-xs" role="img" aria-label="Paper chromatography plate with adjustable spot and solvent front"><rect x="35" y="15" width="110" height="205" rx="4" fill="#e2e8f0" fillOpacity=".1" stroke="var(--color-ink-dim)"/><line x1="35" y1="210" x2="145" y2="210" stroke="#f5c454" strokeWidth="2"/><line x1="35" y1={210-front/10*180} x2="145" y2={210-front/10*180} stroke="#5aa9ff" strokeDasharray="4 3"/><circle cx="90" cy={210-Math.min(spot,front)/10*180} r="7" fill="#34d399"/><text x="90" y="235" textAnchor="middle" fontSize="10" fill="var(--color-ink-dim)">Origin</text></svg></div></div>
  </Frame>;
}
function SolubilityLab() {
  const [temperature,setTemperature]=useState(25);const [polarity,setPolarity]=useState(5);const capacity=Math.max(1,Math.min(100,20+temperature*.7+polarity*3));
  return <Frame unit="3 · Solutions" title="Explore a qualitative solubility model" takeaway="Solubility depends on the balance of solute–solute, solvent–solvent, and solute–solvent interactions. Temperature effects depend on the substance and whether dissolution is endothermic or exothermic, so this is a qualitative model rather than a universal law.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Temperature" min={0} max={80} step={5} value={temperature} onChange={setTemperature} suffix=" °C"/><Slider label="Relative solute–solvent compatibility" min={1} max={10} step={1} value={polarity} onChange={setPolarity}/></div><div className="rounded-xl border border-border bg-bg/50 p-4"><div className="text-xs text-ink-dim">Illustrative dissolving capacity index</div><div className="text-3xl font-bold">{capacity.toFixed(0)}</div><div className="mt-3 h-4 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-emerald-300" style={{width:capacity+"%"}}/></div><p className="mt-2 text-xs text-ink-dim">A conceptual index only; real solubility must be measured or derived for the specific solute–solvent system.</p></div></div>
  </Frame>;
}
function MetallicLab() {
  const [alloy,setAlloy]=useState(0);const [layers,setLayers]=useState(2);
  return <Frame unit="2 · Metallic bonding" title="See why metals conduct and deform" takeaway="Delocalized valence electrons can move through the metallic lattice and carry charge and thermal energy. Metal-ion layers can shift while the electron sea continues to attract them; alloying disrupts regular layer alignment and often reduces ease of sliding.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Alloying / size mismatch" min={0} max={10} step={1} value={alloy} onChange={setAlloy}/><Slider label="Layer displacement" min={0} max={4} step={1} value={layers} onChange={setLayers}/><p className="text-sm text-ink-dim">Model prediction: {alloy===0?"regular layers slide relatively easily":alloy<5?"some lattice distortion resists sliding":"strong lattice distortion makes sliding harder"}.</p></div><div className="rounded-xl border border-border bg-bg/50 p-3"><svg viewBox="0 0 300 190" className="w-full" role="img" aria-label="Metal lattice with mobile electrons and adjustable layer displacement">{Array.from({length:3},(_,row)=>Array.from({length:5},(_,col)=>{const x=35+col*52+(row===1?layers*5:0),y=35+row*52;return <g key={row+"-"+col}><circle cx={x} cy={y} r={alloy>0&&(row+col)%3===0?13:10} fill={alloy>0&&(row+col)%3===0?"#f5c454":"#5aa9ff"}/><text x={x} y={y+3} textAnchor="middle" fontSize="8" fill="#0a0e16">+</text></g>}))}{Array.from({length:8},(_,i)=><circle key={i} cx={25+(i*31)%250} cy={20+(i*23)%145} r="3" fill="#34d399"/>)}</svg><p className="text-xs text-ink-dim">Schematic: blue/gold circles are metal-ion cores; green dots represent mobile valence electrons.</p></div></div>
  </Frame>;
}
function KineticMolecularLab() {
  const [temperature,setTemperature]=useState(300);const [mass,setMass]=useState(28);const speed=Math.sqrt(3*8.314*temperature/(mass/1000));
  return <Frame unit="3 · Kinetic molecular theory" title="Compare average molecular speeds" takeaway="At the same temperature, gases have the same average translational kinetic energy, but lighter particles have higher characteristic speeds. Raising temperature increases average kinetic energy and speed.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Absolute temperature" min={100} max={800} step={25} value={temperature} onChange={setTemperature} suffix=" K"/><Slider label="Molar mass" min={2} max={100} step={2} value={mass} onChange={setMass} suffix=" g/mol"/></div><div className="rounded-xl border border-border bg-bg/50 p-4"><div className="text-xs text-ink-dim">Root-mean-square speed</div><div className="text-3xl font-bold">{speed.toFixed(0)} m/s</div><div className="mt-2 text-sm text-ink-dim">uᵣₘₛ = √(3RT/M), with M in kg/mol.</div><div className="mt-4 h-3 rounded-full bg-white/5"><div className="h-3 rounded-full bg-emerald-300" style={{width:Math.min(100,speed/1600*100)+"%"}}/></div></div></div>
  </Frame>;
}
function NonIdealGasLab() {
  const [volume,setVolume]=useState(5);const [temperature,setTemperature]=useState(300);const [attraction,setAttraction]=useState(2);
  const ideal=.082057*temperature/volume;const z=1-attraction/(temperature*volume);const real=ideal*z;
  return <Frame unit="3 · Real gases" title="Explore why real gases deviate from PV = nRT" takeaway="The ideal model assumes negligible particle volume and no intermolecular attractions. At high pressure or low temperature, finite particle size and attractions become more important; this qualitative correction is not a substitute for a fitted real-gas equation.">
    <div className="grid gap-5 md:grid-cols-2"><div><Slider label="Container volume" min={1} max={10} step={.5} value={volume} onChange={setVolume} suffix=" L"/><Slider label="Temperature" min={100} max={600} step={25} value={temperature} onChange={setTemperature} suffix=" K"/><Slider label="Relative attraction strength" min={0} max={10} step={1} value={attraction} onChange={setAttraction}/></div><div className="rounded-xl border border-border bg-bg/50 p-4"><p className="text-sm text-ink-dim">Ideal pressure (1 mol)</p><p className="text-xl font-bold">{ideal.toFixed(2)} atm</p><p className="mt-3 text-sm text-ink-dim">Illustrative corrected pressure</p><p className="text-2xl font-bold">{real.toFixed(2)} atm</p><p className="mt-2 text-xs text-ink-dim">Toy correction factor Z = 1 − a/(TV); use only to visualize trends, not to calculate actual gas behavior.</p></div></div>
  </Frame>;
}
function PhysicalChemicalLab() {
  const [change,setChange]=useState("melting");
  const data:Record<string,{label:string;kind:string;explain:string}>={melting:{label:"Ice melting",kind:"Physical change",explain:"H₂O molecules remain H₂O; their arrangement and motion change as the solid becomes liquid."},dissolving:{label:"Salt dissolving in water",kind:"Physical process (dissociation/solvation)",explain:"The ionic lattice separates into hydrated ions; no new molecular substance is formed in the usual aqueous model."},decomposition:{label:"Hydrogen peroxide decomposes",kind:"Chemical change",explain:"H₂O₂ molecules rearrange into H₂O and O₂; new chemical species form."}};
  return <Frame unit="4 · Physical vs. chemical changes" title="Classify a change from the particle model" takeaway="A phase change changes arrangement and motion without changing chemical identity. A chemical reaction changes bonding and produces different chemical species. Look for the particle identity, not just whether a sample looks different.">
    <label className="mb-2 block text-sm text-ink-dim" htmlFor="change-type">Choose the observed change</label><select id="change-type" value={change} onChange={e=>setChange(e.target.value)} className="mb-4 w-full rounded-lg border border-border bg-bg px-3 py-2">{Object.entries(data).map(([key,value])=><option key={key} value={key}>{value.label}</option>)}</select><div className="rounded-xl border border-border bg-bg/50 p-4"><div className="text-xl font-bold text-emerald-300">{data[change].kind}</div><p className="mt-2 text-sm">{data[change].explain}</p><svg viewBox="0 0 300 100" className="mt-3 w-full" role="img" aria-label="Schematic particles before and after the selected change">{Array.from({length:8},(_,i)=>{const chemical=change==="decomposition";const x=25+(i%4)*28,y=20+Math.floor(i/4)*28;return <g key={i}><circle cx={x} cy={y} r="6" fill={chemical&&i%2===0?"#f5c454":"#5aa9ff"}/>{!chemical&&<circle cx={x+8} cy={y} r="4" fill="#34d399"/>}</g>})}<line x1="155" y1="15" x2="155" y2="80" stroke="var(--color-ink-dim)" strokeDasharray="3 3"/>{Array.from({length:8},(_,i)=>{const chemical=change==="decomposition";const x=180+(i%4)*28,y=20+Math.floor(i/4)*28;return <g key={i}><circle cx={x} cy={y} r="6" fill={chemical&&i%2===0?"#f5c454":"#5aa9ff"}/>{!chemical&&<circle cx={x+8} cy={y} r="4" fill="#34d399"/>}</g>})}</svg><p className="text-xs text-ink-dim">Schematic particle drawing, not a stoichiometric count.</p></div>
  </Frame>;
}
function UnitOne({ topicNumber }: { topicNumber: string }) {
  if (["1.1","1.3","1.4"].includes(topicNumber)) return <MoleLab />;
  if (topicNumber === "1.2") return <IsotopeLab />;
  if (topicNumber === "1.5") return <ElectronConfigLab />;
  if (topicNumber === "1.6") return <PESTrendLab />;
  if (topicNumber === "1.8") return <IonicFormulaLab />;
  if (topicNumber === "1.9") return <CoulombLab />;
  return <PeriodicTrendLab />;
}
function UnitTwo({ topicNumber }: { topicNumber: string }) {
  if (topicNumber === "2.1") return <BondTypeLab />;
  if (topicNumber === "2.3") return <IonicLatticeLab />;
  if (topicNumber === "2.4") return <MetallicLab />;
  if (topicNumber === "2.5") return <LewisLab />;
  if (topicNumber === "2.6") return <FormalChargeLab />;
  if (topicNumber === "2.7") return <GeometryLab />;
  return <BondPotentialLab />;
}
function UnitThree({ topicNumber }: { topicNumber: string }) {
  if (topicNumber === "3.5") return <KineticMolecularLab />;
  if (topicNumber === "3.6") return <NonIdealGasLab />;
  if (topicNumber === "3.1" || topicNumber === "3.2" || topicNumber === "3.3") return <IntermolecularLab />;
  if (["3.7","3.8"].includes(topicNumber)) return <SolutionLab />;
  if (topicNumber === "3.9") return <ChromatographyLab />;
  if (topicNumber === "3.10") return <SolubilityLab />;
  if (topicNumber === "3.11" || topicNumber === "3.12") return <PhotonLab />;
  if (topicNumber === "3.13") return <BeerLambertLab />;
  return <GasLawLab />;
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
  if (topicNumber === "4.4") return <PhysicalChemicalLab />;
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
  const [order, setOrder] = useState(1);
  const [k, setK] = useState(.15);
  const [initial, setInitial] = useState(1.5);
  const points = Array.from({ length: 41 }, (_, i) => {
    const time = i * .05;
    let concentration = initial;
    if (order === 0) concentration = Math.max(.001, initial - k * time);
    if (order === 1) concentration = initial * Math.exp(-k * time);
    if (order === 2) concentration = initial / (1 + k * initial * time);
    return { time, concentration };
  });
  const concentrationAtTwo = points[points.length - 1].concentration;
  const plots = [
    { id: 0, title: "[A] vs. time", transform: (c: number) => c, yLabel: "[A] (M)" },
    { id: 1, title: "ln[A] vs. time", transform: (c: number) => Math.log(c), yLabel: "ln[A]" },
    { id: 2, title: "1/[A] vs. time", transform: (c: number) => 1 / c, yLabel: "1/[A] (M⁻¹)" },
  ];
  const matchingPlot = order === 0 ? 0 : order === 1 ? 1 : 2;
  const matchingEquation = order === 0
    ? "[A]ₜ = [A]₀ − kt"
    : order === 1
      ? "ln[A]ₜ = ln[A]₀ − kt"
      : "1/[A]ₜ = 1/[A]₀ + kt";
  const makePath = (values: number[]) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    return values.map((value, index) => {
      const x = 28 + (index / (values.length - 1)) * 244;
      const y = 18 + (1 - (value - min) / span) * 78;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
  };

  return <Frame unit="5 · Kinetics" title="Find the linear integrated rate-law plot" takeaway="The correct transformation produces a straight line: [A] versus time for zero order, ln[A] versus time for first order, and 1/[A] versus time for second order. Use the shape of the transformed data to identify which integrated rate law is supported.">
    <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.75fr)_minmax(0,1.5fr)]">
      <div>
        <label className="mb-1 block text-sm text-ink-dim" htmlFor="kinetics-order">Simulated reaction order</label>
        <select id="kinetics-order" value={order} onChange={event => setOrder(Number(event.target.value))} className="mb-3 min-h-11 w-full rounded-lg border border-border bg-bg px-3 py-2">
          <option value={0}>Zero order</option>
          <option value={1}>First order</option>
          <option value={2}>Second order</option>
        </select>
        <Slider label="Rate constant (illustrative)" min={.05} max={.2} step={.01} value={k} onChange={setK} suffix={order === 0 ? " M/s" : order === 1 ? " s⁻¹" : " M⁻¹s⁻¹"}/>
        <Slider label="Initial concentration" min={.5} max={2} step={.25} value={initial} onChange={setInitial} suffix=" M"/>
        <div className="mt-3 rounded-lg border border-border p-3">
          <div className="text-xs text-ink-dim">Model concentration at t = 2</div>
          <div className="text-2xl font-bold">{concentrationAtTwo.toFixed(3)} M</div>
          <div className="mt-1 text-xs leading-relaxed text-ink-dim">{matchingEquation}</div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-dim">The model generates concentration data, then transforms the same data three ways. These are simulated values, not experimental measurements.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {plots.map(plot => {
          const values = points.map(point => plot.transform(point.concentration));
          const isMatch = plot.id === matchingPlot;
          return <article key={plot.id} className={`rounded-xl border p-3 ${isMatch ? "border-emerald-300 bg-emerald-300/5" : "border-border bg-bg/50"}`}>
            <div className="min-h-10 text-sm font-semibold">{plot.title}</div>
            <svg viewBox="0 0 290 135" className="w-full" role="img" aria-label={`${plot.title} simulated for a ${order === 0 ? "zero" : order === 1 ? "first" : "second"}-order reaction`}>
              <line x1="28" y1="100" x2="272" y2="100" stroke="var(--color-ink-dim)" strokeWidth="1"/>
              <line x1="28" y1="18" x2="28" y2="100" stroke="var(--color-ink-dim)" strokeWidth="1"/>
              <path d={makePath(values)} fill="none" stroke={isMatch ? "#34d399" : "#8b9bb0"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="150" y="122" textAnchor="middle" fontSize="10" fill="var(--color-ink-dim)">Time (s)</text>
              <text x="12" y="60" transform="rotate(-90 12 60)" textAnchor="middle" fontSize="9" fill="var(--color-ink-dim)">{plot.yLabel}</text>
            </svg>
            <p className={`text-xs font-semibold ${isMatch ? "text-emerald-300" : "text-ink-dim"}`}>{isMatch ? "Linear for this order" : "Not linear for this order"}</p>
          </article>;
        })}
      </div>
    </div>
    <div className="mt-5 rounded-xl border border-border bg-bg/50 p-4">
      <p className="text-sm font-semibold">Prediction check</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-dim">Change the reaction order and compare all three plots. Only the transformation that matches the selected model should be linear. In real data, measurement noise means you look for the best straight-line fit rather than a mathematically perfect line.</p>
    </div>
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
  const labs: Record<number, ReactNode> = {1:<UnitOne topicNumber={topicNumber}/>,2:<UnitTwo topicNumber={topicNumber}/>,3:<UnitThree topicNumber={topicNumber}/>,4:<UnitFour topicNumber={topicNumber}/>,5:<UnitFive topicNumber={topicNumber}/>,6:<UnitSix/>,7:<UnitSeven/>,8:<UnitEight/>,9:<UnitNine/>};
  return <div data-topic={topicNumber} data-title={title}>{labs[unitId] ?? null}</div>;
}
