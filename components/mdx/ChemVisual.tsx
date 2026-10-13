import type { ReactNode } from "react";

export type ChemVisualKind =
  | "atomic-model"
  | "isotope"
  | "mass-spectrum"
  | "mixture"
  | "electron-configuration"
  | "pes"
  | "periodic-trends"
  | "valence-electrons"
  | "coulomb"
  | "ionic-lattice"
  | "metallic-bonding"
  | "bond-energy"
  | "lewis"
  | "resonance"
  | "geometry";

const labels: Record<ChemVisualKind, { title: string; caption: string }> = {
  "atomic-model": { title: "Inside an atom", caption: "The nucleus contains protons and neutrons; electrons occupy quantized energy levels around it. The drawing is a model, not a scale diagram." },
  isotope: { title: "Same element, different isotope", caption: "Isotopes have the same proton count but different neutron counts. Changing the neutron count changes mass, not atomic number." },
  "mass-spectrum": { title: "Reading a simplified mass spectrum", caption: "Each peak represents ions with a particular mass-to-charge ratio. Peak height or area reflects relative abundance, depending on the instrument." },
  mixture: { title: "Pure substance vs. mixture", caption: "A pure substance contains one chemical species; a mixture contains two or more species physically combined." },
  "electron-configuration": { title: "Electrons fill orbitals in an energy order", caption: "Use the Aufbau principle, Pauli exclusion principle, and Hund’s rule together. Orbital-box diagrams show occupancy, not literal paths." },
  pes: { title: "Photoelectron spectroscopy (PES)", caption: "Higher binding energy means electrons are held more tightly. Peak area tracks how many electrons occupy a subshell." },
  "periodic-trends": { title: "Periodic trends are structural patterns", caption: "Across a period, effective nuclear charge generally rises; down a group, valence electrons occupy higher principal energy levels." },
  "valence-electrons": { title: "Valence electrons control bonding", caption: "For main-group elements, the group number helps predict valence-electron count and common ion charges." },
  coulomb: { title: "Electrostatic attraction depends on charge and distance", caption: "Larger charge magnitudes increase attraction; greater separation weakens it. This model explains trends, not exact energies by itself." },
  "ionic-lattice": { title: "An ionic solid is an extended lattice", caption: "Each ion interacts with many oppositely charged neighbors. The solid is not made of separate NaCl molecules." },
  "metallic-bonding": { title: "Metallic bonding", caption: "Mobile, delocalized valence electrons attract positive metal-ion cores and allow charge to move through the solid." },
  "bond-energy": { title: "Potential energy and bond length", caption: "The curve minimum marks the equilibrium separation. A deeper well generally means more energy is required to separate the atoms." },
  lewis: { title: "Build a Lewis structure in a repeatable order", caption: "Count valence electrons, choose a skeleton, complete terminal octets, place remaining electrons, then check formal charges and electron count." },
  resonance: { title: "Resonance is one delocalized structure", caption: "Resonance forms differ only in electron placement. The real species is a resonance hybrid, not a molecule switching between drawings." },
  geometry: { title: "Electron groups arrange in three dimensions", caption: "Count bonds and lone pairs around the central atom. Multiple bonds count as one electron group for VSEPR." },
};

function Atom({ x, y, protons, neutrons, label }: { x: number; y: number; protons: number; neutrons: number; label: string }) {
  return <g>
    <circle cx={x} cy={y} r="24" fill="#263449" stroke="#5aa9ff" strokeWidth="1.5" />
    {Array.from({ length: protons }, (_, i) => <circle key={`p${i}`} cx={x - 8 + (i % 3) * 8} cy={y - 7 + Math.floor(i / 3) * 8} r="3.5" fill="#f5718a" />)}
    {Array.from({ length: neutrons }, (_, i) => <circle key={`n${i}`} cx={x - 8 + (i % 3) * 8} cy={y + 2 + Math.floor(i / 3) * 8} r="3.5" fill="#93a1b7" />)}
    <ellipse cx={x} cy={y} rx="47" ry="31" fill="none" stroke="#34d399" strokeWidth="1.4" strokeDasharray="4 4" transform={`rotate(-28 ${x} ${y})`} />
    <circle cx={x + 31} cy={y - 25} r="4.5" fill="#34d399" />
    <text x={x} y={y + 52} textAnchor="middle" fill="#e6ecf5" fontSize="12" fontWeight="600">{label}</text>
  </g>;
}

