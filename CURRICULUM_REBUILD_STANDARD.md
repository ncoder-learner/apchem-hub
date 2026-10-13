# AP Chemistry curriculum rebuild standard

## Purpose

Every lesson must teach a student to reason from chemistry principles, not merely memorize definitions or copy an answer template. A lesson is not complete because it mentions every term or contains a Quick Check. It is complete when a learner can explain the mechanism, apply it to unfamiliar evidence, and solve exam-style problems independently.

## Source hierarchy

1. **College Board AP Chemistry Course and Exam Description (CED), effective Fall 2024**, including topic-level learning objectives, essential knowledge, science practices, and unit exam weighting: https://apcentral.collegeboard.org/media/pdf/ap-chemistry-course-and-exam-description.pdf
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
- [ ] Useful visual, data representation, demonstration, or simulation with interpretation guidance where appropriate.
- [ ] Multiple short checks spaced through the lesson, not all dumped at the end.
- [ ] At least one AP-style application with a complete explanation or scoring rationale.
- [ ] Misconceptions show the tempting wrong path and correct the underlying model.
- [ ] Sources and media are linked and attributed.
- [ ] No large undifferentiated text blocks; section headings tell the learner what they will understand.
- [ ] MDX builds and all interactive components render correctly.

## Rebuild order

1. Audit and repair all existing lessons, beginning with the known strong reference lesson 2.7 and comparing it against the criteria above.
2. Rebuild existing Unit 1–3 lessons topic by topic. Do not assume a lesson is adequate merely because it has the right heading or a Quick Check.
3. Build Units 4–9 from the CED and official released assessment evidence, using the same standards from the beginning.
4. Add mixed-unit practice, cumulative retrieval, and full-length exam practice only after the individual lessons cover the required content.
5. Run a production build and inspect lessons on desktop and mobile after each batch. Track coverage explicitly; do not label the course complete while required CED subskills remain unverified.


## Mandatory visual and hands-on learning standard (all nine units)

This applies to **every topic in Units 1–9**, not only graph-heavy kinetics lessons. Before a lesson is considered complete, audit whether a learner can understand the idea from the page without relying on imagination alone.

For every topic, include at least one **instructional representation** selected for the chemistry: a labeled diagram, particle model, molecular structure, data table, plotted graph, energy profile, annotated spectrum, or worked visual sequence. Reuse existing `ChemVisual`, `Unit3Visual`, `BondDiagram`, and `GeometryDiagram` components where appropriate; do not add a decorative visual that does not teach the topic.

Where manipulation materially improves learning, add a working hands-on activity. Examples include:
- change coefficients and watch atom counts update while balancing equations;
- change concentration, order, or rate constant and see a kinetics graph update;
- change gas-law variables and inspect calculated pressure or volume relationships;
- manipulate energy barriers and compare catalyzed/uncatalyzed pathways;
- explore molecular geometry, polarity, bonding, solutions, equilibrium, acids/bases, and electrochemistry with controls suited to each model;
- embed a real PhET simulation only when it directly supports the learning objective and the direct runnable URL has been verified.

Interactive requirements:
1. Controls must change the model or result immediately; a screenshot or static mockup does not count as interactive.
2. Label axes, quantities, units, assumptions, and model limitations.
3. Explain the chemistry behind the observed change, then ask a short prediction question or provide a challenge.
4. Use accessible native controls and responsive layouts; make the activity usable on mobile.
5. Never present a schematic as measured data or a simplified model as universally valid.
6. Do not force the same widget into every lesson. Select the visual/interactivity that fits that specific concept.
7. Review existing lessons, including previously merged units, for missing or weak instructional visuals. Add visuals to the content itself, not just to a unit landing page.

A lesson audit should record: current visuals/activities, gaps, proposed representation, interactive or simulation opportunity, and whether the resulting activity teaches the relevant CED learning objective. For graph-heavy topics, the graph should be part of the lesson and should be manipulable when a simple, scientifically valid model can support it.
