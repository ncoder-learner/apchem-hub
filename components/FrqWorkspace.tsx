"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { FRQ_PART_PAGE_CANDIDATES } from "@/lib/frq-part-page-candidates";

type FrqPacket = {
  unit: number;
  title: string;
  topics: string;
  file: string;
};

const FRQ_PACKETS: FrqPacket[] = [
  { unit: 1, title: "Topics 1.1–1.3", topics: "Moles, mass spectra, elemental composition", file: "topic-1-1-1-3.pdf" },
  { unit: 1, title: "Topics 1.4–1.6", topics: "Mixtures, electron configuration, photoelectron spectroscopy", file: "topic-1-4-1-6.pdf" },
  { unit: 1, title: "Topics 1.7–1.8", topics: "Periodic trends and valence electrons", file: "topic-1-7-1-8.pdf" },
  { unit: 2, title: "Topics 2.1–2.4", topics: "Chemical bonding, ionic solids, metals and alloys", file: "topic-2-1-2-4.pdf" },
  { unit: 2, title: "Topics 2.5–2.6", topics: "Lewis diagrams, resonance and formal charge", file: "topic-2-5-2-6.pdf" },
  { unit: 2, title: "Topic 2.7", topics: "VSEPR and hybridization", file: "topic-2-7.pdf" },
  { unit: 3, title: "Topic 3.1", topics: "Intermolecular forces", file: "topic-3-1.pdf" },
  { unit: 3, title: "Topics 3.2–3.4", topics: "Solids, liquids, gases and the ideal gas law", file: "topic-3-2-3-4.pdf" },
  { unit: 3, title: "Topics 3.5–3.8", topics: "Kinetic molecular theory, solutions and mixtures", file: "topic-3-5-3-8.pdf" },
  { unit: 3, title: "Topics 3.9–3.13", topics: "Separations, solubility, spectroscopy and Beer–Lambert law", file: "topic-3-9-3-13.pdf" },
  { unit: 4, title: "Topics 4.1–4.4", topics: "Reactions, net ionic equations and representations", file: "topic-4-1-4-4.pdf" },
  { unit: 4, title: "Topics 4.5–4.6", topics: "Stoichiometry and titration", file: "topic-4-5-4-6.pdf" },
  { unit: 4, title: "Topics 4.7–4.9", topics: "Reaction types, acid–base and redox", file: "topic-4-7-4-9.pdf" },
  { unit: 5, title: "Topics 5.1–5.3", topics: "Rates, rate laws and concentration over time", file: "topic-5-1-5-3.pdf" },
  { unit: 5, title: "Topics 5.4–5.11", topics: "Elementary steps, mechanisms, energy profiles and catalysis", file: "topic-5-4-5-11.pdf" },
  { unit: 6, title: "Topics 6.1–6.5", topics: "Thermochemistry, calorimetry and phase changes", file: "topic-6-1-6-5.pdf" },
  { unit: 6, title: "Topics 6.6–6.9", topics: "Enthalpy, bond energies, formation and Hess's law", file: "topic-6-6-6-9.pdf" },
  { unit: 7, title: "Topics 7.1–7.5", topics: "Equilibrium and reaction quotient foundations", file: "topic-7-1-7-5.pdf" },
  { unit: 7, title: "Topics 7.6–7.10", topics: "Equilibrium calculations and shifts", file: "topic-7-6-7-10.pdf" },
  { unit: 7, title: "Topics 7.11–7.12", topics: "Equilibrium applications", file: "topic-7-11-7-12.pdf" },
  { unit: 8, title: "Topics 8.1–8.3", topics: "Acids, bases and pH", file: "topic-8-1-8-3.pdf" },
  { unit: 8, title: "Topics 8.4–8.5", topics: "Acid–base reactions and titration", file: "topic-8-4-8-5.pdf" },
  { unit: 8, title: "Topics 8.6–8.11", topics: "Buffers, titration curves and acid–base structure", file: "topic-8-6-8-11.pdf" },
  { unit: 9, title: "Topics 9.1–9.7", topics: "Entropy, Gibbs free energy and thermodynamic favorability", file: "topic-9-1-9-7.pdf" },
  { unit: 9, title: "Topics 9.8–9.11", topics: "Electrochemistry and thermodynamics", file: "topic-9-8-9-11.pdf" },
];

// Page counts from the audited PDFs. Used to keep manual and candidate jumps in bounds.
const FRQ_PDF_PAGE_COUNTS: Record<string, number> = {
  "topic-1-1-1-3.pdf": 9,
  "topic-1-4-1-6.pdf": 8,
  "topic-1-7-1-8.pdf": 9,
  "topic-2-1-2-4.pdf": 14,
  "topic-2-5-2-6.pdf": 9,
  "topic-2-7.pdf": 9,
  "topic-3-1.pdf": 13,
  "topic-3-2-3-4.pdf": 15,
  "topic-3-5-3-8.pdf": 11,
  "topic-3-9-3-13.pdf": 16,
  "topic-4-1-4-4.pdf": 13,
  "topic-4-5-4-6.pdf": 12,
  "topic-4-7-4-9.pdf": 12,
  "topic-5-1-5-3.pdf": 18,
  "topic-5-4-5-11.pdf": 17,
  "topic-6-1-6-5.pdf": 10,
  "topic-6-6-6-9.pdf": 13,
  "topic-7-1-7-5.pdf": 13,
  "topic-7-11-7-12.pdf": 11,
  "topic-7-6-7-10.pdf": 16,
  "topic-8-1-8-3.pdf": 16,
  "topic-8-4-8-5.pdf": 21,
  "topic-8-6-8-11.pdf": 20,
  "topic-9-1-9-7.pdf": 17,
  "topic-9-8-9-11.pdf": 22,
};

// Candidate question-start pages extracted from PDF text for all 25 packets.
// These are navigation aids, not answer-key mappings; verify the PDF page visually.
const FRQ_PAGE_CANDIDATES: Record<string, Record<string, number>> = {
  "topic-1-1-1-3.pdf": {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 2,
    6: 2,
    7: 2,
    8: 3,
    9: 3,
    10: 4,
    11: 4,
    12: 5,
    13: 5,
    14: 5,
    15: 5,
    16: 6,
    17: 6,
    18: 6,
    19: 7,
    20: 8,
    21: 8,
    22: 8
  },
  "topic-1-4-1-6.pdf": {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 3,
    8: 4,
    9: 5,
    10: 5,
    11: 6,
    12: 6,
    13: 7,
    14: 7,
    15: 7,
    16: 8
  },
  "topic-1-7-1-8.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 3,
    7: 3,
    8: 4,
    9: 4,
    10: 6,
    11: 6,
    12: 7,
    13: 7,
    14: 8,
    15: 9,
    16: 9
  },
  "topic-2-1-2-4.pdf": {
    1: 2,
    2: 2,
    3: 3,
    4: 3,
    5: 5,
    6: 8,
    7: 8,
    8: 9,
    9: 9,
    10: 10,
    11: 10,
    12: 11,
    13: 11,
    14: 11,
    15: 11,
    16: 12,
    17: 13
  },
  "topic-2-5-2-6.pdf": {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
    6: 6,
    7: 7,
    8: 7,
    9: 7,
    10: 8,
    11: 8,
    12: 9
  },
  "topic-2-7.pdf": {
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 3,
    7: 4,
    8: 5,
    9: 7,
    10: 8,
    11: 8,
    12: 9
  },
  "topic-3-1.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 4,
    5: 4,
    6: 5,
    7: 5,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 7,
    13: 8,
    14: 9,
    15: 9,
    16: 10,
    17: 10,
    18: 10,
    19: 10,
    20: 11,
    21: 11,
    22: 12,
    23: 13
  },
  "topic-3-2-3-4.pdf": {
    1: 2,
    2: 3,
    3: 3,
    4: 4,
    5: 6,
    6: 6,
    7: 7,
    8: 7,
    9: 10,
    10: 11,
    11: 12,
    12: 12,
    13: 13,
    14: 14
  },
  "topic-3-5-3-8.pdf": {
    1: 2,
    2: 2,
    3: 3,
    4: 3,
    5: 3,
    6: 4,
    7: 5,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 8,
    13: 8,
    14: 9,
    15: 9,
    16: 9,
    17: 10,
    18: 10
  },
  "topic-3-9-3-13.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 6,
    9: 8,
    10: 9,
    11: 10,
    12: 10,
    13: 14,
    14: 15,
    15: 16
  },
  "topic-4-1-4-4.pdf": {
    1: 2,
    2: 2,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 5,
    8: 6,
    9: 6,
    10: 7,
    11: 7,
    12: 9,
    13: 9,
    14: 9,
    15: 10,
    16: 10,
    17: 11,
    18: 11,
    19: 12,
    20: 12,
    21: 13,
    22: 13
  },
  "topic-4-5-4-6.pdf": {
    1: 1,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 4,
    7: 5,
    8: 6,
    9: 6,
    10: 7,
    11: 8,
    12: 9,
    13: 11,
    14: 12
  },
  "topic-4-7-4-9.pdf": {
    1: 1,
    2: 3,
    3: 4,
    4: 4,
    5: 5,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    10: 10,
    11: 11,
    12: 12,
    13: 12
  },
  "topic-5-1-5-3.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 3,
    6: 4,
    7: 5,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 9,
    13: 11,
    14: 13,
    15: 14,
    16: 14,
    17: 15,
    18: 16,
    19: 17,
    20: 18
  },
  "topic-5-4-5-11.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    10: 9,
    11: 10,
    12: 10,
    13: 11,
    14: 11,
    15: 13,
    16: 15,
    17: 17
  },
  "topic-6-1-6-5.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 4,
    5: 5,
    6: 6,
    7: 8,
    8: 8,
    9: 9,
    10: 9,
    11: 10,
    12: 10
  },
  "topic-6-6-6-9.pdf": {
    1: 2,
    2: 3,
    3: 6,
    4: 7,
    5: 7,
    6: 8,
    7: 8,
    8: 9,
    9: 9,
    10: 9,
    11: 10,
    12: 11,
    13: 12,
    14: 13
  },
  "topic-7-1-7-5.pdf": {
    1: 2,
    2: 4,
    3: 4,
    4: 6,
    5: 7,
    6: 8,
    7: 10,
    8: 11,
    9: 12,
    10: 12,
    11: 13,
    12: 13,
    13: 13
  },
  "topic-7-11-7-12.pdf": {
    1: 2,
    2: 2,
    3: 4,
    4: 4,
    5: 5,
    6: 5,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11
  },
  "topic-7-6-7-10.pdf": {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 5,
    8: 7,
    9: 8,
    10: 10,
    11: 11,
    12: 12,
    13: 13,
    14: 14,
    15: 14,
    16: 15
  },
  "topic-8-1-8-3.pdf": {
    1: 1,
    2: 2,
    3: 3,
    4: 3,
    5: 4,
    6: 4,
    7: 4,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 8,
    13: 9,
    14: 10,
    15: 11,
    16: 12,
    17: 13,
    18: 14,
    19: 15,
    20: 16
  },
  "topic-8-4-8-5.pdf": {
    1: 2,
    2: 2,
    3: 2,
    4: 3,
    5: 7,
    6: 11,
    7: 12,
    8: 14,
    9: 15,
    10: 16,
    11: 17,
    12: 18,
    13: 19
  },
  "topic-8-6-8-11.pdf": {
    1: 1,
    2: 2,
    3: 3,
    4: 3,
    5: 4,
    6: 5,
    7: 7,
    8: 7,
    9: 11,
    10: 13,
    11: 13,
    12: 14,
    13: 15,
    14: 16,
    15: 17,
    16: 17,
    17: 18,
    18: 19,
    19: 20
  },
  "topic-9-1-9-7.pdf": {
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 3,
    6: 5,
    7: 5,
    8: 5,
    9: 6,
    10: 6,
    11: 7,
    12: 8,
    13: 9,
    14: 10,
    15: 11,
    16: 12,
    17: 12,
    18: 13,
    19: 14,
    20: 15,
    21: 16,
    22: 17,
    23: 17
  },
  "topic-9-8-9-11.pdf": {
    1: 1,
    2: 4,
    3: 5,
    4: 6,
    5: 7,
    6: 9,
    7: 10,
    8: 12,
    9: 14,
    10: 17,
    11: 18,
    12: 19,
    13: 20
  }
};


type WorkedSolution = {
  prompt: string;
  steps: string[];
  answer: string;
  concept: string;
};

