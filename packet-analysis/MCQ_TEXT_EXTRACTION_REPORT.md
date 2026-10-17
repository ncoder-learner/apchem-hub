# MCQ Full-PDF Extraction Report

## Result
- **21 PDFs processed**
- **123 total pages**
- **233 estimated questions** based on numbered question stems and a manual correction where question 1 is unnumbered
- **0 pages required OCR**: the PDFs contain extractable text, so OCR was not needed for this pass.
- Extracted text was generated in a temporary GitHub Actions artifact with one-day retention; the original PDFs remain in the private `ncoder-learner/CHem` repository.
- Extraction run: https://github.com/ncoder-learner/CHem/actions/runs/38997466406

## Files committed to the AP Chem Hub feature branch
- `packet-analysis/mcq_archive_repository_inventory.csv`: filenames, topic ranges, file sizes and blob SHAs.
- `packet-analysis/MCQ_ARCHIVE_REPOSITORY_STATUS.md`: repository coverage inferred from filenames.
- `packet-analysis/mcq_extraction_index.csv`: page counts, estimated question counts, extraction character counts and notes.

## Coverage findings from filenames
The archive contains packets for Units 1–9. Filename-indicated gaps are:
- Unit 1: Topics 1.7–1.8 are not represented by the current filenames.
- Unit 4: Topics 4.5–4.6 are not represented by the current filenames.
- Units 2, 3, 5, 6, 7, 8 and 9 appear to have filename coverage across their listed topic ranges.

These are filename-level findings, not proof that each question actually tests every topic in the named range. This full archive corrects the earlier screenshot-based inventory: Unit 4 packets and Unit 7 Topics 7.6–7.10 and Unit 8 Topics 8.1–8.3 are present.

## Important extraction limitations
1. Text extraction does **not** preserve the full visual meaning of graphs, particulate diagrams, spectra, molecular structures, or answer-choice figures. Some tables may also be represented imperfectly.
2. A question can refer to a diagram or table “above”; its full stimulus needs visual review in the original PDF before the question is mapped or used.
3. Question counts are estimates. Several PDFs contain table values that resemble question numbers, and the Unit 8.6–8.11 packet has an unnumbered first question. Counts should be confirmed during the question-index pass.
4. No answer key was inferred. Do not mark answers or explanations as verified unless the source explicitly contains them and they have been checked.

## Next processing pass
1. Review each packet's extracted text and original visuals side-by-side.
2. Create a compact question index: packet, question number, primary concept, relevant AP Chemistry topic(s), skill type, visual/stimulus dependency, and verification status.
3. Map topics against the AP Chemistry Course and Exam Description, including cross-topic questions.
4. Use verified metadata and skill tags to plan lessons and original practice. Keep proprietary question wording and answer keys private unless redistribution is authorized.
