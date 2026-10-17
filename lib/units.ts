/**
 * Static registry of units. This is deliberately NOT derived from scanning
 * the filesystem, because a unit can exist (be "known") before any topic
 * content has been written for it yet. Topic-level data (the lesson list
 * within a unit) IS derived from the filesystem — see lib/content.ts.
 *
 * To add a new unit: add an entry here. Nothing else needs to change.
 */
export interface UnitMeta {
  id: number;
  title: string;
}

export const UNITS: UnitMeta[] = [
  { id: 1, title: "Atomic Structure and Properties" },
  { id: 2, title: "Molecular and Ionic Compound Structure and Properties" },
  { id: 3, title: "Intermolecular Forces and Properties" },
  { id: 4, title: "Chemical Reactions" },
  { id: 5, title: "Kinetics" },
  { id: 6, title: "Thermochemistry" },
  { id: 7, title: "Equilibrium" },
  { id: 8, title: "Acids and Bases" },
  { id: 9, title: "Thermodynamics and Electrochemistry" },
];

export function getUnit(id: number): UnitMeta | undefined {
  return UNITS.find((u) => u.id === id);
}
