export type PacketQuestionType = "mcq" | "frq";
export type PacketSourceStatus = "unmapped" | "mapped" | "solution-derived" | "video-verified";

export interface PacketQuestionEntry {
  id: string;
  unitId: number;
  packetId: string;
  packetTitle: string;
  questionType: PacketQuestionType;
  questionNumber: string;
  partLabel?: string;
  topicRange: string;
  topicNumber?: string;
  topicSlugs: string[];
  skills: string[];
  conceptHint?: string;
  strategyHint?: string;
  nextStepHint?: string;
  solution?: string;
  commonMistakes?: string[];
  videoUrl?: string;
  videoTimestamp?: string;
  sourceStatus: PacketSourceStatus;
  reviewNote?: string;
}

interface PacketSourceDefinition {
  unitId: number;
  packetId: string;
  packetTitle: string;
  topicRange: string;
  firstQuestion: number;
  lastQuestion: number;
}

// Slugs are sourced from the actual lesson files on this branch. Units 6–9
// currently have Unit Reviews but do not yet have topic lesson files.
const TOPIC_SLUGS: Record<string, string> = {
  "1.1": "1-1-moles-and-molar-mass",
  "1.2": "1-2-mass-spectra-of-elements",
  "1.3": "1-3-elemental-composition-of-pure-substances",
  "1.4": "1-4-composition-of-mixtures",
  "1.5": "1-5-atomic-structure-and-electron-configuration",
  "1.6": "1-6-photoelectron-spectroscopy",
  "1.7": "1-7-periodic-trends",
  "1.8": "1-8-valence-electrons-and-ionic-compounds",
  "1.9": "1-9-coulombs-law",
  "2.1": "2-1-types-of-chemical-bonds",
  "2.2": "2-2-intramolecular-force-and-potential-energy",
  "2.3": "2-3-structure-of-ionic-solids",
  "2.4": "2-4-structure-of-metals-and-alloys",
  "2.5": "2-5-lewis-diagrams",
  "2.6": "2-6-resonance-and-formal-charge",
  "2.7": "2-7-vsepr-and-hybridization",
  "3.1": "3-1-intermolecular-forces",
  "3.2": "3-2-properties-of-solids",
  "3.3": "3-3-solids-liquids-and-gases",
  "3.4": "3-4-ideal-gas-law",
  "3.5": "3-5-kinetic-molecular-theory",
  "3.6": "3-6-deviation-from-ideal-gas-law",
  "3.7": "3-7-solutions-and-mixtures",
  "3.8": "3-8-representations-of-solutions",
  "3.9": "3-9-separation-of-solutions-and-mixtures",
  "3.10": "3-10-solubility",
  "3.11": "3-11-spectroscopy-and-electromagnetic-spectrum",
  "3.12": "3-12-properties-of-photons",
  "3.13": "3-13-beer-lambert-law",
  "4.1": "4-1-introduction-to-reactions",
  "4.2": "4-2-net-ionic-equations",
  "4.3": "4-3-representations-of-reactions",
  "4.4": "4-4-physical-and-chemical-changes",
  "4.5": "4-5-stoichiometry",
  "4.6": "4-6-introduction-to-titration",
  "4.7": "4-7-types-of-chemical-reactions",
  "4.8": "4-8-introduction-to-acid-base-reactions",
  "4.9": "4-9-oxidation-reduction-reactions",
  "5.1": "5-1-reaction-rates",
  "5.2": "5-2-introduction-to-rate-law",
  "5.3": "5-3-concentration-changes-over-time",
  "5.4": "5-4-elementary-reactions",
  "5.5": "5-5-collision-model",
  "5.6": "5-6-reaction-energy-profile",
  "5.7": "5-7-introduction-to-reaction-mechanisms",
  "5.8": "5-8-reaction-mechanism-and-rate-law",
  "5.9": "5-9-steady-state-approximation",
  "5.10": "5-10-multistep-reaction-energy-profile",
  "5.11": "5-11-catalysis",
};

