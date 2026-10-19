import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const componentPath = path.join(root, "components", "FrqWorkspace.tsx");
const auditPath = path.join(root, "frq-audit-output", "frq-page-audit.json");
const source = await readFile(componentPath, "utf8");
const audit = JSON.parse(await readFile(auditPath, "utf8"));

const start = source.indexOf("const FRQ_PAGE_CANDIDATES");
const end = source.indexOf("const RESPONSE_FRAMES", start);
if (start < 0 || end < 0) {
  throw new Error("Could not locate FRQ_PAGE_CANDIDATES in FrqWorkspace.tsx");
}

const mapSource = source.slice(start, end);
const mappings = new Map();
const packetPattern = /"([^"]+\\.pdf)"\\s*:\\s*\\{([\\s\\S]*?)\\n  \\}/g;
for (const match of mapSource.matchAll(packetPattern)) {
  const [, file, body] = match;
  const questions = new Map();
  for (const entry of body.matchAll(/(\\d+)\\s*:\\s*(\\d+)/g)) {
    questions.set(Number(entry[1]), Number(entry[2]));
  }
  mappings.set(file, questions);
}

const auditByFile = new Map(audit.map((packet) => [packet.file, packet]));
const errors = [];
const warnings = [];
for (const packet of audit) {
  if (packet.error) {
    errors.push(`${packet.file}: PDF audit failed: ${packet.error}`);
    continue;
  }
  const questions = mappings.get(packet.file);
  if (!questions) {
    errors.push(`${packet.file}: no navigation mapping exists`);
    continue;
  }
  if (questions.size === 0) errors.push(`${packet.file}: navigation mapping is empty`);
  for (const [question, page] of questions) {
    if (!Number.isInteger(page) || page < 1 || page > packet.pageCount) {
      errors.push(`${packet.file}: Q${question} maps to invalid page ${page} (PDF has ${packet.pageCount} pages)`);
    }
  }
}
for (const file of mappings.keys()) {
  if (!auditByFile.has(file)) errors.push(`${file}: mapping references a PDF absent from the audit`);
}

const totalMappings = [...mappings.values()].reduce((sum, questions) => sum + questions.size, 0);
console.log(`Validated ${mappings.size} packet maps and ${totalMappings} question-page mappings against ${audit.length} audited PDFs.`);
if (warnings.length) console.warn(warnings.join("\\n"));
if (errors.length) {
  console.error(errors.join("\\n"));
  process.exitCode = 1;
} else {
  console.log("All mapped pages are within their PDF bounds; every audited packet has a non-empty map.");
}
