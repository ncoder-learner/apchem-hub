interface BondDiagramProps {
  /** 1 = single (1 sigma), 2 = double (1 sigma + 1 pi), 3 = triple (1 sigma + 2 pi) */
  order: 1 | 2 | 3;
  leftLabel?: string;
  rightLabel?: string;
}

const SIGMA_COUNT: Record<1 | 2 | 3, number> = { 1: 1, 2: 1, 3: 1 };
const PI_COUNT: Record<1 | 2 | 3, number> = { 1: 0, 2: 1, 3: 2 };

/**
 * Schematic (not photorealistic) orbital-overlap diagram:
 * - sigma bond: two shaded lobes overlapping head-on, directly on the
 *   internuclear axis (drawn as overlapping circles).
 * - pi bond(s): two parallel unhybridized p-orbital lobes overlapping
 *   side-by-side, above/below the axis (drawn as overlapping dumbbells).
 */
export function BondDiagram({ order, leftLabel = "A", rightLabel = "B" }: BondDiagramProps) {
  const piCount = PI_COUNT[order];
  const width = 360;
  const height = piCount === 2 ? 220 : 160;
  const cy = height / 2;
  const nucleusLeftX = 120;
  const nucleusRightX = 240;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto block w-full max-w-md" role="img" aria-label={`Orbital diagram for a bond of order ${order}`}>
      {/* internuclear axis */}
      <line x1={40} y1={cy} x2={width - 40} y2={cy} stroke="var(--color-border)" strokeDasharray="4 4" strokeWidth={1} />

      {/* sigma overlap, drawn on-axis */}
      <circle cx={nucleusLeftX} cy={cy} r={34} fill="var(--color-blue)" fillOpacity={0.35} />
      <circle cx={nucleusRightX} cy={cy} r={34} fill="var(--color-blue)" fillOpacity={0.35} />

      {/* pi overlap(s), drawn off-axis as lobes above (and below, if 2) the sigma bond */}
      {piCount >= 1 && (
        <g>
          <ellipse cx={nucleusLeftX} cy={cy - 46} rx={26} ry={14} fill="var(--color-emerald)" fillOpacity={0.4} />
          <ellipse cx={nucleusRightX} cy={cy - 46} rx={26} ry={14} fill="var(--color-emerald)" fillOpacity={0.4} />
        </g>
      )}
      {piCount === 2 && (
        <g>
          <ellipse cx={nucleusLeftX} cy={cy + 46} rx={26} ry={14} fill="var(--color-emerald)" fillOpacity={0.4} />
          <ellipse cx={nucleusRightX} cy={cy + 46} rx={26} ry={14} fill="var(--color-emerald)" fillOpacity={0.4} />
        </g>
      )}

      {/* nuclei */}
      <circle cx={nucleusLeftX} cy={cy} r={6} fill="var(--color-ink)" />
      <circle cx={nucleusRightX} cy={cy} r={6} fill="var(--color-ink)" />
      <text x={nucleusLeftX} y={cy + 28} textAnchor="middle" fontSize={13} fill="var(--color-ink-dim)">{leftLabel}</text>
      <text x={nucleusRightX} y={cy + 28} textAnchor="middle" fontSize={13} fill="var(--color-ink-dim)">{rightLabel}</text>

      {/* legend */}
      <g transform={`translate(${width - 118}, 14)`}>
        <circle cx={6} cy={0} r={6} fill="var(--color-blue)" fillOpacity={0.6} />
        <text x={18} y={4} fontSize={11} fill="var(--color-ink-dim)">{SIGMA_COUNT[order]} σ bond</text>
        {piCount > 0 && (
          <>
            <ellipse cx={6} cy={18} rx={6} ry={4} fill="var(--color-emerald)" fillOpacity={0.6} />
            <text x={18} y={22} fontSize={11} fill="var(--color-ink-dim)">{piCount} π bond{piCount > 1 ? "s" : ""}</text>
          </>
        )}
      </g>
    </svg>
  );
}
