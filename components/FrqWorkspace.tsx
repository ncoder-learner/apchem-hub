"use client";

import { useMemo, useState, type ChangeEvent } from "react";
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

    "2": { prompt: "Mark the five statements about dynamic equilibrium true or false.", steps: ["A forward rate greater than the reverse rate means the system is not at equilibrium.", "At equilibrium, forward and reverse rates are equal, but reactant and product partial pressures do not have to be equal.", "At equilibrium, macroscopic concentrations and partial pressures remain constant over time.", "Equilibrium is dynamic: particles continue to collide and react in both directions.", "Equal forward and reverse rates produce no net observable change."], answer: "In order: True, False, True, False, True.", concept: "Dynamic equilibrium means equal opposing rates, not equal amounts and not stopped molecular motion." },
    "3:a": { prompt: "For H2(g) + I2(g) ⇌ 2 HI(g), compare the listed concentrations at Time 1 and Time 2 in part (a).", steps: ["[H2] decreases from 2.0 M to 1.0 M and [I2] decreases from 3.0 M to 2.0 M.", "[HI] increases from 1.0 M to 3.0 M, so the net change is toward products."], answer: "The forward reaction rate is greater than the reverse reaction rate over this interval.", concept: "A net increase in products and decrease in reactants indicates forward progress." },
    "3:b": { prompt: "For H2(g) + I2(g) ⇌ 2 HI(g), compare the listed concentrations at Time 1 and Time 2 in part (b).", steps: ["[H2] increases from 0.10 M to 1.0 M and [I2] increases from 0.20 M to 1.1 M.", "[HI] decreases from 9.5 M to 7.7 M, so the net change is toward reactants."], answer: "The reverse reaction rate is greater than the forward reaction rate over this interval.", concept: "A net decrease in products and increase in reactants indicates reverse progress." },
    "4": { prompt: "Write Kc and Kp expressions for the five equilibria in Question 4.", steps: ["For N2(g) + 3 H2(g) ⇌ 2 NH3(g): Kc = [NH3]^2/([N2][H2]^3); Kp = (PNH3)^2/(PN2(PH2)^3).", "For 2 SO3(g) ⇌ 2 SO2(g) + O2(g): Kc = [SO2]^2[O2]/[SO3]^2; Kp = (PSO2)^2(PO2)/(PSO3)^2.", "For CaCO3(s) ⇌ CaO(s) + CO2(g), omit both solids: Kc = [CO2] and Kp = PCO2.", "For PbI2(s) ⇌ Pb2+(aq) + 2 I−(aq): Kc = [Pb2+][I−]^2; Kp is not applicable because no gases appear.", "For HF(aq) + H2O(l) ⇌ H3O+(aq) + F−(aq), omit liquid water: Kc = [H3O+][F−]/[HF]; Kp is not applicable because no gases appear."], answer: "Use products over reactants, raise each species to its stoichiometric coefficient, and omit pure solids and liquids. Kp is only applicable to equilibria with gaseous species.", concept: "Equilibrium expressions follow stoichiometric coefficients; pure solids and liquids are excluded." },
    "5:a": { prompt: "Calculate the concentration changes for all six N2O4(g) ⇌ 2 NO2(g) experiments.", steps: ["Use change = equilibrium concentration − initial concentration for each species.", "Experiment 1: Δ[N2O4] = 9.30 − 10.00 = −0.70 M; Δ[NO2] = 1.40 − 0.00 = +1.40 M.", "Experiment 2: Δ[N2O4] = +4.51 M; Δ[NO2] = −9.02 M. Experiment 3: Δ[N2O4] = +4.14 M; Δ[NO2] = −8.28 M.", "Experiment 4: Δ[N2O4] = +2.46 M; Δ[NO2] = −4.92 M. Experiment 5: Δ[N2O4] = −0.14 M; Δ[NO2] = +0.28 M.", "Experiment 6: Δ[N2O4] = +1.10 M; Δ[NO2] = −2.20 M."], answer: "Experiments 1–6, (Δ[N2O4], Δ[NO2]) in M: (−0.70, +1.40), (+4.51, −9.02), (+4.14, −8.28), (+2.46, −4.92), (−0.14, +0.28), (+1.10, −2.20).", concept: "Concentration change is final minus initial; reactant and product changes have opposite signs." },
    "5:b": { prompt: "Determine the ratio Δ[NO2]/Δ[N2O4] for the N2O4(g) ⇌ 2 NO2(g) reaction.", steps: ["From the balanced equation, one mole of N2O4 consumed produces two moles of NO2.", "The concentration changes therefore have opposite signs and a magnitude ratio of 2:1."], answer: "Δ[NO2]/Δ[N2O4] = −2 (magnitude 2).", concept: "The signed change ratio follows stoichiometric coefficients and the opposite directions of reactant/product changes." },
    "5:c": { prompt: "Calculate Kc for each of the six experiments for N2O4(g) ⇌ 2 NO2(g) at 373 K.", steps: ["Use Kc = [NO2]^2/[N2O4] with equilibrium concentrations only.", "Experiments 1–6 give approximately 1.40²/9.30 = 0.21; 0.98²/4.51 = 0.21; 1.72²/14.14 = 0.21; 1.08²/5.46 = 0.21; 1.28²/7.86 = 0.21; and 0.80²/3.10 = 0.21.", "Round each result to two significant figures."], answer: "Kc ≈ 0.21 for each of the six experiments.", concept: "At a fixed temperature, the equilibrium constant is the same for different equilibrium mixtures of the same reaction." },
    "6:a": { prompt: "Calculate Kc for H2(g) + I2(g) ⇌ 2 HI(g) at 448°C using [H2] = 0.80 M, [I2] = 0.54 M, and [HI] = 4.7 M.", steps: ["Write Kc = [HI]^2/([H2][I2]).", "Substitute: Kc = (4.7)^2/[(0.80)(0.54)] = 22.09/0.432 ≈ 51.1.", "Round to two significant figures."], answer: "Kc = 51.", concept: "Use equilibrium concentrations and square the product concentration because its coefficient is 2." },
    "6:b": { prompt: "If 0.25 M H2 and 0.25 M I2 are initially added with no HI present, will equilibrium [H2] be less than or greater than 0.25 M?", steps: ["Initially, Qc = [HI]^2/([H2][I2]) = 0 because [HI] = 0.", "Since Qc < Kc, the reaction proceeds toward products and consumes H2 and I2."], answer: "Less than 0.25 M.", concept: "When Q is below K, the reaction shifts toward products to raise Q to K." },
    "6:c": { prompt: "For [H2] = 0.15 M, [I2] = 0.25 M, and [HI] = 3.2 M, determine whether the system is at equilibrium.", steps: ["Calculate Qc = [HI]^2/([H2][I2]).", "Qc = (3.2)^2/[(0.15)(0.25)] = 10.24/0.0375 ≈ 273.", "Compare Qc ≈ 273 with Kc ≈ 51 from part (a). They are not equal."], answer: "The system is not at equilibrium because Qc ≈ 2.7 × 10^2, which is greater than Kc ≈ 51.", concept: "A system is at equilibrium only when Q equals K." },
    "6:d": { prompt: "Determine the direction in which H2(g) + I2(g) ⇌ 2 HI(g) will proceed from the concentrations in part (c).", steps: ["From part (c), Qc ≈ 273 and Kc ≈ 51.", "Because Qc > Kc, there is excess product relative to equilibrium; the net reaction proceeds toward reactants."], answer: "Toward the left, forming H2 and I2 and consuming HI.", concept: "Q > K means the reaction shifts toward reactants until Q falls to K." },
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
  },
  "topic-1-4-1-6.pdf": {
    "4": { prompt: "A mixture of CaCO3 and Na2CO3 contains 35.00% Na by mass. Calculate the percentage of Na2CO3 by mass.", steps: ["In Na2CO3, the sodium mass fraction is 2(22.99)/105.99 = 0.4338.", "Only Na2CO3 contributes sodium, so mixture mass fraction of Na2CO3 = 0.3500/0.4338.", "Convert the mass fraction to percent."], answer: "80.7% Na2CO3 by mass", concept: "The measured sodium fraction comes entirely from the sodium-containing component." },
    "5": { prompt: "Na and Mg have valence electrons in the third energy level. Which experiences greater nuclear attraction on its valence electrons?", steps: ["Na and Mg valence electrons occupy the same principal energy level.", "Mg has a greater nuclear charge, while shielding is similar for these adjacent elements.", "The stronger effective attraction is on Mg's valence electrons."], answer: "Mg", concept: "Across a period, increasing effective nuclear charge strengthens attraction to valence electrons." },
    "6": { prompt: "Na's valence electron is in the third energy level and K's is in the fourth. Which has greater attraction to its valence electron?", steps: ["K has an additional occupied energy level, so its valence electron is farther from the nucleus.", "The extra inner shell increases shielding.", "These effects outweigh K's greater proton count for the outer electron."], answer: "Na", concept: "Down a group, greater distance and shielding generally weaken attraction to the valence electron." },
    "10": { prompt: "Circle all listed electron configurations that represent excited states.", steps: ["Compare each configuration with the ground state for the element or ion having the same total electron count.", "1s² 2s² 2p⁵ 3s¹ is excited: one electron is promoted from 2p to 3s relative to Ne.", "1s² 2s¹ 2p² is excited: for five electrons, the ground state is 1s² 2s² 2p¹.", "1s² 2s² 2p⁶ 3s¹ 3p¹ is excited: for twelve electrons, Mg ground state is [Ne] 3s². The other listed configurations are ground states."], answer: "Excited states: 1s² 2s² 2p⁵ 3s¹; 1s² 2s¹ 2p²; and 1s² 2s² 2p⁶ 3s¹ 3p¹.", concept: "An excited state has the correct total electron count but at least one electron occupies a higher-energy arrangement than in the ground state." },
    "11": { prompt: "Write the ground-state electron configurations for Ca²⁺, Fe²⁺, O²⁻, and Fe³⁺.", steps: ["Ca has 20 electrons; Ca²⁺ loses its two 4s electrons and has 18 electrons: [Ar].", "Fe has configuration [Ar] 4s² 3d⁶. Remove the 4s electrons first to form Fe²⁺: [Ar] 3d⁶.", "O has 8 electrons; O²⁻ gains two electrons to reach 10 total, giving 1s² 2s² 2p⁶ = [Ne].", "Fe³⁺ loses one more electron from Fe²⁺, leaving [Ar] 3d⁵."], answer: "Ca²⁺: [Ar]; Fe²⁺: [Ar] 3d⁶; O²⁻: [Ne]; Fe³⁺: [Ar] 3d⁵.", concept: "For transition-metal cations, remove electrons from the highest principal energy level first (4s before 3d); anions gain electrons to fill the valence shell." }
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
  },
  "topic-2-7.pdf": {
    "1": { prompt: "Determine Lewis structures, molecular geometry, and bond angles for CO2, NO2+, and HCN.", steps: ["CO2: O=C=O; carbon has two electron domains and no lone pairs.", "NO2+: [O=N=O]+; nitrogen has two electron domains and no lone pair.", "HCN: H−C≡N; carbon has two electron domains. All three central atoms have linear geometry."], answer: "CO2, NO2+, and HCN are linear, with bond angles of approximately 180°.", concept: "Two electron domains around the central atom produce a linear arrangement." },
    "2": { prompt: "Draw Lewis structures and determine molecular geometry and bond angles for BF3, SO3, and NO3−.", steps: ["BF3: put B in the center with three single B−F bonds; each F has three lone pairs. B has an incomplete octet (six electrons).", "SO3: place S in the center with three S−O bonding regions. Resonance descriptions give three equivalent S−O bonds in the trigonal-planar molecule.", "NO3−: draw N in the center with one N=O bond and two N−O− bonds in a bracket with overall −1 charge. There are three equivalent resonance forms, so the N−O bonds are equivalent in the resonance hybrid.", "Each central atom has three bonding domains and no lone pairs, so the domains lie in one plane."], answer: "BF3, SO3, and NO3− are trigonal planar, with bond angles near 120°.", concept: "Three electron domains and no central lone pair give trigonal-planar geometry; resonance distributes bonding and charge across equivalent positions." },
    "3": { prompt: "Draw Lewis structures and determine molecular geometry for CF4, NH4+, and SO42−.", steps: ["CF4: place C in the center with four single C−F bonds; each F has three lone pairs and C has no lone pairs.", "NH4+: place N in the center with four single N−H bonds, enclose the ion in brackets with a + charge, and give N no lone pair.", "SO42−: place S in the center bonded to four O atoms and enclose the ion in brackets with a 2− charge. A common resonance representation has two S=O bonds and two S−O− bonds; equivalent resonance forms delocalize the bonding and charge.", "Each central atom has four bonding domains and no lone pairs, producing tetrahedral molecular geometry."], answer: "CF4, NH4+, and SO42− are tetrahedral, with ideal bond angles near 109.5°.", concept: "Four bonding domains and no central lone pairs give tetrahedral geometry; resonance descriptions represent delocalized bonding in polyatomic ions." },
    "4": { prompt: "Draw PF5 and predict its molecular geometry.", steps: ["Count 40 valence electrons: P contributes 5 and five F atoms contribute 35.", "Place P in the center with five single P−F bonds and complete each F octet.", "Five bonding domains and no lone pairs around P give a trigonal-bipyramidal arrangement."], answer: "PF5 is trigonal bipyramidal; ideal angles are about 90°, 120°, and 180°.", concept: "Five electron domains adopt a trigonal-bipyramidal geometry." },
    "5": { prompt: "Draw SF6 and predict its molecular geometry.", steps: ["Count 48 valence electrons: S contributes 6 and six F atoms contribute 42.", "Place S in the center with six single S−F bonds and complete each F octet.", "Six bonding domains and no lone pairs around S give an octahedral arrangement."], answer: "SF6 is octahedral, with ideal angles of 90° and 180°.", concept: "Six electron domains adopt an octahedral geometry." },
    "8": { prompt: "Arrange CH4, NH3, and H2O from smallest bond angle to largest.", steps: ["Each central atom has four electron domains, giving a tetrahedral electron-domain arrangement.", "CH4 has no lone pairs, NH3 has one, and H2O has two.", "Lone pairs repel bonding pairs more strongly and compress bond angles as their number increases."], answer: "H2O (~104.5°) < NH3 (~107°) < CH4 (~109.5°).", concept: "VSEPR predicts that lone-pair repulsion compresses adjacent bond angles." }
  },
  "topic-3-1.pdf": {
    "14:b": { prompt: "Explain why CH3F cannot form a hydrogen-bonding attraction with another CH3F molecule.", steps: ["Conventional hydrogen bonding requires H to be directly bonded to N, O, or F in the donor molecule.", "In CH3F, the hydrogens are bonded to carbon, not fluorine.", "The fluorine atom has lone pairs and can accept a hydrogen bond from a suitable donor, but CH3F does not provide the required N−H, O−H, or F−H donor bond to another CH3F molecule."], answer: "CH3F molecules cannot hydrogen-bond to each other because their H atoms are bonded to carbon, not directly to F.", concept: "A molecule's electronegative atom alone does not make it a hydrogen-bond donor; the hydrogen must be bonded directly to N, O, or F." },
    "6": { prompt: "Explain why CF4 has a higher boiling point than CH4.", steps: ["Both molecules are nonpolar, so London dispersion forces are the dominant intermolecular attraction.", "CF4 has a larger electron cloud and more electrons than CH4, making it more polarizable.", "Stronger dispersion forces require more energy to separate CF4 molecules."], answer: "CF4 has stronger London dispersion forces because its electron cloud is larger and more polarizable.", concept: "For nonpolar molecules, greater polarizability generally strengthens dispersion forces and raises boiling point." },
    "7": { prompt: "Explain why acetone, (CH3)2CO, has a higher boiling point than CF4.", steps: ["CF4 is nonpolar, so its molecules attract mainly through London dispersion forces.", "Acetone has a polar carbonyl group, giving its molecules permanent dipoles and dipole–dipole attractions.", "Those stronger intermolecular attractions help explain acetone's higher boiling point despite CF4's larger molar mass."], answer: "Acetone's dipole–dipole attractions, in addition to dispersion forces, are stronger overall than the attractions between nonpolar CF4 molecules.", concept: "Boiling point depends on total intermolecular attraction, not molar mass alone." },
    "16": { prompt: "Explain why NH4+ can be a hydrogen-bond donor but not a hydrogen-bond acceptor.", steps: ["NH4+ has N−H bonds, so its hydrogen atoms can participate as hydrogen-bond donors.", "Nitrogen has four N−H bonds and no available lone pair in NH4+.", "A hydrogen-bond acceptor needs an available lone pair or another suitable electron-rich site."], answer: "NH4+ can donate hydrogen bonds through its N−H bonds but cannot accept them because it has no available nitrogen lone pair.", concept: "Hydrogen-bond donation involves an H attached to an electronegative atom; acceptance requires an available electron pair." },
    "17": { prompt: "Explain why NCl3 can be a hydrogen-bond acceptor but not a hydrogen-bond donor.", steps: ["Nitrogen in NCl3 has a lone pair that can accept a hydrogen bond.", "NCl3 contains no N−H, O−H, or F−H bond.", "Without an H attached to a strongly electronegative atom, it cannot donate a conventional hydrogen bond."], answer: "NCl3 can accept through the nitrogen lone pair but cannot donate because it has no suitable bonded hydrogen.", concept: "Identify both the lone pair required for acceptance and the donor hydrogen required for donation." },
    "18": { prompt: "Explain why NH2Cl can behave as both a hydrogen-bond donor and acceptor.", steps: ["NH2Cl contains N−H bonds, so it has hydrogen atoms that can donate hydrogen bonds.", "Nitrogen also has a lone pair available to accept a hydrogen bond.", "It therefore has the structural features needed for both roles."], answer: "NH2Cl can donate through its N−H bonds and accept through the nitrogen lone pair.", concept: "A molecule can be both a hydrogen-bond donor and acceptor if it has a suitable bonded hydrogen and an available lone pair." }
  },
  "topic-3-2-3-4.pdf": {
    "5": { prompt: "Explain why melting diamond breaks covalent bonds, whereas melting solid water does not break O−H covalent bonds.", steps: ["Diamond is a network-covalent solid: carbon atoms are connected throughout the solid by covalent bonds.", "Melting diamond requires disrupting the extended covalent network.", "Ice is a molecular solid; melting mainly disrupts intermolecular attractions between water molecules while leaving each molecule's O−H bonds intact."], answer: "Diamond's solid structure is a covalent network, while ice is held together between molecules largely by hydrogen bonding.", concept: "Distinguish intramolecular covalent bonds from intermolecular attractions." },
    "10": { prompt: "A gas has density 1.31 g/L at 1.00 atm and 25.0°C. Calculate its molar mass and suggest an identity.", steps: ["Use the ideal-gas density relationship M = dRT/P.", "M = (1.31 g/L)(0.08206 L·atm·mol⁻¹·K⁻¹)(298.15 K)/(1.00 atm) ≈ 32.1 g/mol.", "Compare the result with common gas molar masses."], answer: "M ≈ 32.1 g/mol; O2 is a plausible identity.", concept: "Combine PV = nRT with density = mass/volume to obtain M = dRT/P." },
    "11": { prompt: "A mixture contains 14.0 g N2 and 32.0 g O2 at total pressure 1200 torr. Calculate each partial pressure.", steps: ["n(N2) = 14.0/28.02 ≈ 0.500 mol; n(O2) = 32.0/32.00 = 1.00 mol.", "Total amount ≈ 1.50 mol, so mole fractions are x(N2) ≈ 1/3 and x(O2) ≈ 2/3.", "Use Dalton's law: partial pressure = mole fraction × total pressure."], answer: "P(N2) ≈ 400 torr; P(O2) ≈ 800 torr.", concept: "For ideal gas mixtures, each gas's partial pressure is its mole fraction times total pressure." }
  },
  "topic-3-5-3-8.pdf": {
    "8": { prompt: "An ideal gas should behave most ideally at what relative temperature and pressure?", steps: ["At high temperature, particle kinetic energy makes intermolecular attractions less important relative to motion.", "At low pressure, particles are farther apart and their own volume is a smaller fraction of the container volume."], answer: "High temperature and low pressure.", concept: "Ideal behavior is favored when attractions and particle volume are least important." },
    "11:a": { prompt: "Determine the mass of Na2SO4(s) needed to prepare 250.0 mL of 0.0500 M Na2SO4(aq).", steps: ["Convert volume: 250.0 mL = 0.2500 L.", "Moles required = M × V = 0.0500 mol/L × 0.2500 L = 0.01250 mol.", "Molar mass Na2SO4 ≈ 142.04 g/mol; mass = 0.01250 × 142.04 = 1.7755 g."], answer: "1.78 g Na2SO4 (three significant figures).", concept: "Use n = MV, then convert moles to mass with molar mass." },
    "11:b": { prompt: "Evaluate the claim that the Na+ concentration is 0.0500 M in a 0.0500 M Na2SO4 solution.", steps: ["Assume soluble Na2SO4 dissociates completely: Na2SO4(aq) → 2 Na+(aq) + SO4²−(aq).", "Each mole of Na2SO4 produces two moles of Na+.", "Therefore [Na+] = 2 × 0.0500 M = 0.100 M."], answer: "Disagree. The Na+ concentration is 0.100 M, twice the Na2SO4 formula-unit concentration.", concept: "Ion concentrations follow the stoichiometric coefficients in the dissociation equation." },
    "14": { prompt: "Calculate the volume of 6.0 M NaOH needed to prepare 500.0 mL of 0.100 M NaOH.", steps: ["Use the dilution relationship M1V1 = M2V2.", "V1 = (0.100 M × 500.0 mL)/(6.0 M) = 8.33 mL.", "Round to two significant figures because 6.0 M has two."], answer: "8.3 mL of 6.0 M NaOH", concept: "Dilution conserves moles of solute; only solution volume changes." }
  },
  "topic-7-1-7-5.pdf": {
    "12": { prompt: "State which side is favored when K is very small and when K is very large.", steps: ["A small K means the equilibrium expression's product term is small relative to the reactant term.", "A very large K means the product term dominates the equilibrium expression."], answer: "Very small K: reactants favored. Very large K: products favored.", concept: "K describes the equilibrium position for the balanced reaction as written, not reaction speed." }
  },
  "topic-7-6-7-10.pdf": {
    "14": { prompt: "Explain why adding an inert gas can increase total pressure without shifting a gaseous equilibrium.", steps: ["At constant volume and temperature, adding inert gas increases total pressure but does not change the moles or partial pressures of the reacting gases.", "The equilibrium expression Qp contains partial pressures of reacting species, not the inert gas.", "Because Qp is unchanged, its relationship to Kp is unchanged and there is no net shift."], answer: "The reacting gases' partial pressures and Qp remain unchanged at constant volume, so the equilibrium does not shift.", concept: "Distinguish total pressure from the partial pressures that appear in Qp." }
  },
  "topic-7-11-7-12.pdf": {
    "2:a": { prompt: "Write the balanced dissolution equation for Ca(OH)2(s) in pure water.", steps: ["A formula unit of Ca(OH)2 contains one Ca2+ ion and two OH− ions.", "Separate the ions and preserve atom and charge balance.", "The pure solid is omitted from the Ksp expression, but it belongs in the dissolution equation."], answer: "Ca(OH)2(s) ⇌ Ca2+(aq) + 2OH−(aq)", concept: "Dissolution equations must conserve atoms and total charge." },
    "3:a": { prompt: "Write the balanced dissolution equation for Ag2CO3(s) in pure water.", steps: ["Each formula unit contains two Ag+ ions and one CO3²− ion.", "Write the ions with coefficients that match the formula unit.", "Check total charge: 2(+1) + (−2) = 0."], answer: "Ag2CO3(s) ⇌ 2Ag+(aq) + CO3²−(aq)", concept: "Use the ionic formula to determine the stoichiometric coefficients in the dissolution equation." }
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
  },
  "topic-4-5-4-6.pdf": {
    "4:a": { prompt: "Identify the limiting reactant when 100.0 g K reacts with 100.0 g Cl2.", steps: ["Balance the equation: 2K(s) + Cl2(g) → 2KCl(s).", "Convert to moles: n(K) = 100.0 g ÷ 39.10 g/mol = 2.558 mol; n(Cl2) = 100.0 g ÷ 70.90 g/mol = 1.410 mol.", "The available 1.410 mol Cl2 would require 2.821 mol K, but only 2.558 mol K is present."], answer: "K is the limiting reactant; Cl2 is in excess.", concept: "Compare available reactant moles with the stoichiometric ratio in the balanced equation." },
    "4:b": { prompt: "Determine the theoretical yield of KCl in grams.", steps: ["From 2K + Cl2 → 2KCl, the mole ratio K:KCl is 1:1.", "K is limiting, so n(KCl) = 2.558 mol.", "Molar mass KCl = 39.10 + 35.45 = 74.55 g/mol; mass = 2.558 mol × 74.55 g/mol = 190.7 g."], answer: "The theoretical yield is 190.7 g KCl.", concept: "The theoretical yield is calculated from the limiting reactant and the balanced-equation mole ratio." },
    "4:c": { prompt: "Determine the mass of reactant left over after the reaction.", steps: ["The 2:1 ratio requires half as many moles of Cl2 as K consumed: n(Cl2 consumed) = 2.558 ÷ 2 = 1.279 mol.", "Mass of Cl2 consumed = 1.279 mol × 70.90 g/mol ≈ 90.66 g.", "Subtract the amount consumed from the 100.0 g initially present: 100.0 − 90.66 = 9.34 g."], answer: "Approximately 9.34 g Cl2 remains unreacted.", concept: "Subtract the consumed excess reactant from its initial mass after using the limiting reactant to determine consumption." },
    "4:d": { prompt: "Calculate percent yield when the actual KCl yield is 162.1 g.", steps: ["Use percent yield = (actual yield ÷ theoretical yield) × 100%.", "Substitute: (162.1 g ÷ 190.7 g) × 100% ≈ 85.0%.", "Report three significant figures, consistent with the measured yields."], answer: "Percent yield = 85.0%.", concept: "Percent yield compares the product actually recovered with the maximum theoretical amount." }
  },
  "topic-4-7-4-9.pdf": {
    "2": { prompt: "Classify each reactant as an acid (H+ donor) or a base (H+ acceptor) in the three listed acid-base reactions.", steps: ["(a) HBr donates H+ to OH− from NaOH, forming water; HBr is the acid and NaOH is the base.", "(b) H2SO4 donates H+ to OH− from Ca(OH)2; H2SO4 is the acid and Ca(OH)2 is the base.", "(c) HNO3 donates H+ to OH− from KOH; HNO3 is the acid and KOH is the base.", "In each case, the acid supplies protons and the hydroxide base accepts them to form water."], answer: "(a) HBr = acid; NaOH = base. (b) H2SO4 = acid; Ca(OH)2 = base. (c) HNO3 = acid; KOH = base.", concept: "A Brønsted–Lowry acid donates a proton; a Brønsted–Lowry base accepts a proton." }
  },
  "topic-5-1-5-3.pdf": {
    "5": { prompt: "At what point during a typical reaction is the reaction rate greatest? Justify using concentration and rate.", steps: ["For a typical positive-order rate law, rate increases with reactant concentration.", "Reactant concentrations are usually greatest at the start of the reaction.", "As reactants are consumed, their concentrations and often the rate decrease."], answer: "Usually at the beginning, when reactant concentrations are highest, assuming the rate law depends positively on those reactants.", concept: "Use the stated rate law when available; the starting-rate conclusion is not universal for every possible mechanism." }
  },
  "topic-6-6-6-9.pdf": {
    "8:a": { prompt: "Calculate the energy change when 36.032 g H2O(g) condenses to H2O(l) under standard conditions.", steps: ["Convert the water mass to moles: 36.032 g ÷ 18.016 g/mol = 2.000 mol.", "For one mole, ΔH = ΔH°f[H2O(l)] − ΔH°f[H2O(g)] = −285.8 − (−241.8) = −44.0 kJ/mol.", "Multiply by the amount: ΔH = 2.000 mol × (−44.0 kJ/mol) = −88.0 kJ."], answer: "ΔH = −88.0 kJ; 88.0 kJ of heat is released.", concept: "Use formation enthalpies to calculate the enthalpy change for a phase change, then multiply by the number of moles." },
    "8:b": { prompt: "State the direction of heat flow for the condensation in Question 8(a).", steps: ["The enthalpy change calculated in part (a) is negative.", "A negative ΔH means the water sample releases heat to its surroundings."], answer: "Heat flows from the H2O sample to the surroundings.", concept: "Exothermic processes release heat from the system to the surroundings." },
    "9": { prompt: "What is the standard enthalpy of formation of an element in its standard state?", steps: ["Standard enthalpy of formation is defined for forming one mole of a substance from its constituent elements in their standard states.", "For an element already in its standard state, the formation process requires no net reaction.", "This is the reference value for formation-enthalpy tables."], answer: "ΔH°f = 0 kJ/mol for an element in its standard state.", concept: "The zero is a reference convention; it does not mean the element contains no energy." }
  },
  "topic-8-1-8-3.pdf": {
    "4": { prompt: "State how pH changes when [H3O+] increases and when [OH−] increases.", steps: ["pH = −log[H3O+], so increasing hydronium concentration lowers pH.", "At 25 °C, pH + pOH = 14.00 and pOH = −log[OH−].", "Increasing hydroxide concentration lowers pOH, so pH increases."], answer: "As [H3O+] increases, pH decreases. As [OH−] increases, pH increases.", concept: "Hydronium and hydroxide concentrations shift pH in opposite directions at a fixed temperature." }
  },
  "topic-8-4-8-5.pdf": {
    "4:a": { prompt: "Calculate the pH of 0.20 M HNO2(aq), given Ka = 4.0 × 10⁻⁴.", steps: ["Write the ionization equilibrium: HNO2(aq) + H2O(l) ⇌ H3O+(aq) + NO2−(aq).", "Let x = [H3O+] at equilibrium. Then [NO2−] = x and [HNO2] = 0.20 − x, so Ka = x²/(0.20 − x) = 4.0 × 10⁻⁴.", "Rearrange to x² + (4.0 × 10⁻⁴)x − 8.0 × 10⁻⁵ = 0. The positive root is x ≈ 8.75 × 10⁻³ M.", "Calculate pH = −log(8.75 × 10⁻³) ≈ 2.058, then report two decimal places."], answer: "pH = 2.06.", concept: "For a weak acid, use Ka and an equilibrium table to determine hydronium concentration; pH is −log[H3O+]." },
    "6:a": { prompt: "Write the balanced ionization equation for HOCl in aqueous solution.", steps: ["HOCl donates a proton to water.", "Water accepts the proton to form H3O+; the conjugate base is OCl−.", "Check that atoms and total charge balance."], answer: "HOCl(aq) + H2O(l) ⇌ H3O+(aq) + OCl−(aq).", concept: "A weak acid ionizes reversibly in water and forms its conjugate base plus hydronium." }
  },
  "topic-8-6-8-11.pdf": {
    "3": { prompt: "Write the balanced ionization equation for ethylamine, CH3CH2NH2, reacting with water.", steps: ["Ethylamine acts as a Brønsted–Lowry base and accepts a proton from water.", "The conjugate acid is CH3CH2NH3+ and water becomes OH−.", "Check that atoms and total charge balance."], answer: "CH3CH2NH2(aq) + H2O(l) ⇌ CH3CH2NH3+(aq) + OH−(aq).", concept: "Weak bases accept protons from water, producing their conjugate acids and hydroxide." }
  },
  "topic-2-5-2-6.pdf": {
    "3:a": { prompt: "Draw the two equivalent resonance structures for the methanoate ion, HCO2−.", steps: ["Keep the H−C−O−O skeleton fixed; resonance moves electrons, not atom positions.", "In one structure, draw H−C(=O)−O− with the negative charge on the singly bonded O.", "In the second structure, move the C=O double bond to the other oxygen and place the negative charge on the first oxygen."], answer: "H−C(=O)−O− ↔ H−C(−O−)=O; the two resonance forms are equivalent.", concept: "Resonance structures differ in electron placement while preserving atom connectivity." },
    "3:b": { prompt: "Predict whether the two C−O bonds in HCO2− have the same or different lengths, and justify.", steps: ["The two equivalent resonance structures place the C=O double bond on either oxygen.", "The actual ion is a resonance hybrid, not a molecule switching between separate structures.", "The bonding is delocalized across both C−O bonds."], answer: "The two C−O bonds have the same length because the resonance hybrid makes them equivalent.", concept: "Equivalent resonance positions produce equivalent average bonding in the resonance hybrid." },
    "3:c": { prompt: "Describe the bond order of the two C−O bonds in HCO2−.", steps: ["Across the two equivalent resonance structures, each C−O bond is single in one form and double in the other.", "The average bond order is therefore (1 + 2)/2 = 1.5 for each C−O bond."], answer: "Each C−O bond has an average bond order of 1.5.", concept: "Resonance gives equivalent bonds an average bond order between a single and a double bond." }
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
  const [localPdfUrl, setLocalPdfUrl] = useState<string | null>(null);
  const [localPdfName, setLocalPdfName] = useState("");

  const packets = useMemo(() => FRQ_PACKETS.filter((packet) => packet.unit === Number(unit)), [unit]);
  const selected = FRQ_PACKETS.find((packet) => packet.file === selectedFile) ?? packets[0];
  const maxPage = selected ? FRQ_PDF_PAGE_COUNTS[selected.file] ?? 1 : 1;
  const boundedPage = Math.min(maxPage, Math.max(1, Number(page) || 1));
  const pdfUrl = localPdfUrl ? `${localPdfUrl}#page=${boundedPage}&toolbar=1&navpanes=0` : (selected ? `/frq/${selected.file}#page=${boundedPage}&toolbar=1&navpanes=0` : "");
  const normalizedPart = partLabel.trim().toLowerCase().match(/[a-h]/)?.[0] ?? "";
  const localPacketMatches = !localPdfUrl || localPdfName === selected?.file;
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
          <button type="button" onClick={() => { if (localPdfUrl && localPdfName !== selected?.file) { setNavigationMessage("These page candidates belong to the selected hosted packet, not the different local PDF. Choose the matching packet or navigate the local PDF manually."); setHelpLevel(0); return; } const pages = selected ? FRQ_PAGE_CANDIDATES[selected.file] : undefined; const question = questionNumber.trim(); const part = partLabel.trim().toLowerCase().match(/[a-h]/)?.[0] ?? ""; const partPage = selected ? FRQ_PART_PAGE_CANDIDATES[selected.file]?.[question]?.[part] : undefined; const targetPage = partPage ?? pages?.[question]; if (targetPage) { setPage(String(targetPage)); setNavigationMessage(part && !partPage ? `Jumped to Q${question}'s candidate page ${targetPage}; no separate page candidate was found for part ${partLabel.trim()}. Confirm the printed part in the PDF.` : `Jumped to candidate page ${targetPage}. Confirm the printed question/part in the PDF.`); } else { setNavigationMessage("No question-start candidate was detected for this entry. Use the PDF page control to find it manually."); } setHelpLevel(0); }} className="min-h-11 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-[#06251b]">Find question page</button>
          <p className="text-xs leading-5 text-ink-dim sm:col-span-3">Question and lettered-part page candidates are extracted from all 25 packets. If no part-specific candidate exists, the jump falls back to the question page. PDF text extraction can miss headings or capture continuation pages, so confirm the printed question and part before relying on a jump.</p>
          {navigationMessage && <p role="status" className="text-sm leading-5 text-ink-dim sm:col-span-3">{navigationMessage}</p>}
        </div>
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
        <section className="overflow-hidden rounded-2xl border border-border bg-card/40">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 sm:px-5">
            <div><h3 className="font-semibold">Packet PDF</h3><p className="mt-1 text-xs text-ink-dim">{localPdfName ? `Using local copy: ${localPdfName}` : "Hosted packet · use the PDF toolbar to zoom, print, or download"}</p></div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="cursor-pointer rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-accent/50" htmlFor="frq-local-pdf">Open local PDF</label>
              <input id="frq-local-pdf" type="file" accept="application/pdf,.pdf" onChange={chooseLocalPdf} className="sr-only" />
              <a href={localPdfUrl ?? (selected ? `/frq/${selected.file}` : "#")} target="_blank" rel="noreferrer" className="rounded-lg bg-accent px-3 py-2 text-xs font-bold text-[#06251b]">Open in new tab</a>
            </div>
          </div>
          {pdfUrl ? <iframe key={pdfUrl.split("#")[0] + (localPdfUrl ?? "")} title="AP Chemistry FRQ packet PDF" src={pdfUrl} className="block h-[76vh] min-h-[620px] w-full bg-white" /> : <div className="flex min-h-[500px] items-center justify-center p-8 text-center text-sm text-ink-dim">Select a packet to open the PDF.</div>}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
            <p className="text-xs leading-5 text-ink-dim">Page jump works with browsers that support the PDF viewer fragment. It may not work in every embedded PDF viewer.</p>
            <label className="flex items-center gap-2 text-sm font-semibold">Go to page
              <input type="number" min="1" max={maxPage} value={page} onChange={(e) => setPage(e.target.value)} onBlur={() => setPage(String(Math.min(maxPage, Math.max(1, Number(page) || 1))))} aria-label={`PDF page, 1 through ${maxPage}`} className="w-20 rounded-lg border border-border bg-card px-3 py-2 text-ink" />
            </label>
            <button type="button" onClick={() => { const url = localPdfUrl ?? (selected ? `/frq/${selected.file}` : ""); if (url) window.open(url + `#page=${boundedPage}&toolbar=1`, "_blank", "noopener,noreferrer"); }} className="rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:border-accent/50">Jump in new tab</button>
          </div>
        </section>

        <aside className="space-y-4 xl:sticky xl:top-4">
          <section className="rounded-2xl border border-border bg-card/60 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.13em] text-accent">Question help</p>
            <h3 className="mt-1 text-xl font-bold">Q{questionNumber.trim() || "—"}{partLabel.trim() ? ` · ${partLabel.trim()}` : ""}</h3>
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
