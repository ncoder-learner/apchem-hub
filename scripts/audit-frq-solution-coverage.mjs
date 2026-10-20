import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const componentPath = path.join(root, "components", "FrqWorkspace.tsx");
const auditPath = path.join(root, "frq-audit-output", "frq-page-audit.json");
const source = await readFile(componentPath, "utf8");
const audit = JSON.parse(await readFile(auditPath, "utf8"));

const solutionStart = source.indexOf("const FRQ_WORKED_SOLUTIONS");
const solutionEnd = source.indexOf("const RESPONSE_FRAMES", solutionStart);
if (solutionStart < 0 || solutionEnd < 0) {
  throw new Error("Could not locate FRQ_WORKED_SOLUTIONS in FrqWorkspace.tsx");
}
const solutionSource = source.slice(solutionStart, solutionEnd);
const solutionsByFile = new Map();
const packetPattern = /"([^"]+\.pdf)"\s*:\s*\{([\s\S]*?)\n  \}/g;
for (const match of solutionSource.matchAll(packetPattern)) {
  const [, file, body] = match;
  const keys = new Set();
  for (const entry of body.matchAll(/^\s*"(\d+)(?::([a-h](?:\([ivx]+\))?))?"\s*:\s*\{\s*prompt:/gm)) {
    keys.add(entry[2] ? `${entry[1]}:${entry[2]}` : entry[1]);
  }
  solutionsByFile.set(file, keys);
}

const missingQuestions = [];
const missingParts = [];
const untrackedSolutions = [];
let detectedQuestionCount = 0;
let detectedPartCount = 0;
let solutionCount = 0;

for (const packet of audit) {
  if (packet.error) {
    console.warn(`SKIP ${packet.file}: PDF audit error: ${packet.error}`);
    continue;
  }

  const detectedQuestions = new Set(
    (packet.pages ?? []).flatMap((page) => (page.candidates ?? []).map((candidate) => String(candidate.number))),
  );
  const detectedParts = new Set(
    (packet.pages ?? []).flatMap((page) =>
      (page.partCandidates ?? []).map((candidate) => `${candidate.question}:${candidate.part}`),
    ),
  );
  const solutionKeys = solutionsByFile.get(packet.file) ?? new Set();

  detectedQuestionCount += detectedQuestions.size;
  detectedPartCount += detectedParts.size;
  solutionCount += solutionKeys.size;

  for (const question of detectedQuestions) {
    // A parent-question answer does not count as a worked answer for every lettered part.
    const hasOwnSolution = solutionKeys.has(question);
    const parts = [...detectedParts].filter((key) => key.startsWith(`${question}:`));
    if (!hasOwnSolution && parts.length === 0) {
      missingQuestions.push(`${packet.file} Q${question}`);
    }
    for (const partKey of parts) {
      if (!solutionKeys.has(partKey)) missingParts.push(`${packet.file} Q${partKey.replace(":", "(")})`);
    }
  }

  for (const key of solutionKeys) {
    const question = key.split(":")[0];
    if (!detectedQuestions.has(question)) untrackedSolutions.push(`${packet.file} Q${key}`);
  }
}

const totalExpected = detectedQuestionCount + detectedPartCount;
const totalMissing = missingQuestions.length + missingParts.length;
console.log("FRQ worked-solution coverage audit");
console.log(`Audited PDFs: ${audit.length}`);
console.log(`Detected distinct question numbers: ${detectedQuestionCount}`);
console.log(`Detected lettered parts: ${detectedPartCount}`);
console.log(`Existing worked-solution entries: ${solutionCount}`);
console.log(`Missing whole-question answers (no detected parts): ${missingQuestions.length}`);
console.log(`Missing part-specific worked answers: ${missingParts.length}`);
console.log(`Potentially stale solution keys: ${untrackedSolutions.length}`);

if (missingQuestions.length) {
  console.log("\nMissing question answers:");
  console.log(missingQuestions.join("\n"));
}
if (missingParts.length) {
  console.log("\nMissing part answers:");
  console.log(missingParts.join("\n"));
}
if (untrackedSolutions.length) {
  console.log("\nSolution keys needing review:");
  console.log(untrackedSolutions.join("\n"));
}

// This is an audit/reporting tool, not a pass/fail gate yet. Extracted headings can be
// false positives, and answer completeness must be checked against the actual PDF pages.