// Original, independently calculated walkthroughs for prompts whose text is
// explicit in the packet extraction. These are not official scoring guides.
const FRQ_WORKED_SOLUTIONS: Record<string, Record<string, WorkedSolution>> = {
  "topic-1-1-1-3.pdf": {
    "1": { prompt: "Calculate the mass of 0.0850 mol Ba(OH)2.", steps: ["Molar mass Ba(OH)2 = 137.33 + 2(16.00 + 1.008) = 171.34 g/mol.", "Mass = amount × molar mass = 0.0850 mol × 171.34 g/mol = 14.564 g.", "Round to three significant figures, matching 0.0850 mol."], answer: "14.6 g Ba(OH)2", concept: "Convert mol → g using molar mass." },
    "2": { prompt: "Calculate the number of moles of C4H10 in 2.00 g.", steps: ["Molar mass C4H10 = 4(12.01) + 10(1.008) = 58.12 g/mol.", "n = m/M = 2.00 g ÷ 58.12 g/mol = 0.03441 mol.", "Round to three significant figures."], answer: "0.0344 mol C4H10", concept: "Convert g → mol by dividing by molar mass." },
    "3": { prompt: "Calculate the number of atoms of Si in 35.0 mol Si.", steps: ["Use Avogadro's constant: 6.022 × 10^23 atoms/mol.", "Atoms = 35.0 mol × 6.022 × 10^23 atoms/mol = 2.1077 × 10^25 atoms.", "Keep three significant figures."], answer: "2.11 × 10^25 Si atoms", concept: "Convert mol → particles with Avogadro's constant." },
    "4": { prompt: "Calculate the number of moles of O3 in 4.3 × 10^24 molecules.", steps: ["Convert molecules to moles by dividing by 6.022 × 10^23 molecules/mol.", "n = (4.3 × 10^24) ÷ (6.022 × 10^23) = 7.14 mol.", "The given count has two significant figures."], answer: "7.1 mol O3", concept: "Convert particles → mol by dividing by Avogadro's constant." },
    "5": { prompt: "Calculate the mass of 8.2 × 10^22 molecules of CHCl3.", steps: ["Molar mass CHCl3 = 12.01 + 1.008 + 3(35.45) = 119.37 g/mol.", "Moles = (8.2 × 10^22 molecules) ÷ (6.022 × 10^23 molecules/mol) = 0.136 mol.", "Mass = 0.136 mol × 119.37 g/mol = 16.25 g; round to two significant figures."], answer: "16 g CHCl3", concept: "Convert molecules → mol → grams; keep units through both steps." },
    "6": { prompt: "Calculate the number of formula units of Na2SO4 in 0.248 g.", steps: ["Molar mass Na2SO4 = 2(22.99) + 32.06 + 4(16.00) = 142.04 g/mol.", "Moles = 0.248 g ÷ 142.04 g/mol = 1.746 × 10^-3 mol.", "Formula units = 1.746 × 10^-3 mol × 6.022 × 10^23 units/mol."], answer: "1.05 × 10^21 formula units Na2SO4", concept: "Ionic compounds are counted as formula units, not molecules." },
    "12": { prompt: "Calculate the percent composition by mass of each element in glucose, C6H12O6.", steps: ["Molar mass = 6(12.01) + 12(1.008) + 6(16.00) = 180.16 g/mol.", "Carbon: 72.06/180.16 × 100 = 40.0%. Hydrogen: 12.096/180.16 × 100 = 6.71%.", "Oxygen: 96.00/180.16 × 100 = 53.3%. The percentages sum to approximately 100%."], answer: "C = 40.0%, H = 6.71%, O = 53.3%", concept: "Element percent = mass contributed by that element in one mole ÷ molar mass × 100%." },
    "13": { prompt: "Calculate the percent composition by mass of each element in erythrose, C4H8O4.", steps: ["Molar mass = 4(12.01) + 8(1.008) + 4(16.00) = 120.10 g/mol.", "Carbon: 48.04/120.10 × 100 = 40.0%. Hydrogen: 8.064/120.10 × 100 = 6.71%.", "Oxygen: 64.00/120.10 × 100 = 53.3%."], answer: "C = 40.0%, H = 6.71%, O = 53.3%", concept: "Glucose and erythrose have the same empirical formula, CH2O, so their percent compositions match." },
    "14": { prompt: "Find the empirical formulas of glucose and erythrose.", steps: ["For glucose, C6H12O6, divide all subscripts by 6: C6H12O6 → CH2O.", "For erythrose, C4H8O4, divide all subscripts by 4: C4H8O4 → CH2O.", "Both formulas reduce to the same simplest whole-number atom ratio."], answer: "Glucose: CH2O; erythrose: CH2O.", concept: "Different molecular formulas can share the same empirical formula and therefore the same percent composition by mass." },
    "21": { prompt: "Calculate the percentage of H2O by mass in CaCl2·2H2O.", steps: ["Mass of 2H2O per mole = 2[2(1.008) + 16.00] = 36.03 g/mol.", "Molar mass CaCl2·2H2O = 40.08 + 2(35.45) + 36.03 = 147.01 g/mol.", "Percent water = 36.03/147.01 × 100 = 24.51%."], answer: "24.5% H2O by mass", concept: "For a hydrate, include waters of crystallization in the total molar mass." },
    "15": { prompt: "Find the empirical formula for a compound that is 43.64% P and 56.36% O by mass.", steps: ["Assume 100 g: 43.64 g P and 56.36 g O.", "Moles: P = 43.64/30.97 = 1.408 mol; O = 56.36/16.00 = 3.523 mol.", "Divide by the smaller amount: P:O ≈ 1:2.50. Multiply both subscripts by 2."], answer: "P2O5", concept: "Convert mass percentages to mole ratios, then scale to whole numbers." },
    "16": { prompt: "Find the empirical formula for a compound that is 52.14% C, 13.13% H, and 34.73% O by mass.", steps: ["Assume 100 g: 52.14 g C, 13.13 g H, and 34.73 g O.", "Moles: C ≈ 4.341, H ≈ 13.03, O ≈ 2.171.", "Divide by 2.171: C:H:O ≈ 2:6:1."], answer: "C2H6O", concept: "Mass percentages become subscripts only after conversion to moles and simplification." },
    "17": { prompt: "A 6.18-g Sn sample is converted completely to tin oxide with a mass of 7.85 g. Determine the oxide's empirical formula.", steps: ["Oxygen mass = 7.85 − 6.18 = 1.67 g.", "Moles Sn = 6.18/118.71 = 0.0521 mol; moles O = 1.67/16.00 = 0.1044 mol.", "Divide by the smaller amount: Sn:O ≈ 1:2."], answer: "SnO2", concept: "Use the mass gain to determine oxygen mass, then convert each element's mass to moles." },
    "18:a": { prompt: "A 15.00-g sample of compound X contains 9.81 g C, 1.37 g H, and 3.82 g N. Determine its empirical formula.", steps: ["Convert masses to moles: C = 9.81/12.01 ≈ 0.817 mol; H = 1.37/1.008 ≈ 1.359 mol; N = 3.82/14.01 ≈ 0.273 mol.", "Divide all values by the smallest, 0.273: C:H:N ≈ 3.00:4.98:1.", "Round to the nearest whole-number ratio supported by the data."], answer: "C3H5N", concept: "The empirical formula uses the simplest whole-number mole ratio." },
    "20:a": { prompt: "A 25.00-g sample of CuSO4·5H2O: calculate the mass of CuSO4 present.", steps: ["Molar mass CuSO4 = 63.55 + 32.06 + 4(16.00) = 159.61 g/mol.", "Molar mass CuSO4·5H2O = 159.61 + 5(18.016) = 249.69 g/mol.", "Mass fraction CuSO4 = 159.61/249.69 = 0.6392. Multiply by 25.00 g."], answer: "15.98 g CuSO4", concept: "Use the anhydrous compound's mass fraction within one mole of the hydrate." }
  ,
    "7:a": {prompt:"Calculate the average atomic mass of chlorine from its isotope abundances.",steps:["Use the weighted average: average mass = Σ(isotope mass × fractional abundance).","Natural chlorine is approximately 75.8% ³⁵Cl and 24.2% ³⁷Cl.","Average ≈ (34.97 × 0.758) + (36.97 × 0.242) ≈ 35.45 u."],answer:"Average atomic mass ≈ 35.45 u.",concept:"Average atomic mass is a weighted average, not a simple mean of isotope masses."},
    "7:b": {prompt:"Complete the proton and neutron counts for chlorine-35 and chlorine-37.",steps:["Chlorine's atomic number is 17, so each isotope has 17 protons.","Neutrons = mass number − atomic number."],answer:"³⁵Cl: 17 protons, 18 neutrons. ³⁷Cl: 17 protons, 20 neutrons.",concept:"Isotopes of an element have the same proton number but different neutron numbers."},
    "9:a": {prompt:"Identify the element with naturally occurring isotopes of mass numbers 79 and 81.",steps:["The two isotopes have mass numbers 79 and 81, and the average atomic mass is close to 79.9 u.","The element with atomic number 35 and average atomic mass about 79.9 u is bromine."],answer:"Bromine (Br).",concept:"Isotope mass numbers and average atomic mass can identify an element."},
    "9:b": {prompt:"Complete proton and neutron counts for bromine-79 and bromine-81.",steps:["Bromine has atomic number 35, so each isotope has 35 protons.","Neutrons = mass number − 35."],answer:"⁷⁹Br: 35 protons, 44 neutrons. ⁸¹Br: 35 protons, 46 neutrons.",concept:"Mass number is the sum of protons and neutrons."},
    "10:a": {prompt:"Identify the element with naturally occurring isotopes of mass numbers 63 and 65.",steps:["The element's average atomic mass is about 63.55 u, between 63 and 65 and closer to 63.","Atomic number 29 identifies copper."],answer:"Copper (Cu).",concept:"Average atomic mass and isotope mass numbers can identify an element."},
    "10:b": {prompt:"Complete the proton and neutron counts for the mass-63 and mass-65 isotopes.",steps:["Copper has atomic number 29.","Neutrons = mass number − 29."],answer:"⁶³Cu: 29 protons, 34 neutrons. ⁶⁵Cu: 29 protons, 36 neutrons.",concept:"Isotopes differ in neutron number, not proton number."},
    "10:c": {prompt:"Determine which copper isotope is more abundant in nature and justify the choice.",steps:["Copper's average atomic mass is approximately 63.55 u.","The average is closer to 63 than to 65, so the mass-63 isotope must have the greater abundance."],answer:"⁶³Cu is more abundant because the average atomic mass is closer to 63 u than to 65 u.",concept:"The isotope closer to the weighted average generally has the larger fractional abundance."},
    "11:a": {prompt:"Estimate and calculate the average atomic mass from the six listed isotope abundances.",steps:["Estimate by weighting the mass numbers by their fractional abundances.","Calculate: (154×0.0218)+(155×0.1480)+(156×0.2047)+(157×0.1565)+(158×0.2484)+(160×0.2206).","The weighted sum is approximately 157.34 u."],answer:"Estimate ≈ 157 u; calculator average ≈ 157.34 u.",concept:"Multiply each isotope mass by its fractional abundance and sum all contributions."},
    "11:b": {prompt:"Identify the element with isotopes of mass numbers 154, 155, 156, 157, 158, and 160 at the listed abundances.",steps:["The weighted average is about 157.34 u.","The natural isotope pattern and average atomic mass identify gadolinium."],answer:"Gadolinium (Gd).",concept:"A characteristic isotope-abundance pattern can identify an element."},
    "18:b": {prompt:"Calculate the molar mass if 25.0 g of compound X contains 9.11 × 10²² molecules.",steps:["Convert molecules to moles: n = (9.11 × 10²²)/(6.022 × 10²³) = 0.1513 mol.","Molar mass = mass/moles = 25.0 g/0.1513 mol."],answer:"Molar mass ≈ 165 g mol⁻¹.",concept:"Convert particles to moles using Avogadro's constant, then divide mass by moles."},
    "18:c": {prompt:"Determine the molecular formula from empirical formula C₃H₅N and molar mass ≈ 165 g mol⁻¹.",steps:["Empirical-formula mass of C₃H₅N = 3(12.01)+5(1.008)+14.01 ≈ 55.08 g mol⁻¹.","Molar-mass ratio n = 165/55.08 ≈ 3.","Multiply every empirical-formula subscript by 3."],answer:"Molecular formula = C₉H₁₅N₃.",concept:"The molecular formula is an integer multiple of the empirical formula."},
  ,
    "19:a": {prompt:"Calculate the mass of carbon in the 5.00 g sample from 10.99 g CO₂ produced.",steps:["All carbon in the sample becomes CO₂.","Mass C = 10.99 g CO₂ × (12.01 g C / 44.01 g CO₂) = 3.00 g C."],answer:"3.00 g C.",concept:"Use the mass fraction of carbon in CO₂ to convert product mass to sample carbon mass."},
    "19:b": {prompt:"Calculate the mass of hydrogen in the 5.00 g sample from 6.00 g H₂O produced.",steps:["All hydrogen in the sample becomes H₂O.","Mass H = 6.00 g H₂O × (2.016 g H / 18.015 g H₂O) = 0.672 g H."],answer:"0.672 g H.",concept:"Use the mass fraction of hydrogen in water to determine the sample's hydrogen mass."},
    "19:c": {prompt:"Calculate the mass of oxygen in the original 5.00 g sample.",steps:["The compound contains only C, H, and O.","Mass O = total sample mass − mass C − mass H = 5.00 − 3.00 − 0.672 g."],answer:"Approximately 1.33 g O.",concept:"Find the remaining element's mass by difference."},
    "19:d": {prompt:"Determine the empirical formula from the combustion data.",steps:["Moles: C ≈ 3.00/12.01 = 0.250; H ≈ 0.672/1.008 = 0.667; O ≈ 1.33/16.00 = 0.0831.","Divide by the smallest amount: C:H:O ≈ 3.01:8.02:1."],answer:"C₃H₈O.",concept:"An empirical formula is the simplest whole-number mole ratio of atoms."},
  ,
    "20:b": {prompt:"Calculate the mass of water in 25.00 g of CuSO₄·5H₂O.",steps:["M(CuSO₄) = 159.61 g mol⁻¹; M(5H₂O) = 90.075 g mol⁻¹.","M(CuSO₄·5H₂O) = 249.69 g mol⁻¹; water mass fraction = 90.075/249.69.","Mass water = 25.00 g × 90.075/249.69."],answer:"9.02 g H₂O.",concept:"The water mass fraction follows from the hydrate's formula and molar mass."},
    "22:a": {prompt:"Explain how repeated heating shows all water has been removed from MgSO₄·nH₂O.",steps:["After the second heating the mass is 26.853 g; after the third it is 26.852 g.","The 0.001 g change is effectively constant mass within experimental uncertainty."],answer:"The sample reaches constant mass after repeated heating, indicating that essentially all water has been removed.",concept:"Constant mass after repeated heating is evidence of complete dehydration."},
    "22:b": {prompt:"Calculate the mass of MgSO₄·nH₂O used.",steps:["Subtract the empty container mass from the container-plus-hydrate mass: 28.418 − 25.356 g."],answer:"3.062 g hydrate.",concept:"Subtract the container mass to isolate the sample mass."},
    "22:c": {prompt:"Calculate the mass of water removed from the hydrate.",steps:["Anhydrous MgSO₄ mass = 26.852 − 25.356 = 1.496 g.","Water mass = initial hydrate mass − anhydrous salt mass = 3.062 − 1.496 g."],answer:"1.566 g H₂O.",concept:"Mass lost during heating is the water of hydration."},
    "22:d": {prompt:"Determine n in MgSO₄·nH₂O.",steps:["Moles H₂O = 1.566/18.015 = 0.08693 mol.","Moles MgSO₄ = 1.496/120.37 = 0.01243 mol.","Ratio H₂O:MgSO₄ = 0.08693/0.01243 ≈ 6.99:1."],answer:"n = 7; the hydrate is MgSO₄·7H₂O.",concept:"The hydrate coefficient is the simplest whole-number mole ratio of water to anhydrous salt."},
  },
  "topic-1-4-1-6.pdf": {
    "4": { prompt: "A mixture of CaCO3 and Na2CO3 contains 35.00% Na by mass. Calculate the percentage of Na2CO3 by mass.", steps: ["In Na2CO3, the sodium mass fraction is 2(22.99)/105.99 = 0.4338.", "Only Na2CO3 contributes sodium, so mixture mass fraction of Na2CO3 = 0.3500/0.4338.", "Convert the mass fraction to percent."], answer: "80.7% Na2CO3 by mass", concept: "The measured sodium fraction comes entirely from the sodium-containing component." },
    "5": { prompt: "Na and Mg have valence electrons in the third energy level. Which experiences greater nuclear attraction on its valence electrons?", steps: ["Na and Mg valence electrons occupy the same principal energy level.", "Mg has a greater nuclear charge, while shielding is similar for these adjacent elements.", "The stronger effective attraction is on Mg's valence electrons."], answer: "Mg", concept: "Across a period, increasing effective nuclear charge strengthens attraction to valence electrons." },
    "6": { prompt: "Na's valence electron is in the third energy level and K's is in the fourth. Which has greater attraction to its valence electron?", steps: ["K has an additional occupied energy level, so its valence electron is farther from the nucleus.", "The extra inner shell increases shielding.", "These effects outweigh K's greater proton count for the outer electron."], answer: "Na", concept: "Down a group, greater distance and shielding generally weaken attraction to the valence electron." },
    "10": { prompt: "Circle all listed electron configurations that represent excited states.", steps: ["Compare each configuration with the ground state for the element or ion having the same total electron count.", "1s² 2s² 2p⁵ 3s¹ is excited: one electron is promoted from 2p to 3s relative to Ne.", "1s² 2s¹ 2p² is excited: for five electrons, the ground state is 1s² 2s² 2p¹.", "1s² 2s² 2p⁶ 3s¹ 3p¹ is excited: for twelve electrons, Mg ground state is [Ne] 3s². The other listed configurations are ground states."], answer: "Excited states: 1s² 2s² 2p⁵ 3s¹; 1s² 2s¹ 2p²; and 1s² 2s² 2p⁶ 3s¹ 3p¹.", concept: "An excited state has the correct total electron count but at least one electron occupies a higher-energy arrangement than in the ground state." },
    "11": { prompt: "Write the ground-state electron configurations for Ca²⁺, Fe²⁺, O²⁻, and Fe³⁺.", steps: ["Ca has 20 electrons; Ca²⁺ loses its two 4s electrons and has 18 electrons: [Ar].", "Fe has configuration [Ar] 4s² 3d⁶. Remove the 4s electrons first to form Fe²⁺: [Ar] 3d⁶.", "O has 8 electrons; O²⁻ gains two electrons to reach 10 total, giving 1s² 2s² 2p⁶ = [Ne].", "Fe³⁺ loses one more electron from Fe²⁺, leaving [Ar] 3d⁵."], answer: "Ca²⁺: [Ar]; Fe²⁺: [Ar] 3d⁶; O²⁻: [Ne]; Fe³⁺: [Ar] 3d⁵.", concept: "For transition-metal cations, remove electrons from the highest principal energy level first (4s before 3d); anions gain electrons to fill the valence shell." }
  ,
    "7": {prompt:"Arrange Na, Mg, and K in increasing first-ionization energy.",steps:["K's valence electron is in the fourth shell, farther from the nucleus and more shielded than Na's third-shell electron, so K has the lowest ionization energy.","Na and Mg valence electrons occupy the third shell, but Mg has more protons and a greater effective nuclear attraction.","Therefore Mg requires the most energy to remove a valence electron."],answer:"K < Na < Mg.",concept:"Ionization energy generally increases across a period and decreases down a group."},
    "8": {prompt:"Complete the electron-configuration table for Al, Ca, Fe, As, and Cd.",steps:["The row with [Ne] 3s² 3p¹ is Al (Z = 13): full configuration 1s² 2s² 2p⁶ 3s² 3p¹.","Ca is Z = 20: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s², or [Ar] 4s².","Z = 26 is Fe: [Ar] 4s² 3d⁶. As is Z = 33: [Ar] 4s² 3d¹⁰ 4p³. Cd is Z = 48: [Kr] 5s² 4d¹⁰."],answer:"Al: Z = 13, [Ne] 3s² 3p¹. Ca: Z = 20, [Ar] 4s². Fe: Z = 26, [Ar] 4s² 3d⁶. As: Z = 33, [Ar] 4s² 3d¹⁰ 4p³. Cd: Z = 48, [Kr] 5s² 4d¹⁰.",concept:"Electron configurations fill orbitals in an energy order consistent with the Aufbau principle and periodic-table blocks."},
    "9": {prompt:"Write orbital diagrams for Be, N, O, and Na.",steps:["Be (4 e⁻): 1s and 2s each contain a paired set; 2p is empty.","N (7 e⁻): 1s² 2s² 2p³, with one electron in each of the three 2p orbitals before pairing.","O (8 e⁻): 1s² 2s² 2p⁴, with one 2p orbital paired and two 2p orbitals singly occupied.","Na (11 e⁻): 1s² 2s² 2p⁶ 3s¹."],answer:"Be: 1s [↑↓], 2s [↑↓], 2p [ ][ ][ ]. N: 1s [↑↓], 2s [↑↓], 2p [↑][↑][↑]. O: 1s [↑↓], 2s [↑↓], 2p [↑↓][↑][↑]. Na: 1s [↑↓], 2s [↑↓], 2p [↑↓][↑↓][↑↓], 3s [↑].",concept:"Hund's rule places electrons singly in degenerate orbitals before pairing."},
    "12": {prompt:"Identify which peak in a two-peak PES spectrum represents electrons closer to the nucleus.",steps:["Electrons closer to the nucleus experience stronger electrostatic attraction.","More energy is required to remove these electrons, so they have higher binding energy.","In the usual PES axis convention, higher binding energy is on the left."],answer:"Circle the peak farther to the left (higher binding energy).",concept:"Core electrons have higher binding energies than valence electrons because they are closer to the nucleus and less shielded."},
    "14": {prompt:"Explain why oxygen's 1s electrons have higher binding energy than nitrogen's 1s electrons.",steps:["Oxygen has 8 protons while nitrogen has 7.","The 1s electrons in both atoms are in the same shell and experience similar shielding and average distance.","The greater nuclear charge in O creates a stronger attraction, requiring more energy to remove a 1s electron."],answer:"O has the higher 1s binding energy (52.6 vs 39.6 MJ/mol) because its greater nuclear charge attracts the 1s electrons more strongly.",concept:"PES binding energy reflects how strongly electrons are attracted to the nucleus."},
    "15": {prompt:"Describe where to draw the missing 3p peak on phosphorus's PES spectrum.",steps:["Phosphorus has ground-state configuration [Ne] 3s² 3p³.","The 3p electrons are in the same principal shell as 3s but are less tightly bound, so the 3p peak has lower binding energy and appears to the right of the 3s peak.","The peak's relative height/area should represent three electrons, compared with two in the 3s subshell."],answer:"Draw a 3p peak to the right of the 3s peak, with relative size corresponding to 3 electrons.",concept:"PES peak position indicates binding energy; peak size indicates the number of electrons in a subshell."},
    "1:a": {prompt:"Calculate the mass percentage of NaCl in the 6.17 g mixture.",steps:["Mass percentage = (mass of component ÷ total mixture mass) × 100%.","% NaCl = (2.75 g ÷ 6.17 g) × 100% = 44.57%."],answer:"44.6% NaCl by mass.",concept:"Mixture mass percent is the component mass divided by total mixture mass."},
    "1:b": {prompt:"Calculate the mass percentage of sodium in the NaCl/MgCl₂ mixture.",steps:["Only NaCl contains sodium. Sodium's mass fraction in NaCl is 22.99/58.44 = 0.3932.","Mass Na = 2.75 g × 0.3932 = 1.081 g.","% Na = (1.081 g ÷ 6.17 g) × 100% = 17.52%."],answer:"17.5% Na by mass.",concept:"For an element in a compound, multiply the compound mass by the element's mass fraction."},
    "1:c": {prompt:"Calculate the mass percentage of chlorine in the NaCl/MgCl₂ mixture.",steps:["Chlorine fraction in NaCl = 35.45/58.44 = 0.6066; chlorine mass from NaCl = 2.75 × 0.6066 = 1.668 g.","Chlorine fraction in MgCl₂ = 70.90/95.21 = 0.7447; chlorine mass from MgCl₂ = 3.42 × 0.7447 = 2.547 g.","Total chlorine mass ≈ 4.215 g. Divide by 6.17 g and multiply by 100%."],answer:"68.3% Cl by mass.",concept:"Add the mass of the target element contributed by each compound before dividing by the total mixture mass."},
    "2:a": {prompt:"Calculate the percentage of Ag by mass in pure AgNO₃.",steps:["Molar mass AgNO₃ = 107.87 + 14.01 + 3(16.00) = 169.88 g/mol.","Silver mass fraction = 107.87/169.88 = 0.6349.","Convert the fraction to percent."],answer:"63.5% Ag by mass.",concept:"Element mass percent equals its mass contribution per mole divided by the compound molar mass."},
    "2:b": {prompt:"Choose which mixture could contain 68% Ag by mass: AgNO₃ + AgCl or AgNO₃ + AgBr.",steps:["Pure AgNO₃ contains about 63.5% Ag by mass.","AgCl contains about 75.3% Ag by mass, whereas AgBr contains about 57.4% Ag by mass.","A mixture with AgCl can raise the silver fraction above 63.5%; AgBr would lower it."],answer:"A mixture of AgNO₃ and AgCl.",concept:"The mass percentage of a mixture lies between the percentages of its components."},
    "3:a": {prompt:"Calculate moles of BaSO₄ recovered from 2.36 g.",steps:["Molar mass BaSO₄ = 137.33 + 32.06 + 4(16.00) = 233.39 g/mol.","n = m/M = 2.36 g ÷ 233.39 g mol⁻¹ = 0.01011 mol."],answer:"0.0101 mol BaSO₄.",concept:"Convert precipitate mass to moles using its molar mass."},
    "3:b": {prompt:"Calculate the mass percentage of BaCl₂ in the original 6.75 g mixture.",steps:["BaCl₂ and BaSO₄ are in a 1:1 mole ratio, so n(BaCl₂) = 0.01011 mol.","Molar mass BaCl₂ = 137.33 + 2(35.45) = 208.23 g/mol; mass BaCl₂ = 0.01011 × 208.23 = 2.105 g.","% BaCl₂ = (2.105 g ÷ 6.75 g) × 100%."],answer:"31.2% BaCl₂ by mass.",concept:"A gravimetric precipitate gives the amount of the analyte through the balanced reaction's mole ratio."},
  },
  "topic-1-7-1-8.pdf": {
    "8": { prompt: "Describe how atomic radius and first ionization energy generally change from left to right across a period.", steps: ["Across a period, the number of protons increases while added valence electrons occupy the same principal energy level.", "Shielding does not fully offset the increase in nuclear charge, so effective nuclear charge generally increases.", "The stronger attraction pulls the electron cloud closer and makes an electron harder to remove."], answer: "Atomic radius generally decreases; first ionization energy generally increases.", concept: "Periodic trends follow changes in effective nuclear charge, distance, and shielding; exceptions exist." },
    "9": { prompt: "Describe how atomic radius and first ionization energy generally change down a group.", steps: ["Each step down a group adds an occupied principal energy level.", "The valence electron is farther from the nucleus and experiences greater shielding from inner electrons.", "It is generally easier to remove the valence electron, while the atom's radius increases."], answer: "Atomic radius generally increases; first ionization energy generally decreases.", concept: "Added shells increase distance and shielding down a group." },
    "4:a": { prompt: "Write the complete ground-state electron configurations for Na and Na+.", steps: ["Neutral Na has 11 electrons: 1s² 2s² 2p⁶ 3s¹.", "Na+ has lost the outer 3s electron, leaving 10 electrons.", "The remaining configuration matches neon."], answer: "Na: 1s² 2s² 2p⁶ 3s¹; Na+: 1s² 2s² 2p⁶", concept: "Forming a cation removes electrons; the proton count stays the same." },
    "4:b": { prompt: "Compare the radius of Na with Na+.", steps: ["Na+ has lost its outer 3s electron, so its outer occupied shell is n = 2.", "The same 11-proton nucleus attracts the remaining electrons more strongly per electron after one is removed.", "The cation is smaller than the neutral atom."], answer: "Na+ has the smaller radius.", concept: "Cations are generally smaller than their neutral atoms, especially when the outer shell is removed." },
    "1": { prompt: "Which element, Li or Be, has a smaller atomic radius? Justify using atomic structure.", steps: ["Li and Be are in the same period, so their valence electrons occupy the same principal energy level.", "Be has more protons, increasing effective nuclear attraction across the period.", "The stronger attraction pulls Be's electron cloud closer to the nucleus."], answer: "Be has the smaller atomic radius.", concept: "Across a period, effective nuclear charge generally increases and atomic radius decreases." },
    "2": { prompt: "Which element, Li or Na, has a smaller atomic radius? Justify using atomic structure.", steps: ["Li and Na are in the same group, but Na has one additional occupied principal energy level.", "Na's valence electrons are farther from the nucleus and experience more shielding.", "Therefore Na is larger despite having more protons."], answer: "Li has the smaller atomic radius.", concept: "Atomic radius generally increases down a group because additional shells and shielding dominate." },
    "3": { prompt: "Arrange Li, Be, and Na in order of increasing atomic radius.", steps: ["Be is smaller than Li because effective nuclear charge is greater across period 2.", "Na is larger than Li because Na is one period below Li and has an additional occupied shell.", "Combine the comparisons from Questions 1 and 2."], answer: "Be < Li < Na", concept: "Apply the across-period and down-group trends together." },
    "6:a": { prompt: "Write the complete ground-state electron configurations for F and F−.", steps: ["Neutral F has 9 electrons: fill 1s, 2s, then 2p.", "F− has gained one electron, so it has 10 electrons total.", "Fill the 2p subshell with six electrons for the anion."], answer: "F: 1s² 2s² 2p⁵; F−: 1s² 2s² 2p⁶", concept: "An anion has gained electrons; the nucleus's proton count does not change." },
    "6:b": { prompt: "Which particle, F or F−, has the larger radius? Justify using atomic structure.", steps: ["F− has one more electron than F, but both have the same nine protons.", "The extra electron increases electron–electron repulsion in the same principal shell.", "The electron cloud expands, so F− has the larger radius."], answer: "F− has the larger radius.", concept: "Adding an electron without adding a proton generally expands the anion's electron cloud." },

    "12": { prompt: "Describe the electronegativity trend from left to right across a period.", steps: ["Across a period, effective nuclear charge generally increases.", "Bonding electrons are attracted more strongly as atomic radius generally decreases.", "The trend has exceptions, but the overall periodic pattern is upward across a period."], answer: "Electronegativity generally increases from left to right across a period.", concept: "Electronegativity describes an atom's tendency to attract shared bonding electrons." },
    "14": { prompt: "Give the number of valence electrons for Li, Be, B, C, N, O, F, and Ne.", steps: ["For these main-group elements, the group position identifies the valence-electron count.", "Across Period 2, the count increases from one for Li to eight for Ne."], answer: "Li 1; Be 2; B 3; C 4; N 5; O 6; F 7; Ne 8.", concept: "Main-group valence-electron counts track the periodic-table group." },
    "13": { prompt: "Complete: The smaller the atomic radius is, the ___ the electronegativity value is.", steps: ["A smaller radius generally means bonding electrons are closer to the nucleus.", "A stronger effective nuclear attraction tends to pull shared bonding electrons more strongly."], answer: "Smaller radius → higher electronegativity; larger radius → lower electronegativity.", concept: "Electronegativity generally increases as atomic radius decreases, especially across a period." }
  ,
    "11": {prompt:"Determine the number of valence electrons in element X from its successive ionization energies.",steps:["The first four ionization energies increase moderately from 1087 to 6223 kJ mol⁻¹.","There is a very large jump from IE₄ = 6223 to IE₅ = 37,831 kJ mol⁻¹.","After four valence electrons are removed, the next electron is a much more tightly bound core electron."],answer:"Element X has 4 valence electrons.",concept:"The large jump in successive ionization energy identifies when core-electron removal begins."},
    "15": {prompt:"Give the expected monoatomic ion charges for Li, Be, B, C, N, O, F, and Ne using the introductory octet model.",steps:["Main-group metals on the left lose valence electrons: Li loses one, Be two, and B is commonly assigned +3 in the simplified charge-prediction model.","Group 14 elements are often assigned ±4 in the simplified octet model; group 15, 16, and 17 nonmetals gain 3, 2, and 1 electrons, respectively.","Ne already has a full valence shell and does not normally form a monoatomic ion."],answer:"Li⁺, Be²⁺, B³⁺, C⁴⁻ (simplified octet prediction), N³⁻, O²⁻, F⁻; Ne: N/A. Note: isolated B³⁺ and C⁴⁻ ions are not generally stable in ordinary aqueous chemistry; this is the simplified charge-pattern model.",concept:"Main-group ion-charge predictions follow the number of electrons lost or gained to reach a noble-gas configuration."},
    "16": {prompt:"Write formulas for binary ionic compounds formed by Li/F, Na/S, Mg/Cl, Al/O, and Ca/P.",steps:["Balance total positive and negative charge to zero for each empirical formula.","Li⁺ and F⁻ combine 1:1; Na⁺ and S²⁻ require two Na⁺ per S²⁻.","Mg²⁺ and Cl⁻ require two Cl⁻ per Mg²⁺; Al³⁺ and O²⁻ balance at 2:3; Ca²⁺ and P³⁻ balance at 3:2."],answer:"LiF; Na₂S; MgCl₂; Al₂O₃; Ca₃P₂.",concept:"Ionic formulas use the lowest whole-number ratio that makes the total charge zero."},
    "5:a": {prompt:"Write ground-state electron configurations for Fe²⁺ and Fe³⁺.",steps:["Neutral Fe is [Ar] 4s² 3d⁶.","For transition-metal cations, remove 4s electrons before 3d electrons.","Fe²⁺ loses both 4s electrons; Fe³⁺ loses one additional 3d electron."],answer:"Fe²⁺: [Ar] 3d⁶. Fe³⁺: [Ar] 3d⁵.",concept:"Transition-metal cations lose valence s electrons before d electrons."},
    "5:b": {prompt:"Explain why Fe²⁺ has a larger ionic radius than Fe³⁺.",steps:["Both ions have 26 protons, but Fe³⁺ has one fewer electron than Fe²⁺.","With fewer electrons, electron–electron repulsion is reduced and the effective nuclear attraction per remaining electron is greater.","The electron cloud contracts more in Fe³⁺."],answer:"Fe²⁺ is larger because Fe³⁺ has a greater positive charge with the same nuclear charge and fewer electrons, so its remaining electrons are pulled closer to the nucleus.",concept:"For ions of the same element, increasing positive charge generally decreases ionic radius."},
    "7:a": {prompt:"Arrange K⁺, Ca²⁺, S²⁻, and Cl⁻ in increasing ionic radius.",steps:["All four ions have 18 electrons, so they are isoelectronic.","Among isoelectronic ions, more protons exert a stronger attraction and produce a smaller radius.","Nuclear charges rank Ca²⁺ (20) > K⁺ (19) > Cl⁻ (17) > S²⁻ (16)."],answer:"Ca²⁺ < K⁺ < Cl⁻ < S²⁻.",concept:"For an isoelectronic series, ionic radius decreases as nuclear charge increases."},
    "7:b": {prompt:"Justify the ionic-radius order for K⁺, Ca²⁺, S²⁻, and Cl⁻.",steps:["Each ion has the same number of electrons, so shielding and electron–electron repulsion are broadly comparable.","Ca²⁺ has the most protons and pulls its electron cloud most strongly; S²⁻ has the fewest protons and pulls least strongly."],answer:"Because the ions are isoelectronic, the ion with more protons has a smaller radius. Thus Ca²⁺ is smallest and S²⁻ is largest.",concept:"Compare nuclear charge when electron counts are the same."},
    "10:a": {prompt:"Explain why successive ionization energies increase as electrons are removed.",steps:["After each electron is removed, the ion becomes more positively charged while the number of protons stays constant.","The remaining electrons experience stronger net attraction to the nucleus and less electron–electron repulsion.","Removing the next electron therefore requires more energy."],answer:"Successive ionization energies increase because each removal makes the ion more positive, increasing the attraction between the nucleus and the remaining electrons.",concept:"Ionization energy depends on the electrostatic attraction between the nucleus and the electron being removed."},
    "10:b": {prompt:"Explain why the second ionization energy of Na is much greater than that of Mg.",steps:["Na loses its single 3s valence electron in the first ionization, forming Na⁺ with the stable [Ne] configuration.","A second electron from Na⁺ must be removed from the n = 2 core shell.","Mg⁺ still has a 3s valence electron after its first ionization, so its second ionization removes a more distant valence electron."],answer:"The second electron removed from Na⁺ is a tightly bound core electron, whereas the second electron removed from Mg⁺ is still a 3s valence electron; therefore IE₂(Na) is much larger.",concept:"A very large jump in successive ionization energy occurs when removal begins from a lower, core energy level."},
  },
  "topic-2-7.pdf": {
    "1": { prompt: "Determine Lewis structures, molecular geometry, and bond angles for CO2, NO2+, and HCN.", steps: ["CO2: O=C=O; carbon has two electron domains and no lone pairs.", "NO2+: [O=N=O]+; nitrogen has two electron domains and no lone pair.", "HCN: H−C≡N; carbon has two electron domains. All three central atoms have linear geometry."], answer: "CO2, NO2+, and HCN are linear, with bond angles of approximately 180°.", concept: "Two electron domains around the central atom produce a linear arrangement." },
    "2": { prompt: "Draw Lewis structures and determine molecular geometry and bond angles for BF3, SO3, and NO3−.", steps: ["BF3: put B in the center with three single B−F bonds; each F has three lone pairs. B has an incomplete octet (six electrons).", "SO3: place S in the center with three S−O bonding regions. Resonance descriptions give three equivalent S−O bonds in the trigonal-planar molecule.", "NO3−: draw N in the center with one N=O bond and two N−O− bonds in a bracket with overall −1 charge. There are three equivalent resonance forms, so the N−O bonds are equivalent in the resonance hybrid.", "Each central atom has three bonding domains and no lone pairs, so the domains lie in one plane."], answer: "BF3, SO3, and NO3− are trigonal planar, with bond angles near 120°.", concept: "Three electron domains and no central lone pair give trigonal-planar geometry; resonance distributes bonding and charge across equivalent positions." },
    "3": { prompt: "Draw Lewis structures and determine molecular geometry for CF4, NH4+, and SO42−.", steps: ["CF4: place C in the center with four single C−F bonds; each F has three lone pairs and C has no lone pairs.", "NH4+: place N in the center with four single N−H bonds, enclose the ion in brackets with a + charge, and give N no lone pair.", "SO42−: place S in the center bonded to four O atoms and enclose the ion in brackets with a 2− charge. A common resonance representation has two S=O bonds and two S−O− bonds; equivalent resonance forms delocalize the bonding and charge.", "Each central atom has four bonding domains and no lone pairs, producing tetrahedral molecular geometry."], answer: "CF4, NH4+, and SO42− are tetrahedral, with ideal bond angles near 109.5°.", concept: "Four bonding domains and no central lone pairs give tetrahedral geometry; resonance descriptions represent delocalized bonding in polyatomic ions." },
    "4": { prompt: "Draw PF5 and predict its molecular geometry.", steps: ["Count 40 valence electrons: P contributes 5 and five F atoms contribute 35.", "Place P in the center with five single P−F bonds and complete each F octet.", "Five bonding domains and no lone pairs around P give a trigonal-bipyramidal arrangement."], answer: "PF5 is trigonal bipyramidal; ideal angles are about 90°, 120°, and 180°.", concept: "Five electron domains adopt a trigonal-bipyramidal geometry." },
    "5": { prompt: "Draw SF6 and predict its molecular geometry.", steps: ["Count 48 valence electrons: S contributes 6 and six F atoms contribute 42.", "Place S in the center with six single S−F bonds and complete each F octet.", "Six bonding domains and no lone pairs around S give an octahedral arrangement."], answer: "SF6 is octahedral, with ideal angles of 90° and 180°.", concept: "Six electron domains adopt an octahedral geometry." },
    "8": { prompt: "Arrange CH4, NH3, and H2O from smallest bond angle to largest.", steps: ["Each central atom has four electron domains, giving a tetrahedral electron-domain arrangement.", "CH4 has no lone pairs, NH3 has one, and H2O has two.", "Lone pairs repel bonding pairs more strongly and compress bond angles as their number increases."], answer: "H2O (~104.5°) < NH3 (~107°) < CH4 (~109.5°).", concept: "VSEPR predicts that lone-pair repulsion compresses adjacent bond angles." }
  ,
    "6": {prompt:"Complete the molecular-geometry table for molecules with lone pairs on the central atom.",steps:["2 bonding domains + 1 lone pair (3 domains total): bent.","3 bonding + 1 lone pair (4 total): trigonal pyramidal; 2 bonding + 2 lone pairs (4 total): bent.","4 bonding + 1 lone pair (5 total): seesaw; 3 bonding + 2 lone pairs (5 total): T-shaped; 2 bonding + 3 lone pairs (5 total): linear.","5 bonding + 1 lone pair (6 total): square pyramidal; 4 bonding + 2 lone pairs (6 total): square planar."],answer:"In table order: bent; trigonal pyramidal; bent; seesaw; T-shaped; linear; square pyramidal; square planar.",concept:"Molecular geometry is determined by the positions of atoms after accounting for lone pairs in the electron-domain geometry."},
    "7": {prompt:"Match example molecules to the listed electron-domain counts and molecular geometries.",steps:["2 domains, linear: CO₂. 3 domains, trigonal planar: SO₃. 2 bonding + 1 lone pair, bent: SO₂.","4 domains, tetrahedral: CF₄. 3 bonding + 1 lone pair, trigonal pyramidal: PF₃. 2 bonding + 2 lone pairs, bent: SF₂.","5 domains: PF₅ trigonal bipyramidal; SF₄ seesaw; ClF₃ T-shaped; XeF₂ linear.","6 domains: SF₆ octahedral; BrF₅ square pyramidal; XeF₄ square planar."],answer:"Linear CO₂; trigonal planar SO₃; bent SO₂; tetrahedral CF₄; trigonal pyramidal PF₃; bent SF₂; trigonal bipyramidal PF₅; seesaw SF₄; T-shaped ClF₃; linear XeF₂; octahedral SF₆; square pyramidal BrF₅; square planar XeF₄.",concept:"The number of electron domains sets the electron-domain geometry; lone pairs change the observed molecular shape."},
    "9": {prompt:"Determine molecular shape and polarity for the listed molecules.",steps:["CO₂: linear, nonpolar (equal bond dipoles cancel). HCN: linear, polar (different terminal atoms). BF₃: trigonal planar, nonpolar (symmetric).","CCl₂O: trigonal planar, polar. SO₂: bent, polar. CF₄: tetrahedral, nonpolar. CH₂F₂: tetrahedral, polar.","NH₃: trigonal pyramidal, polar. H₂O: bent, polar. PF₅: trigonal bipyramidal, nonpolar. PF₄Cl: trigonal bipyramidal, polar because replacing one F with Cl breaks dipole symmetry.","SF₄: seesaw, polar. ClF₃: T-shaped, polar. XeF₂: linear, nonpolar. SF₆: octahedral, nonpolar. BrF₅: square pyramidal, polar. XeF₄: square planar, nonpolar."],answer:"CO₂ linear/nonpolar; HCN linear/polar; BF₃ trigonal planar/nonpolar; CCl₂O trigonal planar/polar; SO₂ bent/polar; CF₄ tetrahedral/nonpolar; CH₂F₂ tetrahedral/polar; NH₃ trigonal pyramidal/polar; H₂O bent/polar; PF₅ trigonal bipyramidal/nonpolar; PF₄Cl trigonal bipyramidal/polar; SF₄ seesaw/polar; ClF₃ T-shaped/polar; XeF₂ linear/nonpolar; SF₆ octahedral/nonpolar; BrF₅ square pyramidal/polar; XeF₄ square planar/nonpolar.",concept:"Polarity depends on the vector sum of bond dipoles, so geometry and substituent symmetry both matter."},
    "10": {prompt:"Identify the hybridization of the central atom in each listed substance.",steps:["Two electron domains → sp: BeF₂, CO₂, NO₂⁺.","Three domains → sp²: BF₃, SO₂, NO₂⁻, NO₃⁻.","Four domains → sp³: NH₃, NH₄⁺, CF₄, SF₂, H₂O."],answer:"BeF₂ sp; CO₂ sp; NH₃ sp³; NO₂⁺ sp; BF₃ sp²; SO₂ sp²; NH₄⁺ sp³; NO₂⁻ sp²; CF₄ sp³; SF₂ sp³; H₂O sp³; NO₃⁻ sp².",concept:"Hybridization is associated with the number of electron domains around the central atom."},
    "1:a": {prompt:"Draw Lewis structures for CO₂, NO₂⁺, and HCN.",steps:["CO₂: O=C=O; each O has two lone pairs.","NO₂⁺ has 16 valence electrons and is O=N=O, with two N=O double bonds and no lone pair on N.","HCN is H–C≡N, with one lone pair on N."],answer:"CO₂: O=C=O. NO₂⁺: [O=N=O]⁺. HCN: H–C≡N.",concept:"Count valence electrons and choose bonding that satisfies octets while matching the overall charge."},
    "1:b": {prompt:"Give the molecular geometry and ideal bond angle for CO₂, NO₂⁺, and HCN.",steps:["Each central atom has two electron domains and no lone pairs.","Two domains arrange 180° apart."],answer:"All three are linear with ideal bond angle 180°.",concept:"Two electron domains around a central atom give a linear arrangement and sp hybridization."},
    "2:a": {prompt:"Draw Lewis structures for BF₃, SO₃, and NO₃⁻.",steps:["BF₃: B central with three B–F single bonds; each F has three lone pairs and B has six electrons.","SO₃: S central with three S=O double bonds in an expanded-octet representation.","NO₃⁻: three equivalent resonance contributors, each with one N=O and two N–O⁻ bonds; bracket the ion with −1."],answer:"BF₃: three B–F single bonds. SO₃: three S=O bonds. NO₃⁻: three equivalent resonance contributors with one N=O and two N–O⁻ bonds.",concept:"Period 2 boron can have an incomplete octet; period 3 sulfur can be represented with an expanded octet."},
    "2:b": {prompt:"Give the molecular geometry and ideal bond angle for BF₃, SO₃, and NO₃⁻.",steps:["Each central atom has three electron domains and no lone pairs.","Three domains spread into a trigonal-planar arrangement."],answer:"All are trigonal planar with ideal bond angles of 120°.",concept:"Three electron domains and zero central lone pairs produce trigonal-planar geometry."},
    "3:a": {prompt:"Draw Lewis structures for CF₄, NH₄⁺, and SO₄²⁻.",steps:["CF₄: C has four C–F single bonds; each F has three lone pairs.","NH₄⁺: N has four N–H single bonds and no lone pairs; put brackets around the ion with +1 charge.","SO₄²⁻ can be drawn with two S=O and two S–O⁻ bonds; six equivalent resonance contributors distribute the double bonds among the four oxygens."],answer:"CF₄ has four C–F single bonds; NH₄⁺ has four N–H single bonds and overall +1; SO₄²⁻ has a tetrahedral arrangement with resonance-delocalized S–O bonding and overall −2.",concept:"Lewis structures must account for total valence electrons, formal charges, and resonance where applicable."},
    "3:b": {prompt:"Give the molecular geometry and ideal bond angle for CF₄, NH₄⁺, and SO₄²⁻.",steps:["Each central atom has four bonding domains and no lone pairs.","Four domains arrange tetrahedrally."],answer:"All are tetrahedral with ideal bond angles of approximately 109.5°.",concept:"Four electron domains and zero lone pairs produce tetrahedral molecular geometry."},
    "4:a": {prompt:"Draw the Lewis structure of PF₅.",steps:["P is the central atom with five P–F single bonds.","Each F has three lone pairs; P has no lone pairs and an expanded octet of ten bonding electrons."],answer:"PF₅ has five P–F single bonds around P; each F has three lone pairs.",concept:"Period 3 central atoms can form hypervalent structures."},
    "4:b": {prompt:"Give the geometry and bond angles of PF₅.",steps:["P has five bonding domains and no lone pairs.","Five domains form a trigonal-bipyramidal arrangement with three equatorial positions and two axial positions."],answer:"Trigonal bipyramidal; ideal bond angles are 90° and 120° (and 180° between the two axial bonds).",concept:"Five electron domains produce trigonal-bipyramidal geometry."},
    "5:a": {prompt:"Draw the Lewis structure of SF₆.",steps:["S is central and forms six S–F single bonds.","Each F has three lone pairs; S has no lone pairs and an expanded octet."],answer:"SF₆ has six S–F single bonds around S; each F has three lone pairs.",concept:"Six bonding domains around a period 3 central atom are possible in an expanded-octet model."},
    "5:b": {prompt:"Give the geometry and bond angle of SF₆.",steps:["S has six bonding domains and no lone pairs.","Six domains point toward the vertices of an octahedron."],answer:"Octahedral, with ideal adjacent F–S–F bond angles of 90° (opposite positions are 180°).",concept:"Six electron domains and no lone pairs produce octahedral geometry."},
  },
  "topic-3-1.pdf": {
    "14:b": { prompt: "Explain why CH3F cannot form a hydrogen-bonding attraction with another CH3F molecule.", steps: ["Conventional hydrogen bonding requires H to be directly bonded to N, O, or F in the donor molecule.", "In CH3F, the hydrogens are bonded to carbon, not fluorine.", "The fluorine atom has lone pairs and can accept a hydrogen bond from a suitable donor, but CH3F does not provide the required N−H, O−H, or F−H donor bond to another CH3F molecule."], answer: "CH3F molecules cannot hydrogen-bond to each other because their H atoms are bonded to carbon, not directly to F.", concept: "A molecule's electronegative atom alone does not make it a hydrogen-bond donor; the hydrogen must be bonded directly to N, O, or F." },
    "6": { prompt: "Explain why CF4 has a higher boiling point than CH4.", steps: ["Both molecules are nonpolar, so London dispersion forces are the dominant intermolecular attraction.", "CF4 has a larger electron cloud and more electrons than CH4, making it more polarizable.", "Stronger dispersion forces require more energy to separate CF4 molecules."], answer: "CF4 has stronger London dispersion forces because its electron cloud is larger and more polarizable.", concept: "For nonpolar molecules, greater polarizability generally strengthens dispersion forces and raises boiling point." },
    "7": { prompt: "Explain why acetone, (CH3)2CO, has a higher boiling point than CF4.", steps: ["CF4 is nonpolar, so its molecules attract mainly through London dispersion forces.", "Acetone has a polar carbonyl group, giving its molecules permanent dipoles and dipole–dipole attractions.", "Those stronger intermolecular attractions help explain acetone's higher boiling point despite CF4's larger molar mass."], answer: "Acetone's dipole–dipole attractions, in addition to dispersion forces, are stronger overall than the attractions between nonpolar CF4 molecules.", concept: "Boiling point depends on total intermolecular attraction, not molar mass alone." },
    "16": { prompt: "Explain why NH4+ can be a hydrogen-bond donor but not a hydrogen-bond acceptor.", steps: ["NH4+ has N−H bonds, so its hydrogen atoms can participate as hydrogen-bond donors.", "Nitrogen has four N−H bonds and no available lone pair in NH4+.", "A hydrogen-bond acceptor needs an available lone pair or another suitable electron-rich site."], answer: "NH4+ can donate hydrogen bonds through its N−H bonds but cannot accept them because it has no available nitrogen lone pair.", concept: "Hydrogen-bond donation involves an H attached to an electronegative atom; acceptance requires an available electron pair." },
    "17": { prompt: "Explain why NCl3 can be a hydrogen-bond acceptor but not a hydrogen-bond donor.", steps: ["Nitrogen in NCl3 has a lone pair that can accept a hydrogen bond.", "NCl3 contains no N−H, O−H, or F−H bond.", "Without an H attached to a strongly electronegative atom, it cannot donate a conventional hydrogen bond."], answer: "NCl3 can accept through the nitrogen lone pair but cannot donate because it has no suitable bonded hydrogen.", concept: "Identify both the lone pair required for acceptance and the donor hydrogen required for donation." },
    "18": { prompt: "Explain why NH2Cl can behave as both a hydrogen-bond donor and acceptor.", steps: ["NH2Cl contains N−H bonds, so it has hydrogen atoms that can donate hydrogen bonds.", "Nitrogen also has a lone pair available to accept a hydrogen bond.", "It therefore has the structural features needed for both roles."], answer: "NH2Cl can donate through its N−H bonds and accept through the nitrogen lone pair.", concept: "A molecule can be both a hydrogen-bond donor and acceptor if it has a suitable bonded hydrogen and an available lone pair." }
  ,
    "3": {prompt:"Identify which liquid has the strongest intermolecular forces: methane, CF₄, or acetone.",steps:["Methane boils at 112 K, CF₄ at 145 K, and acetone at 329 K.","A higher boiling point indicates more energy is needed to separate molecules, reflecting stronger net intermolecular attractions.","Acetone is polar and experiences dipole–dipole forces in addition to dispersion forces."],answer:"Acetone has the strongest net intermolecular attractions because it has the highest boiling point (329 K).",concept:"Boiling-point data provide experimental evidence about the strength of intermolecular forces."},
    "4": {prompt:"Explain the boiling-point trends for Ne, Ar, Kr, Xe and for F₂, Cl₂, Br₂, I₂.",steps:["Both series are nonpolar, so London dispersion forces dominate.","Down each group, the electron cloud becomes larger and more polarizable as electron count increases.","Temporary dipoles become stronger, so more energy is required to separate particles."],answer:"Boiling point increases down each series because larger, more polarizable atoms/molecules experience stronger London dispersion forces.",concept:"London dispersion forces increase with electron-cloud size and polarizability."},
    "5": {prompt:"Explain why pentane boils at 309 K while 2,2-dimethylpropane boils at 283 K.",steps:["Both substances are nonpolar C₅H₁₂ isomers, so London dispersion forces dominate.","Straight-chain pentane has greater surface/contact area between molecules than compact, highly branched 2,2-dimethylpropane.","Greater contact area strengthens dispersion attractions."],answer:"Pentane has the higher boiling point because its less-branched shape allows more intermolecular contact and stronger London dispersion forces.",concept:"Molecular shape affects the contact area and strength of dispersion forces."},
    "11": {prompt:"Identify the intermolecular forces in Br₂ and BrCl and explain their boiling-point difference.",steps:["Br₂ is nonpolar, so it experiences London dispersion forces only.","BrCl is polar, so it experiences dispersion and dipole–dipole forces.","Br₂ has the higher boiling point (332 K versus 278 K), indicating stronger net attractions; its electron cloud is more polarizable, strengthening dispersion forces."],answer:"Br₂: dispersion only. BrCl: dispersion and dipole–dipole. Br₂ boils higher because its stronger dispersion forces outweigh the added dipole–dipole contribution in BrCl.",concept:"A polar molecule does not always have a higher boiling point than a nonpolar molecule of similar size."},
    "12": {prompt:"Explain the boiling-point trend from CH₄ to SiH₄, GeH₄, and SnH₄.",steps:["These group-14 hydrides are tetrahedral and nonpolar, so London dispersion forces dominate.","Down the group, molar mass, electron count, and electron-cloud size increase.","Greater polarizability strengthens dispersion forces and raises the boiling point."],answer:"Boiling point increases CH₄ < SiH₄ < GeH₄ < SnH₄ because dispersion forces strengthen as the electron cloud becomes larger and more polarizable.",concept:"Larger nonpolar molecules generally have stronger London dispersion forces."},
    "13": {prompt:"Choose three substances with relatively small electron clouds but unusually high boiling points within their sets.",steps:["Compare each hydride with the other members of its set.","NH₃, H₂O, and HF have relatively small electron clouds, yet their boiling points are elevated by hydrogen bonding.","The corresponding heavier hydrides lack the same strong hydrogen-bonding interactions."],answer:"NH₃, H₂O, and HF.",concept:"Hydrogen bonding can produce an unusually high boiling point despite a relatively small electron cloud."},
    "15": {prompt:"Draw the Lewis structures for the two C₂H₆O compounds, one that cannot hydrogen-bond to itself and one that can.",steps:["Compound 1 has the lower boiling point (249 K) and cannot donate hydrogen bonds: it is dimethyl ether, CH₃–O–CH₃.","Compound 2 has the higher boiling point (351 K) and can donate hydrogen bonds: it is ethanol, CH₃–CH₂–O–H.","Draw two lone pairs on the oxygen in each structure; ethanol has an O–H bond, while dimethyl ether does not."],answer:"Compound 1: CH₃–O–CH₃ (dimethyl ether). Compound 2: CH₃–CH₂–OH (ethanol).",concept:"A molecule needs an O–H, N–H, or F–H bond to act as a hydrogen-bond donor."},
    "19": {prompt:"Explain what makes a correct hydrogen-bond diagram and how to correct an incorrect one.",steps:["A hydrogen bond is drawn as a dashed attraction from H already covalently bonded to N, O, or F to a lone-pair-bearing N, O, or F on another molecule/region.","Do not draw the dashed line between two heavy atoms without the donor hydrogen, or from a hydrogen attached to carbon."],answer:"Draw the dashed line as X–H···Y, where X and Y are N, O, or F and Y has a lone pair; the H must be covalently bonded to X.",concept:"Hydrogen bonding requires a specific donor X–H and acceptor lone pair, not merely two polar atoms."},
    "20": {prompt:"Draw the two hydrogen bonds between adenine and thymine in DNA.",steps:["Adenine and thymine form two hydrogen bonds in the standard A–T base pair.","Thymine's N–H donates to adenine's N1 lone pair; adenine's exocyclic N6–H donates to thymine's O4."],answer:"Draw two dashed lines: thymine N3–H···N1 adenine, and adenine N6–H···O4 thymine.",concept:"Hydrogen bonds in biomolecules form between suitable N–H donors and N/O acceptors."},
    "21": {prompt:"Identify the ion with the strongest ion–dipole attraction to water.",steps:["Ion–dipole attraction increases with larger charge magnitude and smaller ionic radius.","S²⁻ and Te²⁻ have charge magnitude 2, greater than the monovalent halides; S²⁻ is much smaller than Te²⁻ (170 versus 207 pm)."],answer:"S²⁻ has the strongest expected ion–dipole interactions with water.",concept:"Coulombic attraction is stronger for greater ionic charge and shorter separation."},
    "22": {prompt:"Describe the orientation of three water molecules around Na⁺ and three around Cl⁻.",steps:["Water has a partial negative charge at O and partial positive charges at H.","Around Na⁺, orient the Oδ⁻ end of each H₂O toward the cation and the H atoms away.","Around Cl⁻, orient the Hδ⁺ ends toward the anion and the O atom away."],answer:"Na⁺: water oxygen atoms point inward. Cl⁻: water hydrogen atoms point inward. Draw three waters around each ion with those orientations.",concept:"Ion–dipole attractions align the oppositely charged end of a polar molecule toward the ion."},
    "1:a": {prompt:"Identify an intramolecular attractive force in a water molecule.",steps:["Intramolecular forces hold atoms together within a molecule.","In H₂O, each O–H bond is a covalent bond within one molecule."],answer:"Circle an O–H covalent bond within one water molecule.",concept:"Intramolecular bonds connect atoms inside a molecule."},
    "1:b": {prompt:"Identify an intermolecular attractive force between water molecules.",steps:["Intermolecular forces act between separate molecules.","Water molecules attract through hydrogen bonding: the δ⁺ H of one molecule is attracted to a lone pair/δ⁻ O of another."],answer:"Draw an arrow between the H of one H₂O molecule and the O of a neighboring H₂O molecule (a hydrogen bond).",concept:"Hydrogen bonding is an intermolecular attraction between water molecules."},
    "2:a": {prompt:"Choose the particle diagram for water vapor formed by boiling liquid water.",steps:["Evaporation overcomes attractions between intact H₂O molecules.","The O–H covalent bonds remain intact; the gas contains separate H₂O molecules, not separate H and O atoms."],answer:"Choose the diagram showing intact H₂O molecules far apart from one another.",concept:"A phase change separates molecules but does not ordinarily break their covalent bonds."},
    "2:b": {prompt:"Identify which attractive forces are broken when water evaporates.",steps:["The water molecules remain H₂O after evaporation.","The attractions overcome during boiling are between separate molecules."],answer:"Intermolecular attractive forces are overcome; intramolecular O–H bonds remain intact.",concept:"Boiling is a physical change involving intermolecular attractions."},
    "9:a": {prompt:"Identify intermolecular forces in CCl₄ and HCl.",steps:["CCl₄ is tetrahedral and symmetric, so its bond dipoles cancel; it is nonpolar.","HCl is polar because Cl is more electronegative than H."],answer:"CCl₄: London dispersion forces only. HCl: London dispersion and dipole–dipole forces.",concept:"All molecules experience dispersion; polar molecules also experience dipole–dipole attractions."},
    "9:b": {prompt:"Which has the higher boiling point, CCl₄ or HCl, based on the observation at 340 K?",steps:["At 340 K, CCl₄ has condensed but HCl remains gaseous.","A substance that condenses at the higher temperature has the higher boiling point."],answer:"CCl₄ has the higher boiling point.",concept:"The observed phase at a known temperature gives a direct comparison of boiling points."},
    "9:c": {prompt:"Which has stronger intermolecular attractions, CCl₄ or HCl?",steps:["CCl₄ has a much larger, more polarizable electron cloud than HCl.","Its dispersion forces are strong enough to outweigh the additional dipole–dipole forces in small HCl, consistent with the higher observed boiling point."],answer:"CCl₄ has stronger net intermolecular attractions, as shown by its higher boiling point.",concept:"Use experimental data when polar/nonpolar labels alone do not predict net force strength."},
    "10:a": {prompt:"Identify intermolecular forces in CS₂ and COS.",steps:["CS₂ is linear and symmetric, so it is nonpolar.","COS is linear but has different terminal atoms, so its bond dipoles do not cancel and it is polar."],answer:"CS₂: London dispersion forces only. COS: London dispersion and dipole–dipole forces.",concept:"Molecular symmetry determines whether bond dipoles cancel."},
    "10:b": {prompt:"Which has stronger net intermolecular attractions, CS₂ or COS?",steps:["CS₂ boils at 319 K, while COS boils at 223 K.","The higher boiling point of CS₂ indicates stronger net attractions; its larger/more polarizable electron cloud gives strong dispersion forces."],answer:"CS₂ has stronger net intermolecular attractions, based on its higher boiling point.",concept:"Experimental boiling points account for all intermolecular forces together."},
    "14:a": {prompt:"Show how two HF molecules form a hydrogen bond.",steps:["F is δ⁻ and H bonded to F is δ⁺.","The hydrogen bond is an attraction from the F of one molecule to the H covalently bonded to F in another molecule."],answer:"Draw F–H···F–H, using a dashed line from F on one HF molecule to H on the other.",concept:"Hydrogen bonding requires H covalently bonded to N, O, or F and a lone pair on a nearby N, O, or F."},
    "23:a": {prompt:"Identify intermolecular forces in ethane, formaldehyde, and methanol.",steps:["Ethane (C₂H₆) is nonpolar, so it has dispersion forces only.","Formaldehyde (CH₂O) is polar because of its C=O bond and molecular dipole, so it has dispersion and dipole–dipole forces.","Methanol (CH₃OH) is polar and has an O–H bond, so it has dispersion, dipole–dipole, and hydrogen-bonding forces."],answer:"Ethane: London dispersion. Formaldehyde: London dispersion + dipole–dipole. Methanol: London dispersion + dipole–dipole + hydrogen bonding.",concept:"All molecules have dispersion forces; polarity and X–H bonds add other interactions."},
    "23:b": {prompt:"Explain the boiling-point order ethane (185 K), formaldehyde (254 K), and methanol (338 K).",steps:["Ethane is nonpolar and has only dispersion forces, so it has the lowest boiling point.","Polar formaldehyde also has dipole–dipole attractions, raising its boiling point.","Methanol forms hydrogen bonds in addition to dispersion and dipole–dipole attractions, giving the highest boiling point."],answer:"Boiling point increases ethane < formaldehyde < methanol because the net intermolecular attractions become progressively stronger.",concept:"Stronger intermolecular attractions require more energy to separate molecules during boiling."},
  },
  "topic-3-2-3-4.pdf": {
    "5": { prompt: "Explain why melting diamond breaks covalent bonds, whereas melting solid water does not break O−H covalent bonds.", steps: ["Diamond is a network-covalent solid: carbon atoms are connected throughout the solid by covalent bonds.", "Melting diamond requires disrupting the extended covalent network.", "Ice is a molecular solid; melting mainly disrupts intermolecular attractions between water molecules while leaving each molecule's O−H bonds intact."], answer: "Diamond's solid structure is a covalent network, while ice is held together between molecules largely by hydrogen bonding.", concept: "Distinguish intramolecular covalent bonds from intermolecular attractions." },
    "10": { prompt: "A gas has density 1.31 g/L at 1.00 atm and 25.0°C. Calculate its molar mass and suggest an identity.", steps: ["Use the ideal-gas density relationship M = dRT/P.", "M = (1.31 g/L)(0.08206 L·atm·mol⁻¹·K⁻¹)(298.15 K)/(1.00 atm) ≈ 32.1 g/mol.", "Compare the result with common gas molar masses."], answer: "M ≈ 32.1 g/mol; O2 is a plausible identity.", concept: "Combine PV = nRT with density = mass/volume to obtain M = dRT/P." },
    "11": { prompt: "A mixture contains 14.0 g N2 and 32.0 g O2 at total pressure 1200 torr. Calculate each partial pressure.", steps: ["n(N2) = 14.0/28.02 ≈ 0.500 mol; n(O2) = 32.0/32.00 = 1.00 mol.", "Total amount ≈ 1.50 mol, so mole fractions are x(N2) ≈ 1/3 and x(O2) ≈ 2/3.", "Use Dalton's law: partial pressure = mole fraction × total pressure."], answer: "P(N2) ≈ 400 torr; P(O2) ≈ 800 torr.", concept: "For ideal gas mixtures, each gas's partial pressure is its mole fraction times total pressure." }

,
    "1": { prompt: "Explain why water's vapor pressure increases as its temperature increases.", steps: ["Increasing temperature raises the average kinetic energy of the water molecules.", "A larger fraction of molecules at the liquid surface have enough energy to overcome intermolecular attractions and enter the vapor phase.", "At the new dynamic equilibrium, more water is present in the vapor phase, producing a higher vapor pressure."], answer: "Higher temperature gives more molecules enough kinetic energy to escape the liquid, so the equilibrium vapor pressure increases.", concept: "Vapor pressure depends on the fraction of molecules able to escape intermolecular attractions at a given temperature." },
    "2:a": { prompt: "At 20°C, which appears to evaporate more easily, water or ethanol?", steps: ["The diagram compares the vapor above liquid water and ethanol at the same temperature.", "The liquid with the greater equilibrium vapor pressure has more molecules in the vapor phase and evaporates more readily."], answer: "Ethanol.", concept: "At the same temperature, greater vapor pressure indicates greater volatility." },
    "2:b": { prompt: "Which liquid, water or ethanol, is more likely to have stronger intermolecular attractions?", steps: ["Stronger attractions make it harder for molecules to escape into the gas phase.", "Water has stronger overall intermolecular attractions than ethanol under these conditions."], answer: "Water.", concept: "Stronger intermolecular attractions generally lower vapor pressure at the same temperature." },
    "2:c": { prompt: "Which liquid, water or ethanol, is more likely to have the higher boiling point?", steps: ["Boiling occurs when a liquid's vapor pressure equals the external pressure.", "A liquid with stronger intermolecular attractions generally requires a higher temperature to reach that pressure."], answer: "Water.", concept: "Stronger intermolecular attractions generally correspond to a higher boiling point." },
    "3": { prompt: "Complete the relationship between vapor pressure and boiling point for two liquids at the same temperature.", steps: ["A liquid with lower vapor pressure has fewer molecules in the vapor phase at the same temperature.", "It must be heated to a higher temperature to reach the external pressure and boil."], answer: "Lower vapor pressure; higher boiling point.", concept: "At a fixed external pressure, lower vapor pressure at a given temperature implies a higher boiling point." },
    "6:a": { prompt: "Classify solids A–D as molecular, covalent network, ionic, or metallic using their properties.", steps: ["A has a low melting point, is a nonelectrolyte, and is slightly soluble: these are molecular-solid properties.", "B has a very high melting point, is insoluble, and is a nonelectrolyte: these are covalent-network properties.", "C has a high melting point, dissolves readily, and conducts when dissolved: these are ionic-solid properties.", "D conducts electricity as a solid and is silvery: these are metallic-solid properties."], answer: "A molecular; B covalent network; C ionic; D metallic.", concept: "Melting point, conductivity, and solubility distinguish molecular, network-covalent, ionic, and metallic solids." },
    "6:b": { prompt: "Match solids A–D with silicon, nickel, naphthalene, and potassium chloride.", steps: ["A is the molecular solid, matching naphthalene (C10H8).", "B is the covalent-network solid, matching silicon (Si).", "C is the ionic solid, matching potassium chloride (KCl).", "D is the metallic solid, matching nickel (Ni)."], answer: "A = naphthalene; B = silicon; C = potassium chloride; D = nickel.", concept: "Match the structural category first, then use the listed physical properties to identify the substance." },
    "7": { prompt: "Explain the difference in melting and boiling points between SiH4 and SiO2 using interparticle forces.", steps: ["SiH4 consists of separate, nonpolar molecules; melting or boiling mainly overcomes relatively weak London dispersion forces between molecules.", "SiO2 forms an extended covalent-network solid with strong Si–O covalent bonds throughout the structure.", "Much more energy is needed to disrupt the SiO2 network than to separate SiH4 molecules."], answer: "SiO2 has much higher melting and boiling points because it has a covalent-network structure with strong Si–O bonds, whereas SiH4 is molecular and held together by weak dispersion forces.", concept: "Distinguish intermolecular attractions between molecules from covalent bonds in a network solid." },
    "9:a": { prompt: "Calculate the mass of dry air in the 843 mL flask using air density 1.18 g/L.", steps: ["Convert 843 mL to 0.843 L.", "Mass = density × volume = (1.18 g/L)(0.843 L) = 0.99474 g."], answer: "0.995 g dry air.", concept: "Mass from density is density multiplied by volume, using consistent units." },
    "9:b": { prompt: "Calculate the mass of the empty sealed flask.", steps: ["The flask plus dry air has a mass of 157.70 g.", "Subtract the mass of air: 157.70 − 0.99474 = 156.70526 g."], answer: "156.71 g (about 156.7 g).", concept: "Subtract the contents' mass from the measured total to obtain the container mass." },
    "9:c": { prompt: "Calculate the mass of unknown gas in the flask.", steps: ["The empty flask mass from part (b) is about 156.705 g.", "Subtract from the flask-plus-unknown mass: 158.08 − 156.70526 = 1.37474 g."], answer: "1.37 g unknown gas.", concept: "The gas mass is the difference between the filled-flask mass and the empty-flask mass." },
    "9:d": { prompt: "Calculate the molar mass of the unknown gas at 23.0°C and 750. torr in an 843 mL flask.", steps: ["Convert P = 750./760 = 0.9868 atm, V = 0.843 L, and T = 296.15 K.", "Use PV = nRT: n = PV/(RT) = (0.9868)(0.843)/[(0.082057)(296.15)] ≈ 0.03423 mol.", "Molar mass = gas mass/moles = 1.37474 g/0.03423 mol ≈ 40.16 g/mol."], answer: "Approximately 40.2 g/mol.", concept: "Find gas moles with the ideal gas law, then divide mass by moles to obtain molar mass." },
    "9:e": { prompt: "Calculate percent error if the unknown gas is CO2 with an accepted molar mass of 44.0 g/mol.", steps: ["Use percent error = |experimental − accepted|/accepted × 100%.", "Percent error = |40.16 − 44.0|/44.0 × 100% ≈ 8.73%."], answer: "8.7% error.", concept: "Percent error compares the absolute difference with the accepted value." },
    "9:f": { prompt: "Decide whether incomplete flushing with CO2 or a lower-than-reported CO2 temperature could explain the molar-mass error.", steps: ["If air remains, the gas sample is a CO2/air mixture with a lower average molar mass than pure CO2, so the measured molar mass can be too low.", "If the CO2 is actually colder than assumed, the actual mole count at the same pressure and volume is larger than calculated using 23.0°C; the calculation would overestimate molar mass, not produce the observed low result."], answer: "Occurrence 1: yes. Occurrence 2: no, because it would make the calculated molar mass too high relative to the true value.", concept: "Identify not just whether a source of error exists, but the direction in which it biases the result." },
    "9:g": { prompt: "Describe a lab method to verify that the rigid flask volume is 843 mL at 23.0°C.", steps: ["Bring the flask and water to 23.0°C.", "Fill the flask completely with water, ensuring no trapped air bubbles, and close it without leaving excess water outside the flask opening.", "Determine the water volume using calibrated volumetric glassware, or weigh the water and convert its mass to volume using water's density at 23.0°C."], answer: "Measure the amount of water that exactly fills the flask at 23.0°C using calibrated volumetric equipment or mass and the water density.", concept: "A known liquid volume or mass-density measurement can calibrate a container's internal volume." },
    "12:a": { prompt: "Calculate the total pressure after opening the valve between 10.0 L H2 at 3.0 atm and 4.0 L CH4 at 2.0 atm, at constant temperature.", steps: ["For each gas, its final partial pressure is PiVi/Vtotal.", "Ptotal = (3.0 atm)(10.0 L)/14.0 L + (2.0 atm)(4.0 L)/14.0 L = 38/14 = 2.714 atm."], answer: "2.7 atm total pressure.", concept: "At constant temperature, each gas's partial pressure after mixing is proportional to its initial pressure-volume product." },
    "12:b": { prompt: "Calculate the mole fractions of H2 and CH4 after the gases in Question 12 mix.", steps: ["At the same temperature, moles are proportional to PiVi.", "XH2 = (3.0 × 10.0)/[(3.0 × 10.0) + (2.0 × 4.0)] = 30/38 = 0.789.", "XCH4 = (2.0 × 4.0)/38 = 8/38 = 0.211. The fractions sum to 1.000."], answer: "XH2 = 0.79; XCH4 = 0.21.", concept: "Mole fraction is a component's moles divided by total moles; for gases at common T, PiVi is proportional to moles." },
    "13:a": { prompt: "Find the vapor pressure of water at 22°C for the butane water-displacement experiment.", steps: ["Read the table at 22°C.", "The listed water vapor pressure is 19.83 torr."], answer: "19.83 torr.", concept: "Use the vapor-pressure table at the measured water-bath temperature." },
    "13:b": { prompt: "Calculate the partial pressure of dry butane when atmospheric pressure is 755.0 torr and water vapor pressure is 19.83 torr.", steps: ["The total pressure is the sum of butane pressure and water vapor pressure.", "Pbutane = 755.0 − 19.83 = 735.17 torr."], answer: "735.2 torr dry butane.", concept: "Subtract water vapor pressure from the total pressure to obtain the dry gas pressure." },
    "13:c": { prompt: "Calculate moles of butane collected in 100.0 mL at 22°C using its dry partial pressure.", steps: ["Convert P = 735.17/760 = 0.9673 atm, V = 0.1000 L, and T = 295.15 K.", "n = PV/RT = (0.9673)(0.1000)/[(0.082057)(295.15)] ≈ 0.003994 mol."], answer: "3.99 × 10⁻³ mol C4H10.", concept: "Use the dry gas partial pressure in the ideal gas law when gas is collected over water." },
    "13:d": { prompt: "Calculate the mass of butane collected from the lighter mass change.", steps: ["Initial lighter mass = 22.24 g; final mass = 22.02 g.", "Mass of butane released = 22.24 − 22.02 = 0.22 g."], answer: "0.22 g butane.", concept: "The decrease in lighter mass is the mass of gas released." },
    "13:e": { prompt: "Calculate the experimental molar mass of butane using the measured mass and moles.", steps: ["Use m = 0.22 g from part (d) and n ≈ 0.003994 mol from part (c).", "M = m/n = 0.22/0.003994 ≈ 55.1 g/mol."], answer: "Approximately 55 g/mol.", concept: "Experimental molar mass is sample mass divided by the measured amount in moles." },
    "13:f": { prompt: "Calculate percent error for the experimental molar mass of butane; C4H10 has molar mass about 58.12 g/mol.", steps: ["Percent error = |55.1 − 58.12|/58.12 × 100%.", "Using unrounded values gives approximately 5.23%."], answer: "About 5.2% error.", concept: "Compare the experimental value with the accepted molar mass using absolute percent error." },
    "14:a": { prompt: "Calculate moles of hydrocarbon in a 1.00 L vessel at 0.200 atm and 127°C.", steps: ["Convert temperature to 400.15 K.", "n = PV/RT = (0.200 atm)(1.00 L)/[(0.082057)(400.15 K)] = 0.00609 mol."], answer: "6.09 × 10⁻³ mol hydrocarbon.", concept: "Use the ideal gas law with the hydrocarbon's initial partial pressure." },
    "14:b": { prompt: "Calculate the O2 partial pressure after O2 is added, when total pressure is 1.40 atm and hydrocarbon pressure is 0.200 atm.", steps: ["For a gas mixture, total pressure is the sum of component partial pressures.", "PO2 = 1.40 − 0.200 = 1.20 atm."], answer: "1.20 atm O2.", concept: "Subtract the known hydrocarbon partial pressure from total pressure." },
    "14:c": { prompt: "Use the final partial pressures to calculate the ratios of moles of CO2 and H2O produced to moles of hydrocarbon consumed.", steps: ["At the same final T and V, moles are proportional to partial pressure: n = PV/RT.", "The ratios nCO2/nHC = 0.600/0.200 = 3.00 and nH2O/nHC = 0.800/0.200 = 4.00."], answer: "3 mol CO2 per mol hydrocarbon; 4 mol H2O per mol hydrocarbon.", concept: "For gases in the same vessel at the same temperature, mole ratios equal partial-pressure ratios." },
    "14:d": { prompt: "Determine the hydrocarbon formula and write its balanced combustion equation.", steps: ["Three CO2 per hydrocarbon molecule means 3 carbon atoms; four H2O means 8 hydrogen atoms.", "The hydrocarbon formula is C3H8.", "Balance combustion: C3H8 + 5 O2 → 3 CO2 + 4 H2O."], answer: "C3H8; C3H8(g) + 5 O2(g) → 3 CO2(g) + 4 H2O(g).", concept: "Combustion stoichiometry reveals carbon from CO2 and hydrogen from H2O." },
    "14:e": { prompt: "Calculate the mass of hydrocarbon consumed in Question 14.", steps: ["From part (a), nHC ≈ 0.006091 mol.", "For C3H8, molar mass = 3(12.01) + 8(1.008) ≈ 44.10 g/mol.", "Mass = nM = (0.006091 mol)(44.10 g/mol) ≈ 0.2686 g."], answer: "0.269 g C3H8.", concept: "Convert the measured mole amount to mass using the hydrocarbon's molar mass." },
  ,
    "4": {prompt:"Estimate the normal boiling point of ethanol from the vapor-pressure-versus-temperature graph.",steps:["The normal boiling point is the temperature at which a liquid's vapor pressure equals 1 atm (760 mmHg).","Read the temperature where ethanol's vapor-pressure curve reaches 1 atm; ethanol's normal boiling point is about 78 °C, below water's 100 °C."],answer:"Approximately 78 °C.",concept:"Normal boiling point occurs when vapor pressure equals external pressure, 1 atm."},
    "8": {prompt:"Explain why salicylic acid has a higher melting point than methyl salicylate although both have dispersion, dipole–dipole, and hydrogen-bonding forces.",steps:["Salicylic acid contains a carboxylic-acid group that can donate and accept hydrogen bonds, allowing strong intermolecular association in the solid.","Methyl salicylate has an ester group, which can accept hydrogen bonds but cannot donate an O–H hydrogen from that group; its phenolic OH can also form an intramolecular interaction with the ester carbonyl.","The crystal packing and stronger/more extensive intermolecular hydrogen bonding in salicylic acid make its solid lattice harder to disrupt."],answer:"Salicylic acid forms stronger and more extensive intermolecular hydrogen-bonding interactions in its crystal, so more energy is required to melt it than methyl salicylate.",concept:"Melting point depends on the strength and arrangement of attractions in the solid, not just the list of force types present."},
  },
  "topic-3-5-3-8.pdf": {
    "8": { prompt: "An ideal gas should behave most ideally at what relative temperature and pressure?", steps: ["At high temperature, particle kinetic energy makes intermolecular attractions less important relative to motion.", "At low pressure, particles are farther apart and their own volume is a smaller fraction of the container volume."], answer: "High temperature and low pressure.", concept: "Ideal behavior is favored when attractions and particle volume are least important." },
    "11:a": { prompt: "Determine the mass of Na2SO4(s) needed to prepare 250.0 mL of 0.0500 M Na2SO4(aq).", steps: ["Convert volume: 250.0 mL = 0.2500 L.", "Moles required = M × V = 0.0500 mol/L × 0.2500 L = 0.01250 mol.", "Molar mass Na2SO4 ≈ 142.04 g/mol; mass = 0.01250 × 142.04 = 1.7755 g."], answer: "1.78 g Na2SO4 (three significant figures).", concept: "Use n = MV, then convert moles to mass with molar mass." },
    "11:b": { prompt: "Evaluate the claim that the Na+ concentration is 0.0500 M in a 0.0500 M Na2SO4 solution.", steps: ["Assume soluble Na2SO4 dissociates completely: Na2SO4(aq) → 2 Na+(aq) + SO4²−(aq).", "Each mole of Na2SO4 produces two moles of Na+.", "Therefore [Na+] = 2 × 0.0500 M = 0.100 M."], answer: "Disagree. The Na+ concentration is 0.100 M, twice the Na2SO4 formula-unit concentration.", concept: "Ion concentrations follow the stoichiometric coefficients in the dissociation equation." },
    "14": { prompt: "Calculate the volume of 6.0 M NaOH needed to prepare 500.0 mL of 0.100 M NaOH.", steps: ["Use the dilution relationship M1V1 = M2V2.", "V1 = (0.100 M × 500.0 mL)/(6.0 M) = 8.33 mL.", "Round to two significant figures because 6.0 M has two."], answer: "8.3 mL of 6.0 M NaOH", concept: "Dilution conserves moles of solute; only solution volume changes." }
  },
  "topic-7-1-7-5.pdf": {
    "12": { prompt: "State which side is favored when K is very small and when K is very large.", steps: ["A small K means the equilibrium expression's product term is small relative to the reactant term.", "A very large K means the product term dominates the equilibrium expression."], answer: "Very small K: reactants favored. Very large K: products favored.", concept: "K describes the equilibrium position for the balanced reaction as written, not reaction speed." },
    "2": { prompt: "Mark the five statements about dynamic equilibrium true or false.", steps: ["A forward rate greater than the reverse rate means the system is not at equilibrium.", "At equilibrium, forward and reverse rates are equal, but reactant and product partial pressures do not have to be equal.", "At equilibrium, macroscopic concentrations and partial pressures remain constant over time.", "Equilibrium is dynamic: particles continue to collide and react in both directions.", "Equal forward and reverse rates produce no net observable change."], answer: "In order: True, False, True, False, True.", concept: "Dynamic equilibrium means equal opposing rates, not equal amounts and not stopped molecular motion." },
    "3:a": { prompt: "For H2(g) + I2(g) ⇌ 2 HI(g), compare the listed concentrations at Time 1 and Time 2 in part (a).", steps: ["[H2] decreases from 2.0 M to 1.0 M and [I2] decreases from 3.0 M to 2.0 M.", "[HI] increases from 1.0 M to 3.0 M, so the net change is toward products."], answer: "The forward reaction rate is greater than the reverse reaction rate over this interval.", concept: "A net increase in products and decrease in reactants indicates forward progress." },
    "3:b": { prompt: "For H2(g) + I2(g) ⇌ 2 HI(g), compare the listed concentrations at Time 1 and Time 2 in part (b).", steps: ["[H2] increases from 0.10 M to 1.0 M and [I2] increases from 0.20 M to 1.1 M.", "[HI] decreases from 9.5 M to 7.7 M, so the net change is toward reactants."], answer: "The reverse reaction rate is greater than the forward reaction rate over this interval.", concept: "A net decrease in products and increase in reactants indicates reverse progress." },
    "4": { prompt: "Write Kc and Kp expressions for the five equilibria in Question 4.", steps: ["For N2(g) + 3 H2(g) ⇌ 2 NH3(g): Kc = [NH3]^2/([N2][H2]^3); Kp = (PNH3)^2/(PN2(PH2)^3).", "For 2 SO3(g) ⇌ 2 SO2(g) + O2(g): Kc = [SO2]^2[O2]/[SO3]^2; Kp = (PSO2)^2(PO2)/(PSO3)^2.", "For CaCO3(s) ⇌ CaO(s) + CO2(g), omit both solids: Kc = [CO2] and Kp = PCO2.", "For PbI2(s) ⇌ Pb2+(aq) + 2 I−(aq): Kc = [Pb2+][I−]^2; Kp is not applicable because no gases appear.", "For HF(aq) + H2O(l) ⇌ H3O+(aq) + F−(aq), omit liquid water: Kc = [H3O+][F−]/[HF]; Kp is not applicable because no gases appear."], answer: "Use products over reactants, raise each species to its stoichiometric coefficient, and omit pure solids and liquids. Kp is only applicable to equilibria with gaseous species.", concept: "Equilibrium expressions follow stoichiometric coefficients; pure solids and liquids are excluded." },
    "5:a": { prompt: "Calculate the concentration changes for all six N2O4(g) ⇌ 2 NO2(g) experiments.", steps: ["Use change = equilibrium concentration − initial concentration for each species.", "Experiment 1: Δ[N2O4] = −0.70 M; Δ[NO2] = +1.40 M. Experiment 2: +4.51 M and −9.02 M.", "Experiment 3: +4.14 M and −8.28 M. Experiment 4: +2.46 M and −4.92 M.", "Experiment 5: −0.14 M and +0.28 M. Experiment 6: +1.10 M and −2.20 M."], answer: "Experiments 1–6, (Δ[N2O4], Δ[NO2]) in M: (−0.70, +1.40), (+4.51, −9.02), (+4.14, −8.28), (+2.46, −4.92), (−0.14, +0.28), (+1.10, −2.20).", concept: "Concentration change is final minus initial; reactant and product changes have opposite signs." },
    "5:b": { prompt: "Determine the ratio Δ[NO2]/Δ[N2O4] for N2O4(g) ⇌ 2 NO2(g).", steps: ["The balanced equation consumes one N2O4 for every two NO2 produced.", "The concentration changes have opposite signs and a magnitude ratio of 2:1."], answer: "Δ[NO2]/Δ[N2O4] = −2 (magnitude 2).", concept: "The signed change ratio follows stoichiometric coefficients and opposite directions of reactant/product changes." },
    "5:c": { prompt: "Calculate Kc for each of the six experiments for N2O4(g) ⇌ 2 NO2(g) at 373 K.", steps: ["Use Kc = [NO2]^2/[N2O4] with equilibrium concentrations.", "The six substitutions give approximately 0.211, 0.213, 0.209, 0.214, 0.208, and 0.206.", "Round each to two significant figures."], answer: "Kc ≈ 0.21 for each of the six experiments.", concept: "At a fixed temperature, the equilibrium constant is the same for different equilibrium mixtures of the same reaction." },
    "6:a": { prompt: "Calculate Kc for H2(g) + I2(g) ⇌ 2 HI(g) at 448°C using [H2] = 0.80 M, [I2] = 0.54 M, and [HI] = 4.7 M.", steps: ["Kc = [HI]^2/([H2][I2]).", "Kc = (4.7)^2/[(0.80)(0.54)] = 22.09/0.432 ≈ 51.1.", "Round to two significant figures."], answer: "Kc = 51.", concept: "Use equilibrium concentrations and square the product concentration because its coefficient is 2." },
    "6:b": { prompt: "If 0.25 M H2 and 0.25 M I2 are initially added with no HI present, will equilibrium [H2] be less than or greater than 0.25 M?", steps: ["Initially Qc = [HI]^2/([H2][I2]) = 0 because [HI] = 0.", "Since Qc < Kc, the reaction proceeds toward products and consumes H2 and I2."], answer: "Less than 0.25 M.", concept: "When Q is below K, the reaction shifts toward products to raise Q to K." },
    "6:c": { prompt: "For [H2] = 0.15 M, [I2] = 0.25 M, and [HI] = 3.2 M, determine whether the system is at equilibrium.", steps: ["Qc = [HI]^2/([H2][I2]) = (3.2)^2/[(0.15)(0.25)] ≈ 273.", "Compare Qc ≈ 273 with Kc ≈ 51 from part (a)."], answer: "The system is not at equilibrium because Qc ≈ 2.7 × 10^2, greater than Kc ≈ 51.", concept: "A system is at equilibrium only when Q equals K." },
    "6:d": { prompt: "Determine the direction in which H2(g) + I2(g) ⇌ 2 HI(g) will proceed from the concentrations in part (c).", steps: ["From part (c), Qc ≈ 273 and Kc ≈ 51.", "Because Qc > Kc, the net reaction proceeds toward reactants."], answer: "Toward the left, forming H2 and I2 and consuming HI.", concept: "Q > K means the reaction shifts toward reactants until Q falls to K." },
  },
  "topic-7-6-7-10.pdf": {
    "14": { prompt: "Explain why adding an inert gas can increase total pressure without shifting a gaseous equilibrium.", steps: ["At constant volume and temperature, adding inert gas increases total pressure but does not change the moles or partial pressures of the reacting gases.", "The equilibrium expression Qp contains partial pressures of reacting species, not the inert gas.", "Because Qp is unchanged, its relationship to Kp is unchanged and there is no net shift."], answer: "The reacting gases' partial pressures and Qp remain unchanged at constant volume, so the equilibrium does not shift.", concept: "Distinguish total pressure from the partial pressures that appear in Qp." },
    "1": { prompt: "For H2(g) + I2(g) ⇌ 2 HI(g), Kc = 51, determine the equilibrium constants for the four modified equations in Question 1.", steps: ["Reversing 2 HI ⇌ H2 + I2 takes the reciprocal: Kc = 1/51 = 0.0196.", "Halving every coefficient gives ½ H2 + ½ I2 ⇌ HI, so Kc = √51 ≈ 7.14.", "Doubling every coefficient gives 2 H2 + 2 I2 ⇌ 4 HI, so Kc = 51² = 2601.", "HI ⇌ ½ H2 + ½ I2 is the reverse reaction with all coefficients halved, so Kc = √(1/51) ≈ 0.140."], answer: "In table order: 1/51 ≈ 0.020; √51 ≈ 7.1; 51² = 2.6 × 10³; and 1/√51 ≈ 0.14.", concept: "Reverse a reaction → take 1/K; multiply all coefficients by n → raise K to n." },
    "2": { prompt: "Combine FeF2(s) ⇌ Fe2+(aq) + 2 F−(aq), Kc = 2.4 × 10⁻⁶, and HF(aq) ⇌ H+(aq) + F−(aq), Kc = 6.8 × 10⁻⁴, to obtain FeF2(s) + 2 H+(aq) ⇌ Fe2+(aq) + 2 HF(aq). Calculate Kc.", steps: ["Keep equation #1 as written. Reverse equation #2 so H+ and F− form HF; reversing gives K = 1/(6.8 × 10⁻⁴).", "Multiply the reversed equation by 2, so its equilibrium constant is [1/(6.8 × 10⁻⁴)]².", "Add the equations and cancel 2 F−: Kc = (2.4 × 10⁻⁶)/(6.8 × 10⁻⁴)² ≈ 5.19."], answer: "FeF2(s) + 2 H+(aq) ⇌ Fe2+(aq) + 2 HF(aq); Kc ≈ 5.2.", concept: "Reverse an equation by reciprocating K, scale an equation by raising K to that power, and multiply K values when equations are added." },
  },
  "topic-7-11-7-12.pdf": {
    "2:a": { prompt: "Write the balanced dissolution equation for Ca(OH)2(s) in pure water.", steps: ["A formula unit of Ca(OH)2 contains one Ca2+ ion and two OH− ions.", "Separate the ions and preserve atom and charge balance.", "The pure solid is omitted from the Ksp expression, but it belongs in the dissolution equation."], answer: "Ca(OH)2(s) ⇌ Ca2+(aq) + 2OH−(aq)", concept: "Dissolution equations must conserve atoms and total charge." },
    "3:a": { prompt: "Write the balanced dissolution equation for Ag2CO3(s) in pure water.", steps: ["Each formula unit contains two Ag+ ions and one CO3²− ion.", "Write the ions with coefficients that match the formula unit.", "Check total charge: 2(+1) + (−2) = 0."], answer: "Ag2CO3(s) ⇌ 2Ag+(aq) + CO3²−(aq)", concept: "Use the ionic formula to determine the stoichiometric coefficients in the dissolution equation." },
    "3:b": { prompt: "Calculate the molar solubility of Ag2CO3 in water at 25°C when its mass solubility is 0.035 g/L.", steps: ["Molar mass Ag2CO3 = 2(107.87) + 12.01 + 3(16.00) ≈ 275.75 g/mol.", "Molar solubility s = 0.035 g/L ÷ 275.75 g/mol = 1.27 × 10⁻⁴ mol/L."], answer: "1.3 × 10⁻⁴ M Ag2CO3 (two significant figures).", concept: "Convert mass solubility to molar solubility by dividing grams per liter by molar mass." },
    "3:c": { prompt: "Calculate Ksp for Ag2CO3 at 25°C using its molar solubility from part (b).", steps: ["Ag2CO3(s) ⇌ 2 Ag+(aq) + CO3²⁻(aq), so [Ag+] = 2s and [CO3²⁻] = s.", "Ksp = [Ag+]²[CO3²⁻] = (2s)²s = 4s³.", "Using s = 1.269 × 10⁻⁴ M gives Ksp ≈ 8.18 × 10⁻¹²."], answer: "Ksp ≈ 8.2 × 10⁻¹².", concept: "Translate molar solubility into equilibrium ion concentrations using the dissolution stoichiometry." },
    "4:a": { prompt: "Identify which of CaF2, SrF2, and BaF2 has the smallest molar solubility from their Ksp values.", steps: ["All three salts dissolve as MF2(s) ⇌ M²+(aq) + 2 F−(aq).", "For each salt in pure water, Ksp = [M²+][F−]² = s(2s)² = 4s³.", "Because each has the same stoichiometric relationship, the smallest Ksp corresponds to the smallest molar solubility."], answer: "CaF2, which has the smallest Ksp (3.9 × 10⁻¹¹).", concept: "Compare Ksp values directly for salts with the same dissolution stoichiometry." },
    "4:b": { prompt: "Calculate [F−] in a saturated CaF2 solution when Ksp = 3.9 × 10⁻¹¹ at 25°C.", steps: ["Let the molar solubility be s. Then [Ca²+] = s and [F−] = 2s.", "Ksp = s(2s)² = 4s³, so s = (3.9 × 10⁻¹¹/4)^(1/3) = 2.14 × 10⁻⁴ M.", "Therefore [F−] = 2s = 4.27 × 10⁻⁴ M."], answer: "[F−] ≈ 4.3 × 10⁻⁴ M.", concept: "Use the Ksp expression and the ion ratio from the balanced dissolution equation." },
    "5:a": { prompt: "Without calculations, predict which saturated solution, Ag2CrO4 or BaCrO4, contains the higher [CrO4²−].", steps: ["Ag2CrO4 dissolves to produce two Ag+ for each CrO4²−; BaCrO4 produces one Ba²+ for each CrO4²−.", "Because the salts have different stoichiometries, compare the Ksp expressions rather than assuming the larger Ksp always means the larger molar solubility."], answer: "Ag2CrO4 has the higher chromate concentration in its saturated solution.", concept: "The relationship between Ksp and molar solubility depends on dissolution stoichiometry." },
    "5:b": { prompt: "Calculate [CrO4²−] in saturated solutions of Ag2CrO4 (Ksp = 1.1 × 10⁻¹²) and BaCrO4 (Ksp = 1.2 × 10⁻¹⁰) at 25°C.", steps: ["For Ag2CrO4(s) ⇌ 2 Ag+ + CrO4²−, let s = [CrO4²−]. Then Ksp = (2s)²s = 4s³, so s = (1.1 × 10⁻¹²/4)^(1/3) = 6.50 × 10⁻⁵ M.", "For BaCrO4(s) ⇌ Ba²+ + CrO4²−, Ksp = s², so s = √(1.2 × 10⁻¹⁰) = 1.10 × 10⁻⁵ M."], answer: "Ag2CrO4: [CrO4²−] = 6.5 × 10⁻⁵ M; BaCrO4: [CrO4²−] = 1.1 × 10⁻⁵ M. Ag2CrO4 is higher.", concept: "Derive each solubility expression from its balanced dissolution equation before substituting Ksp." },
    "6:a": { prompt: "Write the net ionic equation when excess Na2SO4(aq) is added to Ba(NO3)2(aq) and a precipitate forms.", steps: ["Ba²+ and SO4²− form the insoluble salt BaSO4(s).", "Na+ and NO3− remain dissolved as spectator ions and are omitted."], answer: "Ba²+(aq) + SO4²−(aq) → BaSO4(s).", concept: "A net ionic equation includes the species forming the precipitate and omits spectator ions." },
    "6:b": { prompt: "Calculate moles of Ba²+ in 200.0 mL of 3.0 × 10⁻⁶ M Ba(NO3)2.", steps: ["Convert volume: 200.0 mL = 0.2000 L.", "Moles Ba²+ = M × V = (3.0 × 10⁻⁶ mol/L)(0.2000 L)."], answer: "6.0 × 10⁻⁷ mol Ba²+.", concept: "Molarity multiplied by solution volume in liters gives moles of solute." },
    "6:c": { prompt: "Calculate moles of SO4²− in 150.0 mL of 2.0 × 10⁻⁵ M Na2SO4.", steps: ["Convert volume: 150.0 mL = 0.1500 L.", "Each Na2SO4 formula unit supplies one SO4²− ion, so moles sulfate = (2.0 × 10⁻⁵ mol/L)(0.1500 L)."], answer: "3.0 × 10⁻⁶ mol SO4²−.", concept: "Use the solution molarity and volume; Na2SO4 supplies one sulfate ion per formula unit." },
    "6:d": { prompt: "Calculate initial [Ba²+] and [SO4²−] after combining the two solutions to a total volume of 350.0 mL.", steps: ["Use the moles from parts (b) and (c), then divide each by 0.3500 L.", "[Ba²+] = (6.0 × 10⁻⁷ mol)/(0.3500 L) = 1.71 × 10⁻⁶ M.", "[SO4²−] = (3.0 × 10⁻⁶ mol)/(0.3500 L) = 8.57 × 10⁻⁶ M."], answer: "[Ba²+] = 1.7 × 10⁻⁶ M; [SO4²−] = 8.6 × 10⁻⁶ M (two significant figures).", concept: "After mixing, each ion's initial concentration is its total moles divided by the combined volume." },
    "6:e": { prompt: "Calculate Qsp for BaSO4 using the initial concentrations from part (d).", steps: ["BaSO4(s) ⇌ Ba²+(aq) + SO4²−(aq), so Qsp = [Ba²+][SO4²−].", "Qsp = (1.714 × 10⁻⁶)(8.571 × 10⁻⁶) = 1.47 × 10⁻¹¹."], answer: "Qsp ≈ 1.5 × 10⁻¹¹.", concept: "The ion product uses the mixed-solution concentrations before precipitation occurs." },
    "6:f": { prompt: "Will BaSO4 precipitate if Ksp = 1.1 × 10⁻¹⁰ and the initial Qsp is calculated in part (e)?", steps: ["Compare Qsp ≈ 1.47 × 10⁻¹¹ with Ksp = 1.1 × 10⁻¹⁰.", "Since Qsp < Ksp, the solution is below saturation and does not need to precipitate BaSO4 to reach equilibrium."], answer: "No. Qsp < Ksp, so a BaSO4 precipitate is not predicted to form.", concept: "A precipitate forms when Qsp exceeds Ksp; if Qsp is lower, the mixture is unsaturated." },
  },
  "topic-2-1-2-4.pdf": {
    "7": { prompt: "Complete the comparisons of atomic radius, bond length, and bond energy for Br versus Cl.", steps: ["Br is below Cl in Group 17, so Br has an additional occupied energy level and a larger atomic radius.", "The larger Br atoms form a longer Br−Br bond than the Cl−Cl bond.", "The prompt states that a longer bond is easier to break, so less energy is required to break Br−Br."], answer: "Br has a larger atomic radius; Br−Br is longer and has a lower bond energy than Cl−Cl.", concept: "For these halogen bonds, increasing atomic size increases bond length; the longer bond is weaker and has lower bond energy." },
    "9": { prompt: "Compare a double bond with a single bond between the same two atoms.", steps: ["A double bond has two shared electron pairs rather than one.", "The additional bonding electron density generally pulls the nuclei closer together and increases bond strength."], answer: "A double bond is shorter and stronger than a single bond between the same atoms.", concept: "Bond order generally increases as bond length decreases and bond energy increases." },
    "10": { prompt: "State how ionic charge and ion size affect lattice-energy magnitude.", steps: ["Coulombic attraction increases as the magnitude of the ionic charges increases.", "At a smaller separation, oppositely charged ions attract more strongly.", "Therefore smaller ions and larger charge magnitudes produce larger lattice-energy magnitudes."], answer: "Lattice-energy magnitude increases as ion charges increase in magnitude and ionic sizes decrease.", concept: "Lattice energy follows the strength of electrostatic attraction in the ionic lattice." },
    "11:a": { prompt: "Predict whether the lattice energy magnitude of NaCl is smaller or larger than that of NaF.", steps: ["Na+ is the same cation in both compounds.", "Cl− is larger than F−, so the distance between ion centers is greater in NaCl.", "With equal charge magnitudes, the greater separation weakens electrostatic attraction."], answer: "NaCl has a smaller lattice-energy magnitude than NaF.", concept: "For ions with the same charges, smaller ionic separation generally produces a larger lattice-energy magnitude." },
    "11:b": { prompt: "Predict whether the lattice energy magnitude of MgO is smaller or larger than that of NaF.", steps: ["NaF contains Na+ and F−, while MgO contains Mg2+ and O2−.", "The product of the charge magnitudes is 1 for NaF and 4 for MgO.", "The much stronger charge attraction makes MgO's lattice-energy magnitude larger despite differences in ionic size."], answer: "MgO has a larger lattice-energy magnitude than NaF.", concept: "Lattice energy is strongly affected by the product of ionic charge magnitudes." },
    "14": { prompt: "Explain why solid NaCl does not conduct electricity.", steps: ["NaCl is an ionic solid containing Na+ and Cl− ions arranged in a crystal lattice.", "The ions are held at fixed lattice positions and cannot move freely through the solid.", "Without mobile charge carriers, solid NaCl does not conduct; molten or dissolved NaCl can conduct because ions are mobile."], answer: "The ions are fixed in the solid lattice and cannot carry charge through the material.", concept: "Electrical conduction requires mobile charged particles or mobile electrons." },
    "15": { prompt: "Name two changes that allow an ionic solid such as NaCl to conduct electricity.", steps: ["Melting disrupts the rigid lattice, allowing ions to move.", "Dissolving in water separates ions into mobile aqueous particles.", "In either case, mobile ions carry current."], answer: "Melt the ionic solid or dissolve it in water.", concept: "Ionic compounds conduct when their ions can move; solid ionic lattices generally do not." },
    "17": { prompt: "Explain why a metallic solid can conduct electricity.", steps: ["Metal atoms form a lattice of positive ion cores surrounded by delocalized valence electrons.", "These electrons can move through the solid under an electric field.", "Their motion transports charge."], answer: "Delocalized electrons are mobile and carry charge through the metal.", concept: "Metallic bonding includes a mobile electron population." }
  ,
    "2": {prompt:"Identify the nonpolar bond among Si–P, F–F, and Br–Cl.",steps:["A bond between identical atoms has zero electronegativity difference.","F–F joins two fluorine atoms, so neither atom attracts the shared electrons more strongly."],answer:"F–F is nonpolar.",concept:"A homonuclear bond has no bond dipole because both atoms have the same electronegativity."},
    "5": {prompt:"Classify Sn and Cl and predict bonding in SnCl₂ and SnCl₄ using their properties.",steps:["Sn is a metal and Cl is a nonmetal, so the simple metal/nonmetal rule predicts ionic character.","SnCl₂ is a white crystalline solid with a much higher melting point (247 °C), consistent with strong ionic-lattice attractions.","SnCl₄ is a low-melting liquid (−34 °C) and boils at 114 °C, consistent with discrete covalent molecules and intermolecular forces."],answer:"Sn: metal. Cl: nonmetal. The simple prediction is ionic, but the property evidence suggests SnCl₂ is predominantly ionic while SnCl₄ is predominantly covalent (molecular).",concept:"Physical properties can distinguish ionic lattices from molecular covalent substances when the metal/nonmetal rule is insufficient."},
    "8": {prompt:"Predict the I–I bond length and bond energy relative to Br–Br (228 pm, 193 kJ mol⁻¹).",steps:["I atoms are larger than Br atoms because they have an additional occupied electron shell.","The larger atoms form a longer I–I bond; longer bonds are generally weaker for this comparison."],answer:"The I–I bond length should be greater than 228 pm, and its bond energy should be less than 193 kJ mol⁻¹.",concept:"Down a halogen group, larger atomic radii generally produce longer and weaker X–X bonds."},
    "12": {prompt:"Identify the ions in the LiCl crystal diagram.",steps:["Lithium forms Li⁺ and chlorine forms Cl⁻.","Li⁺ is much smaller than Cl⁻; ionic crystals alternate cations and anions to maximize opposite-charge attraction."],answer:"Label the smaller spheres Li⁺ and the larger spheres Cl⁻, alternating through the lattice.",concept:"Ionic crystal diagrams represent a repeating array of oppositely charged ions."},
    "13": {prompt:"Identify the ions in the CsF crystal diagram.",steps:["Cesium forms Cs⁺ and fluorine forms F⁻.","Cs⁺ is much larger than F⁻; ionic crystals alternate cations and anions."],answer:"Label the larger spheres Cs⁺ and the smaller spheres F⁻, alternating through the lattice.",concept:"Ion size and charge help identify particles in an ionic-solid model."},
    "3:a": {prompt:"Arrange C–O, N–O, and B–F in increasing bond polarity.",steps:["Use the electronegativity differences: C–O = |3.50 − 2.55| = 0.95; N–O = |3.50 − 3.04| = 0.46; B–F = |3.98 − 2.04| = 1.94.","A larger electronegativity difference means a more polar bond."],answer:"N–O < C–O < B–F.",concept:"Bond polarity increases with electronegativity difference."},
    "3:b": {prompt:"Arrange C–P, P–F, and C–Cl in increasing bond polarity.",steps:["C–P: |2.55 − 2.19| = 0.36.","C–Cl: |3.16 − 2.55| = 0.61.","P–F: |3.98 − 2.19| = 1.79."],answer:"C–P < C–Cl < P–F.",concept:"Compare absolute electronegativity differences, not the element symbols or bond order."},
    "4:a": {prompt:"Choose the more polar bond from H–X (1.82 D) and H–Y (0.44 D).",steps:["Bond dipole moment measures separation of partial charge.","The larger dipole moment corresponds to greater bond polarity."],answer:"H–X is more polar because its dipole moment (1.82 D) is greater than H–Y's (0.44 D).",concept:"A larger dipole moment indicates a more polar bond."},
    "4:b": {prompt:"Predict whether the H–Cl dipole moment is less than or greater than the H–Br value of 0.82 D.",steps:["Cl is more electronegative than Br (3.16 versus 2.96).","The H–Cl electronegativity difference is larger than the H–Br difference, so the H–Cl bond is more polar."],answer:"Greater than 0.82 D.",concept:"A larger electronegativity difference generally produces a larger bond dipole."},
    "6:a": {prompt:"Estimate the Cl–Cl bond length from the potential-energy curve.",steps:["The equilibrium bond length occurs at the internuclear distance where potential energy is at its minimum.","The known Cl–Cl bond length is about 199 pm, consistent with a curve minimum near 200 pm."],answer:"Approximately 200 pm.",concept:"The minimum of a potential-energy curve identifies the equilibrium internuclear distance."},
    "6:b": {prompt:"Estimate the Cl–Cl bond energy from the potential-energy curve.",steps:["Bond energy is the energy required to separate the bonded atoms, represented by the depth of the potential well relative to separated atoms.","The Cl–Cl bond dissociation energy is approximately 243 kJ mol⁻¹."],answer:"Approximately 240 kJ mol⁻¹.",concept:"A deeper potential-energy well corresponds to a stronger bond and greater bond energy."},
  ,
    "5:a": {prompt:"Classify Sn as a metal or nonmetal.",steps:["Tin (Sn) is located in the metal region of the periodic table."],answer:"Sn is a metal.",concept:"Metallic elements generally occupy the left and center of the periodic table."},
    "5:b": {prompt:"Classify Cl as a metal or nonmetal.",steps:["Chlorine is a halogen in Group 17 on the right side of the periodic table."],answer:"Cl is a nonmetal.",concept:"Halogens are nonmetals."},
    "5:c": {prompt:"Predict the bonding type in a compound of Sn and Cl from element types.",steps:["Sn is a metal and Cl is a nonmetal.","The introductory metal + nonmetal rule predicts ionic bonding, though actual bonding can have mixed character."],answer:"The simple prediction is ionic bonding.",concept:"Metal/nonmetal classification is a first-pass bonding model, not an absolute rule."},
    "5:d": {prompt:"Use physical properties to classify bonding in SnCl₂ and SnCl₄.",steps:["SnCl₂ is a crystalline solid with a 247 °C melting point and 623 °C boiling point, consistent with a strong ionic lattice.","SnCl₄ is a liquid at room temperature with a −34 °C melting point and 114 °C boiling point, consistent with discrete covalent molecules."],answer:"SnCl₂ is predominantly ionic; SnCl₄ is predominantly covalent (molecular).",concept:"Melting/boiling behavior and physical state can distinguish ionic lattices from molecular substances."},
  },
  "topic-4-5-4-6.pdf": {
    "4:a": { prompt: "Identify the limiting reactant when 100.0 g K reacts with 100.0 g Cl2.", steps: ["Balance the equation: 2K(s) + Cl2(g) → 2KCl(s).", "Convert to moles: n(K) = 100.0 g ÷ 39.10 g/mol = 2.558 mol; n(Cl2) = 100.0 g ÷ 70.90 g/mol = 1.410 mol.", "The available 1.410 mol Cl2 would require 2.821 mol K, but only 2.558 mol K is present."], answer: "K is the limiting reactant; Cl2 is in excess.", concept: "Compare available reactant moles with the stoichiometric ratio in the balanced equation." },
    "4:b": { prompt: "Determine the theoretical yield of KCl in grams.", steps: ["From 2K + Cl2 → 2KCl, the mole ratio K:KCl is 1:1.", "K is limiting, so n(KCl) = 2.558 mol.", "Molar mass KCl = 39.10 + 35.45 = 74.55 g/mol; mass = 2.558 mol × 74.55 g/mol = 190.7 g."], answer: "The theoretical yield is 190.7 g KCl.", concept: "The theoretical yield is calculated from the limiting reactant and the balanced-equation mole ratio." },
    "4:c": { prompt: "Determine the mass of reactant left over after the reaction.", steps: ["The 2:1 ratio requires half as many moles of Cl2 as K consumed: n(Cl2 consumed) = 2.558 ÷ 2 = 1.279 mol.", "Mass of Cl2 consumed = 1.279 mol × 70.90 g/mol ≈ 90.66 g.", "Subtract the amount consumed from the 100.0 g initially present: 100.0 − 90.66 = 9.34 g."], answer: "Approximately 9.34 g Cl2 remains unreacted.", concept: "Subtract the consumed excess reactant from its initial mass after using the limiting reactant to determine consumption." },
    "4:d": { prompt: "Calculate percent yield when the actual KCl yield is 162.1 g.", steps: ["Use percent yield = (actual yield ÷ theoretical yield) × 100%.", "Substitute: (162.1 g ÷ 190.7 g) × 100% ≈ 85.0%.", "Report three significant figures, consistent with the measured yields."], answer: "Percent yield = 85.0%.", concept: "Percent yield compares the product actually recovered with the maximum theoretical amount." }
  },
  "topic-4-7-4-9.pdf": {
    "2": { prompt: "Classify each reactant as an acid (H+ donor) or a base (H+ acceptor) in the three listed acid-base reactions.", steps: ["(a) HBr donates H+ to OH− from NaOH, forming water; HBr is the acid and NaOH is the base.", "(b) H2SO4 donates H+ to OH− from Ca(OH)2; H2SO4 is the acid and Ca(OH)2 is the base.", "(c) HNO3 donates H+ to OH− from KOH; HNO3 is the acid and KOH is the base.", "In each case, the acid supplies protons and the hydroxide base accepts them to form water."], answer: "(a) HBr = acid; NaOH = base. (b) H2SO4 = acid; Ca(OH)2 = base. (c) HNO3 = acid; KOH = base.", concept: "A Brønsted–Lowry acid donates a proton; a Brønsted–Lowry base accepts a proton." }

,
    "1": { prompt: "Write molecular and net ionic equations for mixing AgNO3(aq) with Na2CO3(aq), and K3PO4(aq) with Ca(NO3)2(aq).", steps: ["Ag+ and CO3²− form insoluble Ag2CO3. Balance the molecular equation as 2 AgNO3(aq) + Na2CO3(aq) → Ag2CO3(s) + 2 NaNO3(aq).", "Remove spectator Na+ and NO3− to obtain 2 Ag+(aq) + CO3²−(aq) → Ag2CO3(s).", "Ca²+ and PO4³− form insoluble Ca3(PO4)2. Balance the molecular equation as 2 K3PO4(aq) + 3 Ca(NO3)2(aq) → Ca3(PO4)2(s) + 6 KNO3(aq).", "Remove spectator K+ and NO3− to obtain 3 Ca²+(aq) + 2 PO4³−(aq) → Ca3(PO4)2(s)."], answer: "Ag reaction: 2 AgNO3 + Na2CO3 → Ag2CO3(s) + 2 NaNO3; net ionic 2 Ag+ + CO3²− → Ag2CO3(s). Calcium reaction: 2 K3PO4 + 3 Ca(NO3)2 → Ca3(PO4)2(s) + 6 KNO3; net ionic 3 Ca²+ + 2 PO4³− → Ca3(PO4)2(s).", concept: "Use solubility rules to identify precipitates, balance the molecular equation, then cancel spectator ions for the net ionic equation." },
    "3:a": { prompt: "When HCl reacts with water, identify water's role as an acid or base and state whether it donates or accepts a proton.", steps: ["HCl transfers H+ to H2O.", "Water accepts the proton and becomes H3O+."], answer: "Water acts as a base because it accepts a proton.", concept: "A Brønsted–Lowry base accepts H+." },
    "3:b": { prompt: "When NH3 reacts with water, identify water's role as an acid or base and state whether it donates or accepts a proton.", steps: ["NH3 accepts H+ from water to form NH4+.", "Water loses H+ and forms OH−."], answer: "Water acts as an acid because it donates a proton.", concept: "A Brønsted–Lowry acid donates H+." },
    "4": { prompt: "Write the conjugate base of each acid in Question 4.", steps: ["A conjugate base is formed when the acid loses exactly one H+.", "Apply this to each listed acid and preserve the remaining atoms and charge."], answer: "HF → F−; HNO3 → NO3−; H2CO3 → HCO3−; H2SO4 → HSO4−; H3O+ → H2O; NH4+ → NH3; HCO3− → CO3²−; HPO4²− → PO4³−.", concept: "Conjugate acid-base pairs differ by exactly one proton." },
    "5": { prompt: "Write the conjugate acid of each base in Question 5.", steps: ["A conjugate acid is formed when the base accepts exactly one H+.", "Add one proton to each listed base and update the charge by +1."], answer: "NH3 → NH4+; ClO− → HClO; NO2− → HNO2; OH− → H2O; HCO3− → H2CO3; S²− → HS−; SO3²− → HSO3−; PO4³− → HPO4²−.", concept: "A conjugate acid has one more proton than its base and a charge one unit more positive." },
    "6": { prompt: "Identify the two conjugate acid-base pairs in CH3CH2COOH(aq) + H2O(l) ⇌ CH3CH2COO−(aq) + H3O+(aq).", steps: ["Propanoic acid donates H+ to water, becoming propanoate.", "Water accepts H+, becoming hydronium."], answer: "CH3CH2COOH / CH3CH2COO− and H2O / H3O+.", concept: "Each conjugate pair differs by one H+." },
    "7": { prompt: "Identify the two conjugate acid-base pairs in CH3CH2NH2(aq) + H2O(l) ⇌ CH3CH2NH3+(aq) + OH−(aq).", steps: ["Ethylamine accepts H+ from water and becomes ethylammonium.", "Water donates H+ and becomes hydroxide."], answer: "CH3CH2NH2 / CH3CH2NH3+ and H2O / OH−.", concept: "The acid loses H+ and its conjugate base remains; the base gains H+ and its conjugate acid forms." },
  ,
    "8": {prompt:"Balance Al(s) + Cu²⁺(aq) → Al³⁺(aq) + Cu(s) using half-reactions.",steps:["Oxidation: Al → Al³⁺ + 3e⁻. Reduction: Cu²⁺ + 2e⁻ → Cu.","Multiply the oxidation half-reaction by 2 and the reduction half-reaction by 3 so both transfer six electrons.","Add the half-reactions and cancel electrons."],answer:"2Al(s) + 3Cu²⁺(aq) → 2Al³⁺(aq) + 3Cu(s). The original equation is not charge-balanced because its left and right charges differ.",concept:"Redox equations must conserve atoms and charge; electrons lost must equal electrons gained."},
    "10": {prompt:"Assign oxidation numbers to every element in the listed substances.",steps:["Elemental forms have oxidation number 0; Group 1 metals are +1, Group 2 metals +2, F is −1, and O is usually −2 except in peroxides and OF₂.","Use H = +1 with nonmetals (−1 in metal hydrides) and make the sum equal the compound/ion charge.","Apply these rules to each formula."],answer:"Fe 0; Cl₂: Cl 0; P₄: P 0; NaBr: Na +1, Br −1; Ca₃N₂: Ca +2, N −3; Fe₂O₃: Fe +3, O −2; MgS: Mg +2, S −2; SO₂: S +4, O −2; CH₃F: C −2, H +1, F −1; CHF₃: C +2, H +1, F −1; CO: C +2, O −2; OF₂: O +2, F −1; H₂O₂: H +1, O −1; KH: K +1, H −1; CaH₂: Ca +2, H −1; HBr: H +1, Br −1; HBrO: H +1, Br +1, O −2; HBrO₂: H +1, Br +3, O −2; HBrO₃: H +1, Br +5, O −2; Na₂CO₃: Na +1, C +4, O −2; BaCrO₄: Ba +2, Cr +6, O −2; NH₄⁺: N −3, H +1; OH⁻: O −2, H +1; NO₃⁻: N +5, O −2; ClO₄⁻: Cl +7, O −2; SO₃²⁻: S +4, O −2; SO₄²⁻: S +6, O −2; Cr₂O₇²⁻: Cr +6, O −2; PO₄³⁻: P +5, O −2; H₃O⁺: H +1, O −2.",concept:"Oxidation numbers are assigned atom by atom; their sum must equal the total charge."},
    "11": {prompt:"Identify the oxidized and reduced elements in the five redox equations.",steps:["3Fe(NO₃)₂ + 2Al → 3Fe + 2Al(NO₃)₃: Fe +2→0 is reduced; Al 0→+3 is oxidized.","2BrO₃⁻ + 3N₂H₄ → 2Br⁻ + 6H₂O + 3N₂: Br +5→−1 is reduced; N −2→0 is oxidized.","P₄ + 10HClO + 6H₂O → 4H₃PO₄ + 10HCl: P 0→+5 is oxidized; Cl +1→−1 is reduced.","2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O: C −3→+4 is oxidized; O 0→−2 is reduced.","Mn + H₂SO₄ → MnSO₄ + H₂: Mn 0→+2 is oxidized; H +1→0 is reduced."],answer:"(1) Oxidized Al; reduced Fe. (2) Oxidized N; reduced Br. (3) Oxidized P; reduced Cl. (4) Oxidized C; reduced O. (5) Oxidized Mn; reduced H.",concept:"Oxidation is an increase in oxidation number; reduction is a decrease."},
    "12": {prompt:"Classify each reaction as precipitation, acid–base, or redox.",steps:["Zn + 2HCl → ZnCl₂ + H₂: Zn changes 0→+2 and H +1→0, so redox.","Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O: proton transfer/neutralization, acid–base.","AgNO₃ + HCl → AgCl(s) + HNO₃: AgCl solid forms, precipitation.","2KOH + H₂SO₄ → 2H₂O + K₂SO₄: acid–base neutralization.","Pb(NO₃)₂ + K₂SO₄ → 2KNO₃ + PbSO₄(s): PbSO₄ precipitates.","PbS + 4H₂O₂ → 4H₂O + PbSO₄: S is oxidized from −2 to +6 while peroxide oxygen is reduced, so redox."],answer:"In order: redox; acid–base; precipitation; acid–base; precipitation; redox.",concept:"Use proton transfer for acid–base, insoluble-solid formation for precipitation, and oxidation-number changes for redox."},
    "2:a": {prompt:"Classify HBr and NaOH as acid or base in the reaction.",steps:["HBr donates H⁺ to form H₂O from OH⁻.","NaOH supplies OH⁻, which accepts a proton."],answer:"HBr is the acid; NaOH is the base.",concept:"Brønsted–Lowry acids donate protons and bases accept protons."},
    "2:b": {prompt:"Classify H₂SO₄ and Ca(OH)₂ as acid or base.",steps:["H₂SO₄ donates protons.","Ca(OH)₂ supplies OH⁻ ions that accept protons."],answer:"H₂SO₄ is the acid; Ca(OH)₂ is the base.",concept:"Acid–base reactions transfer protons."},
    "2:c": {prompt:"Classify HNO₃ and KOH as acid or base.",steps:["HNO₃ donates H⁺.","KOH supplies OH⁻, which accepts H⁺ to form water."],answer:"HNO₃ is the acid; KOH is the base.",concept:"Strong acids donate protons; metal hydroxides act as bases through OH⁻."},
    "9:a": {prompt:"Combine the Fe²⁺ oxidation and permanganate reduction half-reactions.",steps:["Multiply Fe²⁺ → Fe³⁺ + e⁻ by 5 to provide five electrons.","Add 5Fe²⁺ → 5Fe³⁺ + 5e⁻ to 5e⁻ + MnO₄⁻ + 8H⁺ → Mn²⁺ + 4H₂O.","Cancel electrons; atoms and charge are balanced."],answer:"5Fe²⁺(aq) + MnO₄⁻(aq) + 8H⁺(aq) → 5Fe³⁺(aq) + Mn²⁺(aq) + 4H₂O(l).",concept:"Scale half-reactions to equalize electron transfer before adding them."},
    "9:b": {prompt:"Combine the chloride oxidation and dichromate reduction half-reactions.",steps:["Multiply 2Cl⁻ → Cl₂ + 2e⁻ by 3 to produce six electrons.","Add 6Cl⁻ → 3Cl₂ + 6e⁻ to 6e⁻ + 14H⁺ + Cr₂O₇²⁻ → 2Cr³⁺ + 7H₂O.","Cancel six electrons."],answer:"6Cl⁻(aq) + 14H⁺(aq) + Cr₂O₇²⁻(aq) → 3Cl₂(g) + 2Cr³⁺(aq) + 7H₂O(l).",concept:"Balance electrons first, then verify atoms and total charge."},
    "9:c": {prompt:"Combine the nickel oxidation and nitrate reduction half-reactions.",steps:["The oxidation half-reaction Ni → Ni²⁺ + 2e⁻ is multiplied by 3 to release six electrons.","The reduction half-reaction 3e⁻ + 4H⁺ + NO₃⁻ → NO + 2H₂O is multiplied by 2 to consume six electrons.","Add the equations and cancel electrons."],answer:"3Ni(s) + 8H⁺(aq) + 2NO₃⁻(aq) → 3Ni²⁺(aq) + 2NO(g) + 4H₂O(l).",concept:"Electron balancing is required in addition to atom and charge balancing."},
    "13:a": {prompt:"Write the balanced net ionic equation for Ca reacting with HCl.",steps:["HCl supplies H⁺; Cl⁻ is a spectator ion.","Ca is oxidized to Ca²⁺ and H⁺ is reduced to H₂."],answer:"Ca(s) + 2H⁺(aq) → Ca²⁺(aq) + H₂(g).",concept:"Remove spectator ions when writing net ionic redox equations."},
    "13:b": {prompt:"Write the balanced net ionic equation for Fe reacting with HBr to form Fe³⁺.",steps:["Fe is oxidized from 0 to +3; H⁺ is reduced from +1 to H₂.","Two Fe atoms release six electrons, reducing six H⁺ to three H₂ molecules."],answer:"2Fe(s) + 6H⁺(aq) → 2Fe³⁺(aq) + 3H₂(g).",concept:"Balance electron transfer and omit spectator bromide ions."},
    "13:c": {prompt:"Write the balanced net ionic equation for Zn reacting with Ni²⁺.",steps:["Zn is oxidized to Zn²⁺ and Ni²⁺ is reduced to Ni(s).","The electron transfer and atom counts balance 1:1."],answer:"Zn(s) + Ni²⁺(aq) → Zn²⁺(aq) + Ni(s).",concept:"A more easily oxidized metal can reduce another metal's cations."},
    "13:d": {prompt:"Write the balanced net ionic equation for Al reacting with Ag⁺.",steps:["Al → Al³⁺ + 3e⁻; Ag⁺ + e⁻ → Ag.","Multiply the silver reduction by 3 to consume the three electrons from Al."],answer:"Al(s) + 3Ag⁺(aq) → Al³⁺(aq) + 3Ag(s).",concept:"Match electrons lost and gained in redox half-reactions."},
    "13:e": {prompt:"Write the balanced net ionic equation for Cu reacting with nitric acid to form NO₂.",steps:["Cu is oxidized to Cu²⁺; nitrate is reduced to NO₂ in acidic solution.","Two nitrate ions are reduced, requiring four H⁺ and producing two H₂O.","Cancel the two nitrate ions that remain as spectators in Cu(NO₃)₂."],answer:"Cu(s) + 4H⁺(aq) + 2NO₃⁻(aq) → Cu²⁺(aq) + 2NO₂(g) + 2H₂O(l).",concept:"Net ionic equations retain the nitrate ions that undergo redox and cancel spectator nitrate ions."},
    "13:f": {prompt:"Write the balanced net ionic equation for Br₂ reacting with iodide.",steps:["Br₂ is reduced to Br⁻; I⁻ is oxidized to I₂.","Two iodide ions provide the two electrons needed to reduce one Br₂ molecule."],answer:"Br₂(aq) + 2I⁻(aq) → 2Br⁻(aq) + I₂(aq).",concept:"Halogen displacement reactions are redox reactions driven by electron transfer."},
  },
  "topic-5-1-5-3.pdf": {
    "5": { prompt: "At what point during a typical reaction is the reaction rate greatest? Justify using concentration and rate.", steps: ["For a typical positive-order rate law, rate increases with reactant concentration.", "Reactant concentrations are usually greatest at the start of the reaction.", "As reactants are consumed, their concentrations and often the rate decrease."], answer: "Usually at the beginning, when reactant concentrations are highest, assuming the rate law depends positively on those reactants.", concept: "Use the stated rate law when available; the starting-rate conclusion is not universal for every possible mechanism." }

,
    "16:a": { prompt: "Calculate the rate constant for 13N radioactive decay when its half-life is 10 minutes.", steps: ["For first-order decay, t1/2 = 0.693/k.", "Rearrange: k = 0.693/(10 min) = 0.0693 min⁻¹."], answer: "k = 0.0693 min⁻¹.", concept: "Radioactive decay has a constant half-life and follows first-order kinetics." },
    "16:b": { prompt: "A 64 mg sample of 13N has a half-life of 10 minutes. Find the mass remaining after 50 minutes.", steps: ["50 minutes is five half-lives.", "Each half-life halves the mass: 64 → 32 → 16 → 8 → 4 → 2 mg."], answer: "2.0 mg 13N remains.", concept: "After n half-lives, the remaining fraction is (1/2)^n." },
    "16:c": { prompt: "A 125 mg sample of 13N has a half-life of 10 minutes. Find the mass remaining after 37 minutes.", steps: ["Use m = m0(1/2)^(t/t1/2).", "m = 125 mg × (1/2)^(37/10) ≈ 9.62 mg."], answer: "9.6 mg 13N remains.", concept: "The half-life model applies to any elapsed time, not only whole numbers of half-lives." },
    "20:a": { prompt: "Calculate the missing ln[H2O2] and 1/[H2O2] values for the table at 0, 2, 4, and 6 hours.", steps: ["Take the natural logarithm of each concentration: ln(1.000) = 0; ln(0.794) ≈ −0.231; ln(0.630) ≈ −0.462; ln(0.500) ≈ −0.693.", "Take reciprocals: 1/1.000 = 1.000; 1/0.794 ≈ 1.259; 1/0.630 ≈ 1.587; 1/0.500 = 2.000 M⁻¹."], answer: "ln[H2O2]: 0.000, −0.231, −0.462, −0.693. Reciprocal (M⁻¹): 1.000, 1.259, 1.587, 2.000.", concept: "Transform concentration data with ln[A] and 1/[A] to test first- and second-order integrated rate laws." },
    "20:b": { prompt: "Determine the reaction order for H2O2 decomposition from the concentration-time table and justify.", steps: ["The ln[H2O2] values decrease by approximately 0.231 every 2 hours, giving a linear ln[A] versus time relationship.", "A linear ln[A] versus time plot indicates first-order kinetics."], answer: "First order with respect to H2O2.", concept: "For a first-order reaction, ln[A] versus time is linear with slope −k." },
    "20:c": { prompt: "Calculate the rate constant k for H2O2 decomposition using the table.", steps: ["For a first-order reaction, ln[A]t = ln[A]0 − kt.", "Using t = 6 h and [A] = 0.500 M from [A]0 = 1.000 M: k = ln(1.000/0.500)/6 h = 0.6931/6 h."], answer: "k ≈ 0.116 h⁻¹.", concept: "The magnitude of the slope of ln[A] versus time is the first-order rate constant." },
    "20:d": { prompt: "Calculate the half-life of H2O2 for the decomposition in Question 20.", steps: ["For a first-order reaction, t1/2 = 0.693/k.", "t1/2 = 0.693/(0.1155 h⁻¹) ≈ 6.00 h."], answer: "t1/2 ≈ 6.0 h.", concept: "A first-order reaction has a constant half-life independent of starting concentration." },
    "20:e": { prompt: "Calculate the expected [H2O2] after 8 hours for the decomposition in Question 20.", steps: ["Use [A]t = [A]0e^(−kt), with [A]0 = 1.000 M and k ≈ 0.1155 h⁻¹.", "[H2O2]8h = 1.000 e^(−0.1155×8) ≈ 0.397 M."], answer: "[H2O2] ≈ 0.397 M after 8 h.", concept: "Use the integrated first-order rate law to predict concentration at a specified time." },
  },
  "topic-6-6-6-9.pdf": {
    "8:a": { prompt: "Calculate the energy change when 36.032 g H2O(g) condenses to H2O(l) under standard conditions.", steps: ["Convert the water mass to moles: 36.032 g ÷ 18.016 g/mol = 2.000 mol.", "For one mole, ΔH = ΔH°f[H2O(l)] − ΔH°f[H2O(g)] = −285.8 − (−241.8) = −44.0 kJ/mol.", "Multiply by the amount: ΔH = 2.000 mol × (−44.0 kJ/mol) = −88.0 kJ."], answer: "ΔH = −88.0 kJ; 88.0 kJ of heat is released.", concept: "Use formation enthalpies to calculate the enthalpy change for a phase change, then multiply by the number of moles." },
    "8:b": { prompt: "State the direction of heat flow for the condensation in Question 8(a).", steps: ["The enthalpy change calculated in part (a) is negative.", "A negative ΔH means the water sample releases heat to its surroundings."], answer: "Heat flows from the H2O sample to the surroundings.", concept: "Exothermic processes release heat from the system to the surroundings." },
    "9": { prompt: "What is the standard enthalpy of formation of an element in its standard state?", steps: ["Standard enthalpy of formation is defined for forming one mole of a substance from its constituent elements in their standard states.", "For an element already in its standard state, the formation process requires no net reaction.", "This is the reference value for formation-enthalpy tables."], answer: "ΔH°f = 0 kJ/mol for an element in its standard state.", concept: "The zero is a reference convention; it does not mean the element contains no energy." }
  },
  "topic-8-1-8-3.pdf": {
    "4": { prompt: "State how pH changes when [H3O+] increases and when [OH−] increases.", steps: ["pH = −log[H3O+], so increasing hydronium concentration lowers pH.", "At 25 °C, pH + pOH = 14.00 and pOH = −log[OH−].", "Increasing hydroxide concentration lowers pOH, so pH increases."], answer: "As [H3O+] increases, pH decreases. As [OH−] increases, pH increases.", concept: "Hydronium and hydroxide concentrations shift pH in opposite directions at a fixed temperature." }

,
    "1": { prompt: "Identify both conjugate acid-base pairs in HCN(aq) + H2O(l) ⇌ CN−(aq) + H3O+(aq).", steps: ["HCN donates H+ and becomes CN−.", "H2O accepts H+ and becomes H3O+."], answer: "HCN / CN− and H2O / H3O+.", concept: "Conjugate acid-base pairs differ by one proton." },
    "2": { prompt: "Identify both conjugate acid-base pairs in CH3NH2(aq) + H2O(l) ⇌ CH3NH3+(aq) + OH−(aq).", steps: ["CH3NH2 accepts H+ and becomes CH3NH3+.", "H2O donates H+ and becomes OH−."], answer: "H2O / OH− and CH3NH2 / CH3NH3+.", concept: "A base gains H+ to form its conjugate acid; an acid loses H+ to form its conjugate base." },
    "3": { prompt: "Complete the pH/pOH tables in Question 3 using pH = −log[H3O+], pOH = −log[OH−], and pH + pOH = 14.00 at 25°C.", steps: ["For pH 11.65 and 6.14, [H3O+] = 10^−pH = 2.2 × 10⁻¹² M and 7.2 × 10⁻⁷ M, respectively.", "For [H3O+] = 4.3 × 10⁻⁵ M and 0.015 M, pH = 4.37 and 1.82.", "For pOH 10.39 and 8.04, [OH−] = 4.1 × 10⁻¹¹ M and 9.1 × 10⁻⁹ M; pH = 3.61 and 5.96.", "For [OH−] = 6.8 × 10⁻⁶ M and 2.8 × 10⁻⁴ M, pOH = 5.17 and 3.55; pH = 8.83 and 10.45."], answer: "Left table: 2.2 × 10⁻¹² M; 7.2 × 10⁻⁷ M; pH 4.37; pH 1.82. Right table: 4.1 × 10⁻¹¹ M and pH 3.61; 9.1 × 10⁻⁹ M and pH 5.96; pOH 5.17 and pH 8.83; pOH 3.55 and pH 10.45.", concept: "Convert between pH/pOH and ion concentration using negative logarithms and the 25°C relation pH + pOH = 14.00." },
    "7": { prompt: "Evaluate the seven statements about pure water, pH, and temperature as true or false.", steps: ["Pure water is neutral at any temperature, meaning [H3O+] = [OH−] and pH = pOH; its pH is not necessarily 7.0 except when pKw = 14.0.", "Because autoionization is endothermic, Kw increases with temperature and pH of neutral water decreases as temperature rises.", "At temperatures above 25°C, neutral water can have pH below 7 while remaining neutral."], answer: "In order: False, True, True, False, True, True, False.", concept: "Neutrality means equal hydronium and hydroxide concentrations; neutral pH is temperature-dependent." },
    "8:a": { prompt: "Calculate the pH of 0.050 M HCl(aq) at 25°C.", steps: ["HCl is a strong acid, so [H3O+] ≈ 0.050 M.", "pH = −log(0.050) = 1.301."], answer: "pH = 1.30.", concept: "Strong acids ionize essentially completely, making hydronium concentration equal to the acid concentration at ordinary concentrations." },
    "8:b": { prompt: "Calculate the pH of 2.5 × 10⁻⁴ M HBr(aq) at 25°C.", steps: ["HBr is a strong acid, so [H3O+] ≈ 2.5 × 10⁻⁴ M.", "pH = −log(2.5 × 10⁻⁴) = 3.602."], answer: "pH = 3.60.", concept: "Calculate pH from the hydronium concentration using the negative base-10 logarithm." },
    "8:c": { prompt: "Find the concentration of HClO4(aq) if its pH is 4.25 at 25°C.", steps: ["Convert pH to hydronium concentration: [H3O+] = 10^−4.25 = 5.62 × 10⁻⁵ M.", "HClO4 is a strong monoprotic acid, so its concentration is approximately equal to [H3O+]."], answer: "[HClO4] ≈ 5.6 × 10⁻⁵ M.", concept: "For a strong monoprotic acid, the acid concentration is approximately the equilibrium hydronium concentration." },
    "17": { prompt: "Use the table to compare acid strength with Ka and pH.", steps: ["A stronger acid ionizes to a greater extent and has a larger Ka.", "For acids at the same initial concentration, the stronger acid produces more H3O+ and therefore a lower pH."], answer: "(a) Higher Ka. (b) Lower pH.", concept: "Acid strength is reflected by Ka; at equal initial concentration, stronger acids generally have lower pH." },
    "18": { prompt: "Predict how equilibrium [H3O+], pH, and percent ionization change as the initial concentration of a weak acid decreases.", steps: ["Dilution lowers the equilibrium hydronium concentration, so pH rises.", "For a weak acid, dilution increases the fraction of acid molecules that ionize, even though the hydronium concentration decreases."], answer: "[H3O+] decreases; pH increases; percent ionization increases.", concept: "Dilution of a weak acid increases its percent ionization but decreases its equilibrium hydronium concentration." },
  },
  "topic-8-4-8-5.pdf": {
    "4:a": { prompt: "Calculate the pH of 0.20 M HNO2(aq), given Ka = 4.0 × 10⁻⁴.", steps: ["Write the ionization equilibrium: HNO2(aq) + H2O(l) ⇌ H3O+(aq) + NO2−(aq).", "Let x = [H3O+] at equilibrium. Then [NO2−] = x and [HNO2] = 0.20 − x, so Ka = x²/(0.20 − x) = 4.0 × 10⁻⁴.", "Rearrange to x² + (4.0 × 10⁻⁴)x − 8.0 × 10⁻⁵ = 0. The positive root is x ≈ 8.75 × 10⁻³ M.", "Calculate pH = −log(8.75 × 10⁻³) ≈ 2.058, then report two decimal places."], answer: "pH = 2.06.", concept: "For a weak acid, use Ka and an equilibrium table to determine hydronium concentration; pH is −log[H3O+]." },
    "6:a": { prompt: "Write the balanced ionization equation for HOCl in aqueous solution.", steps: ["HOCl donates a proton to water.", "Water accepts the proton to form H3O+; the conjugate base is OCl−.", "Check that atoms and total charge balance."], answer: "HOCl(aq) + H2O(l) ⇌ H3O+(aq) + OCl−(aq).", concept: "A weak acid ionizes reversibly in water and forms its conjugate base plus hydronium." }
  ,
    "1": {prompt:"Complete the strong-acid/strong-base table for 100.0 mL of 0.10 M HCl mixed with 100.0 mL of 0.10 M NaOH.",steps:["Moles H⁺ = 0.1000 L × 0.10 M = 0.0100 mol; moles OH⁻ = 0.0100 mol.","The reactants are equimolar, so neither is in excess. Total volume = 0.2000 L.","At 25 °C, a strong acid and strong base neutralize completely, leaving a neutral salt solution."],answer:"Final volume = 0.2000 L; excess H⁺ = 0 and excess OH⁻ = 0; pH ≈ 7.00.",concept:"For a strong-acid/strong-base mixture, compare moles of H⁺ and OH⁻ before calculating any excess concentration."},
    "2": {prompt:"Complete the strong-acid/strong-base table for 260.0 mL of 0.10 M HBr mixed with 240.0 mL of 0.10 M KOH.",steps:["n(H⁺) = 0.2600 × 0.10 = 0.0260 mol; n(OH⁻) = 0.2400 × 0.10 = 0.0240 mol.","Excess H⁺ = 0.0020 mol. Total volume = 0.5000 L, so [H⁺] = 0.0020/0.5000 = 0.0040 M.","pH = −log(0.0040) = 2.40."],answer:"0.0020 mol H⁺ remains; final [H⁺] = 0.0040 M; pH ≈ 2.40.",concept:"After neutralization, calculate pH from the excess strong acid divided by total solution volume."},
    "3": {prompt:"Complete the table for 380.0 mL of 0.10 M HNO₃ mixed with 420.0 mL of 0.050 M Ba(OH)₂.",steps:["n(H⁺) = 0.3800 × 0.10 = 0.0380 mol.","n(Ba(OH)₂) = 0.4200 × 0.050 = 0.0210 mol, giving n(OH⁻) = 2(0.0210) = 0.0420 mol.","Excess OH⁻ = 0.0040 mol. Total volume = 0.8000 L, so [OH⁻] = 0.0050 M; pOH = 2.30."],answer:"0.0040 mol OH⁻ remains; [OH⁻] = 0.0050 M; pH ≈ 11.70.",concept:"Account for the number of hydroxide ions produced per formula unit of a strong base."},
    "4:b": {prompt:"Calculate the pH before the half-equivalence point: 50.0 mL of 0.20 M HNO₂ titrated with 20.0 mL of 0.20 M NaOH.",steps:["Initial HNO₂ = 0.0500 × 0.20 = 0.0100 mol; OH⁻ added = 0.0200 × 0.20 = 0.00400 mol.","After neutralization: HNO₂ = 0.00600 mol; NO₂⁻ = 0.00400 mol; total volume = 0.0700 L.","pKa = −log(4.0 × 10⁻⁴) = 3.398; pH = pKa + log(0.00400/0.00600)."],answer:"[HNO₂] = 0.0857 M; [NO₂⁻] = 0.0571 M; pH ≈ 3.22.",concept:"Before equivalence, a weak-acid/strong-base mixture is a buffer; use the remaining acid and formed conjugate base."},
    "4:c": {prompt:"Calculate the pH at the half-equivalence point for the HNO₂/NaOH titration.",steps:["At half-equivalence, half the original 0.0100 mol HNO₂ has been neutralized, leaving 0.00500 mol HNO₂ and forming 0.00500 mol NO₂⁻.","The acid and conjugate-base concentrations are equal, so the logarithm term in Henderson–Hasselbalch is zero."],answer:"pH = pKa = −log(4.0 × 10⁻⁴) ≈ 3.40.",concept:"At half-equivalence for a weak-acid titration, pH equals pKa."},
    "4:d": {prompt:"Calculate the pH after 30.0 mL of 0.20 M NaOH has been added to 50.0 mL of 0.20 M HNO₂.",steps:["OH⁻ added = 0.0300 × 0.20 = 0.00600 mol; initial acid = 0.0100 mol.","After reaction, HNO₂ = 0.00400 mol and NO₂⁻ = 0.00600 mol.","pH = 3.398 + log(0.00600/0.00400)."],answer:"pH ≈ 3.57.",concept:"Past half-equivalence but before equivalence, the buffer contains more conjugate base than weak acid."},
    "4:e": {prompt:"Calculate the pH at the equivalence point of the HNO₂/NaOH titration.",steps:["At equivalence, all 0.0100 mol HNO₂ has become NO₂⁻; total volume = 0.1000 L, so [NO₂⁻] = 0.100 M.","Kb(NO₂⁻) = Kw/Ka = 1.0 × 10⁻¹⁴/(4.0 × 10⁻⁴) = 2.5 × 10⁻¹¹.","[OH⁻] ≈ √(KbC) = √(2.5 × 10⁻¹²) ≈ 1.58 × 10⁻⁶ M."],answer:"pOH ≈ 5.80; pH ≈ 8.20.",concept:"At equivalence in a weak-acid/strong-base titration, the conjugate base hydrolyzes to make the solution basic."},
    "4:f": {prompt:"Calculate the pH after 55.0 mL of 0.20 M NaOH has been added to 50.0 mL of 0.20 M HNO₂.",steps:["OH⁻ added = 0.0550 × 0.20 = 0.0110 mol; initial acid = 0.0100 mol.","Excess OH⁻ = 0.00100 mol. Total volume = 0.1050 L, so [OH⁻] = 0.00952 M.","pOH = −log(0.00952) ≈ 2.02; pH = 14.00 − pOH."],answer:"pH ≈ 11.98.",concept:"Past equivalence, excess strong base controls the pH."},
    "5:a": {prompt:"Calculate the pH of 0.20 M NH₃ with Kb = 1.8 × 10⁻⁵.",steps:["For NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, let x = [OH⁻].","Kb = x²/(0.20 − x); using the small-x approximation, x ≈ √(1.8 × 10⁻⁵ × 0.20) ≈ 1.9 × 10⁻³ M.","pOH ≈ 2.72, so pH = 14.00 − 2.72."],answer:"[OH⁻] ≈ 1.9 × 10⁻³ M; pOH ≈ 2.72; pH ≈ 11.28.",concept:"For a weak base, use Kb and the equilibrium concentration of OH⁻ to calculate pH."},
    "5:b": {prompt:"Calculate the pH before the half-equivalence point: 50.0 mL of 0.20 M NH₃ titrated with 20.0 mL of 0.20 M HNO₃.",steps:["Initial NH₃ = 0.0100 mol; H₃O⁺ added = 0.00400 mol.","After reaction: NH₃ = 0.00600 mol and NH₄⁺ = 0.00400 mol; total volume = 0.0700 L.","pKb = −log(1.8 × 10⁻⁵) = 4.745; pOH = pKb + log(0.00400/0.00600), then pH = 14 − pOH."],answer:"[NH₃] = 0.0857 M; [NH₄⁺] = 0.0571 M; pH ≈ 9.43.",concept:"Before equivalence, a weak-base/strong-acid titration forms a buffer of base and conjugate acid."},
    "5:c": {prompt:"Calculate the pH at the half-equivalence point for NH₃ titrated with HNO₃.",steps:["At half-equivalence, NH₃ and NH₄⁺ have equal concentrations.","Therefore pOH = pKb and pH = 14 − pKb = pKa(NH₄⁺)."],answer:"pH ≈ 9.26.",concept:"At half-equivalence for a weak-base titration, pH equals the pKa of the conjugate acid."},
    "5:d": {prompt:"Calculate the pH after 30.0 mL of 0.20 M HNO₃ has been added to 50.0 mL of 0.20 M NH₃.",steps:["Initial NH₃ = 0.0100 mol; acid added = 0.00600 mol.","After reaction: NH₃ = 0.00400 mol and NH₄⁺ = 0.00600 mol.","pOH = pKb + log(0.00600/0.00400) = 4.745 + log(1.5); pH = 14 − pOH."],answer:"pH ≈ 9.08.",concept:"Past half-equivalence, the conjugate acid exceeds the remaining weak base."},
    "5:e": {prompt:"Calculate the pH at the equivalence point for NH₃ titrated with HNO₃.",steps:["At equivalence, 0.0100 mol NH₃ becomes NH₄⁺ in 0.1000 L, so [NH₄⁺] = 0.100 M.","Ka(NH₄⁺) = Kw/Kb = 1.0 × 10⁻¹⁴/(1.8 × 10⁻⁵) = 5.56 × 10⁻¹⁰.","[H₃O⁺] ≈ √(KaC) ≈ 7.46 × 10⁻⁶ M."],answer:"pH ≈ 5.13.",concept:"At equivalence in a weak-base/strong-acid titration, the conjugate acid makes the solution acidic."},
    "5:f": {prompt:"Calculate the pH after 55.0 mL of 0.20 M HNO₃ has been added to 50.0 mL of 0.20 M NH₃.",steps:["Acid added = 0.0110 mol; initial NH₃ = 0.0100 mol.","Excess H₃O⁺ = 0.00100 mol in 0.1050 L, so [H₃O⁺] = 0.00952 M.","pH = −log(0.00952)."],answer:"pH ≈ 2.02.",concept:"Past equivalence, excess strong acid controls the pH."},
  ,
    "6:b": {prompt:"Write the ionization equation for methylamine, CH₃NH₂, in water.",steps:["Methylamine is a weak Brønsted–Lowry base and accepts a proton from water.","Water donates H⁺ and becomes OH⁻."],answer:"CH₃NH₂(aq) + H₂O(l) ⇌ CH₃NH₃⁺(aq) + OH⁻(aq).",concept:"Weak bases react reversibly with water to form their conjugate acids and OH⁻."},
    "6:c": {prompt:"Complete the Ka/Kb table for HOCl/OCl⁻ and CH₃NH₃⁺/CH₃NH₂.",steps:["For conjugate pairs, Ka × Kb = Kw = 1.0 × 10⁻¹⁴ at 25 °C.","Kb(OCl⁻) = Kw/Ka(HOCl) = 1.0 × 10⁻¹⁴/(3.0 × 10⁻⁸).","Ka(CH₃NH₃⁺) = Kw/Kb(CH₃NH₂) = 1.0 × 10⁻¹⁴/(4.4 × 10⁻⁴)."],answer:"Kb(OCl⁻) = 3.3 × 10⁻⁷; Ka(CH₃NH₃⁺) = 2.3 × 10⁻¹¹.",concept:"Ka and Kb of a conjugate pair are related by Kw."},
    "6:d": {prompt:"Write the acid–base reaction when HOCl and CH₃NH₂ are mixed.",steps:["HOCl donates a proton to methylamine.","The products are the conjugate base OCl⁻ and conjugate acid CH₃NH₃⁺."],answer:"HOCl(aq) + CH₃NH₂(aq) ⇌ OCl⁻(aq) + CH₃NH₃⁺(aq).",concept:"A proton transfer forms the conjugate base of the acid and the conjugate acid of the base."},
    "6:e": {prompt:"Determine whether an equimolar HOCl/CH₃NH₂ mixture is acidic, basic, or neutral.",steps:["The reaction forms OCl⁻ and CH₃NH₃⁺ in equal amounts.","Kb(OCl⁻) ≈ 3.3 × 10⁻⁷, while Ka(CH₃NH₃⁺) ≈ 2.3 × 10⁻¹¹.","The base hydrolysis of OCl⁻ is much stronger than the acid ionization of CH₃NH₃⁺."],answer:"The solution is basic because Kb(OCl⁻) is much greater than Ka(CH₃NH₃⁺).",concept:"For a salt containing a weak-acid conjugate base and weak-base conjugate acid, compare Kb and Ka to predict pH."},
    "8:a": {prompt:"Determine the concentration of formic acid from the titration curve.",steps:["The pH at 12.5 mL titrant is 3.75, the half-equivalence point; therefore the equivalence volume is 25.0 mL.","Moles HCO₂H initially = moles NaOH at equivalence = 0.0250 L × 0.20 M = 0.00500 mol.","Divide by the 0.0500 L acid sample volume."],answer:"[HCO₂H] = 0.00500 mol/0.0500 L = 0.100 M.",concept:"At equivalence for a monoprotic acid, initial acid moles equal added OH⁻ moles."},
    "8:b": {prompt:"Calculate Ka for formic acid when pH = 3.75 at half-equivalence.",steps:["At half-equivalence, [HCO₂H] = [HCO₂⁻], so pH = pKa.","pKa = 3.75, therefore Ka = 10⁻³·⁷⁵."],answer:"Ka ≈ 1.78 × 10⁻⁴.",concept:"At the half-equivalence point of a weak-acid titration, pH equals pKa."},
    "8:c": {prompt:"Describe how the titration curve changes for 50.0 mL of 0.10 M HCO₂H titrated with 0.10 M NaOH.",steps:["Initial acid moles = 0.0500 L × 0.10 M = 0.00500 mol.","The 0.10 M NaOH requires 0.00500/0.10 = 0.0500 L to reach equivalence.","Because the acid concentration and pKa are unchanged, the initial pH and buffer-region shape are similar, but equivalence occurs at 50.0 mL."],answer:"Sketch the same weak-acid/strong-base curve, with equivalence at 50.0 mL of NaOH and pH above 7 at equivalence.",concept:"Equivalence volume is set by stoichiometric moles; titrant concentration changes the volume required."},
    "8:d": {prompt:"Describe how the titration curve changes when 50.0 mL of 0.10 M HCO₂H is titrated with 0.40 M NaOH.",steps:["Initial acid moles remain 0.00500 mol.","Equivalence volume = 0.00500 mol/0.40 M = 0.0125 L = 12.5 mL.","The titrant is four times as concentrated as in the original curve, so the equivalence point occurs at one-quarter the volume."],answer:"Sketch the weak-acid/strong-base curve with equivalence at 12.5 mL of NaOH; the equivalence pH remains above 7.",concept:"A more concentrated titrant reaches equivalence at a smaller added volume for the same analyte amount."},
  ,
    "13": {prompt:"Identify the dominant sulfurous-acid species at points A–E on the diprotic-acid titration curve.",steps:["At A, pH 1.51 is below the first pKa, so H₂SO₃ predominates.","At B, the table specifies equal amounts of H₂SO₃ and HSO₃⁻.","At C, HSO₃⁻ is the dominant intermediate species.","At D, the table specifies equal amounts of HSO₃⁻ and SO₃²⁻.","At E, pH 9.85 is above pKa₂, so SO₃²⁻ predominates."],answer:"A: H₂SO₃; B: equal H₂SO₃ and HSO₃⁻; C: HSO₃⁻; D: equal HSO₃⁻ and SO₃²⁻; E: SO₃²⁻.",concept:"A diprotic acid loses protons in two stages, with each conjugate pair predominating in its corresponding pH range."},
    "9:a": {prompt:"Identify which species exceed 0.01 M at the equivalence point in the HCl/NaOH titration.",steps:["At equivalence, the strong acid and strong base have reacted completely.","Na⁺ and Cl⁻ remain as spectator ions at about 0.050 M each; H₃O⁺ and OH⁻ are about 10⁻⁷ M at pH 7."],answer:"Cl⁻ and Na⁺.",concept:"Strong-acid/strong-base equivalence leaves dissolved spectator ions and a neutral solution."},
    "9:b": {prompt:"Identify which species exceed 0.01 M at the equivalence point in the KOH/HNO₃ titration.",steps:["At equivalence, KOH and HNO₃ neutralize completely.","K⁺ and NO₃⁻ remain at appreciable concentration; H₃O⁺ and OH⁻ are each far below 0.01 M."],answer:"NO₃⁻ and K⁺.",concept:"Ions from a strong base and strong acid do not appreciably react with water."},
    "9:c": {prompt:"Explain why both strong-acid/strong-base titrations have pH 7 at equivalence.",steps:["The strong acid and strong base have reacted in stoichiometric amounts.","The remaining salts contain spectator ions (Na⁺/Cl⁻ or K⁺/NO₃⁻) that do not appreciably hydrolyze water."],answer:"The equivalence solutions contain neutral spectator ions from a strong acid and strong base, so pH is approximately 7.00 at 25 °C.",concept:"The equivalence point of a strong-acid/strong-base titration is neutral."},
    "10:a": {prompt:"Complete the HNO₃ versus HNO₂ titration table.",steps:["HNO₃ is a strong acid, so 0.10 M HNO₃ has initial pH = 1.00 and a strong-acid/strong-base equivalence point at pH 7.00.","HNO₂ is weak; the table gives initial pH 2.21, half-equivalence pH 3.41, and equivalence pH 8.05."],answer:"Experiment 1 (HNO₃): strong acid; initial pH 1.00; half-equivalence pH 1.48; equivalence pH 7.00. Experiment 2 (HNO₂): weak acid; initial pH 2.21; half-equivalence pH 3.41; equivalence pH 8.05.",concept:"Weak-acid titrations have pH = pKa at half-equivalence and pH > 7 at equivalence."},
    "10:b": {prompt:"Calculate pKa and Ka for HNO₂ from the half-equivalence pH of 3.41.",steps:["At half-equivalence, [HNO₂] = [NO₂⁻], so pH = pKa.","Ka = 10^(−pKa) = 10⁻³·⁴¹."],answer:"pKa = 3.41; Ka ≈ 3.9 × 10⁻⁴.",concept:"The half-equivalence pH of a weak-acid titration equals its pKa."},
    "10:c": {prompt:"Identify species present above 0.01 M at the HNO₂/NaOH equivalence point.",steps:["At equivalence, the original weak acid has been converted to NO₂⁻; Na⁺ remains from NaOH.","The solution pH is 8.05, so [OH⁻] is only about 1.1 × 10⁻⁶ M and [H₃O⁺] is even smaller."],answer:"NO₂⁻ and Na⁺.",concept:"The conjugate base of a weak acid hydrolyzes to make the equivalence solution basic."},
    "10:d": {prompt:"Write the reaction that makes the HNO₂/NaOH equivalence solution basic.",steps:["NO₂⁻ is the conjugate base of weak acid HNO₂ and accepts a proton from water.","Water therefore produces OH⁻."],answer:"NO₂⁻(aq) + H₂O(l) ⇌ HNO₂(aq) + OH⁻(aq).",concept:"Conjugate-base hydrolysis explains pH above 7 at weak-acid/strong-base equivalence."},
    "11:a": {prompt:"Complete the Ka and equivalence-pH entries for propionic acid and HOCl titrations.",steps:["At half-equivalence, pH = pKa: propionic acid pKa = 4.89; HOCl pKa = 7.52.","Ka(propionic acid) = 10⁻⁴·⁸⁹ ≈ 1.3 × 10⁻⁵; Ka(HOCl) = 10⁻⁷·⁵² ≈ 3.0 × 10⁻⁸.","At equivalence, each conjugate base concentration is 0.050 M. Using Kb = Kw/Ka and [OH⁻] ≈ √(KbC), pH is about 8.79 for propionate and 10.11 for OCl⁻."],answer:"HC₃H₅O₂: Ka ≈ 1.3 × 10⁻⁵, equivalence pH ≈ 8.79. HOCl: Ka ≈ 3.0 × 10⁻⁸, equivalence pH ≈ 10.11.",concept:"The weaker the titrated acid, the stronger its conjugate base and the higher the equivalence-point pH."},
    "11:b": {prompt:"Write the net ionic hydrolysis reactions that make each weak-acid titration basic at equivalence.",steps:["At equivalence, propionic acid has been converted to propionate, which accepts H⁺ from water.","HOCl has been converted to OCl⁻, which also accepts H⁺ from water."],answer:"C₃H₅O₂⁻(aq) + H₂O(l) ⇌ HC₃H₅O₂(aq) + OH⁻(aq). OCl⁻(aq) + H₂O(l) ⇌ HOCl(aq) + OH⁻(aq).",concept:"A weak acid's conjugate base hydrolyzes water to produce OH⁻."},
    "11:c": {prompt:"Compare the acid and conjugate-base strengths of HOCl and propionic acid.",steps:["HOCl has pKa 7.52, much larger than propionic acid's pKa 4.89, so HOCl is the weaker acid.","The conjugate base of the weaker acid is stronger."],answer:"HOCl is the weaker acid, and OCl⁻ is the stronger base than C₃H₅O₂⁻.",concept:"Acid and conjugate-base strengths are inversely related."},
    "12:a": {prompt:"Identify the stronger acid, HClO₂ or HClO₃.",steps:["HClO₂ has pKa 2.0 and Ka = 1 × 10⁻².","HClO₃ has pKa −2.7 and Ka = 5 × 10²; lower pKa and larger Ka indicate stronger acid."],answer:"HClO₃ is much stronger than HClO₂.",concept:"A stronger acid has a larger Ka and smaller pKa."},
    "12:b": {prompt:"Determine which titration has the higher pH at equivalence: HClO₂ or HClO₃.",steps:["At equivalence, HClO₂ has been converted to ClO₂⁻, a weak base that reacts with water.","HClO₃ is a strong acid; ClO₃⁻ is an extremely weak base and has negligible hydrolysis."],answer:"Experiment 1 (HClO₂ titrated with NaOH) has the higher equivalence-point pH.",concept:"The conjugate base of a weak acid makes the equivalence solution basic; the conjugate base of a strong acid does not."},
    "12:c": {prompt:"Does equal-volume, equal-concentration HClO₃ require more NaOH than HClO₂ to reach equivalence?",steps:["Both acids are monoprotic, so each mole of acid reacts with one mole of OH⁻.","Equal volumes at equal molarity contain equal acid moles, regardless of acid strength."],answer:"No. Both require the same volume of 0.10 M NaOH to reach equivalence.",concept:"Acid strength affects equilibrium pH, not the stoichiometric moles of base required for a monoprotic acid."},
  ,
    "7:b": {prompt:"Describe the expected HCl/NaOH titration curve for a 10.0 mL HCl sample instead of 20.0 mL.",steps:["The HCl concentration and the 0.180 M NaOH concentration are unchanged, so the initial pH is the same.","The smaller sample contains half as many moles of HCl, so it requires half the NaOH volume to reach equivalence.","The strong-acid/strong-base equivalence point remains near pH 7."],answer:"Sketch a strong-acid/strong-base curve with the same initial pH, but the steep equivalence jump occurs at half the original titrant volume.",concept:"For fixed concentrations, halving the analyte volume halves the stoichiometric titrant volume."},
    "7:c": {prompt:"Describe the expected HCl/NaOH titration curve for a 40.0 mL HCl sample instead of 20.0 mL.",steps:["The acid concentration is unchanged, so the initial pH is the same.","The 40.0 mL sample contains twice as many moles of HCl as the 20.0 mL sample, so it requires twice the NaOH volume to reach equivalence.","The equivalence pH remains near 7."],answer:"Sketch a strong-acid/strong-base curve with the same initial pH, but the equivalence jump occurs at twice the original titrant volume.",concept:"Doubling analyte volume at fixed concentration doubles the required titrant volume."},
  },
  "topic-8-6-8-11.pdf": {
    "3": { prompt: "Write the balanced ionization equation for ethylamine, CH3CH2NH2, reacting with water.", steps: ["Ethylamine acts as a Brønsted–Lowry base and accepts a proton from water.", "The conjugate acid is CH3CH2NH3+ and water becomes OH−.", "Check that atoms and total charge balance."], answer: "CH3CH2NH2(aq) + H2O(l) ⇌ CH3CH2NH3+(aq) + OH−(aq).", concept: "Weak bases accept protons from water, producing their conjugate acids and hydroxide." }
  ,
    "4": {prompt:"Identify the strongest acid among HOCl, HOBr, and HOI.",steps:["Compare the listed Ka values: HOCl = 2.9 × 10⁻⁸, HOBr = 2.4 × 10⁻⁹, HOI = 2.3 × 10⁻¹¹.","The largest Ka corresponds to the greatest extent of ionization."],answer:"HOCl is the strongest acid because it has the largest Ka, 2.9 × 10⁻⁸.",concept:"A larger Ka indicates a stronger acid."},
    "5": {prompt:"Identify the strongest acid among HOCl, HClO₂, and HClO₃.",steps:["Compare Ka: 2.9 × 10⁻⁸, 1.1 × 10⁻², and 5.0 × 10².","HClO₃ has the largest Ka by many orders of magnitude."],answer:"HClO₃ is the strongest acid; Ka = 5.0 × 10².",concept:"Additional oxygen atoms stabilize the conjugate base and can greatly increase oxyacid strength."},
    "7": {prompt:"Give the expected colors of bromothymol blue at pH 4.0, 7.0, and 10.0.",steps:["Below its pKa of 7.0, the acid form dominates; the table identifies it as yellow below pH 6.","At pH = pKa, the acid and base forms are present in comparable concentrations, giving an intermediate color.","Above pKa, the conjugate-base form dominates; the table identifies it as blue above pH 8."],answer:"pH 4.0: yellow; pH 7.0: green (intermediate mixture); pH 10.0: blue.",concept:"Indicator color changes as the relative concentrations of HIn and In⁻ change near the indicator pKa."},
    "10": {prompt:"Select mixtures that form a buffer with pH 3.40 when pKa(HNO₂) = 3.40.",steps:["For pH = pKa, the final amounts of HNO₂ and NO₂⁻ must be equal.","Mixing equal amounts of HNO₂ and KNO₂ gives equal acid and conjugate base.","Mixing 0.200 mol HNO₂ with 0.100 mol KOH neutralizes half the acid, leaving 0.100 mol HNO₂ and forming 0.100 mol NO₂⁻."],answer:"Select the first and fifth mixtures.",concept:"A buffer has appreciable amounts of both conjugate-pair members; pH = pKa when their concentrations are equal."},
    "11": {prompt:"Select mixtures that form a buffer with pH 9.26 when pKa(NH₄⁺) = 9.26.",steps:["For pH = pKa, [NH₃] and [NH₄⁺] must be equal.","Equal amounts of NH₃ and NH₄NO₃ directly form that pair.","Mixing 0.200 mol NH₃ with 0.100 mol strong acid converts 0.100 mol NH₃ to NH₄⁺, leaving equal amounts of both."],answer:"Select the first and fifth mixtures.",concept:"A weak base and its conjugate acid form a buffer; equal concentrations give pH approximately equal to pKa of the conjugate acid."},
    "13": {prompt:"Complete the formic-acid/formate buffer table.",steps:["pKa = −log(1.8 × 10⁻⁴) ≈ 3.745.","#2: ratio = 1.35/0.750 = 1.80; pH = 3.745 + log(1.80) ≈ 4.00.","#3: ratio = 10^(3.52 − 3.745) ≈ 0.596, so [HCO₂H] = 1.00/0.596 ≈ 1.68 M.","#4: ratio = 10^(3.82 − 3.745) ≈ 1.19; with [HCO₂H] = 1.00 M, [HCO₂⁻] ≈ 1.19 M."],answer:"#2: ratio 1.80, pH ≈ 4.00. #3: [HCO₂H] ≈ 1.68 M, ratio ≈ 0.596. #4: [HCO₂⁻] ≈ 1.19 M, ratio ≈ 1.19.",concept:"Use pH = pKa + log([A⁻]/[HA]) to solve for pH or an unknown concentration."},
    "15": {prompt:"Compare buffer capacity using the final pH values after the same amount of NaOH is added.",steps:["Buffer #1 changes from pH 9.26 to 9.35, a change of 0.09.","Buffer #2 changes from pH 9.26 to 9.96, a change of 0.70.","The smaller change indicates better resistance to the added base."],answer:"Buffer #1 has the greater buffer capacity.",concept:"A buffer with greater capacity undergoes a smaller pH change when the same amount of acid or base is added."},
    "1:a": {prompt:"Calculate Kb for Cl⁻ using Ka(HCl) = 1.0 × 10⁶.",steps:["HCl and Cl⁻ are a conjugate acid–base pair, so Ka(HCl) × Kb(Cl⁻) = Kw at 25 °C.","Kb = Kw/Ka = (1.0 × 10⁻¹⁴)/(1.0 × 10⁶) = 1.0 × 10⁻²⁰."],answer:"Kb = 1.0 × 10⁻²⁰.",concept:"For a conjugate acid–base pair at 25 °C, KaKb = Kw."},
    "1:b": {prompt:"Decide whether Cl⁻ is likely to react with water to form OH⁻.",steps:["The Kb calculated in part (a) is extremely small.","A very small Kb means the equilibrium strongly favors Cl⁻ and H₂O rather than HCl and OH⁻."],answer:"Cl⁻ is not likely to react with H₂O to form OH⁻.",concept:"A negligible Kb means a conjugate base is too weak to appreciably deprotonate water."},
    "1:c": {prompt:"Justify the choice in part (b) using Kb.",steps:["Use Kb = 1.0 × 10⁻²⁰.","Because Kb is far below 1, the base-ionization equilibrium lies overwhelmingly to the reactant side."],answer:"The Kb value of 1.0 × 10⁻²⁰ is extremely small, so very little OH⁻ forms.",concept:"Equilibrium constants much smaller than 1 indicate very little product formation."},
    "2:a": {prompt:"Summarize the Lewis structure and ionization of acetic acid, including its acetate resonance forms.",steps:["Acetic acid is CH₃–C(=O)–OH; the acidic hydrogen is attached to oxygen.","Ionization transfers that O–H proton to water.","The acetate ion has two equivalent resonance contributors: the C=O double bond can be drawn to either oxygen, with the negative charge on the other oxygen."],answer:"Structure: CH₃–C(=O)–OH. Ionization: CH₃CO₂H(aq) + H₂O(l) ⇌ H₃O⁺(aq) + CH₃CO₂⁻(aq). Acetate resonance: CH₃–C(=O)–O⁻ ↔ CH₃–C(–O⁻)=O.",concept:"Carboxylic acids donate the O–H proton; resonance delocalizes charge across the two carboxylate oxygens."},
    "2:a(i)": {prompt:"Draw the Lewis diagram for acetic acid, CH₃CO₂H.",steps:["Connect CH₃ to the carboxyl carbon.","The carboxyl carbon is double-bonded to one O and single-bonded to an –OH group.","Each oxygen has two lone pairs; the hydroxyl oxygen is bonded to H."],answer:"CH₃–C(=O)–OH, with two lone pairs on each O.",concept:"A carboxylic acid contains the –C(=O)–OH functional group."},
    "2:a(ii)": {prompt:"Write the balanced ionization equation for acetic acid in water.",steps:["Acetic acid donates one proton to H₂O.","Water becomes H₃O⁺ and acetate is CH₃CO₂⁻.","Check atoms and total charge on both sides."],answer:"CH₃CO₂H(aq) + H₂O(l) ⇌ H₃O⁺(aq) + CH₃CO₂⁻(aq).",concept:"Weak-acid ionization is represented by an equilibrium arrow."},
    "2:a(iii)": {prompt:"Draw the two resonance forms of acetate, CH₃CO₂⁻.",steps:["Keep the CH₃–C–O atom connectivity fixed.","Move the C=O π bond to the other oxygen and move the lone pair to form the other C=O bond.","The negative charge alternates between the two oxygen atoms in the contributors."],answer:"CH₃–C(=O)–O⁻ ↔ CH₃–C(–O⁻)=O.",concept:"Resonance contributors differ only in electron placement, not atom positions."},
    "2:b": {prompt:"Identify the hydrogen lost when propanoic acid and salicylic acid donate H⁺.",steps:["A carboxylic acid donates the proton attached to the –OH oxygen in its –CO₂H group.","Do not circle a hydrogen bonded to carbon or a phenolic –OH unless that is the specified acid group."],answer:"Circle the H on the –OH of the carboxyl group in each acid.",concept:"The ionizable proton of a carboxylic acid is the O–H proton in –CO₂H."},
    "6:a": {prompt:"Use pH = 4.00 and pKa = 4.74 to compare acetic acid and acetate concentrations.",steps:["Compare pH with pKa: 4.00 < 4.74.","When pH < pKa, the protonated acid form HA is more abundant than A⁻."],answer:"[HC₂H₃O₂] > [C₂H₃O₂⁻].",concept:"The pH–pKa comparison predicts which member of a conjugate pair predominates."},
    "8:a": {prompt:"Write the net ionic equation for potassium sorbate reacting with strong acid.",steps:["K⁺ and Cl⁻ are spectator ions.","The sorbate ion, C₆H₇O₂⁻, accepts H⁺ from hydronium to form sorbic acid.","Write the proton-transfer reaction with water balanced."],answer:"C₆H₇O₂⁻(aq) + H₃O⁺(aq) → HC₆H₇O₂(aq) + H₂O(l).",concept:"A weak-base conjugate ion is protonated by a strong acid."},
    "8:c": {prompt:"At pH 3.37, compare HC₆H₇O₂ and C₆H₇O₂⁻ in the soft drink.",steps:["Sorbic acid has a pKa near 4.76.","Since pH 3.37 is below pKa, the protonated acid form predominates."],answer:"HC₆H₇O₂ is present at a higher concentration than C₆H₇O₂⁻.",concept:"When pH < pKa, the acid form predominates."},
    "9:a": {prompt:"Calculate the pH of a buffer made with equal amounts of HC₂H₃O₂ and C₂H₃O₂⁻.",steps:["The initial amounts are 0.5000 L × 2.00 M = 1.00 mol of each component.","The final volume is 1.000 L, so their concentrations are equal.","Use pH = pKa + log([A⁻]/[HA]); the ratio is 1."],answer:"pH = pKa = −log(1.8 × 10⁻⁵) = 4.74.",concept:"An equimolar weak-acid/conjugate-base buffer has pH approximately equal to pKa."},
    "9:b": {prompt:"Write the net ionic reaction when strong acid is added to the acetate buffer.",steps:["Acetate consumes added hydronium to form acetic acid.","Exclude Na⁺ and nitrate ions as spectators."],answer:"C₂H₃O₂⁻(aq) + H₃O⁺(aq) → HC₂H₃O₂(aq) + H₂O(l).",concept:"The conjugate base neutralizes added strong acid."},
    "9:c": {prompt:"State how acetate and acetic-acid concentrations change when a small amount of strong acid is added.",steps:["Hydronium reacts with acetate.","The reaction consumes C₂H₃O₂⁻ and produces HC₂H₃O₂."],answer:"[HC₂H₃O₂] increases; [C₂H₃O₂⁻] decreases.",concept:"Buffer components react to limit the pH change."},
    "9:d": {prompt:"Calculate buffer pH after adding 0.040 mol HNO₃ to 1.00 L of the equal-mole acetate buffer.",steps:["HNO₃ supplies 0.040 mol H₃O⁺, which reacts 1:1 with acetate.","Moles after reaction: acetate = 1.00 − 0.040 = 0.960 mol; acetic acid = 1.00 + 0.040 = 1.040 mol.","pH = pKa + log(base/acid) = 4.745 + log(0.960/1.040)."],answer:"pH ≈ 4.71; [C₂H₃O₂⁻] = 0.960 M and [HC₂H₃O₂] = 1.040 M.",concept:"Strong acid first changes buffer-component amounts; then use the conjugate-pair ratio."},
    "9:e": {prompt:"Calculate the pH when 0.040 mol HNO₃ is added to 1.00 L of pure water.",steps:["Assuming strong-acid dissociation and negligible volume change, [H₃O⁺] = 0.040 mol/1.00 L = 0.040 M.","pH = −log(0.040)."],answer:"pH = 1.40.",concept:"A strong acid contributes hydronium directly to solution."},
    "9:f": {prompt:"Write the net ionic reaction when strong base is added to the acetate buffer.",steps:["OH⁻ reacts with acetic acid to form acetate and water.","Spectator ions are omitted."],answer:"HC₂H₃O₂(aq) + OH⁻(aq) → C₂H₃O₂⁻(aq) + H₂O(l).",concept:"The weak-acid member of a buffer neutralizes added strong base."},
    "9:g": {prompt:"State how acetic-acid and acetate concentrations change when a small amount of strong base is added.",steps:["OH⁻ consumes HC₂H₃O₂ and converts it to C₂H₃O₂⁻."],answer:"[HC₂H₃O₂] decreases; [C₂H₃O₂⁻] increases.",concept:"Added base shifts the buffer pair toward its conjugate base."},
    "9:h": {prompt:"Calculate buffer pH after adding 0.040 mol KOH to 1.00 L of the equal-mole acetate buffer.",steps:["OH⁻ consumes 0.040 mol acetic acid.","Moles after reaction: acetic acid = 0.960 mol; acetate = 1.040 mol.","pH = 4.745 + log(1.040/0.960)."],answer:"pH ≈ 4.78; [HC₂H₃O₂] = 0.960 M and [C₂H₃O₂⁻] = 1.040 M.",concept:"After strong-base neutralization, use the remaining acid and increased conjugate-base amounts."},
    "9:i": {prompt:"Calculate the pH when 0.040 mol KOH is added to 1.00 L of pure water.",steps:["[OH⁻] = 0.040 mol/1.00 L = 0.040 M.","pOH = −log(0.040) = 1.40.","At 25 °C, pH = 14.00 − pOH."],answer:"pH = 12.60.",concept:"A strong base contributes hydroxide directly to solution."},
    "12:a": {prompt:"Calculate each HF buffer pH from Ka = 6.8 × 10⁻⁴.",steps:["pKa = −log(6.8 × 10⁻⁴) ≈ 3.17.","Buffer #1 has equal [F⁻] and [HF], so pH = pKa.","For #2, [F⁻]/[HF] = 2; for #3, the ratio is 0.5."],answer:"#1: 3.17; #2: 3.47; #3: 2.87.",concept:"The acid-equilibrium expression and Henderson–Hasselbalch equation give the same buffer pH."},
    "12:b": {prompt:"Calculate the same HF buffer pH values using Henderson–Hasselbalch.",steps:["Use pH = pKa + log([F⁻]/[HF]) with pKa ≈ 3.17.","#1: 3.17 + log(1) = 3.17.","#2: 3.17 + log(2) ≈ 3.47; #3: 3.17 + log(0.5) ≈ 2.87."],answer:"#1: 3.17; #2: 3.47; #3: 2.87.",concept:"The Henderson–Hasselbalch equation relates pH to pKa and the conjugate-base/acid ratio."},
    "12:c": {prompt:"Describe the particle ratios for HF buffer #2 and buffer #3 relative to buffer #1.",steps:["Buffer #1 has equal HF and F⁻ concentrations.","Buffer #2 has twice the F⁻ concentration at the same HF concentration.","Buffer #3 has twice the HF concentration at the same F⁻ concentration."],answer:"For #2, draw twice as many F⁻ ions per HF molecule as in #1. For #3, draw twice as many HF molecules per F⁻ ion as in #1.",concept:"Particle diagrams should preserve the concentration ratio of conjugate-base and weak-acid components."},
    "14:a": {prompt:"Calculate the pH of buffer #1 and buffer #2 before acid is added.",steps:["Both buffers have equal concentrations of acetic acid and acetate.","pH = pKa = −log(1.8 × 10⁻⁵) ≈ 4.745 for each."],answer:"Both buffer #1 and buffer #2 have pH ≈ 4.74.",concept:"Changing both buffer-component concentrations by the same factor changes capacity but not the pH ratio."},
    "14:b": {prompt:"Calculate the pH of buffer #1 after 0.045 mol HNO₃ is added to 1.00 L.",steps:["Acid reacts with acetate 1:1: acetate = 1.00 − 0.045 = 0.955 mol; acetic acid = 1.00 + 0.045 = 1.045 mol.","pH = 4.745 + log(0.955/1.045)."],answer:"pH ≈ 4.71.",concept:"Strong acid converts conjugate base to weak acid before the buffer equilibrium is recalculated."},
    "14:c": {prompt:"Calculate the pH of buffer #2 after 0.045 mol HNO₃ is added to 1.00 L.",steps:["Acetate remaining = 0.0500 − 0.045 = 0.0050 mol; acetic acid = 0.0500 + 0.045 = 0.0950 mol.","pH = 4.745 + log(0.0050/0.0950)."],answer:"pH ≈ 3.47.",concept:"A dilute buffer has less capacity; the same added acid changes its component ratio much more."},
    "14:d": {prompt:"Identify which buffer has the greater pH change after the same amount of strong acid is added.",steps:["Both start near pH 4.74.","Buffer #1 falls only to about 4.71, while buffer #2 falls to about 3.47."],answer:"Buffer #2 experiences the greater pH change.",concept:"Lower concentrations mean lower buffer capacity for the same acid/base addition."},
    "14:e": {prompt:"Identify which buffer has the greater buffer capacity.",steps:["Both buffers start with the same acid/base ratio and therefore similar pH.","Buffer #1 has much greater concentrations of both buffer components."],answer:"Buffer #1 has the greater buffer capacity.",concept:"Increasing both conjugate-pair concentrations at a fixed ratio increases buffer capacity without substantially changing pH."},
    "16:a": {prompt:"Choose the buffer with greater capacity for added acid or base in part (a).",steps:["Buffer #1 contains more HNO₂ (1.50 M) than NO₂⁻ (1.00 M).","HNO₂ neutralizes added OH⁻, so a greater weak-acid concentration gives greater capacity for added base."],answer:"Added base; HNO₂.",concept:"The acid member of a buffer consumes added strong base."},
    "16:b": {prompt:"Choose the buffer with greater capacity for added acid or base in part (b).",steps:["Buffer #2 contains more NO₂⁻ (1.50 M) than HNO₂ (1.00 M).","NO₂⁻ neutralizes added H₃O⁺, so a greater conjugate-base concentration gives greater capacity for added acid."],answer:"Added acid; NO₂⁻.",concept:"The conjugate-base member of a buffer consumes added strong acid."},
    "17:a": {prompt:"Explain why adding NaOH decreases dissolved Mg²⁺ in saturated Mg(OH)₂, using Qsp and Ksp.",steps:["Added OH⁻ immediately raises [OH⁻], so Qsp = [Mg²⁺][OH⁻]² becomes greater than Ksp at that instant.","The system shifts toward solid Mg(OH)₂ to reduce Qsp.","This consumes dissolved Mg²⁺ and OH⁻ until Qsp returns to Ksp."],answer:"Qsp > Ksp immediately after NaOH is added; equilibrium shifts left, precipitating Mg(OH)₂ and decreasing [Mg²⁺].",concept:"A common ion shifts a dissolution equilibrium toward the undissolved solid."},
    "17:b": {prompt:"Explain why adding HNO₃ increases dissolved Mg²⁺ in saturated Mg(OH)₂, using Qsp and Ksp.",steps:["H₃O⁺ consumes OH⁻ to form water, lowering [OH⁻].","Qsp = [Mg²⁺][OH⁻]² becomes less than Ksp immediately after acid is added.","More Mg(OH)₂ dissolves, increasing [Mg²⁺], until Qsp returns to Ksp."],answer:"Qsp < Ksp immediately after HNO₃ is added; equilibrium shifts right, dissolving more Mg(OH)₂ and increasing [Mg²⁺].",concept:"Removing a product of dissolution drives additional solid to dissolve."},
    "17:c": {prompt:"Relate Mg(OH)₂ solubility to pH.",steps:["Increasing pH increases [OH⁻], creating a common-ion effect.","Decreasing pH adds H₃O⁺, which consumes OH⁻ and promotes dissolution."],answer:"Solubility decreases as pH increases and increases as pH decreases.",concept:"Hydroxide salts are more soluble in acidic solution because H₃O⁺ removes OH⁻."},
    "18:a": {prompt:"Describe the effect of adding HNO₃ to saturated Ni(OH)₂.",steps:["The acid lowers pH and consumes OH⁻, so [OH⁻] decreases.","Qsp = [Ni²⁺][OH⁻]² becomes less than Ksp.","The dissolution equilibrium shifts from reactants to products, increasing solubility."],answer:"pH decreases; [OH⁻] decreases; Qsp < Ksp; net shift toward products; solubility increases.",concept:"Acid increases the solubility of metal hydroxides by consuming OH⁻."},
    "18:b": {prompt:"Describe the effect of adding KOH to saturated Ni(OH)₂.",steps:["KOH raises pH and increases [OH⁻].","Qsp = [Ni²⁺][OH⁻]² becomes greater than Ksp.","The equilibrium shifts from products to reactants, decreasing solubility."],answer:"pH increases; [OH⁻] increases; Qsp > Ksp; net shift toward reactants; solubility decreases.",concept:"Adding a common ion suppresses dissolution."},
    "19:a": {prompt:"Identify the hybridization of either carbon atom in oxalate, C₂O₄²⁻.",steps:["Each carbon has three electron domains: one C–C bond and two C–O bonding regions.","Three electron domains correspond to trigonal-planar arrangement and sp² hybridization."],answer:"sp².",concept:"Hybridization follows the number of electron domains around the atom."},
    "19:b(i)": {prompt:"Write Ksp for Ag₂C₂O₄.",steps:["Write the dissolution equation: Ag₂C₂O₄(s) ⇌ 2Ag⁺(aq) + C₂O₄²⁻(aq).","Omit the pure solid from the equilibrium expression and use stoichiometric exponents."],answer:"Ksp = [Ag⁺]²[C₂O₄²⁻].",concept:"Solids do not appear in equilibrium-constant expressions."},
    "19:b(ii)": {prompt:"Calculate molar solubility of Ag₂C₂O₄ when Ksp = 5.40 × 10⁻¹².",steps:["Let molar solubility be s. Then [Ag⁺] = 2s and [C₂O₄²⁻] = s.","Ksp = (2s)²(s) = 4s³ = 5.40 × 10⁻¹².","s = (1.35 × 10⁻¹²)^(1/3) = 1.11 × 10⁻⁴ M."],answer:"Molar solubility = 1.11 × 10⁻⁴ mol L⁻¹.",concept:"Use stoichiometric concentration changes to express Ksp in terms of molar solubility."},
    "19:b(iii)": {prompt:"Write a net-ionic equation explaining why Ag₂C₂O₄ is more soluble in HClO₄ than in neutral water.",steps:["HClO₄ supplies H₃O⁺, which protonates the basic oxalate ion.","Removing C₂O₄²⁻ from solution shifts the silver oxalate dissolution equilibrium to the right."],answer:"C₂O₄²⁻(aq) + H₃O⁺(aq) → HC₂O₄⁻(aq) + H₂O(l).",concept:"Protonation of a basic anion increases the solubility of a salt containing that anion."},
  },
  "topic-2-5-2-6.pdf": {
    "3:a": { prompt: "Draw the two equivalent resonance structures for the methanoate ion, HCO2−.", steps: ["Keep the H−C−O−O skeleton fixed; resonance moves electrons, not atom positions.", "In one structure, draw H−C(=O)−O− with the negative charge on the singly bonded O.", "In the second structure, move the C=O double bond to the other oxygen and place the negative charge on the first oxygen."], answer: "H−C(=O)−O− ↔ H−C(−O−)=O; the two resonance forms are equivalent.", concept: "Resonance structures differ in electron placement while preserving atom connectivity." },
    "3:b": { prompt: "Predict whether the two C−O bonds in HCO2− have the same or different lengths, and justify.", steps: ["The two equivalent resonance structures place the C=O double bond on either oxygen.", "The actual ion is a resonance hybrid, not a molecule switching between separate structures.", "The bonding is delocalized across both C−O bonds."], answer: "The two C−O bonds have the same length because the resonance hybrid makes them equivalent.", concept: "Equivalent resonance positions produce equivalent average bonding in the resonance hybrid." },
    "3:c": { prompt: "Describe the bond order of the two C−O bonds in HCO2−.", steps: ["Across the two equivalent resonance structures, each C−O bond is single in one form and double in the other.", "The average bond order is therefore (1 + 2)/2 = 1.5 for each C−O bond."], answer: "Each C−O bond has an average bond order of 1.5.", concept: "Resonance gives equivalent bonds an average bond order between a single and a double bond." }
  ,
    "1": {prompt:"Draw Lewis structures for the listed small molecules and ions.",steps:["Count total valence electrons, adding electrons for negative charge and subtracting for positive charge.","Use single bonds for the skeleton; complete terminal-atom octets, then place remaining lone pairs on the central atom.","Representative structures: CH₄ (four C–H bonds); NH₃ (N with one lone pair); H₂O (O with two lone pairs); HF and F₂ (each F has three lone pairs); CH₂F₂ and CF₄ (C single-bonded to all terminal atoms); H₂O₂ = H–O–O–H; NF₃ (N one lone pair); OF₂ (O two lone pairs); C₂H₅F = CH₃–CH₂–F; C₂H₅OH = CH₃–CH₂–O–H.","For ions: H₃O⁺ has three O–H bonds and one O lone pair; NH₄⁺ has four N–H bonds and no N lone pair; ClO⁻ has a Cl–O single bond and −1 formal charge on O; ClO₂⁻ has two resonance forms O=Cl–O⁻ / ⁻O–Cl=O; SO₃²⁻ has three resonance contributors with one S=O and two S–O⁻ bonds; SO₄²⁻ has six equivalent contributors with two S=O and two S–O⁻ bonds."],answer:"Use the structures described in the steps, include all lone pairs, and bracket polyatomic ions with their overall charge.",concept:"A valid Lewis structure uses the correct total valence-electron count, sensible connectivity, octets where applicable, and formal charges consistent with the ion's charge."},
    "2": {prompt:"Draw Lewis structures for O₂, N₂, CO, CO₂, HCN, CH₂O, C₂H₄, C₂H₂, O₃, SO₂, SO₃, C₃H₆, NO₃⁻, CO₃²⁻, and CN⁻.",steps:["O₂: O=O; N₂: N≡N; CO: ⁻C≡O⁺; CO₂: O=C=O; HCN: H–C≡N; CH₂O: H₂C=O.","C₂H₄: H₂C=CH₂; C₂H₂: HC≡CH; C₃H₆ (no ring): CH₃–CH=CH₂.","O₃ has two equivalent resonance contributors, O=O–O⁻ and ⁻O–O=O, with the central O carrying +1 formal charge in each contributor.","SO₂ can be represented by equivalent resonance contributors with one S=O and one S–O⁻ bond (central S +1), or by an expanded-octet O=S=O representation. SO₃ can be drawn with three S=O double bonds in an expanded-octet model.","NO₃⁻ has three equivalent contributors with one N=O and two N–O⁻ bonds; CO₃²⁻ has three equivalent contributors with one C=O and two C–O⁻ bonds; CN⁻ is ⁻C≡N."],answer:"The listed Lewis structures are given in the steps. Include the correct lone pairs and bracket NO₃⁻, CO₃²⁻, and CN⁻ with their charges.",concept:"Multiple bonds complete octets; resonance is needed when equivalent electron placements produce equivalent contributors."},
    "5": {prompt:"Draw three resonance structures for N₂O.",steps:["Use the N–N–O skeleton and 16 total valence electrons.","The three common contributors are N≡N⁺–O⁻, N⁻=N⁺=O, and N²⁻–N⁺≡O⁺.","In each structure, assign lone pairs to complete octets and calculate formal charges; the sum must be zero."],answer:"N≡N⁺–O⁻; N⁻=N⁺=O; and N²⁻–N⁺≡O⁺.",concept:"Formal charge and electronegativity help compare resonance contributors."},
    "11": {prompt:"Explain why BF₃ structures with B=F double bonds are less favorable than the structure with three single bonds.",steps:["The three-single-bond structure leaves boron with six electrons, but all formal charges are zero.","Drawing B=F double bonds creates formal-charge separation: B becomes negative and the double-bonded F becomes positive.","That places positive charge on highly electronegative fluorine and negative charge on boron, an unfavorable arrangement."],answer:"The B=F double-bond contributors are less favorable because they create unfavorable formal charges, especially positive charge on F and negative charge on B. The three-single-bond structure with an incomplete octet on B is preferred.",concept:"Formal-charge placement and electronegativity can outweigh the drive to give every atom an octet."},
    "12": {prompt:"Draw Lewis structures for SF₄, ClF₃, XeF₂, BrF₅, XeF₄, and Br₃⁻.",steps:["SF₄: four S–F single bonds and one lone pair on S; each F has three lone pairs.","ClF₃: three Cl–F single bonds and two lone pairs on Cl; each F has three lone pairs.","XeF₂: two Xe–F single bonds and three lone pairs on Xe; each F has three lone pairs.","BrF₅: five Br–F single bonds and one lone pair on Br; each F has three lone pairs.","XeF₄: four Xe–F single bonds and two lone pairs on Xe; each F has three lone pairs.","Br₃⁻: linear Br–Br–Br with three lone pairs on each Br and brackets around the ion with −1 charge."],answer:"Use the bond and lone-pair arrangements in the steps, with brackets and a −1 charge for Br₃⁻.",concept:"Period 3 and heavier central atoms can form hypervalent Lewis structures with expanded octets."},
    "4:a": {prompt:"Draw the three equivalent resonance structures for carbonate, CO₃²⁻.",steps:["Carbon is central with three oxygen atoms attached; the ion has 24 valence electrons.","In each contributor, draw one C=O double bond and two C–O⁻ single bonds.","Move the double bond to each of the three oxygen atoms to generate the three contributors; bracket the ion with 2−."],answer:"Three equivalent contributors, each with one C=O and two C–O⁻ bonds; each singly bonded O carries −1 formal charge.",concept:"Equivalent resonance contributors differ only in which oxygen shares the double bond."},
    "4:b": {prompt:"Predict whether the three C–O bonds in carbonate have the same or different lengths.",steps:["The three resonance contributors are equivalent, so no oxygen is permanently assigned the C=O bond.","The actual resonance hybrid delocalizes the π bonding over all three C–O bonds."],answer:"The three C–O bonds have the same length.",concept:"Equivalent resonance contributors lead to equivalent bonds in the resonance hybrid."},
    "4:c": {prompt:"Describe the average C–O bond order in carbonate.",steps:["Each contributor contains one double bond (bond order 2) and two single bonds (bond order 1).","Across the three equivalent contributors, each C–O bond is double in one contributor and single in two."],answer:"Average C–O bond order = (2 + 1 + 1)/3 = 4/3 ≈ 1.33.",concept:"Resonance bond order is an average over equivalent electron arrangements."},
    "6:a": {prompt:"Assign formal charges to the three N₂O resonance structures.",steps:["Use formal charge = valence electrons − nonbonding electrons − number of bonds.","For N≡N–O: terminal N = 0, central N = +1, O = −1.","For N=N=O: terminal N = −1, central N = +1, O = 0.","For N–N≡O: terminal N = −2, central N = +1, O = +1."],answer:"N≡N⁺–O⁻: (0, +1, −1). N⁻=N⁺=O: (−1, +1, 0). N²⁻–N⁺≡O⁺: (−2, +1, +1).",concept:"Formal charges are bookkeeping values and must sum to the molecule's overall charge."},
    "6:b": {prompt:"Identify the least favorable N₂O resonance contributor.",steps:["Compare the formal-charge magnitudes and the locations of the charges.","The N–N≡O contributor has a −2 charge on terminal N and a +1 charge on O, creating greater charge separation and placing positive charge on electronegative oxygen."],answer:"N²⁻–N⁺≡O⁺ is the least favorable contributor.",concept:"Large formal charges and unfavorable charge placement reduce a resonance contributor's importance."},
    "6:c": {prompt:"Identify the most favorable N₂O resonance contributor.",steps:["The N≡N⁺–O⁻ contributor places the negative formal charge on oxygen, the most electronegative atom.","Its formal charges are relatively modest and consistent with octets."],answer:"N≡N⁺–O⁻ is the most favorable contributor.",concept:"A negative formal charge is favored on the more electronegative atom when other factors are comparable."},
  },
  "topic-3-9-3-13.pdf": {
    "8": { prompt: "Decide whether NaCl is more soluble in water or in hexane, and justify using intermolecular attractions.", steps: ["NaCl is an ionic solid made of Na+ and Cl− ions.", "Water is polar, so its partial charges can form strong ion–dipole attractions with the ions and stabilize them in solution.", "Hexane is nonpolar and cannot stabilize separated ions with comparably strong attractions."], answer: "NaCl is more soluble in water than in hexane.", concept: "Dissolution is favored when solute–solvent attractions can compensate for attractions within the solute and solvent." }
  },
  "topic-4-1-4-4.pdf": {
    "1": { prompt: "Identify the type of change when liquid water evaporates and explain the energy interaction involved.", steps: ["Evaporation changes water from liquid to gas without changing H2O's chemical identity.", "The molecules separate by overcoming intermolecular attractions; the O−H covalent bonds are not broken.", "A physical change that overcomes intermolecular attractions is the correct classification."], answer: "Choice B: physical change, because intermolecular attractions are overcome.", concept: "Physical phase changes alter molecular arrangement or separation without breaking the molecule's covalent bonds." }
  },
  "topic-5-4-5-11.pdf": {
    "2:a": { prompt: "Write the rate law for elementary step 1: O3(g) → O2(g) + O(g).", steps: ["For an elementary step, reactant coefficients determine the exponents in its rate law.", "O3 is the only reactant and its coefficient is 1."], answer: "Rate = k1[O3].", concept: "For an elementary reaction, the rate law follows directly from the molecularity of that step." },
    "2:b": { prompt: "Write the rate law for elementary step 2: O3(g) + O(g) → 2 O2(g).", steps: ["Both O3 and O are reactants in this elementary step.", "Each reactant has coefficient 1, so each concentration appears to the first power."], answer: "Rate = k2[O3][O].", concept: "For an elementary step, each reactant concentration appears with an exponent equal to its stoichiometric coefficient." },
    "2:c": { prompt: "Identify the intermediate in the two-step ozone mechanism.", steps: ["An intermediate is formed in one step and consumed in a later step.", "O(g) is produced in step 1 and consumed in step 2."], answer: "O(g) is the intermediate.", concept: "Intermediates cancel when the elementary steps are added to obtain the overall reaction." },
    "2:d": { prompt: "Write the balanced overall reaction for the two-step ozone mechanism.", steps: ["Add the steps: O3 → O2 + O and O3 + O → 2O2.", "Cancel O(g), which appears as a product in step 1 and a reactant in step 2.", "Combine the remaining species and check that oxygen atoms balance."], answer: "2 O3(g) → 3 O2(g).", concept: "The overall equation is obtained by adding elementary steps and canceling intermediates." }
  },
  "topic-6-1-6-5.pdf": {
    "1": { prompt: "Classify heating water on a hot plate as endothermic or exothermic, and state the direction of heat flow.", steps: ["Treat the water as the system and the hot plate/surroundings as the surroundings.", "Heat flows from the hotter surroundings into the water, increasing the system's thermal energy.", "A process that absorbs heat into the system is endothermic."], answer: "Endothermic; heat flows from the surroundings into the water (the system).", concept: "Endothermic and exothermic classifications are defined by heat flow into or out of the chosen system." }
  },
  "topic-9-1-9-7.pdf": {
    "1": { prompt: "Determine the sign of ΔS for each of the listed phase changes and reactions.", steps: ["H2O(s) → H2O(l): disorder increases on melting, so ΔS is +. C6H6(l) → C6H6(s): freezing decreases disorder, so ΔS is −.", "CH3OH(l) → CH3OH(g): vaporization increases accessible arrangements, so +. Br2(g) → Br2(l) and I2(g) → I2(s): condensation/deposition reduce disorder, so −.", "CO2(s) → CO2(g): sublimation increases disorder, so +. NH4NO3(s) → NH4+(aq) + NO3−(aq): dissolving this ionic solid increases dispersal, so +. Ag+(aq) + Cl−(aq) → AgCl(s): forming a solid precipitate reduces dispersal, so −.", "2KClO3(s) → 2KCl(s) + 3O2(g): producing gas increases entropy, so +. 4Fe(s) + 3O2(g) → 2Fe2O3(s): gas is consumed to form solid, so −.", "PCl5(g) → PCl3(g) + Cl2(g): one gas species forms two gas species, so +. N2(g) + 3H2(g) → 2NH3(g): gas moles decrease from four to two, so −."], answer: "In table order: +, −, +, −, +, −, +, −, +, −, +, −.", concept: "Entropy generally increases with greater particle dispersal, more gas particles, and melting/vaporization; it decreases with condensation, freezing, precipitation, and reactions that reduce gas moles." }
  },
  "topic-9-8-9-11.pdf": {
    "1:a": { prompt: "Classify the zinc/copper and copper/zinc reactions as thermodynamically favored or unfavored using the observations.", steps: ["When Zn(s) is placed in CuSO4(aq), a dark solid forms and the blue solution becomes lighter, evidence that Cu2+ is reduced to Cu(s) while Zn is oxidized.", "When Cu(s) is placed in ZnSO4(aq), no visible change occurs, so copper does not displace Zn2+ under these conditions."], answer: "Zn(s) + Cu2+(aq) → Zn2+(aq) + Cu(s) is favored; Cu(s) + Zn2+(aq) → Cu2+(aq) + Zn(s) is unfavored.", concept: "Observed spontaneous change indicates a thermodynamically favored reaction under the stated conditions." },
    "1:b": { prompt: "Write the net ionic equation for the thermodynamically favored reaction.", steps: ["Write the reacting species: Zn(s) reacts with Cu2+(aq) to form Zn2+(aq) and Cu(s).", "Sulfate ions are spectators, so omit them from the net ionic equation.", "Check that atoms and total charge are balanced."], answer: "Zn(s) + Cu2+(aq) → Zn2+(aq) + Cu(s).", concept: "A net ionic equation includes the species that undergo chemical change and omits spectator ions." }
  },
};

