# Packet Companion Implementation Plan

**Branch:** `curriculum/lesson-clutter-unit-review-audit`  
**Status:** Initial index populated from extracted metadata for 22 MCQ Practice PDFs in the private `ncoder-learner/CHem` repository. A first batch of Unit 1–5 questions has topic-level mappings; remaining questions retain only the source packet's topic range. Question-specific hints, solutions, and video references remain unreviewed.  
**Deployment constraint:** Do not merge to `master` or trigger a Netlify deployment as part of this work.

## Product goal

Help students work through a physical AP Chemistry packet without retyping the question or switching to an unrelated online question bank. The companion should route each question to concept-specific help, while lessons teach the chemistry needed to solve it independently.

## Student flow

1. Select unit, packet identifier/title, question type (MCQ or FRQ), and question/part number.
2. Resolve that selection against a curated question index. Do not infer a match from question number alone.
3. Offer graduated assistance: concept hint, strategy/equation hint, next-step hint, and complete worked reasoning.
4. Link to the exact lesson section and any relevant graph, particle model, or simulation.
5. Offer an original parallel practice problem after the student has attempted the packet question.
6. Let the student mark the question as solved, needed help, or revisit. Progress storage is a separate implementation decision; do not imply persistence until it exists.

## Data contract

Use a stable, packet-independent ID rather than a question number as the primary key. Proposed record:

- `id`: stable internal ID, e.g. `u5-mcq-packet-a-q12`
- `unitId`: integer 1–9
- `packetId`: stable packet slug, not a display title
- `packetTitle`: human-readable title
- `questionType`: `mcq` or `frq`
- `questionNumber`: printed question number as a string
- `partLabel`: optional FRQ part such as `(b)(ii)`
- `topicSlugs`: one or more existing lesson slugs
- `skills`: observable chemistry skills, not vague topic labels
- `conceptHint`, `strategyHint`, `nextStepHint`: independently revealable hint stages
- `solution`: independently derived worked reasoning
- `commonMistakes`: misconception plus why it is tempting and how to correct it
- `parallelPractice`: original question with answer and explanation
- `videoUrl`, `videoTimestamp`, `videoVerificationStatus`: optional; only fill after the matching walkthrough and timestamp have been checked
- `sourceStatus`: `unmapped`, `mapped`, `solution-derived`, or `video-verified`
- `lastReviewed`: date and reviewer/source note

Do not store full proprietary packet wording or copy a creator's answer explanations without permission. The index can identify the printed question and map it to concepts while the student uses their physical copy. Any embedded prompt and practice should be original or otherwise authorized.

## Accuracy rules

- A question is not mapped until the packet's unit, version/title, and printed number have been checked.
- A solution is not marked video-verified unless the corresponding walkthrough was actually reviewed.
- If no transcript is available, derive the chemistry solution independently and label it accordingly.
- For FRQs, explain each part separately and ground scoring guidance in relevant public College Board scoring guidelines where available. Do not invent point allocations.
- Avoid making the full answer the first or only help option. Students should control hint disclosure.
- If a lookup fails, say no verified match exists yet; never show a different question's solution as a fallback.

## Lesson integration

Each lesson should expose:
- The concept model and relevant representation.
- A repeatable solution method for that concept.
- At least two worked examples when appropriate.
- Short retrieval checks with explanations.
- A clear path to the end-of-unit review for advice that applies across topics.
- A future Packet Companion link scoped to the current unit/topic when the index is implemented.

Keep topic-specific chemistry and graph-reading procedures inside the lesson. Consolidate broad AP exam strategy, recurring unit-level traps, FRQ response habits, and mixed review in the Unit Review.

## Implementation sequence

1. Finish the source-level lesson clutter audit and record actions per file.
2. Confirm Unit Review navigation and content coverage without publishing.
3. Implement the question-index types and validation before importing question mappings.
4. Build the Packet Companion lookup UI with explicit empty/unmapped states.
5. Review the extracted question-number index against each source PDF, starting with a representative batch.
6. Map individual questions to exact concepts and lessons; write original hints and independently derived explanations.
7. Add original parallel practice after the underlying question skill has been identified.
8. Add FRQ indexing when the private archive contains actual FRQ files, then review part labels and scoring guidance.
9. Add optional progress tracking only after deciding on local-only versus account-backed persistence.
10. Validate question-number edge cases, packet versions, keyboard accessibility, mobile layout, and build/type checks.

## Current source inventory and limitations

- The private source repository is `ncoder-learner/CHem`. Its main branch contains 22 files explicitly named as MCQ Practice PDFs, plus a mixed Topics 4.5–4.6 practice packet, a separate Topics 8.1–8.3 instructional packet, and an FRQ folder that currently contains only a placeholder.
- A temporary GitHub Actions artifact extracted text from the PDFs for internal indexing. The extracted question numbers and topic ranges were used to create 234 MCQ index entries across the 22 explicitly labeled MCQ Practice PDFs.
- The public AP Chem Hub repository contains metadata only: packet titles, question numbers, topic ranges, and links to existing lessons where available. It does not contain copied packet questions, diagrams, or answer keys.
- The Topics 4.5–4.6 mixed packet is excluded from the MCQ index until its question types are classified. The separate Topics 8.1–8.3 instructional packet is not treated as an MCQ set.
- The Topics 8.6–8.11 extraction begins with an unnumbered question before printed question 2. The index does not invent a number for that first item.
- A packet index match confirms the source set and question number. Where a `mapped topic` is shown, that question has also received a first-pass topic mapping based on the extracted prompt. Remaining entries show the packet's topic range only. All mappings still need source review, and no entry should be treated as a verified answer key.
- No teacher-video URL or timestamp is marked as verified. Do not label a solution video-verified unless the matching walkthrough has actually been checked.

The UI must keep these distinctions visible. It should never imply that a packet-specific answer is available when only the source and printed number have been indexed.
