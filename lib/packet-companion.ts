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

// Intentionally empty until actual packet numbers and sources are verified.
export const PACKET_QUESTION_INDEX: PacketQuestionEntry[] = [];

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
  return PACKET_QUESTION_INDEX.find((entry) =>
    entry.unitId === lookup.unitId &&
    entry.questionType === lookup.questionType &&
    entry.questionNumber.trim().toLowerCase() === number &&
    (entry.partLabel ?? "").trim().toLowerCase() === part &&
    (!lookup.packetId || entry.packetId === lookup.packetId)
  );
}
