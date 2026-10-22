# AP Chem Hub

AP Chem Hub is a Next.js App Router study site for AP Chemistry. It combines topic-by-topic lessons, interactive chemistry models, a packet companion for printed MCQ/FRQ practice, a glossary, and an equation sheet.

## Current content coverage

There are **86 MDX topic files** across the nine course units.

- **Units 1–8:** topic lessons are populated across the listed unit topics.
- **Unit 9:** topics 9.1–9.3 are present; topics 9.4–9.11 still need lesson content.
- Unit 1 and Unit 2 also include mastery-check lessons.

Do not infer that a unit is complete merely because it has a folder. Check the files under `content/units/unit-{N}/` to see the topics that actually exist.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

For production validation:

```bash
npm run typecheck
npm run build
```

## Lesson content schema

**One MDX file = one topic.** Files live at:

```
content/units/unit-{N}/{topicNumber}-{slug}.mdx
```

For example: `content/units/unit-2/2-7-vsepr-and-hybridization.mdx`.

Every file starts with frontmatter in this shape:

```yaml
---
title: "Human-readable lesson title"
unit: 2
topicNumber: "2.7"
slug: "2-7-vsepr-and-hybridization"
summary: "One sentence describing the lesson, used on listing pages."
---
```

The `slug` must match the filename and route. There is no intro/topics[]/outro split and no `{/* END_TOPICS */}` marker. One file is one topic and follows one render path. If parsing behavior is unclear, read `lib/content.ts`; it is the source of truth.

To add a topic, add an MDX file to the appropriate unit folder with valid frontmatter. The topic list is built by scanning that folder and sorting by `topicNumber`. To add a new unit with no lessons yet, add it to the `UNITS` array in `lib/units.ts`.

## MDX components

Custom components are registered in `components/mdx/index.tsx`. If an MDX file uses a component that is not registered there, prerendering can fail with an MDX component-definition error. Register new custom components in the same change that introduces them.

| Component | Purpose |
|---|---|
| `<Lightbulb>` | Explains the reasoning behind a rule |
| `<WorkedExample>` | Step-by-step worked problem |
| `<Mistake>` | Diagnoses and corrects a plausible wrong approach |
| `<Connects>` | Links related topics |
| `<BondDiagram>` | Sigma/pi orbital-overlap diagram |
| `<GeometryDiagram>` | VSEPR molecular geometry |
| `<PhetSim>` | Embeds a runnable PhET simulation |
| `<LessonSection>` | Groups lesson sections |
| `<QuickCheck>` | Short answer-check question |
| `<ChemVisual>` / `<Unit3Visual>` | Chemistry visual explanations |
| `<InteractiveLab>` / `<TopicLab>` | Learner-controlled interactive models |

For `<PhetSim>`, `src` must be the direct runnable simulation URL, not the simulation's landing page.

## Study and practice features

- **Packet Companion:** searches printed MCQ and FRQ packets, maps questions to PDF pages, and displays worked solutions.
- **FRQ workspace:** supports question-level and part-level worked guidance, including nested Roman-numeral subparts where present in the source.
- **MCQ answer bank:** stores explicit answer letters and explanations.
- **Interactive models:** learner-controlled chemistry models for selected topics.
- **Reference tools:** glossary and equation sheet.

## Answer-coverage audits

The repository includes scripts that audit source PDF pages and the answer banks. The current structural audits report no identified FRQ question/part coverage gaps and no missing MCQ answer letters.

Run the audits with Node:

```bash
node scripts/audit-frq-pdf-pages.mjs
node scripts/audit-frq-solution-coverage.mjs
node scripts/audit-mcq-pdf-pages.mjs
node scripts/audit-mcq-solution-coverage.mjs
```

Coverage audits verify that questions and answers are mapped and displayed structurally; they do **not** independently prove every chemistry explanation is correct. When editing a solution, check the original PDF—including diagrams, spectra, tables, and graphs—and show enough reasoning for AP-style scoring.

## Content-depth standard

Lessons should build understanding, not only list facts:

1. Derive rules from underlying principles before naming them.
2. Progress from basic examples to AP-level applications.
3. Explain why a common wrong approach is tempting and where it fails.
4. Include diagrams, simulations, or interactive models when they clarify the chemistry.
5. State assumptions and limitations for simplified models.