const PACKET_SOURCES: PacketSourceDefinition[] = [
  { unitId: 1, packetId: "topics-1-1-1-3-mcq", packetTitle: "Topics 1.1–1.3 MCQ Practice", topicRange: "1.1-1.3", firstQuestion: 1, lastQuestion: 8 },
  { unitId: 1, packetId: "topics-1-4-1-6-mcq", packetTitle: "Topics 1.4–1.6 MCQ Practice", topicRange: "1.4-1.6", firstQuestion: 1, lastQuestion: 9 },
  { unitId: 1, packetId: "topics-1-7-1-8-mcq", packetTitle: "Topics 1.7–1.8 MCQ Practice", topicRange: "1.7-1.8", firstQuestion: 1, lastQuestion: 9 },
  { unitId: 2, packetId: "topics-2-1-2-4-mcq", packetTitle: "Topics 2.1–2.4 MCQ Practice", topicRange: "2.1-2.4", firstQuestion: 1, lastQuestion: 9 },
  { unitId: 2, packetId: "topics-2-5-2-7-mcq", packetTitle: "Topics 2.5–2.7 MCQ Practice", topicRange: "2.5-2.7", firstQuestion: 1, lastQuestion: 10 },
  { unitId: 3, packetId: "topics-3-1-3-2-mcq", packetTitle: "Topics 3.1–3.2 MCQ Practice", topicRange: "3.1-3.2", firstQuestion: 1, lastQuestion: 12 },
  { unitId: 3, packetId: "topics-3-3-3-6-mcq", packetTitle: "Topics 3.3–3.6 MCQ Practice", topicRange: "3.3-3.6", firstQuestion: 1, lastQuestion: 11 },
  { unitId: 3, packetId: "topics-3-7-3-13-mcq", packetTitle: "Topics 3.7–3.13 MCQ Practice", topicRange: "3.7-3.13", firstQuestion: 1, lastQuestion: 13 },
  { unitId: 4, packetId: "topics-4-1-4-4-mcq", packetTitle: "Topics 4.1–4.4 MCQ Practice", topicRange: "4.1-4.4", firstQuestion: 1, lastQuestion: 6 },
  { unitId: 4, packetId: "topics-4-7-4-9-mcq", packetTitle: "Topics 4.7–4.9 MCQ Practice", topicRange: "4.7-4.9", firstQuestion: 1, lastQuestion: 9 },
  { unitId: 5, packetId: "topics-5-1-5-3-mcq", packetTitle: "Topics 5.1–5.3 MCQ Practice", topicRange: "5.1-5.3", firstQuestion: 1, lastQuestion: 10 },
  { unitId: 5, packetId: "topics-5-4-5-11-mcq", packetTitle: "Topics 5.4–5.11 MCQ Practice", topicRange: "5.4-5.11", firstQuestion: 1, lastQuestion: 11 },
  { unitId: 6, packetId: "topics-6-1-6-5-mcq", packetTitle: "Topics 6.1–6.5 MCQ Practice", topicRange: "6.1-6.5", firstQuestion: 1, lastQuestion: 11 },
  { unitId: 6, packetId: "topics-6-6-6-9-mcq", packetTitle: "Topics 6.6–6.9 MCQ Practice", topicRange: "6.6-6.9", firstQuestion: 1, lastQuestion: 11 },
  { unitId: 7, packetId: "topics-7-1-7-5-mcq", packetTitle: "Topics 7.1–7.5 MCQ Practice", topicRange: "7.1-7.5", firstQuestion: 1, lastQuestion: 10 },
  { unitId: 7, packetId: "topics-7-11-7-12-mcq", packetTitle: "Topics 7.11–7.12 MCQ Practice", topicRange: "7.11-7.12", firstQuestion: 1, lastQuestion: 7 },
  { unitId: 7, packetId: "topics-7-6-7-10-mcq", packetTitle: "Topics 7.6–7.10 MCQ Practice", topicRange: "7.6-7.10", firstQuestion: 1, lastQuestion: 12 },
  { unitId: 8, packetId: "topics-8-1-8-3-mcq", packetTitle: "Topics 8.1–8.3 MCQ Practice", topicRange: "8.1-8.3", firstQuestion: 1, lastQuestion: 12 },
  { unitId: 8, packetId: "topics-8-4-8-5-mcq", packetTitle: "Topics 8.4–8.5 MCQ Practice", topicRange: "8.4-8.5", firstQuestion: 1, lastQuestion: 13 },
  // The source text begins with an unnumbered question before printed question 2.
  // Do not invent a printed number for that first question.
  { unitId: 8, packetId: "topics-8-6-8-11-mcq", packetTitle: "Topics 8.6–8.11 MCQ Practice", topicRange: "8.6-8.11", firstQuestion: 2, lastQuestion: 16 },
  { unitId: 9, packetId: "topics-9-1-9-7-mcq", packetTitle: "Topics 9.1–9.7 MCQ Practice", topicRange: "9.1-9.7", firstQuestion: 1, lastQuestion: 13 },
  { unitId: 9, packetId: "topics-9-8-9-11-mcq", packetTitle: "Topics 9.8–9.11 MCQ Practice", topicRange: "9.8-9.11", firstQuestion: 1, lastQuestion: 13 },
];

