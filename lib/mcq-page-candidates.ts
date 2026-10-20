// Candidate first-page map extracted from the actual packet PDFs with pdftotext.
// These mappings locate the first printed occurrence of each question number.
// They are navigation aids, not semantic verification of answers.
const MCQ_PAGE_MAP_DATA: Record<string, { firstQuestion: number; pages: number[] }> = {
  "topics-1-1-1-3-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 2, 3, 3, 3] },
  "topics-1-4-1-6-mcq": { firstQuestion: 1, pages: [1, 1, 1, 2, 2, 2, 2, 3, 3] },
  "topics-1-7-1-8-mcq": { firstQuestion: 1, pages: [1, 1, 1, 2, 2, 3, 3, 4, 4] },
  "topics-2-1-2-4-mcq": { firstQuestion: 1, pages: [1, 1, 1, 2, 2, 3, 3, 4, 5] },
  "topics-2-5-2-7-mcq": { firstQuestion: 1, pages: [1, 1, 1, 2, 2, 3, 3, 3, 4, 4] },
  "topics-3-1-3-2-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5] },
  "topics-3-3-3-6-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6] },
  "topics-3-7-3-13-mcq": { firstQuestion: 1, pages: [1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8] },
  "topics-4-1-4-4-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 2, 3, 3, 4, 4] },
  "topics-4-7-4-9-mcq": { firstQuestion: 1, pages: [1, 1, 1, 2, 2, 2, 3, 3, 4] },
  "topics-5-1-5-3-mcq": { firstQuestion: 1, pages: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6] },
  "topics-5-4-5-11-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6] },
  "topics-6-1-6-5-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6] },
  "topics-6-6-6-9-mcq": { firstQuestion: 1, pages: [1, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6] },
  "topics-7-1-7-5-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5] },
  "topics-7-11-7-12-mcq": { firstQuestion: 1, pages: [1, 1, 1, 2, 2, 3, 3] },
  "topics-7-6-7-10-mcq": { firstQuestion: 1, pages: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4] },
  "topics-8-1-8-3-mcq": { firstQuestion: 1, pages: [1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5] },
  "topics-8-4-8-5-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7] },
  "topics-8-6-8-11-mcq": { firstQuestion: 2, pages: [2, 2, 3, 3, 4, 4, 5, 6, 6, 6, 7, 7, 8, 8, 9] },
  "topics-9-1-9-7-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6] },
  "topics-9-8-9-11-mcq": { firstQuestion: 1, pages: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7] },
};

export const MCQ_PAGE_CANDIDATES: Record<string, Record<string, number>> = Object.fromEntries(
  Object.entries(MCQ_PAGE_MAP_DATA).map(([packetId, data]) => [
    packetId,
    Object.fromEntries(data.pages.map((page, index) => [String(data.firstQuestion + index), page])),
  ]),
);
