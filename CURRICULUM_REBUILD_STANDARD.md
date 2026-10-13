# AP Chemistry curriculum rebuild standard

## Purpose

Every lesson must teach a student to reason from chemistry principles, not merely memorize definitions or copy an answer template. A lesson is not complete because it mentions every term or contains a Quick Check. It is complete when a learner can explain the mechanism, apply it to unfamiliar evidence, and solve exam-style problems independently.

## Source hierarchy

1. **College Board AP Chemistry Course and Exam Description (CED), effective Fall 2024**, including topic-level learning objectives, essential knowledge, science practices, required representations/calculations, and unit exam weighting: https://apcentral.collegeboard.org/media/pdf/ap-chemistry-course-and-exam-description.pdf
2. **Official released AP exam FRQs, scoring guidelines, and sample responses** to determine how knowledge is assessed and what evidence earns points: https://apcentral.collegeboard.org/courses/ap-chemistry/exam
3. **College Board AP Daily / AP Classroom resources** when publicly accessible. AP Classroom resources may require teacher/class access: https://apcentral.collegeboard.org/instructional-resources/ap-classroom
4. University chemistry departments, ACS, Royal Society of Chemistry, PhET, and high-quality teaching videos to explain or visualize concepts where official sources do not provide a suitable public explanation.
5. Other educational resources only to fill a specific gap. Check chemistry accuracy and avoid copying their wording.

Do not claim that a resource is official when it is not. Do not imply that a lesson guarantees a score of 5. Publicly released questions may be linked and analyzed; use original parallel questions for embedded practice rather than copying entire copyrighted questions and diagrams.

## Required lesson design

Every topic must be audited against the current CED before rewriting. Record the learning objective, essential knowledge, applicable science practices, required representations/calculations, and likely misconceptions.

Use short, purposeful sections. Avoid long walls of text, decorative callout overload, and sections that jump from a definition directly into a test question. Use a repeated teaching sequence where appropriate:

1. **Why the concept exists:** begin with a phenomenon, contradiction, or question students can understand.
2. **Build the mental model:** explain what particles, electrons, energy, or forces are doing. Define technical terms when they become necessary, not as an unexplained vocabulary dump.
3. **Show the representation:** use a sourced image, a clear diagram, a data table, a graph, a molecular/particle model, or an interactive simulation. Explain how to read it and what it does *not* show.
4. **Derive the rule:** make the learner see why the relationship or procedure follows from the model.
5. **Worked examples:** provide 2–4 examples of increasing complexity, with every decision shown. Include at least one unfamiliar application when the topic supports it.
6. **Guided retrieval:** short, focused checks immediately after the concept, with meaningful explanations for every answer choice or common error.
7. **AP-style application:** include representative multiple-choice reasoning and free-response tasks when appropriate. Use multi-part questions with tables, graphs, particle diagrams, experimental setups, calculations, or claim-evidence-reasoning—not only definition recall.
8. **Scoring logic:** explain what chemistry evidence a strong response must contain and why vague or incorrect explanations lose credit. Ground this in released scoring guidelines when available.
9. **Connections and transfer:** show how the concept links to prerequisite topics and where it will be used later.
10. **Readiness check:** a short checklist or mixed retrieval set that tests understanding, not confidence alone.

### Visual and interaction standard — applies to every unit and every topic

Visual teaching is part of the lesson, not decoration and not an optional Unit 5 enhancement. Audit every existing and future topic against the CED and select a representation that actually helps teach its core idea.