const QUESTION_TOPIC_OVERRIDES: Record<string, Record<number, string>> = {
  "topics-1-1-1-3-mcq": { 1: "1.3", 2: "1.2", 3: "1.3", 4: "1.2", 5: "1.3", 6: "1.1", 7: "1.3", 8: "1.3" },
  "topics-1-4-1-6-mcq": { 1: "1.4", 2: "1.4", 3: "1.4", 4: "1.5", 5: "1.5", 6: "1.5", 7: "1.6", 8: "1.6", 9: "1.6" },
  "topics-1-7-1-8-mcq": { 1: "1.7", 2: "1.7", 3: "1.7", 4: "1.7", 5: "1.7", 6: "1.7", 7: "1.8", 8: "1.8", 9: "1.8" },
  "topics-2-1-2-4-mcq": { 1: "2.1", 2: "2.1", 3: "2.3", 4: "2.2", 5: "2.2", 6: "2.3", 7: "2.4", 8: "2.3", 9: "2.4" },
  "topics-2-5-2-7-mcq": { 1: "2.5", 2: "2.5", 3: "2.6", 4: "2.6", 5: "2.6", 6: "2.6", 7: "2.7", 8: "2.7", 9: "2.7", 10: "2.7" },
  "topics-3-1-3-2-mcq": { 1: "3.1", 2: "3.1", 3: "3.1", 4: "3.1", 5: "3.1", 6: "3.1", 7: "3.1", 11: "3.2", 12: "3.2" },
  "topics-3-3-3-6-mcq": { 1: "3.3", 2: "3.4", 3: "3.4", 4: "3.4", 5: "3.4", 6: "3.4", 7: "3.4", 8: "3.5", 9: "3.5", 10: "3.6", 11: "3.6" },
  "topics-3-7-3-13-mcq": { 1: "3.7", 2: "3.7", 3: "3.8", 4: "3.8", 5: "3.9", 6: "3.9", 7: "3.10", 8: "3.10", 11: "3.13", 12: "3.11", 13: "3.13" },
  "topics-4-1-4-4-mcq": { 1: "4.4", 2: "4.4", 4: "4.2" },
  "topics-4-7-4-9-mcq": { 1: "4.7", 2: "4.8", 3: "4.7", 4: "4.9", 5: "4.8", 6: "4.8", 7: "4.8", 8: "4.9", 9: "4.9" },
  "topics-5-1-5-3-mcq": { 1: "5.1", 2: "5.1", 3: "5.1", 4: "5.2", 5: "5.3", 6: "5.2", 7: "5.2", 8: "5.3", 9: "5.2", 10: "5.3" },
  "topics-5-4-5-11-mcq": { 2: "5.4", 3: "5.5", 10: "5.11" },
};

function topicOrder(topic: string): number {
  const [unit, number] = topic.split(".").map(Number);
  return unit * 100 + number;
}

function getTopicSlugs(topicRange: string): string[] {
  const [start, end] = topicRange.split("-");
  const min = topicOrder(start);
  const max = topicOrder(end);
  return Object.entries(TOPIC_SLUGS)
    .filter(([topic]) => topicOrder(topic) >= min && topicOrder(topic) <= max)
    .map(([, slug]) => slug);
}

// This index confirms packet title/range and printed question number only.
// It deliberately contains no copied question text or unverified answers.
export const PACKET_QUESTION_INDEX: PacketQuestionEntry[] = PACKET_SOURCES.flatMap((source) =>
  Array.from(
    { length: source.lastQuestion - source.firstQuestion + 1 },
    (_, index): PacketQuestionEntry => {
      const questionNumber = String(source.firstQuestion + index);
      const mappedTopicNumber = QUESTION_TOPIC_OVERRIDES[source.packetId]?.[Number(questionNumber)];
      const mappedTopicSlug = mappedTopicNumber ? TOPIC_SLUGS[mappedTopicNumber] : undefined;
      return {
        id: `${source.packetId}-q${questionNumber}`,
        unitId: source.unitId,
        packetId: source.packetId,
        packetTitle: source.packetTitle,
        questionType: "mcq",
        questionNumber,
        topicRange: source.topicRange,
        ...(mappedTopicNumber ? { topicNumber: mappedTopicNumber } : {}),
        topicSlugs: mappedTopicSlug ? [mappedTopicSlug] : getTopicSlugs(source.topicRange),
        skills: [],
        sourceStatus: "mapped",
        reviewNote: mappedTopicNumber
          ? `Packet and question number indexed; mapped to topic ${mappedTopicNumber}. Question-specific hints and explanation still need review.`
          : "Packet and printed question number indexed; exact subtopic mapping and question-specific help still need review.",
      };
    }
  )
);

export interface PacketLookup {
  unitId: number;
  questionType: PacketQuestionType;
  questionNumber: string;
  packetId?: string;
  partLabel?: string;
}

export function findPacketQuestion(lookup: PacketLookup): PacketQuestionEntry | undefined {
  const number = lookup.questionNumber.trim().toLowerCase();
  const part = (lookup.partLabel ?? "").trim().toLowerCase();
  const matches = PACKET_QUESTION_INDEX.filter((entry) =>
    entry.sourceStatus !== "unmapped" &&
    entry.unitId === lookup.unitId &&
    entry.questionType === lookup.questionType &&
    entry.questionNumber.trim().toLowerCase() === number &&
    (entry.partLabel ?? "").trim().toLowerCase() === part &&
    (!lookup.packetId || entry.packetId === lookup.packetId)
  );

  // Never choose an arbitrary match when separate packets reuse a question number.
  return matches.length === 1 ? matches[0] : undefined;
}
