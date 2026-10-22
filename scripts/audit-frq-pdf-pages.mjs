import { readdir, mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const directory = path.resolve("public/frq");
const outputDirectory = path.resolve("frq-audit-output");
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
  let activeQuestion = null;
  let activePart = null;
  const pageRecords = pages.map((text, index) => {
    const lines = text.split(/\r?\n/);
    const candidates = [];
    const partCandidates = [];
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const match = line.match(/^\s{0,12}(\d{1,2})[.)]\s+\S/);
      if (match) {
        const nextQuestion = Number(match[1]);
        if (nextQuestion !== activeQuestion || !/continued/i.test(line)) activePart = null;
        activeQuestion = nextQuestion;
        candidates.push({
          number: activeQuestion,
          line: line.trim().slice(0, 180),
          context: lines.slice(lineIndex + 1, lineIndex + 3).join(" ").trim().slice(0, 180),
        });
        const sameLinePart = line.match(/^\s{0,12}\d{1,2}[.)]\s*\(([a-i])\)(?:\s*\(([ivx]+)\))?/);
        if (sameLinePart) {
          activePart = sameLinePart[1].toLowerCase();
          partCandidates.push({
            question: activeQuestion,
            part: activePart,
            line: line.trim().slice(0, 180),
          });
          if (sameLinePart[2]) {
            partCandidates.push({
              question: activeQuestion,
              part: `${activePart}(${sameLinePart[2].toLowerCase()})`,
              line: line.trim().slice(0, 180),
            });
          }
        }
        continue;
      }
      // Some worksheets place two lettered parts side-by-side on one printed line.
      // Detect every clearly spaced part marker on that line, not just the first one.
      const partMatches = [
        ...line.matchAll(/^\s{0,20}\(([a-i])\)[.)]?\s+\S/g),
        ...line.matchAll(/\s{2,}\(([a-i])\)[.)]?\s+\S/g),
      ];
      if (partMatches.length && activeQuestion !== null) {
        for (const partMatch of partMatches) {
          const part = partMatch[1].toLowerCase();
          activePart = part;
          if (!partCandidates.some((candidate) => candidate.question === activeQuestion && candidate.part === part)) {
            partCandidates.push({
              question: activeQuestion,
              part,
              line: line.trim().slice(0, 180),
            });
          }
        }
      }
      // Also recognize forms such as `(d) (iii)` printed on a single line.
      const sameLineNestedPart = line.match(/^\s{0,20}\(([a-i])\)[.)]?\s+\(([ivx]+)\)[.)]?\s+\S/);
      if (sameLineNestedPart && activeQuestion !== null) {
        const part = `${sameLineNestedPart[1].toLowerCase()}(${sameLineNestedPart[2].toLowerCase()})`;
        if (!partCandidates.some((candidate) => candidate.question === activeQuestion && candidate.part === part)) {
          partCandidates.push({
            question: activeQuestion,
            part,
            line: line.trim().slice(0, 180),
          });
        }
      }
      const romanPartMatches = [
        ...line.matchAll(/^\s{0,20}\(([ivx]+)\)[.)]?\s+\S/g),
        ...line.matchAll(/\s{1,}\(([ivx]+)\)[.)]?\s+\S/g),
      ];
      if (romanPartMatches.length && activeQuestion !== null && activePart !== null) {
        for (const romanMatch of romanPartMatches) {
          const indent = romanMatch[0].match(/^\s*/)?.[0].length ?? 0;
          const roman = romanMatch[1].toLowerCase();
          // Lowercase (i) at the same indentation as the lettered parts is a
          // top-level part i, not a nested subpart such as e(i). Nested roman
          // labels are indented farther beneath their parent letter.
          const part = roman === "i" && indent <= 6 ? "i" : `${activePart}(${roman})`;
          if (part === "i") activePart = "i";
          if (!partCandidates.some((candidate) => candidate.question === activeQuestion && candidate.part === part)) {
            partCandidates.push({
              question: activeQuestion,
              part,
              line: line.trim().slice(0, 180),
            });
          }
        }
      }
    }
    return {
      page: index + 1,
      candidates,
      partCandidates,
      // Preserve the extracted page text in the artifact so reviewers can audit
      // question-to-solution mappings instead of relying on short previews.
      extractedText: text.trim(),
      preview: lines.filter((line) => line.trim()).slice(0, 5).join(" | ").slice(0, 500),
    };
  });
  audit.push({ file, pageCount: pages.length, pages: pageRecords });
}

await writeFile(path.join(outputDirectory, "frq-page-audit.json"), JSON.stringify(audit, null, 2));
const summary = audit.map((packet) => {
  if (packet.error) return `${packet.file}: ERROR ${packet.error}`;
  return `${packet.file} (${packet.pageCount} pages)\n` + packet.pages.map((page) =>
    `  p${page.page}: Q[${page.candidates.map((candidate) => candidate.number).join(",") || "-"}] parts[${page.partCandidates.map((candidate) => `${candidate.question}${candidate.part}`).join(",") || "-"}] | ${page.preview}`
  ).join("\n");
}).join("\n\n");
await writeFile(path.join(outputDirectory, "frq-page-audit-summary.txt"), summary);
console.log(summary);
console.log(`\nWrote audit for ${audit.length} FRQ PDFs to ${outputDirectory}`);