export function ChemVisual({ kind, children }: { kind: ChemVisualKind; children?: ReactNode }) {
  const meta = labels[kind];
  return <figure className="chem-visual my-6 overflow-hidden rounded-2xl border border-border bg-card/70">
    <div className="chem-visual-heading flex items-center gap-2 border-b border-border px-4 py-3">
      <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
      <figcaption className="text-sm font-semibold text-ink">{meta.title}</figcaption>
    </div>
    <div className="chem-visual-art px-3 py-4 sm:px-5">
      <svg viewBox="0 0 600 220" role="img" aria-label={meta.title} className="mx-auto block w-full max-w-2xl">
        {kind === "atomic-model" && <>
          <Atom x={160} y={100} protons={3} neutrons={4} label="Nucleus" />
          <text x="285" y="78" fill="#34d399" fontSize="14" fontWeight="600">Electrons</text>
          <text x="285" y="101" fill="#93a1b7" fontSize="12">Negative charge</text>
          <line x1="250" y1="91" x2="208" y2="78" stroke="#34d399" strokeWidth="1.5" />
          <text x="285" y="137" fill="#f5718a" fontSize="14" fontWeight="600">Protons</text>
          <text x="285" y="159" fill="#93a1b7" fontSize="12">Positive charge</text>
          <text x="285" y="186" fill="#93a1b7" fontSize="12">Neutrons: no charge</text>
        </>}
        {kind === "isotope" && <>
          <Atom x={150} y={88} protons={3} neutrons={3} label="Lithium-6" />
          <Atom x={410} y={88} protons={3} neutrons={4} label="Lithium-7" />
          <text x="150" y="177" textAnchor="middle" fill="#f5718a" fontSize="12">3 protons</text>
          <text x="410" y="177" textAnchor="middle" fill="#f5718a" fontSize="12">3 protons</text>
          <text x="150" y="195" textAnchor="middle" fill="#93a1b7" fontSize="12">3 neutrons</text>
          <text x="410" y="195" textAnchor="middle" fill="#93a1b7" fontSize="12">4 neutrons</text>
        </>}
        {kind === "mass-spectrum" && <>
          <line x1="55" y1="180" x2="560" y2="180" stroke="#93a1b7" strokeWidth="1.5" />
          <line x1="55" y1="30" x2="55" y2="180" stroke="#93a1b7" strokeWidth="1.5" />
          {[{x:145,h:55,l:"20"},{x:285,h:120,l:"21"},{x:425,h:35,l:"22"}].map(p=><g key={p.l}><rect x={p.x-15} y={180-p.h} width="30" height={p.h} rx="3" fill="#5aa9ff" /><text x={p.x} y="201" textAnchor="middle" fill="#93a1b7" fontSize="12">{p.l}</text></g>)}
          <text x="18" y="34" fill="#93a1b7" fontSize="11">Relative</text><text x="18" y="48" fill="#93a1b7" fontSize="11">abundance</text>
          <text x="330" y="218" textAnchor="middle" fill="#93a1b7" fontSize="12">Mass-to-charge ratio (m/z)</text>
          <text x="285" y="48" textAnchor="middle" fill="#34d399" fontSize="12">Base peak = 100%</text>
        </>}
        {kind === "mixture" && <>
          <text x="145" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="13" fontWeight="600">Pure compound</text>
          <text x="445" y="25" textAnchor="middle" fill="#e6ecf5" fontSize="13" fontWeight="600">Mixture</text>
          {Array.from({length:12},(_,i)=><g key={i}><circle cx={100+(i%4)*30} cy={58+Math.floor(i/4)*37} r="9" fill="#5aa9ff" /><circle cx={112+(i%4)*30} cy={58+Math.floor(i/4)*37} r="6" fill="#34d399" /></g>)}
          {Array.from({length:12},(_,i)=><g key={i}><circle cx={380+(i%4)*32} cy={58+Math.floor(i/4)*37} r="9" fill={i%2?"#f5c454":"#5aa9ff"} /><circle cx={392+(i%4)*32} cy={58+Math.floor(i/4)*37} r="6" fill={i%2?"#f5718a":"#34d399"} /></g>)}
          <text x="145" y="180" textAnchor="middle" fill="#93a1b7" fontSize="12">One kind of molecule</text><text x="445" y="180" textAnchor="middle" fill="#93a1b7" fontSize="12">Multiple particle types</text>
        </>}
        {kind === "electron-configuration" && <>
          {["1s","2s","2p","3s","3p"].map((s,i)=><g key={s}><text x="50" y={35+i*36} fill="#e6ecf5" fontSize="13">{s}</text><rect x="94" y={19+i*36} width={s.endsWith("p")?108:42} height="23" rx="5" fill="#1c2433" stroke="#5aa9ff" />{Array.from({length:s.endsWith("p")?3:1},(_,j)=><g key={j}><line x1={104+j*32} y1={23+i*36} x2={104+j*32} y2={38+i*36} stroke="#93a1b7" />{(i<3 || i===3 || i===4) && <text x={112+j*32} y={35+i*36} fill="#34d399" fontSize="13">↑</text>}</g>)}</g>)}
          <text x="275" y="54" fill="#34d399" fontSize="14" fontWeight="600">Aufbau</text><text x="275" y="76" fill="#93a1b7" fontSize="12">Fill lower-energy</text><text x="275" y="93" fill="#93a1b7" fontSize="12">orbitals first.</text>
          <text x="275" y="126" fill="#34d399" fontSize="14" fontWeight="600">Pauli</text><text x="275" y="148" fill="#93a1b7" fontSize="12">At most two per orbital,</text><text x="275" y="165" fill="#93a1b7" fontSize="12">with opposite spins.</text>
        </>}
        {kind === "pes" && <>
          <line x1="65" y1="178" x2="555" y2="178" stroke="#93a1b7" strokeWidth="1.5" /><line x1="65" y1="28" x2="65" y2="178" stroke="#93a1b7" strokeWidth="1.5" />
          {[{x:135,h:36,l:"3p"},{x:245,h:60,l:"3s"},{x:370,h:94,l:"2p"},{x:490,h:130,l:"1s"}].map(p=><g key={p.l}><rect x={p.x-24} y={178-p.h} width="48" height={p.h} rx="4" fill="#34d399" opacity=".9"/><text x={p.x} y="199" textAnchor="middle" fill="#e6ecf5" fontSize="12">{p.l}</text></g>)}
          <text x="300" y="218" textAnchor="middle" fill="#93a1b7" fontSize="12">Increasing binding energy →</text><text x="10" y="40" fill="#93a1b7" fontSize="11">Signal</text>
        </>}
        {kind === "periodic-trends" && <>
          {Array.from({length:18},(_,i)=>{const x=70+(i%9)*52,y=42+Math.floor(i/9)*52;return <g key={i}><rect x={x} y={y} width="42" height="38" rx="5" fill={i%9===0?"#5aa9ff":i%9===8?"#f5c454":"#1c2433"} stroke="#34445b"/><text x={x+21} y={y+24} textAnchor="middle" fill="#e6ecf5" fontSize="11">{["Li","Be","B","C","N","O","F","Ne","Ar"][i%9]}</text></g>})}
          <path d="M105 160 L490 160" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round"/><path d="M482 153 L492 160 L482 167" stroke="#34d399" strokeWidth="2.5" fill="none"/><text x="300" y="184" textAnchor="middle" fill="#34d399" fontSize="12">Atomic radius generally decreases →</text><text x="300" y="207" textAnchor="middle" fill="#93a1b7" fontSize="11">Across a period (simplified trend)</text>
        </>}
        {kind === "valence-electrons" && <>
          <circle cx="180" cy="104" r="48" fill="#263449" stroke="#5aa9ff" strokeWidth="1.5"/><text x="180" y="109" textAnchor="middle" fill="#e6ecf5" fontSize="18" fontWeight="700">Na</text>
          {[[180,42],[232,104],[180,166],[128,104]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill="#34d399"/>)}
          <text x="275" y="70" fill="#34d399" fontSize="14" fontWeight="600">1 valence electron</text><text x="275" y="94" fill="#93a1b7" fontSize="12">Sodium is in Group 1.</text><text x="275" y="129" fill="#e6ecf5" fontSize="13">Na → Na⁺ + e⁻</text><text x="275" y="155" fill="#93a1b7" fontSize="12">Loses one electron to form</text><text x="275" y="172" fill="#93a1b7" fontSize="12">a common +1 ion.</text>
        </>}
        {kind === "coulomb" && <>
          <circle cx="180" cy="95" r="31" fill="#f5718a" opacity=".9"/><text x="180" y="101" textAnchor="middle" fill="#0a0e16" fontSize="17" fontWeight="700">+</text><circle cx="400" cy="95" r="31" fill="#5aa9ff" opacity=".9"/><text x="400" y="101" textAnchor="middle" fill="#0a0e16" fontSize="17" fontWeight="700">−</text><line x1="219" y1="95" x2="361" y2="95" stroke="#34d399" strokeWidth="2" strokeDasharray="5 5"/><path d="M228 87 L216 95 L228 103 M352 87 L364 95 L352 103" stroke="#34d399" strokeWidth="2" fill="none"/><text x="290" y="75" textAnchor="middle" fill="#34d399" fontSize="12">Attraction</text><text x="290" y="151" textAnchor="middle" fill="#e6ecf5" fontSize="13">Greater distance → weaker attraction</text><text x="290" y="176" textAnchor="middle" fill="#93a1b7" fontSize="12">Greater charge magnitude → stronger attraction</text>
        </>}
        {kind === "ionic-lattice" && <>
          {Array.from({length:25},(_,i)=>{const x=170+(i%5)*55,y=28+Math.floor(i/5)*40;const pos=(Math.floor(i/5)+i%5)%2===0;return <g key={i}><circle cx={x} cy={y} r="14" fill={pos?"#5aa9ff":"#f5c454"} opacity=".95"/><text x={x} y={y+5} textAnchor="middle" fill="#0a0e16" fontSize="14" fontWeight="700">{pos?"+":"−"}</text></g>})}
          <text x="300" y="220" textAnchor="middle" fill="#93a1b7" fontSize="12">Alternating charges extend in three dimensions</text>
        </>}
        {kind === "metallic-bonding" && <>
          {Array.from({length:12},(_,i)=>{const x=95+(i%4)*55,y=45+Math.floor(i/4)*52;return <g key={i}><circle cx={x} cy={y} r="19" fill="#263449" stroke="#5aa9ff" strokeWidth="1.5"/><text x={x} y={y+4} textAnchor="middle" fill="#e6ecf5" fontSize="12">M⁺</text></g>})}
          {Array.from({length:20},(_,i)=><circle key={i} cx={82+(i%5)*64} cy={28+Math.floor(i/5)*42} r="3.5" fill="#34d399"/>)}
          <text x="390" y="74" fill="#34d399" fontSize="14" fontWeight="600">Delocalized e⁻</text><text x="390" y="98" fill="#93a1b7" fontSize="12">Can move through</text><text x="390" y="115" fill="#93a1b7" fontSize="12">the solid.</text>
        </>}
        {kind === "bond-energy" && <>
          <line x1="60" y1="180" x2="550" y2="180" stroke="#93a1b7"/><line x1="60" y1="25" x2="60" y2="180" stroke="#93a1b7"/><path d="M60 92 C115 92 140 95 170 142 C195 185 220 176 248 127 C278 75 302 92 350 92 C420 92 490 92 550 92" fill="none" stroke="#5aa9ff" strokeWidth="3"/><line x1="210" y1="177" x2="210" y2="144" stroke="#34d399" strokeDasharray="4 4"/><text x="210" y="202" textAnchor="middle" fill="#34d399" fontSize="12">Equilibrium distance</text><text x="320" y="49" fill="#93a1b7" fontSize="12">Potential energy</text><text x="380" y="218" textAnchor="middle" fill="#93a1b7" fontSize="12">Internuclear distance →</text>
        </>}
        {kind === "lewis" && <>
          <text x="140" y="48" textAnchor="middle" fill="#e6ecf5" fontSize="14" fontWeight="600">Count valence e⁻</text><circle cx="140" cy="110" r="28" fill="#263449" stroke="#5aa9ff"/><text x="140" y="116" textAnchor="middle" fill="#e6ecf5" fontSize="18">C</text><circle cx="140" cy="72" r="3" fill="#34d399"/><circle cx="140" cy="148" r="3" fill="#34d399"/><circle cx="102" cy="110" r="3" fill="#34d399"/><circle cx="178" cy="110" r="3" fill="#34d399"/><path d="M200 110 L270 110 M260 102 L270 110 L260 118" stroke="#93a1b7" strokeWidth="2" fill="none"/><text x="360" y="48" textAnchor="middle" fill="#e6ecf5" fontSize="14" fontWeight="600">Check the structure</text><text x="360" y="95" textAnchor="middle" fill="#34d399" fontSize="13">Total electrons conserved</text><text x="360" y="122" textAnchor="middle" fill="#93a1b7" fontSize="12">Octets / duet satisfied</text><text x="360" y="149" textAnchor="middle" fill="#93a1b7" fontSize="12">Formal charges reasonable</text>
        </>}
        {kind === "resonance" && <>
          <text x="120" y="40" textAnchor="middle" fill="#e6ecf5" fontSize="14" fontWeight="600">Valid contributor A</text><text x="120" y="100" textAnchor="middle" fill="#e6ecf5" fontSize="20">O—N=O</text><text x="120" y="128" textAnchor="middle" fill="#f5c454" fontSize="12">Electron placement A</text><path d="M205 100 L270 100 M258 91 L270 100 L258 109" stroke="#93a1b7" strokeWidth="2" fill="none"/><text x="385" y="40" textAnchor="middle" fill="#e6ecf5" fontSize="14" fontWeight="600">Valid contributor B</text><text x="385" y="100" textAnchor="middle" fill="#e6ecf5" fontSize="20">O=N—O</text><text x="385" y="128" textAnchor="middle" fill="#f5c454" fontSize="12">Electron placement B</text><text x="300" y="177" textAnchor="middle" fill="#34d399" fontSize="13">Actual species: delocalized resonance hybrid</text>
        </>}
        {kind === "geometry" && <>
          <line x1="300" y1="105" x2="300" y2="40" stroke="#5aa9ff" strokeWidth="3"/><line x1="300" y1="105" x2="235" y2="160" stroke="#5aa9ff" strokeWidth="3"/><line x1="300" y1="105" x2="365" y2="160" stroke="#5aa9ff" strokeWidth="3"/><circle cx="300" cy="105" r="22" fill="#263449" stroke="#34d399" strokeWidth="2"/><text x="300" y="110" textAnchor="middle" fill="#e6ecf5" fontSize="15" fontWeight="700">A</text>{[[300,35],[228,166],[372,166]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="15" fill="#5aa9ff"/>)}
          <text x="300" y="17" textAnchor="middle" fill="#93a1b7" fontSize="12">Trigonal planar (ideal)</text><text x="300" y="208" textAnchor="middle" fill="#93a1b7" fontSize="12">Electron groups spread out to reduce repulsion</text>
        </>}
      </svg>
    </div>
    <p className="px-4 pb-4 text-xs leading-relaxed text-ink-dim sm:px-5">{meta.caption}</p>
    {children && <div className="border-t border-border px-4 py-3 text-sm text-ink-dim sm:px-5">{children}</div>}
  </figure>;
}
