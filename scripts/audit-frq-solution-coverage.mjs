import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const componentPath = path.join(root, "components", "FrqWorkspace.tsx");
const auditPath = path.join(root, "frq-audit-output", "frq-page-audit.json");
const reportPath = path.join(root, "frq-audit-output", "frq-solution-coverage.md");
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
const packetRows = [];

for (const packet of audit) {
  if (packet.error) {
    packetRows.push(`| ${packet.file} | PDF audit failed | — | — | — |`);
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
  const packetMissingQuestions = [];
  const packetMissingParts = [];
  detectedQuestionCount += detectedQuestions.size;
  detectedPartCount += detectedParts.size;
  solutionCount += solutionKeys.size;

  for (const question of detectedQuestions) {
    const parts = [...detectedParts].filter((key) => key.startsWith(`${question}:`));
    if (!solutionKeys.has(question) && parts.length === 0) {
      const label = `${packet.file} Q${question}`;
      missingQuestions.push(label);
      packetMissingQuestions.push(question);
    }
    for (const partKey of parts) {
      if (!solutionKeys.has(partKey)) {
        const label = `${packet.file} Q${partKey.replace(":", "(")})`;
        missingParts.push(label);
        packetMissingParts.push(partKey.replace(":", "(") + ")");
      }
    }
  }
  for (const key of solutionKeys) {
    const question = key.split(":")[0];
    if (!detectedQuestions.has(question)) untrackedSolutions.push(`${packet.file} Q${key}`);
  }
  packetRows.push(`| ${packet.file} | ${detectedQuestions.size} | ${detectedParts.size} | ${packetMissingQuestions.length} | ${packetMissingParts.length} |`);
}

const totalMissing = missingQuestions.length + missingParts.length;
const report = [
  "# FRQ worked-solution coverage audit",
  "",
  "> Automated completeness check only. PDF text extraction can miss or misread headings; this does not verify chemical correctness. Every reported gap must be reviewed against the rendered source PDF.",
  "",
  `- Audited PDFs: ${audit.length}`,
  `- Distinct extracted question numbers: ${detectedQuestionCount}`,
  `- Extracted lettered parts: ${detectedPartCount}`,
  `- Existing worked-solution entries: ${solutionCount}`,
  `- Missing whole-question answers where no parts were detected: ${missingQuestions.length}`,
  `- Missing part-specific worked answers: ${missingParts.length}`,
  `- Potentially stale solution keys: ${untrackedSolutions.length}`,
  `- Total identified gaps: ${totalMissing}`,
  "",
  "| Packet | Questions | Parts | Missing question answers | Missing part answers |",
  "|---|---:|---:|---:|---:|",
  ...packetRows,
  "",
  "## Missing whole-question answers",
  "",
  ...(missingQuestions.length ? missingQuestions.map((item) => `- ${item}`) : ["None detected by this automated pass."]),
  "",
  "## Missing part-specific answers",
  "",
  ...(missingParts.length ? missingParts.map((item) => `- ${item}`) : ["None detected by this automated pass."]),
  "",
  "## Solution keys requiring review",
  "",
  ...(untrackedSolutions.length ? untrackedSolutions.map((item) => `- ${item}`) : ["None detected by this automated pass."]),
  "",
].join("\n");

await writeFile(reportPath, report, "utf8");
console.log(report);
console.log(`Wrote ${path.relative(root, reportPath)}`);
// Deliberately report-only for now: extracted headings require manual review before this
// becomes a blocking CI gate.
