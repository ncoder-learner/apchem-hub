import type { ReactNode } from "react";

export type Unit3VisualKind = "forces" | "phases" | "gas-law" | "kinetic" | "solutions" | "solubility" | "spectroscopy" | "photoelectric" | "beer-lambert" | "chromatography";

const meta: Record<Unit3VisualKind, { title: string; caption: string }> = {
  forces: { title: "Compare attractions between particles", caption: "Stronger intermolecular attractions generally require more energy to separate particles and tend to raise boiling point." },
  phases: { title: "Particle motion and spacing in each phase", caption: "Particles are always moving; phase differences reflect their arrangement, spacing, and freedom of motion." },
  "gas-law": { title: "Gas variables are linked", caption: "For a fixed amount of gas, pressure, volume, and absolute temperature are connected by PV = nRT." },
  kinetic: { title: "Kinetic molecular theory", caption: "At the same temperature, gas particles have the same average translational kinetic energy, not the same average speed." },
  solutions: { title: "A solution is a uniform particle-level mixture", caption: "Solute particles disperse among solvent particles; whether this occurs depends on competing interactions." },
  solubility: { title: "Solubility reflects competing interactions", caption: "Dissolution is favored when solute–solvent interactions compensate for disrupting solute–solute and solvent–solvent interactions." },
  spectroscopy: { title: "Light carries quantized energy", caption: "Photon energy increases with frequency and decreases with wavelength: E = hν = hc/λ." },
  photoelectric: { title: "The photoelectric effect has a threshold", caption: "If a photon does not have enough energy to eject an electron, increasing intensity alone does not make each photon more energetic." },
  "beer-lambert": { title: "Absorbance tracks concentration", caption: "At fixed path length and wavelength, Beer–Lambert law predicts A = εℓc." },
  chromatography: { title: "Paper chromatography separates mixture components", caption: "Schematic model: the solvent is the mobile phase and the paper is the stationary phase. Components that interact differently with the two phases travel different distances. Measure each spot and the solvent front from the same origin to calculate Rf." },
};

function Particle({ x, y, color, r=8 }: {x:number;y:number;color:string;r?:number}) {
  return <g><circle cx={x} cy={y} r={r+3} fill={color} opacity=".13"/><circle cx={x} cy={y} r={r} fill={color}/><circle cx={x-r*.28} cy={y-r*.3} r={r*.25} fill="#fff" opacity=".55"/></g>;
}

