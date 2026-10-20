import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const directory = path.resolve("public/packets");
const outputDirectory = path.resolve("mcq-audit-output");
await mkdir(outputDirectory, { recursive: true });
const files = (await readdir(directory)).filter((name) => name.toLowerCase().endsWith(".pdf")).sort();
const audit = [];

for (const file of files) {
  const result = spawnSync("pdftotext", ["-layout", path.join(directory, file), "-"], {
    encoding: "utf8",
    maxBuffer: 30 * 1024 * 1024,
  });
  if (result.status !== 0) {
    audit.push({ file, error: result.stderr || "pdftotext failed" });
    continue;
  }
  const pages = result.stdout.split("\f");
  if (!pages[pages.length - 1]?.trim()) pages.pop();
  const pageRecords = pages.map((text, index) => {
    const lines = text.split(/\r?\n/);
    const candidates = [];
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const match = line.match(/^\s{0,12}(\d{1,2})[.)]\s+\S/);
      if (match) candidates.push({
        number: Number(match[1]),
        line: line.trim().slice(0, 180),
        context: lines.slice(lineIndex + 1, lineIndex + 3).join(" ").trim().slice(0, 180),
      });
    }
    return { page: index + 1, candidates, extractedText: text.trim(), preview: lines.filter((line) => line.trim()).slice(0, 5).join(" | ").slice(0, 500) };
  });
  audit.push({ file, pageCount: pages.length, pages: pageRecords });
}

await writeFile(path.join(outputDirectory, "mcq-page-audit.json"), JSON.stringify(audit, null, 2));
const summary = audit.map((packet) => {
  if (packet.error) return `${packet.file}: ERROR ${packet.error}`;
  return `${packet.file} (${packet.pageCount} pages)\n` + packet.pages.map((page) =>
    `  p${page.page}: Q[${page.candidates.map((candidate) => candidate.number).join(",") || "-"}] | ${page.preview}`
  ).join("\n");
}).join("\n\n");
await writeFile(path.join(outputDirectory, "mcq-page-audit-summary.txt"), summary);
console.log(summary);
console.log(`\nWrote audit for ${audit.length} MCQ PDFs to ${outputDirectory}`);
