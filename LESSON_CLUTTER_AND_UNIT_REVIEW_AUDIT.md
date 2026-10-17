# Lesson Clutter and Unit Review Audit

**Branch:** `curriculum/lesson-clutter-unit-review-audit`  
**Audit scope:** Initial source-level audit of the curriculum branch, using the repository's actual MDX schema and representative lessons. This is not yet a claim that every lesson has been reviewed.

## Repository state and safety

- The default `master` branch is stale relative to the curriculum work. It contains only Unit 2, Topic 2.7, while `curriculum/all-units-interactive-learning` contains lesson files from Units 1–5 and the visual-learning standard.
- Keep curriculum work on a dedicated branch; do not write these changes to `master`.
- The project uses one MDX file per topic under `content/units/unit-{N}/`, with required frontmatter `title`, `unit`, `topicNumber`, `slug`, and `summary`. Do not introduce a unit-wide MDX split marker or a separate lesson manifest.
- New MDX components must be registered in `components/mdx/index.tsx`.
- Existing course styling is dark, restrained, and component-based. Reduce content clutter without replacing the current design system.

## Intended content rule

Keep information in a lesson when it is needed to understand that topic, interpret its model, or solve a problem about it. Move information to the end-of-unit review when it is general exam strategy, a repeated reminder, a broad test-taking tip, or a summary that applies across several topics. Link to the review from lessons rather than duplicating the same advice.

Do not shorten by deleting required chemistry, derivations, worked reasoning, or explanations for wrong answers. The objective is less noise and better sequencing, not less instruction.

## Initial source observations

### Unit 2, Topic 2.7 — VSEPR and Hybridization

File: `content/units/unit-2/2-7-vsepr-and-hybridization.mdx`

- Strengths to preserve: the lesson derives sigma/pi counting and VSEPR reasoning, uses examples that increase in complexity, includes specific misconception explanations, and provides molecular geometry diagrams and a PhET simulation.
- Clutter risk: the lesson is very long and includes multiple nested `LessonSection` blocks, repeated recap language, and several callouts. Review for paragraphs that restate the same rule after the mechanism has already been explained. Keep the derivation and worked examples; remove only repeated restatements.
- Move or cross-link: the section titled “What the AP exam actually expects here” is primarily exam-scope guidance. Move the general exam guidance to the Unit 2 Review and leave a short inline note only if students need it to avoid learning an out-of-scope detail.
- Keep inline: the electron-domain model, sigma/pi explanation, geometry representations, and molecular-polarity reasoning are essential to this topic and should not be moved to the unit review.
- Scientific review flag: verify all claims about hybridization and the course's expected treatment of steric numbers 5 and 6 against the current AP Chemistry Course and Exam Description. Avoid making unsupported exam-scope claims or presenting simplified hybridization models as literal modern orbital participation.

### Unit 1, Topic 1.1 — Moles and Molar Mass

File: `content/units/unit-1/1-1-moles-and-molar-mass.mdx`

- Strengths to preserve: it distinguishes particles, moles, and mass; explains entities and formula units; uses dimensional analysis; and includes worked conversions and focused checks.
- Cleanup opportunity: keep the conversion logic near the examples, but move broad “how to approach exam questions” advice into the Unit 1 Review if it is repeated across other topics.
- Visual requirement: retain the mole-count visual and verify that the topic-specific interactive model actually changes meaningful chemistry quantities and explains the output. A visual is not sufficient merely because it is present.

### Unit 5, Topic 5.1 — Reaction Rates

File: `content/units/unit-5/5-1-reaction-rates.mdx`

- Strengths to preserve: the distinction between rate of disappearance and formation, stoichiometric rate relationships, units, and slope-versus-height reasoning.
- Visual requirement: graph interpretation is central here. Ensure students can inspect or manipulate a concentration-versus-time graph and see how the slope/rate changes, with axes and units labelled. Verify the injected `TopicLab` is specific to this topic and appears beside the explanation it supports.
- Avoid duplicating general test-taking tips in the graph section. Keep graph-reading procedures here, because they are concept-specific skills; put generic multiple-choice strategy in the Unit 5 Review.

## Unit Review design

Create a dedicated end-of-unit review route for each populated unit. The review should be a real learning resource, not a page of generic tips. It should include:

1. A concise unit map of essential concepts and how they connect.
2. A “how to solve” section for recurring problem types across the unit.
3. Common misconceptions and plausible distractors.
4. AP exam strategy: command verbs, data/graph interpretation, and response construction where applicable.
5. FRQ response quality: required chemical reasoning, equations, units, significant figures, graph labels, and particle-level evidence when relevant.
6. A mixed diagnostic set with complete explanations and clear topic links.
7. A readiness checklist tied to the course's actual learning objectives.

Avoid pretending the review is a complete exam or promising a score. Do not copy proprietary packet questions. Use original parallel practice or link to authorized materials.

## Implementation sequence

1. Audit each lesson against the current CED and the existing curriculum standard.
2. Record per-lesson actions as **keep**, **tighten**, **move to unit review**, **add explanation/example**, **add or repair visual/interaction**, or **verify chemistry/source**.
3. Implement a reusable Unit Review structure and link it from lesson navigation.
4. Edit lesson content in topic-sized batches; preserve required frontmatter and registered MDX components.
5. Verify route coverage, typecheck, production build, and desktop/mobile behavior before claiming completion.

## Validation status

- [x] Read `README.md`, `lib/content.ts`, `lib/units.ts`, the MDX component registry, lesson route, and `LessonView` on the curriculum branch.
- [x] Read representative lessons from Units 1, 2, and 5.
- [ ] Audit every lesson file against the current CED.
- [ ] Implement Unit Review routes and lesson navigation.
- [ ] Edit lessons to remove redundant or misplaced content.
- [ ] Run typecheck and production build.
- [ ] Inspect responsive rendering and interactions.

This audit is intentionally explicit about what has and has not been checked. Do not mark the whole curriculum audited until the remaining lesson files have been reviewed.
