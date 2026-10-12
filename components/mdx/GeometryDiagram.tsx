export type GeometryShape =
  | "linear"
  | "trigonal-planar"
  | "bent-120"
  | "tetrahedral"
  | "trigonal-pyramidal"
  | "bent-109"
  | "trigonal-bipyramidal"
  | "seesaw"
  | "t-shaped"
  | "octahedral"
  | "square-pyramidal"
  | "square-planar";

interface Atom {
  x: number;
  y: number;
  lonePair?: boolean;
}

interface ShapeDef {
  label: string;
  angleLabel: string;
  center: { x: number; y: number };
  atoms: Atom[];
}

const CX = 150;
const CY = 140;
const R = 80;

// Fixed 2D schematic coordinates per shape. These are teaching schematics,
// not true perspective-projected 3D renders — good enough to show atom
// count, lone-pair placement, and labeled angles, which is what the lesson
// actually needs.
const SHAPES: Record<GeometryShape, ShapeDef> = {
  linear: {
    label: "Linear",
    angleLabel: "180°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX - R, y: CY },
      { x: CX + R, y: CY },
    ],
  },
  "trigonal-planar": {
    label: "Trigonal planar",
    angleLabel: "120°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R },
      { x: CX - R * 0.87, y: CY + R * 0.5 },
      { x: CX + R * 0.87, y: CY + R * 0.5 },
    ],
  },
  "bent-120": {
    label: "Bent (from trigonal planar)",
    angleLabel: "~117°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R, lonePair: true },
      { x: CX - R * 0.87, y: CY + R * 0.5 },
      { x: CX + R * 0.87, y: CY + R * 0.5 },
    ],
  },
  tetrahedral: {
    label: "Tetrahedral",
    angleLabel: "109.5°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R },
      { x: CX - R * 0.82, y: CY + R * 0.2 },
      { x: CX + R * 0.82, y: CY + R * 0.2 },
      { x: CX, y: CY + R * 0.75 },
    ],
  },
  "trigonal-pyramidal": {
    label: "Trigonal pyramidal",
    angleLabel: "~107°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R, lonePair: true },
      { x: CX - R * 0.82, y: CY + R * 0.2 },
      { x: CX + R * 0.82, y: CY + R * 0.2 },
      { x: CX, y: CY + R * 0.75 },
    ],
  },
  "bent-109": {
    label: "Bent (from tetrahedral)",
    angleLabel: "~104.5°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R, lonePair: true },
      { x: CX - R * 0.82, y: CY + R * 0.2, lonePair: true },
      { x: CX + R * 0.82, y: CY + R * 0.2 },
      { x: CX, y: CY + R * 0.75 },
    ],
  },
  "trigonal-bipyramidal": {
    label: "Trigonal bipyramidal",
    angleLabel: "90° & 120°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R },
      { x: CX, y: CY + R },
      { x: CX - R * 0.87, y: CY - R * 0.1 },
      { x: CX + R * 0.3, y: CY + R * 0.55 },
      { x: CX + R * 0.55, y: CY - R * 0.45 },
    ],
  },
  seesaw: {
    label: "Seesaw",
    angleLabel: "90° & 120° (distorted)",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R, lonePair: true },
      { x: CX, y: CY + R },
      { x: CX - R * 0.87, y: CY - R * 0.1 },
      { x: CX + R * 0.3, y: CY + R * 0.55 },
      { x: CX + R * 0.55, y: CY - R * 0.45 },
    ],
  },
  "t-shaped": {
    label: "T-shaped",
    angleLabel: "~90°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R, lonePair: true },
      { x: CX, y: CY + R },
      { x: CX - R * 0.87, y: CY - R * 0.1, lonePair: true },
      { x: CX + R * 0.3, y: CY + R * 0.55 },
      { x: CX + R * 0.55, y: CY - R * 0.45 },
    ],
  },
  octahedral: {
    label: "Octahedral",
    angleLabel: "90°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R },
      { x: CX, y: CY + R },
      { x: CX - R, y: CY },
      { x: CX + R, y: CY },
      { x: CX - R * 0.45, y: CY - R * 0.45 },
      { x: CX + R * 0.45, y: CY + R * 0.45 },
    ],
  },
  "square-pyramidal": {
    label: "Square pyramidal",
    angleLabel: "~90°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R, lonePair: true },
      { x: CX, y: CY + R },
      { x: CX - R, y: CY },
      { x: CX + R, y: CY },
      { x: CX - R * 0.45, y: CY - R * 0.45 },
      { x: CX + R * 0.45, y: CY + R * 0.45 },
    ],
  },
  "square-planar": {
    label: "Square planar",
    angleLabel: "90°",
    center: { x: CX, y: CY },
    atoms: [
      { x: CX, y: CY - R, lonePair: true },
      { x: CX, y: CY + R, lonePair: true },
      { x: CX - R, y: CY },
      { x: CX + R, y: CY },
    ],
  },
};

export function GeometryDiagram({ shape }: { shape: GeometryShape }) {
  const def = SHAPES[shape];
  const lonePairCount = def.atoms.filter((a) => a.lonePair).length;

  return (
    <figure className="my-6">
      <svg viewBox="0 0 300 260" className="mx-auto block w-full max-w-xs" role="img" aria-label={`${def.label} molecular geometry diagram`}>
        {/* bonds */}
        {def.atoms.map((a, i) => (
          <line
            key={`bond-${i}`}
            x1={def.center.x}
            y1={def.center.y}
            x2={a.x}
            y2={a.y}
            stroke={a.lonePair ? "var(--color-amber)" : "var(--color-blue)"}
            strokeWidth={a.lonePair ? 5 : 3}
            strokeDasharray={a.lonePair ? "2 4" : undefined}
            strokeLinecap="round"
          />
        ))}

        {/* central atom */}
        <circle cx={def.center.x} cy={def.center.y} r={10} fill="var(--color-ink)" />

        {/* peripheral atoms / lone pairs */}
        {def.atoms.map((a, i) =>
          a.lonePair ? (
            <circle key={`atom-${i}`} cx={a.x} cy={a.y} r={7} fill="var(--color-amber)" fillOpacity={0.85} />
          ) : (
            <circle key={`atom-${i}`} cx={a.x} cy={a.y} r={9} fill="var(--color-blue)" />
          )
        )}

        {/* angle label */}
        <text x={def.center.x} y={240} textAnchor="middle" fontSize={13} fill="var(--color-ink-dim)">
          {def.angleLabel}
        </text>
      </svg>
      <figcaption className="mt-1 text-center text-sm text-ink-dim">
        {def.label}
        {lonePairCount > 0 && (
          <span> — {lonePairCount} lone pair{lonePairCount > 1 ? "s" : ""} (amber, dashed)</span>
        )}
      </figcaption>
    </figure>
  );
}
