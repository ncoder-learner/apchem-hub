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
const missingExplicitAnswers = [];
const packetSolutionPattern = /^  "([^"]+)": \{\n([\s\S]*?)^  \},?$/gm;
for (const match of hintsBlock.matchAll(packetSolutionPattern)) {
  const packetId = match[1];
  const body = match[2];
  const keys = new Set();
  const entryStarts = [...body.matchAll(/^    (\d+): \{/gm)];
  for (let index = 0; index < entryStarts.length; index++) {
    const entry = entryStarts[index];
    const entryEnd = entryStarts[index + 1]?.index ?? body.length;
    const entryBody = body.slice(entry.index, entryEnd);
    const solutionMatch = entryBody.match(/\bsolution\s*:\s*"((?:\\.|[^"\\])*)"/s);
    if (solutionMatch) {
      keys.add(Number(entry[1]));
      const solutionText = solutionMatch[1].replace(/\\\"/g, '"' );
      if (!/\bAnswer:\s*[A-E]\b/i.test(solutionText)) {
        missingExplicitAnswers.push({ packet: packetId, question: Number(entry[1]) });
      }
    }
  }
  solutionsByPacket.set(packetId, keys);
}
const exceptions = {
  // Source packet has an unnumbered first question; the printed numbering begins at 2.
  "topics-8-6-8-11-mcq": "The source PDF starts with an unnumbered prompt stored under key 1 and indexed separately as "Unnumbered"; only printed questions 2–16 count toward numbered-question coverage."
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
    missing: absent,
    unexpected: [...keys].filter((number) => number < packet.first || number > packet.last)
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
  `- Solution entries missing an explicit answer letter (A–E): ${missingExplicitAnswers.length}`,
  `- Unexpected solution keys outside printed ranges: ${rows.reduce((sum, row) => sum + row.unexpected.length, 0)}`,
  `- Structural coverage: ${expectedCount ? (100 * solutionCount / expectedCount).toFixed(1) : "0.0"}%`,
  "",
  "| Unit | Packet | Expected | Solution entries | Missing |",
  "|---:|---|---:|---:|---:|",
  ...rows.map((row) => `| ${row.unit} | ${row.packet} | ${row.expected} | ${row.withWorkedSolution} | ${row.missing.length} |`),
  "",
  "## Entries missing an explicit answer letter",
  "",
  ...(missingExplicitAnswers.length ? missingExplicitAnswers.map((item) => `- ${item.packet}, Question ${item.question}`) : ["None detected."]),
  "",
  "## Missing solution entries",
  "",
  ...(missing.length ? missing.map((item) => `- ${item.packet}, Question ${item.question}`) : ["No missing entries detected by this structural audit."]),
  "",
  "## Source caveats",
  "",
  ...Object.entries(exceptions).map(([packet, note]) => `- ${packet}: ${note}`),
  ...rows.flatMap((row) => row.unexpected.map((number) => `- ${row.packet}: solution key ${number} falls outside the printed range ${packets.find((packet) => packet.id === row.packet)?.first}–${packets.find((packet) => packet.id === row.packet)?.last}; review whether it represents an unnumbered prompt.`)),
  "",
].join("\n");

await writeFile(path.join(outputDirectory, "mcq-solution-coverage.md"), report, "utf8");
console.log(report);
console.log(`Wrote ${path.join(outputDirectory, "mcq-solution-coverage.md")}`);
