# MCQ Archive Processing Report

Status: Phase 1 inventory complete. Phases 2–6 are blocked until full source packets are available.

## Archive findings

The supplied archive report identifies 19 PDF files, representing 18 unique packet titles because the Unit 7 Topics 7.11–7.12 preview is duplicated. Each PDF is a single-page browser screenshot of a Google Drive PDF preview, not a full source packet. The source packet page-count indicators total 99 pages across the unique packet set, while the archive contains only one screenshot page per PDF. Each screenshot appears to show only page 1 of the source document and has no extractable text layer.

The files are named `tab_N_2026-10-17.pdf`. The tab sequence skips 5, 13, and 14. The missing tabs align with several curriculum gaps, but the exact contents of the missing tabs should be confirmed from the original files rather than inferred.

## Coverage and known gaps

- Unit 1: Topics 1.1–1.8 represented by three packet previews; only page 1 of each source packet is captured.
- Unit 2: Topics 2.1–2.7 represented by two packet previews; only page 1 of each source packet is captured.
- Unit 3: Topics 3.1–3.13 represented by three packet previews; only page 1 of each source packet is captured.
- Unit 4: No packet found in the archive.
- Unit 5: Topics 5.1–5.11 represented by two packet previews; only page 1 of each source packet is captured.
- Unit 6: Topics 6.1–6.9 represented by two packet previews; only page 1 of each source packet is captured.
- Unit 7: Topics 7.1–7.5 and 7.11–7.12 represented; Topics 7.6–7.10 missing. The 7.11–7.12 packet preview appears twice.
- Unit 8: Topics 8.4–8.11 represented; Topics 8.1–8.3 missing.
- Unit 9: Topics 9.1–9.11 represented by two packet previews; only page 1 of each source packet is captured.

"Represented" means only that a preview for the topic range exists. It does not mean the complete packet or all questions are available.

## Why question indexing is blocked

A reliable question-by-question index needs complete packet pages. The available screenshot previews do not support a complete question list, full question mapping, answer verification, or reliable walkthrough matching. Indexing the visible portions could be done as a clearly labeled partial extraction, but it should not be used as the full packet companion data source.

## Recovery checklist

1. Locate the original PDFs in Google Drive or the local downloads folder.
2. Prefer the source PDF downloaded directly from Drive (all pages), rather than screenshots of the browser preview.
3. Confirm and recover the missing Unit 4 packet and the missing Unit 7 Topics 7.6–7.10 and Unit 8 Topics 8.1–8.3 packets.
4. Re-check the Unit 7 Topics 7.11–7.12 duplicate and retain one canonical copy.
5. Once full PDFs are present, process one packet at a time, saving progress after each packet. Use OCR only for pages that lack a text layer.
6. Keep video matches labeled as candidate/unverified until the question/topic alignment and the relevant video segment are actually checked.
7. Do not reproduce proprietary packet questions or answer explanations wholesale in the website. Prefer metadata, authorized links, independently written hints, and original analogous practice.

## Files produced

- `packet-analysis/mcq_archive_inventory.csv`
- `packet-analysis/MCQ_PROCESSING_REPORT.md`

Not yet produced: a complete `mcq_question_index.csv`, `mcq_learning_map.md`, and `PACKET_COMPANION_SPEC.md`. These should be generated only after the source packet set is recovered, or explicitly scoped to the small visible portions of the screenshot previews.