- **Every topic must contain a meaningful visual or manipulable representation in the lesson body** when the concept supports one. Choose the representation to fit the chemistry: particle/molecular models for structure and reactions; orbital/energy diagrams for atomic and bonding concepts; plotted data for quantitative relationships; apparatus/data displays for experimental reasoning; titration curves, equilibrium models, energy profiles, and cell diagrams where appropriate.
- **Every topic must include at least one purposeful interactive or hands-on learning task** where it can improve understanding. It must let students change an input, manipulate a model, balance or assemble a representation, test a prediction, or interpret dynamically updated data. Merely linking a video, embedding a static image, or placing a slider that does not affect the chemistry does not count.
- Interactions must be chemically valid and transparent about assumptions, units, model limitations, and whether values are illustrative or empirical. The graph/diagram/result must update when relevant parameters change.
- Place the visual or interaction next to the explanation it supports, not only in an appendix at the end. The shared end-of-lesson lab is a supplemental minimum and does **not** replace topic-specific inline representations or interactions.
- Use PhET where a relevant simulation genuinely supports the learning objective. Link/embeds must be verified, and each must include a concrete prediction or investigation task. Do not force an unrelated simulation into a lesson just to meet a quota.
- For graph-heavy lessons, students should be able to change relevant variables and observe the graph or data update. For molecular/particle lessons, students should be able to inspect or manipulate the relevant structure when feasible. For quantitative procedures, expose the steps and show how changing inputs changes the result.
- Use original, accessible custom React/SVG interactions when existing credible tools do not fit. Provide labels, keyboard-operable controls, readable axes/units, useful feedback, and a text explanation for screen readers or students who cannot use the interaction.
- A generic unit-wide lab is a fallback/supplement, not evidence that all topic-specific visuals have been completed.

Not every topic needs every visual type. Use the best available representation for the concept. A graph-heavy topic needs graphs; a molecular topic needs particle/orbital models; an experimental topic needs an apparatus or data representation.

## External media and attribution

- Search for an existing high-quality diagram, experiment demonstration, or video before creating a custom substitute.
- Prefer College Board, university, ACS, RSC, PhET, and other credible education/science sources.
- Link to videos at the exact topic when possible. State what the student should watch for and connect it to the lesson's mental model.
- Embed an image only when the source URL is stable and the site's terms permit use. Attribute it next to the image and retain a source link. If reuse rights or image availability are unclear, link to the original page instead of copying it.
- Never use a picture as decoration: label what matters and teach students how to interpret it.
- Interactive simulations should have a specific task or prediction question; do not embed a simulation without guidance.

## Accuracy and exam alignment

- Do not use oversimplified rules when the outcome depends on context. State the conditions of comparisons.
- Distinguish observations, models, assumptions, and conclusions.
- Keep units, significant figures, chemical notation, and equations correct.
- Clearly identify content that is required, useful background, or beyond the AP scope.
- Avoid presenting a sample question as an official AP question unless it is an actual released item with a source.
- Do not imply that any one unit or lesson alone guarantees exam readiness.

## Acceptance checklist for each lesson

- [ ] Mapped to the current CED learning objective and essential knowledge.
- [ ] Every required subskill is taught and assessed, not merely named.
- [ ] Concept is explained from a particle/energy/structure model where appropriate.
- [ ] A student can follow the reasoning without needing an external teacher to fill gaps.
- [ ] At least 2 worked examples, with steps and rationale; more when the topic has multiple distinct skills.
- [ ] A topic-specific visual/data representation with interpretation guidance.
- [ ] At least one purposeful interaction or hands-on task, with chemically meaningful parameter changes and updated output where applicable.
- [ ] Multiple short checks spaced through the lesson, not all dumped at the end.
- [ ] At least one AP-style application with a complete explanation or scoring rationale.
- [ ] Misconceptions show the tempting wrong path and correct the underlying model.
- [ ] Sources and media are linked and attributed.
- [ ] No large undifferentiated text blocks; section headings tell the learner what they will understand.
- [ ] MDX builds and all interactive components render correctly.
- [ ] Desktop and mobile interaction checked, including keyboard access and labels.

## Rebuild order

1. Audit every existing topic against the CED and this checklist; do not infer adequacy from the presence of a heading or Quick Check.
2. Repair existing Unit 1–5 topics in batches, integrating visuals and interactions inline where they teach the idea.
3. Build Units 6–9 from the CED and official released assessment evidence using the same standard from the first topic; do not postpone visual work until after writing all the text.
4. Add mixed-unit practice, cumulative retrieval, and full-length exam practice only after individual lessons cover the required content.
5. Run a production build and inspect lessons on desktop and mobile after each batch. Track coverage explicitly; do not label the course complete while required CED subskills or topic-specific visual/interactivity coverage remain unverified.
