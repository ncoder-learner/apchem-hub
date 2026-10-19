import { copyFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.resolve(process.argv[2] ?? path.join(repoRoot, "..", "CHem", "FRQ"));
const targetDir = path.join(repoRoot, "public", "frq");

function slugFor(filename) {
  return filename
    .toLowerCase()
    .replace(/\.pdf$/, "")
    .replace(/^topics?\s*/, "topic-")
    .replace(/\./g, "-")
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-$/, "");
}

await mkdir(targetDir, { recursive: true });
const names = (await readdir(sourceDir)).filter((name) => name.toLowerCase().endsWith(".pdf"));

if (names.length === 0) {
  throw new Error(`No PDF files found in: ${sourceDir}`);
}

for (const name of names) {
  const destination = path.join(targetDir, `${slugFor(name)}.pdf`);
  await copyFile(path.join(sourceDir, name), destination);
  console.log(`Copied ${name} -> public/frq/${path.basename(destination)}`);
}

console.log(`\\nCopied ${names.length} FRQ packet PDFs into public/frq/.`);
