# AP Chem Hub

Next.js (App Router, TypeScript, Tailwind v4) study site for the AP Chemistry course.

## Running it

```
npm install
npm run dev
```

Then open http://localhost:3000. Unit 2 → Topic 2.7 is the only populated lesson right now.

## Content schema — read this before adding or editing any lesson

**One MDX file = one topic.** Files live at:

```
content/units/unit-{N}/{topicNumber}-{slug}.mdx
```

e.g. `content/units/unit-2/2-7-vsepr-and-hybridization.mdx`.

Every file must start with this exact frontmatter shape:

```yaml
---
title: "Human-readable lesson title"
unit: 2
topicNumber: "2.7"
slug: "2-7-vsepr-and-hybridization"   # must match the filename and the route
summary: "One sentence describing the lesson, used on listing pages."
---
```

That's the whole schema. There is **no** intro/topics[]/outro split and **no** magic
`{/* END_TOPICS */}` marker anywhere in this version — that was the previous
design, and it broke twice in production because intro content and topic
content silently rendered through two different paths with two different
sets of available components. One file = one topic = one render path,
always. If you're ever unsure how a file is parsed, read `lib/content.ts` —
it's short, fully commented, and is the actual source of truth, not this
README and not a prior unit's file.

**To add a new topic:** drop a new `.mdx` file in the right `content/units/unit-N/`
folder with correct frontmatter. Nothing else needs to be touched — no
manifest, no index file, no registered list of slugs. The topic list for a
unit page is built by scanning that folder and sorting by `topicNumber`.

**To add a new unit** that doesn't have any content yet: add it to the
`UNITS` array in `lib/units.ts`. It'll show up on the home page as
"coming soon" until a `content/units/unit-N/` folder with at least one
`.mdx` file exists for it.

## Custom MDX components

Registered in `components/mdx/index.tsx`. If a lesson file uses a tag that
isn't registered there, MDX throws `Expected component X to be defined` at
render time — this exact error broke a prior deploy. **Any time you add a
new custom component, register it in that file in the same change.**

| Component | Use |
|---|---|
| `<Lightbulb>` | Builds the "why" behind a rule |
| `<WorkedExample>` | A fully solved problem, step by step |
| `<Mistake>` | A specific wrong-answer path, walked through and corrected |
| `<Connects>` | Links to another topic/unit |
| `<BondDiagram order={1\|2\|3} />` | Sigma/pi orbital overlap diagram |
| `<GeometryDiagram shape="..." />` | VSEPR molecular geometry diagram — see `GeometryShape` type in the component file for valid shape names |
| `<PhetSim src="..." title="..." />` | Embeds a PhET simulation. **`src` must be the direct runnable sim URL** (`phet.colorado.edu/sims/html/{id}/latest/{id}_en.html`), not the simulation's landing page |

## Content depth standard

Established on the 2.7 lesson — every future lesson should match this, not
just cover the same topics:

1. **Derive before naming.** Build up to a rule from the underlying
   principle (e.g. "electron domains repel" → work out *why* 4 domains
   gives 109.5°) rather than stating the rule and showing one example of it.
2. **Ramp examples from simple to AP-exam complexity.** More than one
   worked example per subtopic, increasing in difficulty.
3. **`<Mistake>` blocks walk through the wrong reasoning**, not just name
   the mistake — show *why* the wrong answer seems plausible before showing
   why it's wrong.

## Known gaps / next steps

- Units 1, 3–9 have no content files yet.
- Unit 2 has only Topic 2.7 so far. Topics 2.1–2.6 still need lesson files
  (video transcripts are being supplied as source material for these — see
  project chat history for the workflow).
- `generateStaticParams` is wired up but the project hasn't been built with
  `next build` yet in this environment — run it locally and fix anything
  that surfaces before deploying.
- No practice-question bank, flashcards, or score tracking yet (sidebar nav
  placeholders for these don't exist in this version — the original design
  had "Soon" placeholders; re-add if wanted).