export function Unit3Visual({ kind, children }: {kind:Unit3VisualKind; children?:ReactNode}) {
 const m=meta[kind];
 return <figure className="chem-visual my-6 overflow-hidden rounded-2xl border border-border bg-card/70">
  <div className="chem-visual-heading flex items-center gap-2 border-b border-border px-4 py-3"><span className="h-2 w-2 rounded-full bg-accent"/><figcaption className="text-sm font-semibold text-ink">{m.title}</figcaption></div>
  <div className="px-3 py-4 sm:px-5">
   <svg viewBox="0 0 600 230" role="img" aria-label={m.title} className="mx-auto block w-full max-w-2xl">
    {kind==="forces" && <>
      <text x="145" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="14">Weaker attraction</text><text x="455" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="14">Stronger attraction</text>
      {Array.from({length:8},(_,i)=><Particle key={i} x={75+(i%4)*45} y={65+Math.floor(i/4)*55} color="#5aa9ff" r={10}/>)}
      {Array.from({length:8},(_,i)=><g key={i}><Particle x={375+(i%4)*45} y={65+Math.floor(i/4)*55} color="#34d399" r={10}/><line x1={375+(i%4)*45} y1={65+Math.floor(i/4)*55} x2={375+(i%4)*45+12} y2={65+Math.floor(i/4)*55} stroke="#f5c454" strokeWidth="1" strokeDasharray="2 3"/></g>)}
      <text x="145" y="190" textAnchor="middle" fill="#93a1b7" fontSize="12">Easier to separate</text><text x="455" y="190" textAnchor="middle" fill="#93a1b7" fontSize="12">More energy to separate</text>
    </>}
    {kind==="phases" && <>
      <text x="100" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="14">Solid</text><text x="300" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="14">Liquid</text><text x="500" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="14">Gas</text>
      {Array.from({length:16},(_,i)=><Particle key={i} x={55+(i%4)*30} y={65+Math.floor(i/4)*30} color="#5aa9ff" r={6}/>)}
      {Array.from({length:14},(_,i)=><Particle key={i} x={240+(i%4)*31+(Math.floor(i/4)%2)*7} y={68+Math.floor(i/4)*32} color="#34d399" r={6}/>)}
      {[[430,58],[520,78],[478,125],[555,165],[425,180],[515,205],[560,115],[465,90]].map(([x,y],i)=><Particle key={i} x={x} y={y} color="#f5c454" r={6}/>)}
    </>}
    {kind==="gas-law" && <>
      <rect x="70" y="40" width="180" height="145" rx="12" fill="#101a2b" stroke="#5aa9ff" strokeWidth="2"/><rect x="350" y="40" width="180" height="145" rx="12" fill="#101a2b" stroke="#34d399" strokeWidth="2"/>
      {Array.from({length:12},(_,i)=><Particle key={i} x={90+(i%4)*42} y={65+Math.floor(i/4)*40} color="#5aa9ff" r={5}/>)}
      {Array.from({length:12},(_,i)=><Particle key={i} x={370+(i%4)*42} y={65+Math.floor(i/4)*40} color="#34d399" r={5}/>)}
      <text x="160" y="210" textAnchor="middle" fill="#93a1b7" fontSize="12">Larger volume</text><text x="440" y="210" textAnchor="middle" fill="#93a1b7" fontSize="12">Smaller volume, same n</text>
    </>}
    {kind==="kinetic" && <>
      {Array.from({length:8},(_,i)=><g key={i}><Particle x={80+(i%4)*45} y={65+Math.floor(i/4)*65} color="#5aa9ff" r={7}/><line x1={80+(i%4)*45} y1={65+Math.floor(i/4)*65} x2={100+(i%4)*45} y2={50+Math.floor(i/4)*65} stroke="#5aa9ff" strokeWidth="2"/></g>)}
      {Array.from({length:8},(_,i)=><g key={i}><Particle x={365+(i%4)*45} y={65+Math.floor(i/4)*65} color="#f5c454" r={7}/><line x1={365+(i%4)*45} y1={65+Math.floor(i/4)*65} x2={395+(i%4)*45} y2={65+Math.floor(i/4)*65} stroke="#f5c454" strokeWidth="2"/></g>)}
      <text x="155" y="195" textAnchor="middle" fill="#93a1b7" fontSize="12">Lower molar mass: faster</text><text x="445" y="195" textAnchor="middle" fill="#93a1b7" fontSize="12">Higher molar mass: slower</text>
    </>}
    {kind==="solutions" && <>
      <text x="150" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="14">Before mixing</text><text x="445" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="14">Homogeneous solution</text>
      {Array.from({length:10},(_,i)=><Particle key={i} x={75+(i%5)*30} y={55+Math.floor(i/5)*40} color="#5aa9ff" r={7}/>)}
      {Array.from({length:6},(_,i)=><Particle key={i} x={95+(i%3)*30} y={145+Math.floor(i/3)*25} color="#f5718a" r={7}/>)}
      {Array.from({length:16},(_,i)=><Particle key={i} x={365+(i%4)*35} y={55+Math.floor(i/4)*38} color={i%3===0?"#f5718a":"#5aa9ff"} r={7}/>)}
    </>}
    {kind==="solubility" && <>
      <text x="150" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="14">Solute particles</text><text x="450" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="14">Dispersed by solvent</text>
      {Array.from({length:9},(_,i)=><Particle key={i} x={95+(i%3)*35} y={65+Math.floor(i/3)*35} color="#f5718a" r={8}/>)}
      <path d="M230 110 L320 110 M308 98 L320 110 L308 122" stroke="#93a1b7" strokeWidth="2" fill="none"/>
      {Array.from({length:20},(_,i)=><Particle key={i} x={365+(i%5)*32} y={50+Math.floor(i/5)*35} color={i%4===0?"#f5718a":"#5aa9ff"} r={6}/>)}
    </>}
    {kind==="chromatography" && <>
      <rect x="150" y="25" width="300" height="180" rx="3" fill="#f4f1e8" stroke="#cbd5e1" strokeWidth="1.5"/>
      <line x1="150" y1="55" x2="450" y2="55" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 4"/>
      <text x="300" y="45" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="600">Solvent front</text>
      <line x1="150" y1="170" x2="450" y2="170" stroke="#475569" strokeWidth="1.5"/>
      <text x="300" y="188" textAnchor="middle" fill="#334155" fontSize="12">Origin / baseline</text>
      <circle cx="245" cy="170" r="5" fill="#7c3aed"/>
      <circle cx="355" cy="170" r="5" fill="#ea580c"/>
      <circle cx="245" cy="118" r="8" fill="#7c3aed" opacity=".9"/>
      <circle cx="355" cy="80" r="8" fill="#ea580c" opacity=".9"/>
      <line x1="245" y1="162" x2="245" y2="130" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3"/>
      <line x1="355" y1="162" x2="355" y2="92" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3"/>
      <text x="245" y="105" textAnchor="middle" fill="#5b21b6" fontSize="11">Spot A</text>
      <text x="355" y="68" textAnchor="middle" fill="#9a3412" fontSize="11">Spot B</text>
      <text x="300" y="222" textAnchor="middle" fill="#93a1b7" fontSize="11">Illustrative separation; not experimental data</text>
    </>}
    {(kind==="spectroscopy"||kind==="photoelectric"||kind==="beer-lambert") && <>
      <line x1="78" y1="170" x2="530" y2="170" stroke="#93a1b7" strokeWidth="1.5"/>
      <line x1="78" y1="42" x2="78" y2="170" stroke="#93a1b7" strokeWidth="1.5"/>
      <path d="M78 42 L73 51 M78 42 L83 51 M530 170 L520 165 M530 170 L520 175" stroke="#93a1b7" strokeWidth="1.5" fill="none"/>
      {kind==="spectroscopy" && <>
        <text x="86" y="32" fill="#e6ecf5" fontSize="12">Relative intensity</text>
        <text x="300" y="205" textAnchor="middle" fill="#93a1b7" fontSize="12">Wavelength (schematic)</text>
        <line x1="145" y1="170" x2="145" y2="115" stroke="#5aa9ff" strokeWidth="4"/>
        <line x1="230" y1="170" x2="230" y2="65" stroke="#5aa9ff" strokeWidth="4"/>
        <line x1="318" y1="170" x2="318" y2="135" stroke="#5aa9ff" strokeWidth="4"/>
        <line x1="420" y1="170" x2="420" y2="88" stroke="#5aa9ff" strokeWidth="4"/>
        <text x="300" y="226" textAnchor="middle" fill="#93a1b7" fontSize="10">Illustrative line spectrum, not measured data</text>
      </>}
      {kind==="photoelectric" && <>
        <text x="86" y="32" fill="#e6ecf5" fontSize="12">Maximum kinetic energy</text>
        <text x="300" y="205" textAnchor="middle" fill="#93a1b7" fontSize="12">Incident-light frequency</text>
        <line x1="205" y1="170" x2="205" y2="48" stroke="#f5718a" strokeWidth="1.5" strokeDasharray="4 4"/>
        <path d="M205 170 L495 60" stroke="#f5c454" strokeWidth="3" fill="none"/>
        <text x="205" y="188" textAnchor="middle" fill="#f5718a" fontSize="10">Threshold</text>
        <text x="300" y="226" textAnchor="middle" fill="#93a1b7" fontSize="10">Above threshold: KE rises with frequency</text>
      </>}
      {kind==="beer-lambert" && <>
        <text x="86" y="32" fill="#e6ecf5" fontSize="12">Absorbance, A</text>
        <text x="300" y="205" textAnchor="middle" fill="#93a1b7" fontSize="12">Concentration, c</text>
        <path d="M78 170 L505 52" stroke="#34d399" strokeWidth="3" fill="none"/>
        <text x="300" y="226" textAnchor="middle" fill="#93a1b7" fontSize="10">Linear range; fixed wavelength and path length</text>
      </>}
    </>}
   </svg>
   <p className="mt-2 text-center text-xs leading-relaxed text-ink-dim">{m.caption}</p>{children}
  </div>
 </figure>;
}