const RESPONSE_FRAMES = [
  { title: "Explain", prompt: "Make a claim, then connect it to a specific chemical principle or particle-level model. State why the evidence supports the claim." },
  { title: "Calculate", prompt: "Write the governing equation, substitute values with units, show the calculation, and report a correctly rounded answer with units." },
  { title: "Justify / predict", prompt: "State the prediction first. Then justify it using a relevant relationship, equilibrium principle, collision model, or particle-level explanation." },
  { title: "Draw / represent", prompt: "Label species, axes, charges, units, and relevant features. Make the representation consistent with the chemistry and the conditions in the prompt." },
];

export function FrqWorkspace() {
  const [unit, setUnit] = useState("1");
  const [selectedFile, setSelectedFile] = useState("");
  const [page, setPage] = useState("1");
  const [questionNumber, setQuestionNumber] = useState("1");
  const [partLabel, setPartLabel] = useState("");
  const [responseType, setResponseType] = useState("explain");
  const [helpLevel, setHelpLevel] = useState(0);
  const [workNotes, setWorkNotes] = useState("");
  const [navigationMessage, setNavigationMessage] = useState("");
  const [showFramework, setShowFramework] = useState(true);
  const [showPdfSolution, setShowPdfSolution] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showReaderMenu, setShowReaderMenu] = useState(true);
  const [localPdfUrl, setLocalPdfUrl] = useState<string | null>(null);
  const [localPdfName, setLocalPdfName] = useState("");
  const [frqProgress, setFrqProgress] = useState<Record<string, "attempted" | "review" | "mastered">>({});
  const frqProgressStorageKey = "apchem-frq-workspace-progress-v1";

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(frqProgressStorageKey);
      if (saved) setFrqProgress(JSON.parse(saved) as Record<string, "attempted" | "review" | "mastered">);
    } catch {
      // The workspace remains usable when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(frqProgressStorageKey, JSON.stringify(frqProgress));
    } catch {
      // Progress is optional and should never block FRQ practice.
    }
  }, [frqProgress]);
  const pdfSectionRef = useRef<HTMLElement | null>(null);

  const packets = useMemo(() => FRQ_PACKETS.filter((packet) => packet.unit === Number(unit)), [unit]);
  const selected = FRQ_PACKETS.find((packet) => packet.file === selectedFile) ?? packets[0];
  const maxPage = selected ? FRQ_PDF_PAGE_COUNTS[selected.file] ?? 1 : 1;
  const boundedPage = Math.min(maxPage, Math.max(1, Number(page) || 1));
  const pdfUrl = localPdfUrl ? `${localPdfUrl}#page=${boundedPage}&toolbar=1&navpanes=0` : (selected ? `/frq/${selected.file}#page=${boundedPage}&toolbar=1&navpanes=0` : "");
  const normalizedPart = partLabel.trim().toLowerCase().match(/^(?:part\s*)?\(?([a-h](?:\([ivx]+\))?)\)?$/)?.[1] ?? "";
  const localPacketMatches = !localPdfUrl || localPdfName === selected?.file;
  const frqProgressId = selected ? `${selected.file}:${questionNumber.trim()}:${normalizedPart || "whole"}` : "";
  const activeProgress = frqProgressId ? frqProgress[frqProgressId] : undefined;
  const activeSolution = selected && localPacketMatches
    ? (normalizedPart
        ? FRQ_WORKED_SOLUTIONS[selected.file]?.[`${questionNumber.trim()}:${normalizedPart}`]
        : FRQ_WORKED_SOLUTIONS[selected.file]?.[questionNumber.trim()])
    : undefined;

  function chooseUnit(value: string) {
    setUnit(value);
    setSelectedFile("");
    setPage("1");
    setQuestionNumber("1");
    setPartLabel("");
    setHelpLevel(0);
    setWorkNotes("");
    setNavigationMessage("");
    setLocalPdfUrl(null);
    setLocalPdfName("");
  }

  function chooseLocalPdf(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return;
    if (localPdfUrl) URL.revokeObjectURL(localPdfUrl);
    setLocalPdfUrl(URL.createObjectURL(file));
    setLocalPdfName(file.name);
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Free-response practice</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">FRQ Packet Workspace</h2>
            <p className="mt-2 text-sm leading-6 text-ink-dim">Open a topic packet, work through it in the PDF reader, and use the response framework to check what a strong chemistry explanation should contain.</p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-xl">
            <label className="text-sm font-semibold" htmlFor="frq-unit">AP Chemistry unit
              <select id="frq-unit" value={unit} onChange={(e) => chooseUnit(e.target.value)} className="mt-2 min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink">
                {Array.from({ length: 9 }, (_, i) => <option key={i + 1} value={String(i + 1)}>Unit {i + 1}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold" htmlFor="frq-packet">Topic packet
              <select id="frq-packet" value={selected?.file ?? ""} onChange={(e) => { setSelectedFile(e.target.value); setPage("1"); setQuestionNumber("1"); setPartLabel(""); setHelpLevel(0); setWorkNotes(""); setNavigationMessage(""); setLocalPdfUrl(null); setLocalPdfName(""); }} className="mt-2 min-h-12 w-full rounded-lg border border-border bg-card px-3 py-3 text-ink">
                {packets.map((packet) => <option key={packet.file} value={packet.file}>{packet.title}</option>)}
              </select>
            </label>
          </div>
        </div>
        {selected && <p className="mt-4 rounded-xl border border-border bg-bg/60 p-3 text-sm leading-6 text-ink-dim"><span className="font-semibold text-ink">Topics covered:</span> {selected.topics}</p>}
        <div className="mt-4 grid gap-3 rounded-xl border border-border bg-bg/50 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="text-sm font-semibold" htmlFor="frq-question-number">Printed question number
            <input id="frq-question-number" inputMode="numeric" value={questionNumber} onChange={(e) => { setQuestionNumber(e.target.value); setHelpLevel(0); }} placeholder="e.g. 4" className="mt-2 min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2 text-ink" />
          </label>
          <label className="text-sm font-semibold" htmlFor="frq-question-part">Lettered part (optional)
            <input id="frq-question-part" value={partLabel} onChange={(e) => { setPartLabel(e.target.value); setHelpLevel(0); }} placeholder="e.g. b(ii)" className="mt-2 min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2 text-ink" />
          </label>
          <button type="button" onClick={() => { if (localPdfUrl && localPdfName !== selected?.file) { setNavigationMessage("These page candidates belong to the selected hosted packet, not the different local PDF. Choose the matching packet or navigate the local PDF manually."); setHelpLevel(0); return; } const pages = selected ? FRQ_PAGE_CANDIDATES[selected.file] : undefined; const question = questionNumber.trim(); const part = partLabel.trim().toLowerCase().match(/^(?:part\s*)?\(?([a-h])/i)?.[1] ?? ""; const partPage = selected ? FRQ_PART_PAGE_CANDIDATES[selected.file]?.[question]?.[part] : undefined; const targetPage = partPage ?? pages?.[question]; if (targetPage) { setPage(String(targetPage)); pdfSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); setNavigationMessage(part && !partPage ? `Jumped to Q${question}'s candidate page ${targetPage}; no separate page candidate was found for part ${partLabel.trim()}. Confirm the printed part in the PDF.` : `Jumped to candidate page ${targetPage}. Confirm the printed question/part in the PDF.`); } else { setNavigationMessage("No question-start candidate was detected for this entry. Use the PDF page control to find it manually."); } setHelpLevel(0); }} className="min-h-11 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#06251b]">Find question page</button>
          <p className="text-xs leading-5 text-ink-dim sm:col-span-3">Question and lettered-part page candidates are extracted from all 25 packets. If no part-specific candidate exists, the jump falls back to the question page. PDF text extraction can miss headings or capture continuation pages, so confirm the printed question and part before relying on a jump.</p>
          {navigationMessage && <p role="status" className="text-sm leading-5 text-ink-dim sm:col-span-3">{navigationMessage}</p>}
        </div>
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
        <section ref={pdfSectionRef} className={isFullscreen ? "fixed inset-0 z-[100] order-2 overflow-y-auto border border-border bg-card xl:order-1" : "order-2 scroll-mt-4 overflow-hidden rounded-2xl border border-border bg-card/40 xl:order-1"}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3 sm:px-5">
            <div><h3 className="font-semibold">Packet PDF</h3><p className="mt-1 text-xs text-ink-dim">{localPdfName ? `Using local copy: ${localPdfName}` : "Hosted packet · use the PDF toolbar to zoom, print, or download"}</p></div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="cursor-pointer rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-accent/50" htmlFor="frq-local-pdf">Open local PDF</label>
              <input id="frq-local-pdf" type="file" accept="application/pdf,.pdf" onChange={chooseLocalPdf} className="sr-only" />
              {activeSolution && <button type="button" onClick={() => setShowPdfSolution((shown) => !shown)} aria-pressed={showPdfSolution} className="rounded-lg bg-accent px-3 py-2 text-xs font-bold text-[#06251b]">{showPdfSolution ? "Hide worked answer" : "Show worked answer"}</button>}
              <button type="button" onClick={() => { setIsFullscreen((value) => !value); setShowReaderMenu(true); }} aria-pressed={isFullscreen} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold">{isFullscreen ? "Exit full screen" : "Expand reader"}</button>
            </div>
          </div>
          {pdfUrl ? <div className={isFullscreen ? "group relative h-[calc(100vh-64px)]" : "relative"}>
            <iframe key={pdfUrl + "#page=" + boundedPage} title="AP Chemistry FRQ packet PDF" src={pdfUrl + (pdfUrl.includes("#") ? "&" : "#") + "toolbar=1&navpanes=0&scrollbar=1" + (isFullscreen ? "&view=FitH" : "") + "&page=" + boundedPage} className={isFullscreen ? "block h-full min-h-0 w-full bg-white" : "block h-[76vh] min-h-[620px] w-full bg-white"} />
            {isFullscreen && <div className={"absolute left-0 top-0 z-20 h-full w-72 max-w-[85vw] border-r border-border bg-card/95 p-4 shadow-2xl backdrop-blur transition-opacity " + (showReaderMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100")} onMouseEnter={() => setShowReaderMenu(true)}><button type="button" onClick={() => setShowReaderMenu((value) => !value)} className="mb-4 rounded-lg border border-border px-3 py-2 text-xs font-semibold">{showReaderMenu ? "Hide menu" : "Show menu"}</button><p className="text-xs font-bold uppercase tracking-wide text-accent">Packet navigation</p><label className="mt-3 block text-sm font-semibold">Unit<select value={unit} onChange={(e) => chooseUnit(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2">{Array.from({ length: 9 }, (_, i) => <option key={i + 1} value={String(i + 1)}>Unit {i + 1}</option>)}</select></label><label className="mt-3 block text-sm font-semibold">Packet<select value={selected?.file ?? ""} onChange={(e) => { setSelectedFile(e.target.value); setPage("1"); setQuestionNumber("1"); setPartLabel(""); setHelpLevel(0); setWorkNotes(""); setNavigationMessage(""); setLocalPdfUrl(null); setLocalPdfName(""); }} className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2">{packets.map((packet) => <option key={packet.file} value={packet.file}>{packet.title}</option>)}</select></label><label className="mt-3 block text-sm font-semibold">Question<input value={questionNumber} onChange={(e) => setQuestionNumber(e.target.value)} inputMode="numeric" className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2" /></label><label className="mt-3 block text-sm font-semibold">Part<input value={partLabel} onChange={(e) => setPartLabel(e.target.value)} placeholder="a, b(ii)..." className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2" /></label><button type="button" onClick={() => { const q = Math.max(1, Number(questionNumber) || 1); const part = partLabel.trim().toLowerCase().match(/^(?:part\s*)?\(?([a-h])/i)?.[1] ?? ""; const target = selected ? (FRQ_PART_PAGE_CANDIDATES[selected.file]?.[String(q)]?.[part] ?? FRQ_PAGE_CANDIDATES[selected.file]?.[String(q)]) : undefined; if (target) setPage(String(Math.min(maxPage, Math.max(1, target)))); setHelpLevel(0); setShowPdfSolution(Boolean(activeSolution)); }} className="mt-3 w-full rounded-lg bg-accent px-3 py-2 text-sm font-bold text-[#06251b]">Jump to question</button><div className="mt-4 grid grid-cols-2 gap-2"><button type="button" onClick={() => { const q = Math.max(1, Number(questionNumber) || 1); const letter = normalizedPart.match(/^([a-h])/i)?.[1]?.toLowerCase(); if (letter && letter > "a") { const previousPart = String.fromCharCode(letter.charCodeAt(0) - 1); setPartLabel(previousPart); setHelpLevel(0); setShowPdfSolution(true); const target = selected ? FRQ_PART_PAGE_CANDIDATES[selected.file]?.[String(q)]?.[previousPart] ?? FRQ_PAGE_CANDIDATES[selected.file]?.[String(q)] : undefined; if (target) setPage(String(Math.min(maxPage, Math.max(1, target)))); return; } const previousQuestion = Math.max(1, q - 1); setQuestionNumber(String(previousQuestion)); setPartLabel(""); setHelpLevel(0); setShowPdfSolution(true); const target = selected ? FRQ_PAGE_CANDIDATES[selected.file]?.[String(previousQuestion)] : undefined; if (target) setPage(String(Math.min(maxPage, Math.max(1, target)))); }} className="rounded-lg border border-border px-2 py-2 text-sm">← Previous</button><button type="button" onClick={() => { const q = Math.max(1, Number(questionNumber) || 1); const letter = normalizedPart.match(/^([a-h])/i)?.[1]?.toLowerCase(); if (letter) { const nextPart = String.fromCharCode(letter.charCodeAt(0) + 1); if (nextPart <= "h") { setPartLabel(nextPart); setHelpLevel(0); setShowPdfSolution(true); const target = selected ? FRQ_PART_PAGE_CANDIDATES[selected.file]?.[String(q)]?.[nextPart] ?? FRQ_PAGE_CANDIDATES[selected.file]?.[String(q)] : undefined; if (target) setPage(String(Math.min(maxPage, Math.max(1, target)))); return; } } const nextQuestion = q + 1; setQuestionNumber(String(nextQuestion)); setPartLabel(""); setHelpLevel(0); setShowPdfSolution(true); const target = selected ? FRQ_PAGE_CANDIDATES[selected.file]?.[String(nextQuestion)] : undefined; if (target) setPage(String(Math.min(maxPage, Math.max(1, target)))); }} className="rounded-lg border border-border px-2 py-2 text-sm">Next →</button></div></div>}
            {!isFullscreen && null}
            {showPdfSolution && activeSolution && <div role="region" aria-label="Teacher-style worked solution" className="absolute right-4 top-4 z-30 max-h-[48%] w-[min(34rem,92%)] overflow-y-auto rounded-xl border-2 border-red-300 bg-white/95 px-5 py-4 text-red-700 shadow-2xl backdrop-blur-sm sm:px-8">
              <div className="mx-auto max-w-4xl font-serif italic"><div className="flex flex-wrap items-baseline justify-between gap-2"><p className="text-sm font-bold not-italic text-red-800">Worked solution · Q{questionNumber.trim()}{partLabel.trim() ? ` · ${partLabel.trim()}` : ""}</p><p className="text-xs not-italic text-red-500">Original study explanation · not an official scoring guide</p></div><p className="mt-3 text-base font-semibold">{activeSolution.prompt}</p><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">{activeSolution.steps.map((step) => <li key={step}>{step}</li>)}</ol><p className="mt-4 border-t border-red-200 pt-3 text-base font-bold">Final answer: {activeSolution.answer}</p><p className="mt-2 text-xs not-italic text-red-500">Show the governing principle, setup, substitutions, units, and appropriate precision as applicable.</p></div></div>}
          </div> : <div className="flex min-h-[500px] items-center justify-center p-8 text-center text-sm text-ink-dim">Select a packet to open the PDF.</div>}
          {activeSolution && <details className="border-t border-border bg-bg/70 p-4 sm:p-5">
            <summary className="cursor-pointer text-sm font-bold text-accent">Show worked steps for Q{questionNumber.trim()}{partLabel.trim() ? ` · ${partLabel.trim()}` : ""} beside the PDF</summary>
            <div className="mt-3 rounded-xl border border-border bg-card/70 p-4">
              <p className="text-sm font-semibold text-ink">{activeSolution.prompt}</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-ink-dim">{activeSolution.steps.map((step) => <li key={step}>{step}</li>)}</ol>
              <p className="mt-3 rounded-lg border border-accent/25 bg-accent-soft/10 p-3 text-sm font-bold text-ink">Final answer: {activeSolution.answer}</p>
              <p className="mt-2 text-xs leading-5 text-ink-dim">Scoring-focused structure: show the equation or chemical principle, include substitutions and units where relevant, explain the reasoning, and state the answer with appropriate precision. Original study solution, not an official scoring guide.</p>
            </div>
          </details>}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
            <p className="text-xs leading-5 text-ink-dim">Page jump works with browsers that support the PDF viewer fragment. It may not work in every embedded PDF viewer.</p>
            <label className="flex items-center gap-2 text-sm font-semibold">Go to page
              <input type="number" min="1" max={maxPage} value={page} onChange={(e) => setPage(e.target.value)} onBlur={() => setPage(String(Math.min(maxPage, Math.max(1, Number(page) || 1))))} aria-label={`PDF page, 1 through ${maxPage}`} className="w-20 rounded-lg border border-border bg-card px-3 py-2 text-ink" />
            </label>
          </div>
        </section>

        <aside className="order-1 space-y-4 xl:sticky xl:top-4 xl:order-2">
          <section className="rounded-2xl border border-border bg-card/60 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-accent">Question help</p>
            <h3 className="mt-1 text-xl font-bold">Q{questionNumber.trim() || "—"}{partLabel.trim() ? ` · ${partLabel.trim()}` : ""}</h3>
            <div className="mt-3 rounded-xl border border-border bg-bg/50 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold">Track this question</p>
                <span className="text-[11px] text-ink-dim">{Object.values(frqProgress).filter((status) => status === "mastered").length} mastered · {Object.values(frqProgress).filter((status) => status === "review").length} to review</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["attempted", "review", "mastered"] as const).map((status) => <button key={status} type="button" aria-pressed={activeProgress === status} onClick={() => { if (!frqProgressId) return; setFrqProgress((current) => ({ ...current, [frqProgressId]: status })); }} className={"min-h-9 rounded-md border px-2 py-2 text-xs font-semibold capitalize " + (activeProgress === status ? "border-accent bg-accent-soft/20 text-accent" : "border-border")}>{status === "review" ? "Review again" : status}</button>)}
                <button type="button" onClick={() => { if (!frqProgressId) return; setFrqProgress((current) => { const next = { ...current }; delete next[frqProgressId]; return next; }); }} className="min-h-9 rounded-md border border-border px-2 py-2 text-xs font-semibold text-ink-dim">Clear status</button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-ink-dim">Progress is saved in this browser. Each question/part is tracked separately; mark it mastered only when you can earn the points without looking at the solution.</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-dim">Work through the prompt first. These are staged problem-solving cues, not a question-specific answer key.</p>
            {activeSolution && <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Worked walkthrough · independently written</p>
              <p className="mt-2 text-sm font-semibold text-ink">{activeSolution.prompt}</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-ink-dim">{activeSolution.steps.map((step) => <li key={step}>{step}</li>)}</ol>
              <p className="mt-3 rounded-lg border border-border bg-bg/60 p-3 text-sm font-semibold text-ink">Answer: {activeSolution.answer}</p>
              <p className="mt-2 text-xs leading-5 text-ink-dim">Key idea: {activeSolution.concept} This is an original worked explanation, not an official answer key or College Board scoring guide.</p>
            </div>}
            <label className="mt-4 block text-sm font-semibold" htmlFor="frq-response-type">What is the task asking you to do?
              <select id="frq-response-type" value={responseType} onChange={(e) => { setResponseType(e.target.value); setHelpLevel(0); }} className="mt-2 min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2 text-ink">
                <option value="explain">Explain / justify</option>
                <option value="calculate">Calculate</option>
                <option value="predict">Predict / compare</option>
                <option value="draw">Draw / represent</option>
                <option value="graph">Analyze a graph or data</option>
              </select>
            </label>
            <label className="mt-4 block text-sm font-semibold" htmlFor="frq-work-notes">Prompt details or your attempt (optional)
              <textarea id="frq-work-notes" value={workNotes} onChange={(e) => setWorkNotes(e.target.value)} rows={3} placeholder="Paste the relevant part of the prompt or note what you tried…" className="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-normal leading-6 text-ink" />
            </label>
            {helpLevel >= 1 && <div className="mt-4 rounded-xl border border-border bg-bg/60 p-4"><p className="text-xs font-bold uppercase tracking-wide text-accent">Hint 1 · Identify</p><p className="mt-2 text-sm leading-6 text-ink-dim">{({
              explain: "Underline the claim the prompt asks you to support. Identify the chemical principle and the specific evidence from the prompt that connects to it.",
              calculate: "List the target quantity, the given values, and their units. Choose an equation that relates the target to the given information before substituting.",
              predict: "State what changes and what stays constant. Identify the relationship or chemical principle that determines the direction of the change.",
              draw: "List every required species, particle, charge, label, axis, and unit. Decide which features must be shown for the representation to communicate the chemistry.",
              graph: "Read the axes and units first. Identify the trend, compare relevant values, and distinguish what the data show from what you infer."
            } as Record<string,string>)[responseType]}</p></div>}
            {helpLevel >= 2 && <div className="mt-3 rounded-xl border border-border bg-bg/60 p-4"><p className="text-xs font-bold uppercase tracking-wide text-accent">Hint 2 · Build the reasoning</p><p className="mt-2 text-sm leading-6 text-ink-dim">{({
              explain: "Use a claim → evidence → chemistry link structure. Name the particles, interactions, or governing principle; avoid repeating the evidence without explaining why it matters.",
              calculate: "Write the equation symbolically, substitute values with units, show the algebra, and check the result's units and significant figures.",
              predict: "Make the prediction explicit, then justify it using a cause-and-effect relationship. If comparing trials, identify which variable changed and which were controlled.",
              draw: "Construct the representation from the required constraints, then audit atom counts, charge, geometry, labels, and consistency with the prompt.",
              graph: "Use a specific comparison or trend as evidence, then explain it with the relevant chemical model. Include calculations when the prompt asks for a rate, slope, or quantitative comparison."
            } as Record<string,string>)[responseType]}</p></div>}
            {helpLevel >= 3 && <div className="mt-3 rounded-xl border border-accent/30 bg-accent-soft/10 p-4"><p className="text-xs font-bold uppercase tracking-wide text-accent">Final self-check</p><p className="mt-2 text-sm leading-6 text-ink-dim">{({
              explain: "Can a reader point to your claim, the evidence, and the sentence that explains the chemistry connecting them?",
              calculate: "Are the equation, substitutions, units, sign, significant figures, and final answer all visible?",
              predict: "Did you answer the direction or comparison directly and justify it with the correct principle rather than intuition alone?",
              draw: "Would another student be able to interpret your drawing without guessing what the symbols, axes, or labels mean?",
              graph: "Did you cite actual data or a visible trend and connect it to chemistry without claiming more than the data support?"
            } as Record<string,string>)[responseType]}</p></div>}
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => setHelpLevel((level) => Math.min(3, level + 1))} disabled={helpLevel >= 3} className="rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-[#06251b] disabled:cursor-not-allowed disabled:opacity-50">{helpLevel === 0 ? "Reveal first hint" : helpLevel === 1 ? "Reveal next hint" : helpLevel === 2 ? "Show final check" : "All hints shown"}</button>
              <button type="button" onClick={() => setHelpLevel(0)} className="rounded-lg border border-border px-3 py-2.5 text-sm font-semibold">Reset hints</button>
            </div>
            {!activeSolution && <p className="mt-3 text-xs leading-5 text-ink-dim">No question-specific worked solution is available for this selection yet. Use the <a href={`/units/${unit}/review`} className="font-semibold text-accent underline underline-offset-2">Unit {unit} review</a> for related chemistry review.</p>}
          </section>
          <section className="rounded-2xl border border-border bg-card/60 p-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-bold uppercase tracking-[0.13em] text-accent">Writing support</p><h3 className="mt-1 text-xl font-bold">Build a point-worthy response</h3></div>
              <button type="button" onClick={() => setShowFramework((shown) => !shown)} aria-expanded={showFramework} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold">{showFramework ? "Collapse" : "Expand"}</button>
            </div>
            {showFramework && <div className="mt-4 space-y-3">
              {RESPONSE_FRAMES.map((frame, index) => <article key={frame.title} className="rounded-xl border border-border bg-bg/60 p-4">
                <div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft/25 text-xs font-bold text-accent">{index + 1}</span><h4 className="text-sm font-bold">{frame.title}</h4></div>
                <p className="mt-2 text-sm leading-6 text-ink-dim">{frame.prompt}</p>
              </article>)}
            </div>}
          </section>

          <section className="rounded-2xl border border-border bg-card/60 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-accent">Before you submit</p>
            <h3 className="mt-1 text-lg font-bold">FRQ self-check</h3>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-ink-dim">
              <li>□ Answer every lettered part and follow the command verb.</li>
              <li>□ Show equations, substitutions, units, and appropriate significant figures for calculations.</li>
              <li>□ Explain the chemical reasoning, not just the final result.</li>
              <li>□ Use particle-level reasoning when asked to explain molecular behavior.</li>
              <li>□ Label graphs, diagrams, species, axes, and units.</li>
            </ul>
            <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-ink-dim">This framework is general study guidance, not an official College Board scoring rubric or a verified answer key. Question-specific hints and worked solutions will be added after each prompt is mapped and checked.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
