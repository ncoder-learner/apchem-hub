import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const sourcePath = path.resolve("lib/packet-companion.ts");
const outputDirectory = path.resolve("mcq-audit-output");
await (await import("node:fs/promises")).mkdir(outputDirectory, { recursive: true });
const source = await readFile(sourcePath, "utf8");

const sourceStart = source.indexOf("const PACKET_SOURCES");
const sourceEnd = source.indexOf("const QUESTION_TOPIC_OVERRIDES", sourceStart);
const hintsStart = source.indexOf("const QUESTION_HINTS");
const hintsEnd = source.indexOf("\n};", hintsStart);
if ([sourceStart, sourceEnd, hintsStart, hintsEnd].some((position) => position < 0)) {
  throw new Error("Could not locate packet sources or question hints in lib/packet-companion.ts");
}

const sourceBlock = source.slice(sourceStart, sourceEnd);
const hintsBlock = source.slice(hintsStart, hintsEnd);
const packets = [];
const packetPattern = /\{\s*unitId:\s*(\d+),\s*packetId:\s*"([^"]+)",\s*packetTitle:\s*"([^"]+)",\s*topicRange:\s*"([^"]+)",\s*firstQuestion:\s*(\d+),\s*lastQuestion:\s*(\d+)\s*\}/g;
for (const match of sourceBlock.matchAll(packetPattern)) {
  packets.push({ unit: Number(match[1]), id: match[2], title: match[3], first: Number(match[5]), last: Number(match[6]) });
}

const solutionsByPacket = new Map();
const packetSolutionPattern = /^  "([^"]+)": \\{\\n([\\s\\S]*?)^  \\},?$/gm;
for (const match of hintsBlock.matchAll(packetSolutionPattern)) {
  const packetId = match[1];
  const body = match[2];
  const keys = new Set();
  for (const entry of body.matchAll(/^    (\\d+): \\{\\s*solution:/gm)) keys.add(Number(entry[1]));
  solutionsByPacket.set(packetId, keys);
}

const exceptions = {
  // Source packet has an unnumbered first question; the printed numbering begins at 2.
  "topics-8-6-8-11-mcq": "The source PDF starts with an unnumbered question; printed questions 2–16 are indexed."
};
const rows = [];
const missing = [];
let expectedCount = 0;
let solutionCount = 0;

for (const packet of packets) {
  const keys = solutionsByPacket.get(packet.id) ?? new Set();
  const expected = [];
  for (let number = packet.first; number <= packet.last; number++) expected.push(number);
  expectedCount += expected.length;
  solutionCount += expected.filter((number) => keys.has(number)).length;
  const absent = expected.filter((number) => !keys.has(number));
  for (const number of absent) missing.push({ packet: packet.id, question: number });
  rows.push({
    unit: packet.unit,
    packet: packet.id,
    title: packet.title,
    expected: expected.length,
    withWorkedSolution: expected.filter((number) => keys.has(number)).length,
    missing: absent
  });
}

const report = [
  "# MCQ worked-solution coverage audit",
  "",
  "> This report checks whether an indexed question has a solution entry. It does not validate the chemistry, answer letter, numerical work, diagram interpretation, or match to the source PDF. Those require question-by-question review.",
  "",
  `- Packets listed: ${packets.length}`,
  `- Expected numbered questions: ${expectedCount}`,
  `- Questions with a solution entry: ${solutionCount}`,
  `- Missing solution entries: ${missing.length}`,
  `- Structural coverage: ${expectedCount ? (100 * solutionCount / expectedCount).toFixed(1) : "0.0"}%`,
  "",
  "| Unit | Packet | Expected | Solution entries | Missing |",
  "|---:|---|---:|---:|---:|",
  ...rows.map((row) => `| ${row.unit} | ${row.packet} | ${row.expected} | ${row.withWorkedSolution} | ${row.missing.length} |`),
  "",
  "## Missing solution entries",
  "",
  ...(missing.length ? missing.map((item) => `- ${item.packet}, Question ${item.question}`) : ["No missing entries detected by this structural audit."]),
  "",
  "## Source caveats",
  "",
  ...Object.entries(exceptions).map(([packet, note]) => `- ${packet}: ${note}`),
  "",
].join("\n");

await writeFile(path.join(outputDirectory, "mcq-solution-coverage.md"), report, "utf8");
console.log(report);
console.log(`Wrote ${path.join(outputDirectory, "mcq-solution-coverage.md")}`);
