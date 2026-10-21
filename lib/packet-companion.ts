export type PacketQuestionType = "mcq" | "frq";
export type PacketSourceStatus = "unmapped" | "indexed" | "mapped" | "solution-derived" | "video-verified";

export interface PacketQuestionEntry {
  id: string;
  unitId: number;
  packetId: string;
  packetTitle: string;
  questionType: PacketQuestionType;
  questionNumber: string;
  partLabel?: string;
  topicRange: string;
  topicNumber?: string;
  topicSlugs: string[];
  skills: string[];
  conceptHint?: string;
  strategyHint?: string;
  nextStepHint?: string;
  solution?: string;
  commonMistakes?: string[];
  videoUrl?: string;
  videoTimestamp?: string;
  sourceStatus: PacketSourceStatus;
  reviewNote?: string;
}

interface PacketSourceDefinition {
  unitId: number;
  packetId: string;
  packetTitle: string;
  topicRange: string;
  firstQuestion: number;
  lastQuestion: number;
}

// Slugs correspond to topic files currently available in the curriculum.
const TOPIC_SLUGS: Record<string, string> = {
  "1.1": "1-1-moles-and-molar-mass",
  "1.2": "1-2-mass-spectra-of-elements",
  "1.3": "1-3-elemental-composition-of-pure-substances",
  "1.4": "1-4-composition-of-mixtures",
  "1.5": "1-5-atomic-structure-and-electron-configuration",
  "1.6": "1-6-photoelectron-spectroscopy",
  "1.7": "1-7-periodic-trends",
  "1.8": "1-8-valence-electrons-and-ionic-compounds",
  "1.9": "1-9-coulombs-law",
  "2.1": "2-1-types-of-chemical-bonds",
  "2.2": "2-2-intramolecular-force-and-potential-energy",
  "2.3": "2-3-structure-of-ionic-solids",
  "2.4": "2-4-structure-of-metals-and-alloys",
  "2.5": "2-5-lewis-diagrams",
  "2.6": "2-6-resonance-and-formal-charge",
  "2.7": "2-7-vsepr-and-hybridization",
  "3.1": "3-1-intermolecular-forces",
  "3.2": "3-2-properties-of-solids",
  "3.3": "3-3-solids-liquids-and-gases",
  "3.4": "3-4-ideal-gas-law",
  "3.5": "3-5-kinetic-molecular-theory",
  "3.6": "3-6-deviation-from-ideal-gas-law",
  "3.7": "3-7-solutions-and-mixtures",
  "3.8": "3-8-representations-of-solutions",
  "3.9": "3-9-separation-of-solutions-and-mixtures",
  "3.10": "3-10-solubility",
  "3.11": "3-11-spectroscopy-and-electromagnetic-spectrum",
  "3.12": "3-12-properties-of-photons",
  "3.13": "3-13-beer-lambert-law",
  "4.1": "4-1-introduction-to-reactions",
  "4.2": "4-2-net-ionic-equations",
  "4.3": "4-3-representations-of-reactions",
  "4.4": "4-4-physical-and-chemical-changes",
  "4.5": "4-5-stoichiometry",
  "4.6": "4-6-introduction-to-titration",
  "4.7": "4-7-types-of-chemical-reactions",
  "4.8": "4-8-introduction-to-acid-base-reactions",
  "4.9": "4-9-oxidation-reduction-reactions",
  "5.1": "5-1-reaction-rates",
  "5.2": "5-2-introduction-to-rate-law",
  "5.3": "5-3-concentration-changes-over-time",
  "5.4": "5-4-elementary-reactions",
  "5.5": "5-5-collision-model",
  "5.6": "5-6-reaction-energy-profile",
  "5.7": "5-7-introduction-to-reaction-mechanisms",
  "5.8": "5-8-reaction-mechanism-and-rate-law",
  "5.9": "5-9-steady-state-approximation",
  "5.10": "5-10-multistep-reaction-energy-profile",
  "5.11": "5-11-catalysis",
  "6.1": "6-1-endothermic-and-exothermic-processes",
  "6.2": "6-2-energy-diagrams",
  "6.3": "6-3-heat-transfer-and-thermal-equilibrium",
  "6.4": "6-4-heat-capacity-and-calorimetry",
  "6.5": "6-5-energy-of-phase-changes",
  "6.6": "6-6-enthalpy-of-reaction",
  "6.7": "6-7-bond-enthalpies",
  "6.8": "6-8-enthalpy-of-formation",
  "6.9": "6-9-hess-law",
  "9.1": "9-1-introduction-to-entropy",
  "9.2": "9-2-absolute-entropy-and-entropy-change",
  "9.3": "9-3-gibbs-free-energy-and-thermodynamic-favorability",
};

const PACKET_SOURCES: PacketSourceDefinition[] = [
  { unitId: 1, packetId: "topics-1-1-1-3-mcq", packetTitle: "Topics 1.1–1.3 MCQ Practice", topicRange: "1.1-1.3", firstQuestion: 1, lastQuestion: 8 },
  { unitId: 1, packetId: "topics-1-4-1-6-mcq", packetTitle: "Topics 1.4–1.6 MCQ Practice", topicRange: "1.4-1.6", firstQuestion: 1, lastQuestion: 9 },
  { unitId: 1, packetId: "topics-1-7-1-8-mcq", packetTitle: "Topics 1.7–1.8 MCQ Practice", topicRange: "1.7-1.8", firstQuestion: 1, lastQuestion: 9 },
  { unitId: 2, packetId: "topics-2-1-2-4-mcq", packetTitle: "Topics 2.1–2.4 MCQ Practice", topicRange: "2.1-2.4", firstQuestion: 1, lastQuestion: 9 },
  { unitId: 2, packetId: "topics-2-5-2-7-mcq", packetTitle: "Topics 2.5–2.7 MCQ Practice", topicRange: "2.5-2.7", firstQuestion: 1, lastQuestion: 10 },
  { unitId: 3, packetId: "topics-3-1-3-2-mcq", packetTitle: "Topics 3.1–3.2 MCQ Practice", topicRange: "3.1-3.2", firstQuestion: 1, lastQuestion: 12 },
  { unitId: 3, packetId: "topics-3-3-3-6-mcq", packetTitle: "Topics 3.3–3.6 MCQ Practice", topicRange: "3.3-3.6", firstQuestion: 1, lastQuestion: 11 },
  { unitId: 3, packetId: "topics-3-7-3-13-mcq", packetTitle: "Topics 3.7–3.13 MCQ Practice", topicRange: "3.7-3.13", firstQuestion: 1, lastQuestion: 13 },
  { unitId: 4, packetId: "topics-4-1-4-4-mcq", packetTitle: "Topics 4.1–4.4 MCQ Practice", topicRange: "4.1-4.4", firstQuestion: 1, lastQuestion: 9 },
  { unitId: 4, packetId: "topics-4-7-4-9-mcq", packetTitle: "Topics 4.7–4.9 MCQ Practice", topicRange: "4.7-4.9", firstQuestion: 1, lastQuestion: 9 },
  { unitId: 5, packetId: "topics-5-1-5-3-mcq", packetTitle: "Topics 5.1–5.3 MCQ Practice", topicRange: "5.1-5.3", firstQuestion: 1, lastQuestion: 10 },
  { unitId: 5, packetId: "topics-5-4-5-11-mcq", packetTitle: "Topics 5.4–5.11 MCQ Practice", topicRange: "5.4-5.11", firstQuestion: 1, lastQuestion: 11 },
  { unitId: 6, packetId: "topics-6-1-6-5-mcq", packetTitle: "Topics 6.1–6.5 MCQ Practice", topicRange: "6.1-6.5", firstQuestion: 1, lastQuestion: 11 },
  { unitId: 6, packetId: "topics-6-6-6-9-mcq", packetTitle: "Topics 6.6–6.9 MCQ Practice", topicRange: "6.6-6.9", firstQuestion: 1, lastQuestion: 11 },
  { unitId: 7, packetId: "topics-7-1-7-5-mcq", packetTitle: "Topics 7.1–7.5 MCQ Practice", topicRange: "7.1-7.5", firstQuestion: 1, lastQuestion: 10 },
  { unitId: 7, packetId: "topics-7-11-7-12-mcq", packetTitle: "Topics 7.11–7.12 MCQ Practice", topicRange: "7.11-7.12", firstQuestion: 1, lastQuestion: 7 },
  { unitId: 7, packetId: "topics-7-6-7-10-mcq", packetTitle: "Topics 7.6–7.10 MCQ Practice", topicRange: "7.6-7.10", firstQuestion: 1, lastQuestion: 12 },
  { unitId: 8, packetId: "topics-8-1-8-3-mcq", packetTitle: "Topics 8.1–8.3 MCQ Practice", topicRange: "8.1-8.3", firstQuestion: 1, lastQuestion: 12 },
  { unitId: 8, packetId: "topics-8-4-8-5-mcq", packetTitle: "Topics 8.4–8.5 MCQ Practice", topicRange: "8.4-8.5", firstQuestion: 1, lastQuestion: 13 },
  // The source text begins with an unnumbered question before printed question 2.
  // Do not invent a printed number for that first question.
  { unitId: 8, packetId: "topics-8-6-8-11-mcq", packetTitle: "Topics 8.6–8.11 MCQ Practice", topicRange: "8.6-8.11", firstQuestion: 2, lastQuestion: 16 },
  { unitId: 9, packetId: "topics-9-1-9-7-mcq", packetTitle: "Topics 9.1–9.7 MCQ Practice", topicRange: "9.1-9.7", firstQuestion: 1, lastQuestion: 13 },
  { unitId: 9, packetId: "topics-9-8-9-11-mcq", packetTitle: "Topics 9.8–9.11 MCQ Practice", topicRange: "9.8-9.11", firstQuestion: 1, lastQuestion: 13 },
];

const QUESTION_TOPIC_OVERRIDES: Record<string, Record<number, string>> = {
  "topics-1-1-1-3-mcq": { 1: "1.3", 2: "1.2", 3: "1.3", 4: "1.2", 5: "1.3", 6: "1.1", 7: "1.3", 8: "1.3" },
  "topics-1-4-1-6-mcq": { 1: "1.4", 2: "1.4", 3: "1.4", 4: "1.5", 5: "1.5", 6: "1.5", 7: "1.6", 8: "1.6", 9: "1.6" },
  "topics-1-7-1-8-mcq": { 1: "1.7", 2: "1.7", 3: "1.7", 4: "1.7", 5: "1.7", 6: "1.7", 7: "1.7", 8: "1.8", 9: "1.8" },
  "topics-2-1-2-4-mcq": { 1: "2.1", 2: "2.1", 3: "2.3", 4: "2.2", 5: "2.2", 6: "2.3", 7: "2.4", 8: "2.3", 9: "2.4" },
  "topics-2-5-2-7-mcq": { 1: "2.5", 2: "2.5", 3: "2.6", 4: "2.6", 5: "2.6", 6: "2.6", 7: "2.7", 8: "2.7", 9: "2.7", 10: "2.7" },
  "topics-3-1-3-2-mcq": { 1: "3.1", 2: "3.1", 3: "3.1", 4: "3.1", 5: "3.1", 6: "3.1", 7: "3.1", 8: "3.1", 9: "3.1", 10: "3.2", 11: "3.2", 12: "3.2" },
  "topics-3-3-3-6-mcq": { 1: "3.3", 2: "3.4", 3: "3.4", 4: "3.4", 5: "3.4", 6: "3.4", 7: "3.4", 8: "3.5", 9: "3.5", 10: "3.6", 11: "3.6" },
  "topics-3-7-3-13-mcq": { 1: "3.7", 2: "3.7", 3: "3.8", 4: "3.8", 5: "3.9", 6: "3.9", 7: "3.10", 8: "3.10", 9: "3.11", 10: "3.11", 11: "3.13", 12: "3.11", 13: "3.13" },
  "topics-4-1-4-4-mcq": { 1: "4.4", 2: "4.4", 3: "4.2", 4: "4.2", 5: "4.2", 6: "4.2", 7: "4.3", 8: "4.3", 9: "4.3" },
  "topics-4-7-4-9-mcq": { 1: "4.7", 2: "4.8", 3: "4.7", 4: "4.9", 5: "4.8", 6: "4.8", 7: "4.8", 8: "4.9", 9: "4.9" },
  "topics-5-1-5-3-mcq": { 1: "5.1", 2: "5.1", 3: "5.1", 4: "5.2", 5: "5.3", 6: "5.2", 7: "5.2", 8: "5.3", 9: "5.2", 10: "5.3" },
  "topics-5-4-5-11-mcq": { 2: "5.4", 3: "5.5", 10: "5.11" },
};

const QUESTION_HINTS: Record<string, Record<number, Pick<PacketQuestionEntry, "conceptHint" | "strategyHint" | "nextStepHint" | "solution">>> = {
  "topics-4-1-4-4-mcq": {
    1: { solution: "Answer: B. Cloudiness is evidence that an insoluble solid (a precipitate) may have formed, supporting a chemical reaction. A small volume change, conductivity, or a chloride concentration below the stock concentration can occur simply from mixing or dilution and does not by itself establish a reaction." },
    2: { solution: "Answer: D. Methanol molecules remain intact during boiling; only intermolecular attractions are overcome. The correct diagram shows intact CH₃OH molecules dispersed in the gas phase.", conceptHint: "Boiling methanol is a physical change: liquid CH₃OH becomes gaseous CH₃OH, but the molecules remain chemically unchanged.", strategyHint: "Choose the particle diagram that shows separated CH₃OH molecules in the gas phase rather than new atoms or different molecules.", nextStepHint: "Choose the diagram showing intact CH₃OH molecules separated from one another in the gas phase; boiling changes spacing and motion, not molecular identity." },
    3: { solution: "Answer: C. Sodium is oxidized to Na⁺, while water is reduced to H₂. The balanced net-ionic equation is 2Na(s) + 2H₂O(l) → 2Na⁺(aq) + 2OH⁻(aq) + H₂(g). NaOH remains dissociated in aqueous solution, so it is written as ions." },
    4: { solution: "Answer: D. Ba²⁺(aq) and CO₃²⁻(aq) combine to form insoluble BaCO₃(s). K⁺ and NO₃⁻ are spectator ions and are omitted: Ba²⁺(aq) + CO₃²⁻(aq) → BaCO₃(s)." },
    5: { solution: "Answer: A. Na₂CO₃ is a solid reactant, so it remains intact in the net-ionic equation. Strong HCl supplies H⁺, while Na⁺ is released into solution; Cl⁻ is a spectator ion. The net ionic equation is Na₂CO₃(s) + 2H⁺(aq) → 2Na⁺(aq) + H₂O(l) + CO₂(g)." },
    6: { solution: "Answer: C. Copper is oxidized to Cu²⁺ and silver ions are reduced to Ag(s). Balancing electron transfer requires two Ag⁺ ions per Cu atom: Cu(s) + 2Ag⁺(aq) → 2Ag(s) + Cu²⁺(aq)." },
    7: { solution: "Answer: D. The initial mixture has three X₂ molecules and four Y₂ molecules. In X₂ + 2Y₂ → 2XY₂, four Y₂ molecules consume two X₂ molecules and form four XY₂ molecules, leaving one X₂ molecule and no Y₂. Option D shows four XY₂ molecules and one X₂ molecule remaining.", conceptHint: "Balance X₂ + 2Y₂ → 2XY₂ and identify the limiting reactant from the initial particle diagram.", strategyHint: "Consume X₂ and Y₂ in a 1:2 ratio until one reactant is exhausted; preserve any excess reactant particles.", nextStepHint: "Balance X₂ + 2Y₂ → 2XY₂, then count reactant particles and preserve any excess reactant; each two XY₂ particles require one X₂ and two Y₂." },
    8: { solution: "Answer: A. The product mixture contains four QX₂ molecules. From 2QX + X₂ → 2QX₂, that requires four QX molecules and two X₂ molecules initially, which is option A.", conceptHint: "The reaction is 2QX(g) + X₂(g) → 2QX₂(g). For every two QX₂ product molecules, the starting mixture needs two QX molecules and one X₂ molecule.", strategyHint: "Reverse the stoichiometric change to infer the required starting particles.", nextStepHint: "Work backward from the product particle count using 2QX + X₂ → 2QX₂; each two QX₂ particles require two QX and one X₂." },
    9: { solution: "Answer: B. The reactant diagram shows monatomic A and diatomic X₂, while the product is AX₃. The balanced equation is 2A(g) + 3X₂(g) → 2AX₃(g).", conceptHint: "Conserve each type of atom when writing a molecular reaction from particle diagrams.", strategyHint: "The choices differ in whether the reactants are monatomic A/X or diatomic A₂/X₂; count atoms in the original diagrams and product units.", nextStepHint: "Write and balance the particle-level reaction first, then match atom conservation and the species shown in the packet's options." }
  },
  "topics-5-4-5-11-mcq": {
    1: { solution: "Answer: A. Step 1 is an elementary step involving one NO molecule and one Cl₂ molecule. The rate law for an elementary step follows its reactant stoichiometry, so rate = k[NO][Cl₂]." },
    2: { solution: "Answer: B. The carbon end of CO must collide with a terminal oxygen atom of NO₃ so that oxygen can transfer to carbon and form CO₂. Option B points the black C atom toward a white O atom.", conceptHint: "An effective collision requires the correct molecular orientation so that the atoms that must form new bonds can interact.", strategyHint: "Inspect the diagram for which end of CO must approach the reactive atom in NO₃ to allow oxygen transfer and formation of CO₂.", nextStepHint: "Identify which collision orientation places the reactive atoms in contact; only collisions with suitable orientation and sufficient energy form product." },
    3: { solution: "Answer: D. Increasing temperature raises the fraction of particles with kinetic energy at or above the activation energy. The activation energy itself does not decrease, and not every collision becomes effective; high-energy collisions simply occur more frequently." },
    4: { solution: "Answer: C. The reaction is exothermic, so the product energy level must be below the reactant level. Activation energy is measured vertically from the reactant level to the transition-state peak; option C labels that interval.", conceptHint: "Activation energy is the energy difference between the reactants and the transition-state peak on an energy profile.", strategyHint: "Use the H₂ + Cl₂ reactant energy level as the reference and label the vertical rise to the peak as Ea.", nextStepHint: "Compare each diagram's reactant and product energy levels and activation-energy peak; a catalyst lowers activation energy without changing ΔH." },
    5: { solution: "Answer: B. Mechanism 1 has the slow elementary step X + X → X₂, giving rate = k[X]² and no dependence on [Y₂]. Mechanism 2's slow step is X + Y₂ → XY₂, which predicts rate = k[X][Y₂]. Independence from [Y₂] supports mechanism 1 but not mechanism 2." },
    6: { solution: "Answer: C. I⁻ is consumed in the first step and regenerated in the second, so it acts as a catalyst. OI⁻ is produced in the first step and consumed in the second, so it is an intermediate." },
    7: { solution: "Answer: B. If the first step is slow and elementary, its reactants determine the rate law. NO₂ + F₂ → NO₂F + F has rate = k[NO₂][F₂], matching the experimentally given rate law." },
    8: { solution: "Answer: C. Both proposed mechanisms begin with the same slow elementary step X₂ → 2X. Its rate law is rate = k[X₂], which matches the experimental rate law. Later fast steps can differ without changing the rate law determined by the rate-limiting step." },
    9: { solution: "Answer: D. The slow elementary step in mechanism D is D₂ + Q₂X₂ → Q₂X + D₂X, so rate = k[D₂][Q₂X₂]. The preceding fast equilibrium 2QX ⇌ Q₂X₂ gives [Q₂X₂] proportional to [QX]², producing the observed rate law rate = k'[D₂][QX]²." },
    10: { solution: "Answer: B. The two-step mechanism requires two transition-state peaks. The first step is slow, so its activation barrier is larger than the second step's, and the overall reaction is exothermic, so products lie below reactants. Option B matches all three features.", conceptHint: "A two-step mechanism gives two transition-state peaks; the slow step has the larger activation barrier. The overall ΔH is negative, so products lie below reactants.", strategyHint: "Select the profile with two peaks, the first step's activation barrier larger than the second's, and products lower in energy than reactants.", nextStepHint: "Compare the proposed energy profiles with the mechanism: the catalyzed pathway must have a lower activation-energy barrier, while reactant/product energies stay the same." },
    11: { solution: "Answer: B. A catalyst lowers activation energy without changing the reactant or product energy levels. Option B shows the dashed catalyzed pathway with a lower peak and unchanged endpoints.", conceptHint: "A catalyst provides an alternative pathway with lower activation energy but does not change reactant or product energies or ΔH.", strategyHint: "The catalyzed dashed curve should have a lower peak than the uncatalyzed curve while keeping the same starting and ending energy levels.", nextStepHint: "Use the particle or mechanism diagrams in the packet and test each choice against the stated rate law and overall stoichiometry." }
  },

  "topics-7-1-7-5-mcq": {
    7: { solution: "Answer: B. Qp = P(AX₂)²P(X₂)/P(AX₃)² = (5.06)²(0.840)/(2.32)² ≈ 4.00. Since Kp = 4.0, Qp = Kp and the system is at equilibrium at t₃." },
    8: { solution: "Answer: D. NaH₂PO₄ supplies H₂PO₄⁻ and Na₂HPO₄ supplies HPO₄²⁻. The third dissociation of phosphoric acid has Ka₃ = 4.5 × 10⁻¹³, so only a very small fraction of HPO₄²⁻ loses another proton to form PO₄³⁻. PO₄³⁻ is therefore present at the lowest concentration." },
    9: { solution: "Answer: C. The reaction begins with equal amounts of CO and H₂O, and its stoichiometry consumes them in a 1:1 ratio while producing CO₂ and H₂ in a 1:1 ratio. Because Kc = 1.5 × 10³ is large, equilibrium strongly favors products, so [CO₂] > [CO]." },
    10: { solution: "Answer: B (8.00 atm). The reaction is 2NO(g) + O₂(g) ⇌ 2NO₂(g). With initial partial pressures 6.00 atm NO and 5.00 atm O₂, NO is limiting: consuming 6.00 atm NO uses 3.00 atm O₂ and forms 6.00 atm NO₂. The remaining O₂ pressure is 2.00 atm, giving total pressure 2.00 + 6.00 = 8.00 atm. The very large Kp makes the reaction nearly complete." },
    1: { solution: "Answer: D. Between t₂ and t₃, the product partial pressure increases, showing net forward reaction. Before equilibrium, the forward rate is greater than the reverse rate; at equilibrium the two rates become equal and concentrations stop changing." },
    2: { solution: "Answer: D (3.50 atm). Let x be the equilibrium partial pressure of X₂ and Y₂ formed. At equilibrium PXY = 0.500 atm and Kp = x²/(0.500)² = 9.00, so x = 1.50 atm. Since 2XY decomposes to one X₂ and one Y₂, 2x = 3.00 atm of XY decomposed. Initial PXY = 0.500 + 3.00 = 3.50 atm." },
    3: { solution: "Answer: C. Initially only PCl₅ is present, so the forward rate is high and the reverse rate is zero. As PCl₅ decomposes, its concentration and the forward rate decrease, while products build and the reverse rate increases. At equilibrium, both rates are equal and nonzero." },
    4: { solution: "Answer: D (2.22). Starting with 0.700 mol AX₂ in 1.00 L, formation of 0.200 mol A₂X₄ consumes 0.400 mol AX₂, leaving 0.300 mol AX₂. Kc = [A₂X₄]/[AX₂]² = 0.200/(0.300)² = 2.22." },
    5: { solution: "Answer: B. Qp = P(OF₂)²/[P(F₂)²P(O₂)] = (0.64)²/[(0.36)²(0.68)] ≈ 4.65, or 4.6. The partial pressures continue to change after t₄ and reach constant values at t₅/t₆; the forward reaction is still proceeding at t₄, so Qp < Kp." },
    6: { solution: "Answer: B (0.050). Let x be the pressure of CO and Cl₂ formed. Total pressure increases from 1.0 to 1.2 atm, so x = 0.20 atm. The equilibrium pressures are P(COCl₂) = 0.80 atm and P(CO) = P(Cl₂) = 0.20 atm. Kp = [P(CO)P(Cl₂)]/P(COCl₂) = (0.20)(0.20)/0.80 = 0.050." }
  },
  "topics-8-1-8-3-mcq": {
    8: { solution: "Answer: C (0.45 M). At pH 4.50, [H₃O⁺] = 10⁻⁴·⁵⁰ = 3.16 × 10⁻⁵ M. For HOBr ⇌ H₃O⁺ + OBr⁻, [OBr⁻] ≈ [H₃O⁺] = x, so Ka ≈ x²/[HOBr]. Therefore [HOBr] ≈ (3.16 × 10⁻⁵)²/(2.2 × 10⁻⁹) ≈ 0.45 M." },
    9: { solution: "Answer: C. KNO₂ produces K⁺ and NO₂⁻. K⁺ is essentially neutral, while NO₂⁻ is the conjugate base of weak acid HNO₂ and reacts with water to form OH⁻: NO₂⁻(aq) + H₂O(l) ⇌ HNO₂(aq) + OH⁻(aq). NH₄NO₃ instead produces acidic NH₄⁺." },
    10: { solution: "Answer: B (pH 8.3). For weak base caffeine, [OH⁻] ≈ √(KbC) = √[(4.3 × 10⁻¹⁰)(0.010)] ≈ 2.1 × 10⁻⁶ M. pOH ≈ 5.68, so pH = 14.00 − 5.68 ≈ 8.32." },
    11: { solution: "Answer: D (pH 3.6; HC₃H₅O₂ is most abundant). For a weak acid, [H₃O⁺] ≈ √(KaC) = √[(1.3 × 10⁻⁵)(5 × 10⁻³)] ≈ 2.55 × 10⁻⁴ M, giving pH ≈ 3.59. Only a small fraction ionizes, so the undissociated acid remains at the highest concentration." },
    12: { solution: "Answer: B (3.3 × 10⁻⁷). pOH = 14.00 − 9.96 = 4.04, so [OH⁻] = 10⁻⁴·⁰⁴ ≈ 9.1 × 10⁻⁵ M. Let x ≈ [OH⁻] = [HOCl]. Then Kb ≈ x²/[OCl⁻] ≈ (9.1 × 10⁻⁵)²/0.025 ≈ 3.3 × 10⁻⁷." },
    1: { solution: "Answer: B. In pure water, [H₃O⁺] = [OH⁻], so pH = pOH = 6.81. Thus pKw = pH + pOH = 13.62 and Kw = 10⁻¹³·⁶² ≈ 2.4 × 10⁻¹⁴ at 37°C." },
    2: { solution: "Answer: C (400 mL). The initial [H⁺] = 10⁻⁴·⁵⁰ = 3.16 × 10⁻⁵ M; the final [H⁺] = 10⁻⁵·²⁰ = 6.31 × 10⁻⁶ M. The dilution factor is 3.16×10⁻⁵ / 6.31×10⁻⁶ ≈ 5.0, so the final volume is about 5(100.0 mL) = 500 mL. Water added = 500 − 100 = 400 mL." },
    3: { solution: "Answer: B (pH 12.4). Moles NaOH = 2.0 g ÷ 40.0 g mol⁻¹ = 0.050 mol. In 2.0 × 10³ mL = 2.0 L, [OH⁻] = 0.025 M. pOH = −log(0.025) ≈ 1.60, so pH = 14.00 − 1.60 = 12.40." },
    4: { solution: "Answer: D. At the same formal concentration, the stronger acid has the larger Ka and the greater percent ionization. Acid 2 has the lower pH at both listed concentrations, indicating greater [H₃O⁺] and a larger percent ionization; therefore Acid 2 is stronger." },
    5: { solution: "Answer: D. Ka is constant at a fixed temperature and does not change upon dilution. As acetic acid is diluted, the equilibrium shifts toward ionization and the fraction of acid molecules that ionize increases, so percent ionization increases." },
    6: { solution: "Answer: B. The first dissociation (Ka₁ = 1.5 × 10⁻²) is much more extensive than the second (Ka₂ = 8.5 × 10⁻⁷), so H₂A remains the most abundant species. The first dissociation produces similar amounts of H₃O⁺ and HA⁻, but the second dissociation adds a little extra H₃O⁺ and forms very little A²⁻. The expected order is H₂A > H₃O⁺ > HA⁻ > A²⁻." },
    7: { solution: "Answer: C. HF and HCN are acids. Of the bases, trimethylamine has pKb = 4.19 and is much stronger than aniline, whose pKb is 9.42. A 0.1 M solution of the stronger weak base produces more OH⁻ and therefore has the highest pH." }
  },
  "topics-8-4-8-5-mcq": {
    7: { solution: "Answer: D. The curve represents titration of a weak acid with a strong base. At equivalence, the weak acid has been converted to its conjugate base, which hydrolyzes water to produce OH⁻, so the equivalence-point pH is greater than 7." },
    10: { solution: "Answer: B. Both acids are titrated with equal moles of NaOH, but CH₃CO₂H is the weak acid. At equivalence, acetate (its conjugate base) hydrolyzes water and makes solution 1 basic, so its pH is higher than that of the solution formed from strong acid CF₃CO₂H. The reason is the stronger conjugate base of CH₃CO₂H." },
    11: { solution: "Answer: C. Both acids are monoprotic and have the same initial volume (50.0 mL) and concentration (0.10 M), so each contains 0.00500 mol acid. Since the NaOH concentration is also the same, each requires the same titrant volume to reach equivalence, regardless of acid strength." },
    12: { solution: "Answer: C. As NaOH is added, it neutralizes HC₂H₃O₂ to form its conjugate base C₂H₃O₂⁻. Thus the acetate concentration increases. Br⁻ is a spectator ion, H⁺ is consumed, and the amount of undissociated acetic acid decreases." },
    1: { solution: "Answer: D (pH 11.10). n(HNO₃) = 0.3000 L × 0.050 M = 0.0150 mol. n(KOH) = 0.5000 L × 0.032 M = 0.0160 mol, leaving 0.0010 mol OH⁻ in 0.8000 L. [OH⁻] = 0.00125 M, pOH = 2.90, and pH = 14.00 − 2.90 = 11.10." },
    2: { solution: "Answer: C. The equilibrium favors products, so HF is converted to the weaker acid HOCl and the stronger base F⁻ is converted to the weaker base OCl⁻. Therefore HF is the stronger acid (HF > HOCl), and F⁻ is the weaker base (F⁻ < OCl⁻)." },
    3: { solution: "Answer: C. At the equivalence point, the weak acid HNO₂ has been converted to its conjugate base NO₂⁻. NO₂⁻ reacts with water to produce OH⁻, making the equivalence-point solution basic (pH > 7). The pH is not determined by equal formal concentrations of acid and base." },
    4: { solution: "Answer: C (0.40 M). The equivalence point on the curve is at about 25.0 mL NaOH. Initial acid moles = (0.0500 L)(0.20 M) = 0.0100 mol. At equivalence, 0.0100 mol NaOH has been added, so [NaOH] = 0.0100 mol/0.0250 L = 0.40 M.", conceptHint: "At equivalence for a monoprotic acid, moles NaOH equal initial moles acid: MbaseVeq = MacidVacid.", strategyHint: "The acid initially contains (0.0500 L)(0.20 M) = 0.0100 mol. Read the equivalence volume from the titration curve, then divide 0.0100 mol by that volume in liters.", nextStepHint: "Read the equivalence volume from the curve (about 25.0 mL), then use MₐVₐ = MᵦVₑq to find [NaOH] = 0.40 M." },
    5: { solution: "Answer: B. The graph shows equivalence at 40.0 mL of 0.100 M NaOH, giving n(HA) = 0.00400 mol in 0.0500 L, or 0.0800 M. If the indicator changes color slightly past equivalence, the recorded titrant volume is too large, so the calculated acid concentration is slightly greater than 0.0800 M.", conceptHint: "If an indicator changes color after the equivalence point, the recorded titrant volume is too large.", strategyHint: "Use the equivalence volume read from the original titration curve and the 0.100 M NaOH concentration to calculate the acid amount.", nextStepHint: "The curve's equivalence volume is about 40.0 mL, giving 0.0800 M HA. An endpoint slightly past equivalence uses too much titrant, so the calculated acid concentration is slightly too high." },
    6: { solution: "Answer: C. At half-equivalence (about 20 mL NaOH), pH = pKa. The graph's pH there is about 3.8, matching HC₃H₅O₃ with Ka = 1.4 × 10⁻⁴ (pKa ≈ 3.85).", conceptHint: "At the half-equivalence point of a weak-acid/strong-base titration, pH = pKa.", strategyHint: "Read the pH at half the equivalence volume on the original graph and compare it with each candidate acid's pKa.", nextStepHint: "At half-equivalence (about 20 mL), pH ≈ pKa ≈ 3.8; choose the acid with Ka ≈ 1.4 × 10⁻⁴." },
    8: { solution: "Answer: D. The particle diagram shows fewer HC₂H₃O₂ molecules and more C₂H₃O₂⁻ ions after the unknown solution is added. NaOH converts acid into its conjugate base, so the pH rises above 4.74." },
    9: { solution: "Answer: A. The titration curve has an equivalence volume of about 40 mL, so the NaOH concentration is (0.10 M × 20.0 mL)/40.0 mL = 0.050 M. At half-equivalence (about 20 mL), pH ≈ pKa ≈ 4.7." },

    13: { solution: "Answer: C. HNO₃ is a strong acid, so the initial pH is lower than for weak acid HF. Both samples contain 0.00200 mol acid and require 20.0 mL of 0.10 M KOH to reach equivalence, but the strong-acid/strong-base equivalence point is at pH 7. Option C has a lower initial pH and a steep equivalence region centered at 20 mL." },
  },

  "topics-7-6-7-10-mcq": {
    1: { solution: "Answer: B (2.5). Equation #2 is the reverse of equation #1 and is divided by 2. Reversing an equation takes the reciprocal of K, so K = 1/0.16 = 6.25; halving all coefficients takes the square root, giving Kp = √6.25 = 2.5." },
    2: { solution: "Answer: D (7.8 × 10⁻²). The target reaction is equation 1 plus the reverse of equation 2 multiplied by 2. Reversing an equation takes 1/K, and multiplying coefficients by 2 squares K, so K₃ = K₁/(K₂)² = (3.6 × 10⁻⁸)/(6.8 × 10⁻⁴)² ≈ 7.8 × 10⁻²." },
    3: { solution: "Answer: A (H₂S). Initially each concentration is 0.10 M, so Qc = (0.10)(0.10)⁴/[(0.10)²(0.10)] = 0.010. Since Qc > Kc = 3.4 × 10⁻⁴, the reaction shifts left, producing H₂S and CH₄ while consuming CS₂ and H₂. The reverse reaction produces H₂S twice as quickly as CH₄, so H₂S has the highest concentration." },
    4: { solution: "Answer: B. Qc = [HI]²/([H₂][I₂]) = (2.0)²/[(2.0)(2.0)] = 1. Since Qc < Kc = 51, the reaction proceeds forward and produces more HI." },
    5: { solution: "Answer: C. For X₂(g) + 3Y₂(g) ⇌ 2XY₃(g), Qc = [XY₃]²/([X₂][Y₂]³). In option C, Qc = (2.0)²/[(1.0)(3.0)³] = 4/27 ≈ 0.148, which is below Kc = 0.40. The system shifts right to form more XY₃." },
    6: { solution: "Answer: C. Kp = P(AQ₂)²/[P(A₂)P(Q₂)²]. In option C, there are two AQ₂ molecules, two A₂ molecules, and four Q₂ molecules, so Qp = 2²/(2×4²) = 4/32 = 0.125, matching Kp.", conceptHint: "Use Kp = P(AQ₂)²/[P(A₂)P(Q₂)²] for A₂ + 2Q₂ ⇌ 2AQ₂.", strategyHint: "Count each molecule in the diagram as 1 atm and calculate Qp for each proposed mixture.", nextStepHint: "For each proposed particle mixture, calculate Qp = P(AQ₂)²/[P(A₂)P(Q₂)²] and compare it with Kp." },
    7: { solution: "Answer: A. Removing H₂ removes a product, making Qc smaller than Kc. The equilibrium shifts right to replace H₂, producing additional CO₂. Removing H₂O or changing volume does not drive the system toward more CO₂ in this reaction, which has equal gas moles on both sides." },
    8: { solution: "Answer: B (Reaction B). Decreasing volume increases pressure, shifting equilibrium toward the side with fewer gas moles. Reaction B has four moles of gaseous reactants and two moles of gaseous products, so compression shifts right and increases products." },
    9: { solution: "Answer: B. Immediately halving the vessel volume doubles the total pressure from 1.5 atm to 3.0 atm. The equilibrium then shifts left toward PCl₅ because that side has fewer gas particles, lowering the pressure from 3.0 atm. The final pressure is therefore greater than 1.5 atm but less than 3.0 atm." },
    10: { solution: "Answer: A. The forward reaction is exothermic (ΔH < 0), so heat behaves like a product. Increasing temperature shifts equilibrium toward reactants and decreases Kc. A catalyst changes the rate of reaching equilibrium, not the equilibrium constant." },
    11: { solution: "Answer: B. The forward decomposition is endothermic, so increasing temperature favors NO₂. The reaction also increases gas moles from one to two, so increasing volume (lowering pressure) shifts equilibrium toward NO₂. Both changes maximize product." },
    12: { solution: "Answer: D. In 2CO(g) ⇌ C(s) + CO₂(g), there are two moles of gas on the left and one on the right; the solid is excluded from the equilibrium expression. Decreasing volume favors the side with fewer gas particles, shifting right and increasing CO₂." }
  },
  "topics-7-11-7-12-mcq": {
    1: { solution: "Answer: D (7.17 × 10⁻³ M F⁻). Let s = [Ba²⁺] in saturated BaF₂; then [F⁻] = 2s and Ksp = s(2s)² = 4s³. Thus s = (1.84 × 10⁻⁷/4)^(1/3) ≈ 3.58 × 10⁻³ M, so [F⁻] = 2s ≈ 7.17 × 10⁻³ M." },
    2: { solution: "Answer: A. Each compound has the form M(OH)₂, so Ksp = [M²⁺][OH⁻]² = s(2s)² = 4s³. For salts with the same dissolution stoichiometry, larger Ksp means larger molar solubility. The order is Ni(OH)₂ (5.5 × 10⁻¹⁶) < Cd(OH)₂ (7.2 × 10⁻¹⁵) < Mg(OH)₂ (5.6 × 10⁻¹²)." },
    3: { solution: "Answer: C (only PbSO₄ precipitates). After adding 0.0010 mol sulfate to 1.0 L, [SO₄²⁻] ≈ 0.0010 M. For Ag₂SO₄, Q = [Ag⁺]²[SO₄²⁻] = (0.020)²(0.0010) = 4.0 × 10⁻⁷, below Ksp = 1 × 10⁻⁵, so it does not precipitate. For PbSO₄, Q = (0.0010)(0.0010) = 1.0 × 10⁻⁶, above Ksp = 1 × 10⁻⁸, so PbSO₄ precipitates." },
    4: { solution: "Answer: D. A saturated solution in contact with excess CaF₂(s) maintains the equilibrium ion concentrations at a constant temperature. As water evaporates, the solution becomes temporarily supersaturated and more CaF₂ precipitates; [Ca²⁺] returns to the same saturation value." },
    5: { solution: "Answer: D. Mixing equal volumes halves each starting concentration: [Pb²⁺] = 0.020 M and [Cl⁻] = 0.020 M. Q = [Pb²⁺][Cl⁻]² = (0.020)(0.020)² = 8.0 × 10⁻⁶. Since Q < Ksp = 1.7 × 10⁻⁵, the solution is not saturated enough to precipitate PbCl₂." },
    6: { solution: "Answer: A. Adding Na₂SO₄ supplies the common ion SO₄²⁻, shifting Ag₂SO₄(s) ⇌ 2Ag⁺ + SO₄²⁻ to the left. The salt's solubility and the equilibrium [Ag⁺] are therefore lower in beaker 2 than in pure water." },
    7: { solution: "Answer: D. Adding K₂CO₃ increases [CO₃²⁻], a common ion, so the equilibrium shifts left and [Ba²⁺] decreases. Adding acid would consume carbonate and drive more BaCO₃ to dissolve, while adding more solid or evaporating water would not lower the equilibrium [Ba²⁺] in the stated way." }
  },

  "topics-8-6-8-11-mcq": {
    1: { solution: "Answer: D. The acidic hydrogen is the one attached to the carboxyl –OH group, not the alcohol –OH group. Removing it forms a carboxylate ion whose negative charge is delocalized across two oxygen atoms by resonance, stabilizing the conjugate base.", conceptHint: "The most acidic hydrogen in a carboxylic acid is the hydrogen attached to the hydroxyl oxygen in the –COOH group.", strategyHint: "Deprotonation forms a carboxylate ion, whose negative charge is delocalized across both oxygen atoms by resonance.", nextStepHint: "Locate the hydrogen attached to the carboxyl –OH and identify resonance stabilization of the carboxylate conjugate base." },
    2: { solution: "Answer: B. HOCl is the stronger acid. Chlorine is more electronegative than iodine, which helps stabilize the negative charge in the conjugate base OCl⁻. Greater conjugate-base stabilization favors acid dissociation; London dispersion forces are not the controlling factor." },
    3: { solution: "Answer: A. Bromothymol blue is yellow below pH 6.0, so the solution's pH is less than 6.0. Since pH < pKa (7.54), the Henderson–Hasselbalch relationship gives [OCl⁻]/[HOCl] < 1, meaning [HOCl] > [OCl⁻]." },
    4: { solution: "Answer: B. NH₃ is a weak base titrated with strong acid, so the equivalence point is acidic (NH₄⁺ hydrolyzes to produce H₃O⁺). The best indicator is the one whose transition range is near the equivalence-point pH; methyl red, with pKa about 5.0, is the better match than phenolphthalein at 9.4." },
    5: { solution: "Answer: A. The HF/F⁻ mixture is a buffer. Added HCl supplies H₃O⁺, which reacts with the conjugate base: H₃O⁺(aq) + F⁻(aq) → HF(aq) + H₂O(l). The pH decreases only slightly because F⁻ consumes most of the added acid." },
    6: { solution: "Answer: A. Added HNO₃ supplies H⁺, which is consumed by the weak base in the buffer: C₂H₅NH₂(aq) + H⁺(aq) → C₂H₅NH₃⁺(aq). Converting a small amount of base to its conjugate acid limits the pH change." },
    7: { solution: "Answer: B. Added OH⁻ is consumed by the weak acid component of the buffer: HCOOH(aq) + OH⁻(aq) → HCOO⁻(aq) + H₂O(l). This converts some acid to its conjugate base and limits the pH increase." },
    8: { solution: "Answer: D. The diagram shows fewer HC₂H₃O₂ molecules and more C₂H₃O₂⁻ ions after the unknown solution is added. NaOH converts the weak acid into its conjugate base, so the pH rises above the buffer's original pH of 4.74.", conceptHint: "In an acid/conjugate-base buffer, adding HCl converts conjugate base into acid and lowers pH; adding NaOH converts acid into conjugate base and raises pH.", strategyHint: "Compare the before/after particle diagrams to see whether the number of HC₂H₃O₂ particles rises or falls relative to C₂H₃O₂⁻.", nextStepHint: "Compare the before/after counts of HC₂H₃O₂ and C₂H₃O₂⁻. Adding HCl increases acid relative to base and lowers pH; adding NaOH does the opposite." },
    9: { solution: "Answer: A. For lactic acid, pKa = −log(8.3 × 10⁻⁴) ≈ 3.08. Mixing 100. mL of 0.10 M acid (0.010 mol) with 50. mL of 0.10 M NaOH (0.0050 mol) neutralizes half the acid, leaving equal amounts of HC₃H₅O₃ and C₃H₅O₃⁻. Thus pH ≈ pKa ≈ 3.1." },
    10: { solution: "Answer: A. For HOCl/OCl⁻, pH = pKa + log([OCl⁻]/[HOCl]). A pH below the desired 7.5 means the acid-to-base ratio is too high; too much HOCl or too little NaOCl was used. Water in the flask would dilute both components but would not by itself change their ratio." },
    11: { solution: "Answer: B. pKa(HF) = −log(6.8 × 10⁻⁴) ≈ 3.17. For 50.0 mL of 1.0 M HF and 50.0 mL of 2.0 M NaF, n(HF) = 0.050 mol and n(F⁻) = 0.100 mol. pH = pKa + log(n(F⁻)/n(HF)) = 3.17 + log(2) ≈ 3.47, closest to 3.5." },
    12: { solution: "Answer: A (4.44). pKa = −log(1.8 × 10⁻⁵) ≈ 4.74. The mixture contains 1.0 mol acetic acid and 0.50 mol acetate after mixing equal 0.500 L portions. pH = pKa + log([acetate]/[acid]) = 4.74 + log(0.50/1.0) ≈ 4.44." },
    13: { solution: "Answer: B. Both buffers have equal acid-to-base ratios, [HNO₂]/[NO₂⁻] = 1, so both have the same pH (approximately pKa). Solution 2 has ten times the concentration of each component, so it can neutralize more added acid or base before its ratio changes substantially; its buffer capacity is larger." },
    14: { solution: "Answer: B. Buffer capacity is compared by the pH change after the same amount of strong acid is added. X changes from pH 9.3 to 9.2 (0.1 unit), while Y changes from 9.0 to 2.2 (6.8 units). X resists the pH change much better and therefore has the larger buffer capacity." },
    15: { solution: "Answer: A. Decreasing pH adds H₃O⁺, which reacts with OH⁻ and removes a product of Mg(OH)₂ dissolution. By Le Châtelier's principle, the equilibrium shifts right and more Mg(OH)₂ dissolves. Raising pH or adding Mg²⁺ would suppress dissolution." },
    16: { solution: "Answer: A. HNO₃ supplies H₃O⁺, which protonates F⁻: F⁻(aq) + H₃O⁺(aq) ⇌ HF(aq) + H₂O(l). Removing F⁻ from solution shifts CaF₂(s) ⇌ Ca²⁺(aq) + 2F⁻(aq) to the right, increasing its solubility." }
  },

  "topics-6-1-6-5-mcq": {
    1: { solution: "Answer: B. The graph shows the solution temperature rising from 20°C to about 32°C, so the reaction releases heat and is exothermic. Thermal energy lost by the reacting system is gained by the surroundings.", conceptHint: "If the reaction mixture warms, the reacting system releases heat to the surroundings; if it cools, the system absorbs heat.", strategyHint: "Use the temperature graph to decide whether the mixture's temperature rises or falls.", nextStepHint: "The graph shows the mixture warming from 20°C to about 32°C. The reaction is exothermic, with heat flowing from the reacting system to the surroundings." },
    2: { solution: "Answer: C. The solution cools from 21.0°C to 18.0°C, so the dissolution absorbs thermal energy from the surroundings and is endothermic. This occurs when the energy needed to separate K⁺ and I⁻ in the crystal lattice exceeds the energy released as the hydrated ions form ion–dipole attractions with water." },
    3: { solution: "Answer: B (−50 kJ mol⁻¹). Products lie 50 kJ mol⁻¹ below reactants on the energy diagram, so ΔHrxn is negative and the reaction is exothermic.", conceptHint: "Reaction enthalpy is the difference between product and reactant energy levels on an energy profile.", strategyHint: "Read the vertical difference between the reactant and product plateaus; products above reactants indicate endothermic, below indicates exothermic.", nextStepHint: "The product plateau is 50 kJ/mol below the reactant plateau, so ΔHrxn = −50 kJ/mol and the reaction is exothermic." },
    4: { solution: "Answer: B. Use q = mcΔT. (A) q = 4.0(0.23)(70) = 64.4 J; (B) q = 4.0(0.39)(70) = 109.2 J; (C) q = 6.0(0.23)(40) = 55.2 J; (D) q = 6.0(0.39)(40) = 93.6 J. Experiment B absorbs the most heat." },
    5: { solution: "Answer: B. In an insulated calorimeter, energy is conserved: the thermal energy lost by the hot metal equals the thermal energy gained by the water (assuming negligible calorimeter heat). The metal's temperature changes by 65°C, compared with 13°C for water, but the magnitudes of heat transfer are equal." },
    6: { solution: "Answer: D. Average molecular kinetic energy depends only on absolute temperature. Both samples begin at 25.0°C and end at 55.0°C, so they have the same temperature change and the same change in average kinetic energy. Their different specific heats affect heat required, not the kinetic-energy change." },
    7: { solution: "Answer: A (−150 kJ mol⁻¹). qsolution = mcΔT = (100.00 g)(4.2 J g⁻¹ °C⁻¹)(55.7 − 20.0)°C = 1.50 × 10⁴ J = 15.0 kJ. The solution gains heat, so the reaction releases 15.0 kJ. n(MgO) = 4.03/40.3 = 0.100 mol; ΔHrxn = −15.0 kJ/0.100 mol = −150 kJ mol⁻¹." },
    8: { solution: "Answer: B (30.4°C). The same 10.0 g of LiCl dissolves in both trials, so approximately the same amount of heat is released. The solution mass is about 100 g in Trial 1 and 200 g in Trial 2. Because ΔT = q/(mc), doubling the solution mass halves the temperature increase: 20.8°C ÷ 2 = 10.4°C. Final temperature = 20.0 + 10.4 = 30.4°C." },
    9: { solution: "Answer: B (Y = X). Trial 1 contains 0.0050 mol HCl and 0.0050 mol NaOH, so they react completely. Trial 2 contains twice as much HCl but the same amount of NaOH; NaOH remains limiting and the same number of moles reacts. Therefore the heat released is the same in both trials." },
    10: { solution: "Answer: C (25 g). Cooling 100. g of liquid Ga from 83.9°C to 29.8°C releases q = mcΔT = (100. g)(0.37 J g⁻¹ °C⁻¹)(54.1°C) ≈ 2.00 × 10³ J. This heat melts Ga at its melting point; m = q/(heat of fusion) = 2000 J ÷ 80. J g⁻¹ ≈ 25 g." },
    11: { solution: "Answer: C (about 62 kJ). The vaporization plateau gives ΔHvap = 8.2 kJ mol⁻¹. For 120 g CH₄, n = 120/16.0 = 7.5 mol, so q = nΔHvap = 7.5(8.2) ≈ 61.5 kJ.", conceptHint: "On a heating curve, the energy for vaporization is the plateau energy at the boiling point, proportional to the amount of liquid vaporized.", strategyHint: "Read the molar enthalpy of vaporization from the curve and multiply by n = 120 g ÷ molar mass CH₄.", nextStepHint: "Use the labeled boiling plateau and ΔHvap to calculate q = nΔHvap for the 120 g methane sample." }
  },
  "topics-6-6-6-9-mcq": {
    1: { solution: "Answer: A (−884 kJ mol⁻¹). One gram NH₃ is 1.00/17.0 = 0.0588 mol and releases 13.0 kJ. The reaction consumes 4 mol NH₃ per mole of reaction as written, so ΔH° = −13.0 kJ × (4 mol NH₃/0.0588 mol NH₃) ≈ −884 kJ mol⁻¹ reaction." },
    2: { solution: "Answer: D (O₂, about 3100 kJ released). The equation needs 5 mol O₂ for every 2 mol C₂H₂. For 3.0 mol C₂H₂, 7.5 mol O₂ would be needed, but only 6.0 mol is available, so O₂ is limiting. Reaction extent = 6.0/5 = 1.2 mol reaction; heat released = 1.2(2600) = 3120 kJ, closest to 3100 kJ." },
    3: { solution: "Answer: C (18.4 kJ released). n(Na) = 2.30 g/22.99 g mol⁻¹ ≈ 0.100 mol. The reaction releases 368 kJ per reaction as written, which consumes 2 mol Na, so 0.100 mol Na corresponds to 0.0500 mol reaction. Heat released = 0.0500(368) = 18.4 kJ." },
    4: { solution: "Answer: A (−56 kJ mol⁻¹). qsolution = mcΔT = (100. g)(4.0 J g⁻¹ °C⁻¹)(7.0°C) = 2800 J = 2.8 kJ. The solution warms, so the reaction releases 2.8 kJ. Each reactant is 0.0500 mol, giving ΔHrxn = −2.8 kJ/0.0500 mol = −56 kJ mol⁻¹." },
    5: { solution: "Answer: C (41.7 g ethanol). Butane amount = 25.0 g/58.12 g mol⁻¹ = 0.430 mol. Heat released = 0.430 mol × 2880 kJ mol⁻¹ = 1.24 × 10³ kJ. Ethanol needed = (1.24 × 10³ kJ)/(1370 kJ mol⁻¹) = 0.904 mol, so mass = 0.904 mol × 46.07 g mol⁻¹ = 41.7 g." },
    6: { solution: "Answer: B (−296 kJ mol⁻¹). ΔH ≈ Σ(bond energies broken) − Σ(bond energies formed). Break one C≡C bond and two H–H bonds: 839 + 2(432) = 1703 kJ. Form one C–C bond and four additional C–H bonds: 347 + 4(413) = 1999 kJ. ΔH ≈ 1703 − 1999 = −296 kJ mol⁻¹." },
    7: { solution: "Answer: A. Breaking bonds absorbs energy, while forming bonds releases energy. A positive reaction enthalpy means the energy required to break the bonds in CH₃OH is greater than the energy released when the product bonds in CO and H₂ form." },
    8: { solution: "Answer: D. Bond enthalpy calculations use ΔH ≈ Σ(bonds broken) − Σ(bonds formed), because breaking bonds absorbs energy and forming bonds releases energy. The student subtracted reactant bond energies from product bond energies, reversing the required order and producing the wrong sign.", conceptHint: "Bond enthalpy estimates use ΔH ≈ energy of bonds broken − energy of bonds formed.", strategyHint: "For C₂H₄ + Cl₂ → C₂H₄Cl₂, the bonds broken are one C=C and one Cl–Cl; the bonds formed are one C–C and two C–Cl. The four C–H bonds appear unchanged on both sides and cancel.", nextStepHint: "The student subtracts product bond energies from reactant bond energies, reversing the required order. Bond breaking absorbs energy, so use ΔH ≈ bonds broken − bonds formed." },
    9: { solution: "Answer: A (−197.8 kJ mol⁻¹). ΔH°rxn = ΣnΔH°f(products) − ΣnΔH°f(reactants) = 2(−395.7) − [2(−296.8) + 0] = −791.4 + 593.6 = −197.8 kJ mol⁻¹ reaction." },
    10: { solution: "Answer: B (−165 kJ mol⁻¹). For the combustion reaction, −2390 = [4(−394) + 4(−286)] − 2ΔH°f(CH₃CHO). The product sum is −2720 kJ, so −2390 = −2720 − 2x; therefore 2x = −330 and x = −165 kJ mol⁻¹." },
    11: { solution: "Answer: A (−819 kJ mol⁻¹). Add the given reaction 2H₂O₂ → 2H₂O + O₂ (−196 kJ) to the reverse of N₂ + 2H₂ → N₂H₄ (−51 kJ), and to twice H₂ + ½O₂ → H₂O (−572 kJ). H₂, O₂, and intermediate terms cancel to give 2H₂O₂ + N₂H₄ → 4H₂O + N₂. ΔH° = −196 − 51 − 572 = −819 kJ mol⁻¹." }
  },

  "topics-3-1-3-2-mcq": {
    1: { solution: "Answer: C. The distance between separate HF molecules is greater than the 92 pm intramolecular H–F bond length. Breaking attractions between molecules requires much less energy than breaking the covalent H–F bond, so the intermolecular separation energy is less than 565 kJ mol⁻¹." },
    2: { solution: "Answer: B. CBr₄ has larger, more polarizable electron clouds than CCl₄, so its London dispersion forces are stronger. Stronger attractions lower vapor pressure and raise boiling point: CBr₄ has vapor pressure below 90 torr and boiling point above 350 K." },
    3: { solution: "Answer: B. Butane is nonpolar and relies on London dispersion forces; acetone has dipole–dipole attractions; 1-propanol can hydrogen-bond. The increasing strength of intermolecular attractions gives butane < acetone < 1-propanol in boiling point." },
    4: { solution: "Answer: C. Substance 2 contains a polar nitrile group, while substance 1 is a nonpolar hydrocarbon. Dipole–dipole attractions in substance 2 supplement London dispersion forces and help raise its boiling point." },
    5: { solution: "Answer: D. Butane has more electrons than ethane, making its electron cloud more polarizable. This produces stronger London dispersion forces and a higher boiling point." },
    6: { solution: "Answer: D. CH₃CH₂CH₂OH (1-propanol) has an O–H group and can form hydrogen bonds between molecules. CH₃OCH₂CH₂CH₃ is an ether and cannot donate hydrogen bonds to itself, so its intermolecular attractions are weaker and its boiling point is lower." },
    7: { solution: "Answer: B. Substance 1 is a nonpolar hydrocarbon and experiences London dispersion forces only. Substance 2 contains a polar nitrile group and experiences both dispersion and dipole–dipole attractions, giving it the higher boiling point and lower vapor pressure. Therefore substance 1 has the higher vapor pressure." },
    8: { solution: "Answer: C (C₄H₁₀). At 25°C, butane has the strongest dispersion forces and the lowest vapor pressure among CH₄, C₂H₆, and C₄H₁₀. Condensation begins when the applied pressure reaches the vapor pressure, so butane condenses at the lowest pressure." },
    9: { solution: "Answer: C (Mg²⁺). Ion–dipole attraction is stronger for ions with greater charge density. Mg²⁺ has a +2 charge and a small radius, giving it a stronger electrostatic interaction with the partially negative oxygen end of water than Na⁺, Rb⁺, or Sr²⁺." },
    10: { solution: "Answer: D. X does not conduct as a solid or liquid and has a relatively low melting point, consistent with a molecular substance. Y has a very high melting point and does not conduct in either phase, consistent with a network-covalent solid. Z does not conduct as a solid but conducts when molten, characteristic of an ionic compound." },
    11: { solution: "Answer: A. An ionic solid does not conduct electricity as a pure solid because its ions are fixed in the lattice. When dissolved in water, the ions become mobile and carry electric current." },
    12: { solution: "Answer: B (NaOH). NaOH is an ionic compound with a melting point near 318°C. It does not conduct as a solid because its ions are fixed in the crystal lattice, but it conducts in aqueous solution because the ions are mobile." }
  },
  "topics-3-3-3-6-mcq": {
    1: { solution: "No fully correct option appears to be printed. Option C is the intended phase-state choice because F₂ is a gas at 200 K and I₂ is a solid, but the diagram does not appear to show equal numbers of F₂ and I₂ molecules as required for an equimolar mixture. If forced to select the intended choice, use C; flag the item as flawed rather than treating C as unambiguously correct.", conceptHint: "At 200 K, F₂ is above its boiling point (85 K), while I₂ is below its melting point (387 K).", strategyHint: "Represent F₂ as separated diatomic gas molecules and I₂ as diatomic molecules packed together in a solid; equimolar amounts mean equal numbers of F₂ and I₂ molecules.", nextStepHint: "At 200 K, F₂ is a gas and I₂ is a solid. Check equal molecule counts too: the supplied options appear not to satisfy both conditions, so the packet has no fully correct diagram." },
    2: { solution: "Answer: B (Samples 1 and 3). For an ideal gas, n = PV/RT, so compare PV/T. Sample 1: (3.0 atm)(2.00 L)/200 K = 0.030. Sample 3: (2.0 atm)(4.50 L)/300 K = 0.030. The values are equal, so the samples contain the same number of moles." },
    3: { solution: "Answer: D (equal to 12 atm). The diagram gives 20 g He in 10 L at 12 atm and 400 g Ar in 20 L. At the same temperature, the Ar sample has 400/40 ≈ 10 mol and the He sample has 20/4 = 5 mol, so Ar has twice as many particles and twice the volume. Since P ∝ n/V, the pressures are equal." },
    4: { solution: "Answer: B (CH₄). At equal temperature and volume, pressure is proportional to moles. The 4.0 g He sample at 8.0 atm contains 1.0 mol, so the 4.0 g sample at 2.0 atm contains 0.25 mol. Its molar mass is 4.0 g/0.25 mol = 16 g mol⁻¹, matching CH₄." },
    5: { solution: "Answer: A (CH₄). For ideal gases, density = PM/RT. At the same temperature, compare P×M: CH₄ gives 4.0×16 = 64, while C₂H₆ gives 2.0×30 = 60. CH₄ therefore has slightly greater density, and its sample mass is slightly greater for the same volume." },
    6: { solution: "Answer: D (18.0 atm). The three vessels contain amounts proportional to 1:2:3, with Ar at 1.5 atm in 2.0 L. The Ne and He amounts are equivalent to 3.0 and 4.5 atm in the same volume. After combining, the total is equivalent to (1.5 + 3.0 + 4.5) atm in 2.0 L; compressing into 1.0 L doubles the pressure to 18.0 atm." },
    7: { solution: "Answer: C. The balanced equation is 2NO(g) + O₂(g) → 2NO₂(g). Gas particle count decreases from three moles to two. At constant temperature and volume, fewer gas particles mean lower pressure." },
    8: { solution: "Answer: A. At the same temperature, He is heavier than H₂, so its molecules have lower most-probable speeds. The He curve is shifted left and is taller/narrower than the H₂ curve; option A shows this.", conceptHint: "At the same temperature, H₂ and He have the same average kinetic energy, but He atoms are heavier and therefore have lower characteristic speeds.", strategyHint: "Choose the Maxwell–Boltzmann curve shifted toward lower speeds and made narrower/taller than the H₂ curve.", nextStepHint: "He is heavier than H₂, so its curve is narrower/taller and shifted left toward lower speeds than the H₂ curve; this is option A." },
    9: { solution: "Answer: C. Lower temperature shifts the Maxwell–Boltzmann speed distribution toward lower speeds and makes it taller and narrower. Option C shows the dashed lower-temperature curve shifted left with a higher peak.", conceptHint: "A lower temperature lowers the average kinetic energy of the gas particles.", strategyHint: "The lower-temperature distribution shifts left toward lower speeds and becomes taller and narrower.", nextStepHint: "A lower temperature shifts the distribution left and raises its peak; the dashed curve in option C shows that change." },
    10: { solution: "Answer: D. NH₃ molecules form hydrogen bonds and have stronger intermolecular attractions than nonpolar CH₄ molecules. Those attractions cause NH₃ to deviate more from the ideal-gas model, which assumes negligible intermolecular forces." },
    11: { solution: "Answer: D. At high pressure, the finite volume occupied by Ar atoms is no longer negligible relative to the container volume. This excluded-volume effect can make the observed pressure greater than the ideal-gas prediction." }
  },
  "topics-3-7-3-13-mcq": {
    1: { solution: "Answer: D (0.50 M Na⁺). Moles Na₂SO₄ = 7.1 g ÷ 142 g mol⁻¹ = 0.050 mol. In 0.2000 L, [Na₂SO₄] = 0.250 M. Each formula unit yields 2 Na⁺, so [Na⁺] = 2(0.250) = 0.500 M." },
    2: { solution: "Answer: B. Use the dilution relationship M₁V₁ = M₂V₂. For 50.0 mL of 0.750 M stock diluted to 250.0 mL, M₂ = (0.750)(50.0)/250.0 = 0.150 M. The other listed combinations do not give 0.150 M." },
    3: { solution: "Answer: D. CaCl₂ dissociates into Ca²⁺ and two Cl⁻ ions. The saturated-solution particle diagram should therefore show twice as many chloride ions as calcium ions; the diagram has too few chloride ions.", conceptHint: "Dissolving CaCl₂ produces Ca²⁺ and Cl⁻ in a 1:2 particle ratio.", strategyHint: "Count the ions and check that every Ca²⁺ is balanced by two Cl⁻ ions; dissolved ions should be separated rather than joined as intact CaCl₂ units.", nextStepHint: "Check that the diagram shows dissolved Ca²⁺ and Cl⁻ in a 1:2 ratio, with excess undissolved CaCl₂ remaining at saturation." },
    4: { solution: "Answer: C (0.10 M MgCl₂). Container 2 shows a 1:2 ratio of Mg²⁺ to Cl⁻ and fewer total formula units than the 0.20 M NaCl reference. Equal volumes and the particle counts correspond to 0.10 M MgCl₂.", conceptHint: "For equal solution volumes, concentration is proportional to the number of dissolved formula units per volume; MgCl₂ yields one Mg²⁺ and two Cl⁻ ions.", strategyHint: "Compare the ion counts in container 2 with the Na⁺:Cl⁻ count in the 0.20 M NaCl reference diagram.", nextStepHint: "Compare particle counts in equal volumes and use dissociation stoichiometry; MgCl₂ must have a 1:2 Mg²⁺:Cl⁻ ratio." },
    5: { solution: "Answer: B. Pentane has a shorter carbon chain and weaker London dispersion forces than decane. Its molecules are more volatile and have a lower boiling point, so pentane distills first and is initially present at higher concentration in the distillate." },
    6: { solution: "Answer: D. The nonpolar stationary phase retains the less polar compound more strongly. X moves farther down the column with water, so X is more water-soluble and more polar than Q.", conceptHint: "In a column with a nonpolar stationary phase and water as the mobile phase, a more water-soluble polar compound tends to travel farther with the mobile phase.", strategyHint: "Use the diagram to determine which compound moved farther down the column, then relate that movement to water solubility and polarity.", nextStepHint: "Track which compound travels farther with the water mobile phase; the more water-soluble/polar compound should move farther than the one retained by the nonpolar stationary phase." },
    7: { solution: "Answer: B (CCl₄). Carbon tetrachloride is nonpolar and cannot hydrogen-bond with water. Acetone, methanol, and dimethyl ether have polar C–O or O–H bonds that interact more strongly with water, so CCl₄ is least soluble.", conceptHint: "Water dissolves polar and hydrogen-bonding substances better than nonpolar hydrocarbons.", strategyHint: "Compare the structures in the original question; a nonpolar molecule with no hydrogen-bonding groups is usually least soluble in water.", nextStepHint: "Compare the molecular structures and identify which compound is least polar and lacks hydrogen-bonding groups." },
    8: { solution: "Answer: D. 1-propanol is more soluble in water because its –OH group can form hydrogen bonds with water. Propane is nonpolar and interacts with water mainly through weak London dispersion forces." },
    9: { solution: "Answer: A. Infrared photons are absorbed when they match differences between quantized molecular vibrational energy levels. IR spectroscopy therefore probes molecular vibrations, not electronic or nuclear transitions." },
    10: { solution: "Answer: B (2.3 × 10⁻⁷ m). The valence electron in Li has a binding energy of about 5.4 eV. Convert to joules and use λ = hc/E: λ ≈ (6.626 × 10⁻³⁴ J s)(3.00 × 10⁸ m s⁻¹)/(5.4 × 1.602 × 10⁻¹⁹ J) ≈ 2.3 × 10⁻⁷ m." },
    11: { solution: "Answer: C (#5, water droplets). Absorbance should increase approximately linearly with concentration. Sample #5 has a concentration of 0.180 M but its absorbance (0.87) is lower than expected from the trend. Water left in the cuvette dilutes the sample, lowering the measured absorbance. A dirty cuvette would generally scatter or block light and raise apparent absorbance." },
    12: { solution: "Answer: A (550 nm). A red solution transmits red wavelengths and absorbs complementary colors, especially in the green region. 550 nm is in the green range listed and should be absorbed strongly; 650 nm is red light and is transmitted more readily." },
    13: { solution: "Answer: C (0.77). Beer–Lambert behavior gives absorbance proportional to concentration. From 0.050 M, A = 0.24, the slope is 0.24/0.050 = 4.8 M⁻¹. At 0.16 M, A ≈ 4.8(0.16) = 0.768, which rounds to 0.77." }
  },

  "topics-4-7-4-9-mcq": {
    1: { solution: "Answer: A. Al changes from oxidation state 0 in Al(s) to +3 in Al₂(SO₄)₃, so Al is oxidized. Hydrogen changes from +1 in H₂SO₄ to 0 in H₂(g), so H⁺ is reduced. Oxidation and reduction occur together, making the reaction redox." },
    2: { solution: "Answer: C. NH₃ accepts a proton from HCl to form NH₄⁺, while HCl donates the proton to form Cl⁻. This proton transfer is a Brønsted–Lowry acid–base reaction. The other choices are redox, decomposition, or precipitation reactions." },
    3: { solution: "Answer: B. Ca²⁺ and CO₃²⁻ form the insoluble precipitate CaCO₃(s). Cl⁻ is a spectator ion: it does not enter the precipitate or change oxidation state, so it remains dissolved in the filtrate (along with Na⁺)." },
    4: { solution: "Answer: A. In OF₂, fluorine is −1, so oxygen must be +2. In O₂, oxygen is 0. Oxygen's oxidation state decreases from +2 to 0, meaning O is reduced. In the other choices, oxygen either remains at −2 or is oxidized rather than reduced." },
    5: { solution: "Answer: D. A conjugate acid–base pair differs by exactly one H⁺. HC₂O₄⁻ donates H⁺ to form C₂O₄²⁻, so these are a conjugate acid and conjugate base, respectively." },
    6: { solution: "Answer: B. H₂O donates a proton to C₆H₅NH₂, producing OH⁻ and C₆H₅NH₃⁺. The conjugate base of the acid H₂O is OH⁻." },
    7: { solution: "Answer: C. HOCl donates H⁺ to water, producing OCl⁻ and H₃O⁺. Option C shows OCl⁻ (Cl bonded to O with a negative charge) and H₃O⁺.", conceptHint: "HOCl donates H⁺ to water in a Brønsted–Lowry acid–base reaction.", strategyHint: "Write HOCl + H₂O ⇌ OCl⁻ + H₃O⁺; the acid loses H⁺ and water gains it.", nextStepHint: "Write HOCl + H₂O ⇌ OCl⁻ + H₃O⁺; choose the diagram with OCl⁻ and H₃O⁺ and the correct atom counts and charges." },
    8: { solution: "Answer: D (6 mol e⁻). Each Al atom is oxidized from 0 to +3 and loses 3 electrons. The balanced equation contains 2 Al atoms, so 2 × 3 = 6 mol electrons are transferred to Zn²⁺." },
    9: { solution: "Answer: D. The oxidation half-reaction is Cr → Cr³⁺ + 3e⁻ and the reduction half-reaction is O₂ + 4H⁺ + 4e⁻ → 2H₂O. The least common multiple of 3 and 4 is 12, so multiply the chromium half-reaction by 4 and the oxygen half-reaction by 3. Adding them gives 4Cr(s) + 3O₂(g) + 12H⁺(aq) → 4Cr³⁺(aq) + 6H₂O(l)." }
  },

  "topics-9-1-9-7-mcq": {
    1: { solution: "Answer: A. The reactants contain three moles of gas (2 H₂ + O₂), while the products contain two moles of gas (2 H₂O). A decrease in the number of gas particles generally corresponds to a decrease in entropy, so ΔS° is negative." },
    2: { solution: "Answer: B. The largest positive entropy change is from an ordered solid to dispersed gas particles, which greatly increases the number of accessible arrangements. Option B depicts that phase change.", conceptHint: "A positive entropy change is associated with greater dispersal of matter and energy, often including more gas particles or more available particle arrangements.", strategyHint: "Compare the particle diagrams for changes in phase, number of gas particles, and mixing.", nextStepHint: "Compare the phase changes and gas-particle counts in the diagrams; greater dispersal and more accessible arrangements indicate a positive entropy change." },
    3: { solution: "Answer: B (−121 J K⁻¹ mol⁻¹). ΔS° = ΣS°products − ΣS°reactants = 2(262) − [223 + 2(211)] = 524 − 645 = −121 J K⁻¹ mol⁻¹ reaction." },
    4: { solution: "Answer: B (200 J K⁻¹ mol⁻¹). ΔS°rxn = 2S°(HBr) − [S°(H₂) + S°(Br₂)]. Substitute 20 = 2S°(HBr) − (130 + 250), so 2S°(HBr) = 400 and S°(HBr) = 200 J K⁻¹ mol⁻¹." },
    5: { solution: "Answer: A. ΔG° = ΔH° − TΔS° = −426 kJ mol⁻¹ − 298 K(−0.018 kJ K⁻¹ mol⁻¹) ≈ −420.6 kJ mol⁻¹, so ΔG° is negative. The magnitude of TΔS° is only about 5.4 kJ mol⁻¹, much smaller than |ΔH°|." },
    6: { solution: "Answer: B. For a reaction to become favored as temperature rises, ΔG° = ΔH° − TΔS° must change from positive to negative. That requires both ΔH° > 0 and ΔS° > 0; reaction B has +484 kJ mol⁻¹ and +90.0 J K⁻¹ mol⁻¹." },
    7: { solution: "Answer: C. ΔG° = ΔH° − TΔS° = −610 kJ mol⁻¹ − 298 K(−0.0073 kJ K⁻¹ mol⁻¹) ≈ −607.8 kJ mol⁻¹. The reaction is favorable because ΔG° is negative; the negative ΔS° opposes favorability, so the driving contribution is ΔH° only." },
    8: { solution: "Answer: A. Thermodynamic favorability (ΔG° < 0) describes the direction favored at equilibrium, not how quickly equilibrium is reached. At 298 K, most collisions do not have enough energy to overcome the activation-energy barrier, so the reaction rate can be extremely slow." },
    9: { solution: "Answer: D. The reaction is thermodynamically favorable from the negative ΔG° value, but it still requires an initial energy input to overcome the activation barrier. The spark supplies that activation energy; it does not make the reaction thermodynamically favorable." },
    10: { solution: "Answer: B. When reactions are added, their equilibrium constants multiply. K₃ = K₁(K₂)² = (2 × 10⁻⁶)(1 × 10³)² = 2. Since K₃ > 1, the combined dissolution reaction is thermodynamically favorable under standard-state interpretation." },
    11: { solution: "Answer: C. With ΔH° < 0 and ΔS° < 0, ΔG° = ΔH° − TΔS° becomes less favorable as temperature increases. The reaction is favored at low temperature, so Kₑq > 1 only at low temperatures." },
    12: { solution: "Answer: B. Separating solvent molecules and separating solute particles both require energy to overcome attractions (ΔH° > 0) and increase dispersal (ΔS° > 0). Forming solute–solvent attractions releases energy (ΔH° < 0), while mixing the solute with solvent increases entropy (ΔS° > 0)." },
    13: { solution: "Answer: D (−1319 kJ mol⁻¹). Reverse reaction 2 and multiply it by 2: 4 NO + 2 O₂ → 4 NO₂, ΔG° = −142 kJ. Add this to reaction 1 (−1011 kJ) and reaction 3 (−166 kJ). The intermediate NO and NO₂ cancel, giving the target reaction and ΔG° = −1011 − 142 − 166 = −1319 kJ mol⁻¹." }
  },
  "topics-9-8-9-11-mcq": {
    1: { solution: "Answer: B. Pb²⁺/Pb has the more positive reduction potential, so Pb²⁺ is reduced at the cathode and Mg is oxidized at the anode. Cations from the salt bridge migrate toward the cathode (the Pb half-cell) to balance the excess negative charge developing there as cations are removed from solution." },
    2: { solution: "Answer: B. E°cell = E°cathode − E°anode = 0.80 − (−0.74) = 1.54 V. The balanced reaction transfers n = 3 electrons, so ΔG° = −nFE° = −(3)(96,485 C mol⁻¹)(1.54 V) ≈ −446,000 J mol⁻¹ = −446 kJ mol⁻¹." },
    3: { solution: "Answer: C. Ag⁺ has the more positive reduction potential and is reduced at the Ag electrode. Copper is therefore oxidized: Cu(s) → Cu²⁺(aq) + 2e⁻. Copper atoms leave the electrode and enter solution, so the Cu electrode loses mass." },
    4: { solution: "Answer: A (0.46 V). Silver is the cathode and copper is the anode. E°cell = E°cathode − E°anode = 0.80 V − 0.34 V = 0.46 V." },
    5: { solution: "Answer: B. The most thermodynamically favorable reaction has the largest positive E°cell and most negative ΔG°. For Rh³⁺ reduction and Al oxidation, E°cell = 0.80 − (−1.66) = +2.46 V, greater than the other listed combinations. Thus Rh³⁺(aq) + Al(s) → Rh(s) + Al³⁺(aq) is the most favorable." },
    6: { solution: "Answer: A (−520 kJ mol⁻¹). Al is oxidized and Zn²⁺ is reduced, giving E°cell = −0.76 − (−1.66) = +0.90 V. The balanced equation transfers 6 electrons, so ΔG° = −nFE° = −(6)(96,485)(0.90) J mol⁻¹ ≈ −521 kJ mol⁻¹." },
    7: { solution: "Answer: C. For the reaction as written, E° = −0.89 V, so ΔG° = −nFE° is positive. A positive ΔG° means Kₑq < 1 because ΔG° = −RT ln Kₑq." },
    8: { solution: "Answer: C (about 1.4 V). The reaction requires ΔG° = +264 kJ mol⁻¹ and transfers n = 2 electrons. The minimum ideal voltage is E = ΔG°/(nF) = 264,000 J mol⁻¹ ÷ [2(96,485 C mol⁻¹)] ≈ 1.37 V, or about 1.4 V." },
    9: { solution: "Answer: B. Precipitating Ag⁺ as AgCl lowers [Ag⁺]. For Al(s) + 3Ag⁺ → Al³⁺ + 3Ag(s), Q = [Al³⁺]/[Ag⁺]³, so lowering [Ag⁺] makes Q greater than 1. The Nernst equation E = E° − (RT/nF)ln Q then gives E < E°." },
    10: { solution: "Answer: D. For Al(s) + 3Ag⁺ → Al³⁺ + 3Ag(s), Q = [Al³⁺]/[Ag⁺]³. Reducing [Al³⁺] from 1.0 M to 0.010 M lowers Q below 1, making ln Q negative. The Nernst correction therefore raises E above E°." },
    11: { solution: "Answer: C (about 735 s). Au³⁺ requires 3 mol e⁻ per mole of Au deposited. n(Au) = 2.00 g ÷ 196.97 g mol⁻¹ = 0.01015 mol, so n(e⁻) = 0.03046 mol. Q = nF = 0.03046(96,485) ≈ 2.94 × 10³ C. At 4.00 A, t = Q/I ≈ 2.94 × 10³ C ÷ 4.00 C s⁻¹ = 735 s." },
    12: { solution: "Answer: B (1.73 g Cu). The charge passed is Q = It = (2.50 A)(35.0 × 60 s) = 5250 C. n(e⁻) = Q/F = 5250/96,485 = 0.0544 mol. Cu²⁺ + 2e⁻ → Cu, so n(Cu) = 0.0544/2 = 0.0272 mol and m(Cu) = 0.0272(63.55) = 1.73 g." },
    13: { solution: "Answer: D (2.6 A). Pb²⁺ + 2e⁻ → Pb, so 1 mol Pb requires 2 mol electrons. n(Pb) = 5.0 g ÷ 207.2 g mol⁻¹ = 0.0241 mol; n(e⁻) = 0.0483 mol. The charge is Q = nF ≈ 0.0483(96,485) = 4.66 × 10³ C. Average current I = Q/t = 4.66 × 10³ C ÷ 1800 s ≈ 2.59 A, or 2.6 A." }
  },

  "topics-1-4-1-6-mcq": {
    1: { solution: "Answer: A (27%). The AgCl precipitate has mass 0.72 g, so n(AgCl) = 0.72 g ÷ 143 g mol⁻¹ = 0.00503 mol. Ag⁺ and Cl⁻ form AgCl in a 1:1 ratio, so the alloy contained 0.00503 mol Ag, or 0.543 g Ag. Percent Ag = (0.543 g ÷ 2.00 g) × 100% = 27.2%, which rounds to 27%." },
    2: { solution: "Answer: C (KCN). The impurity must contain a larger mass fraction of potassium than K₂SO₄ does. KCN is about 60% K by mass: 39.1 ÷ (39.1 + 12.0 + 14.0) × 100%. KBr, KI, and KMnO₄ all have lower potassium mass fractions, so they would lower rather than raise the sample's potassium percentage." },
    3: { solution: "Answer: B (30.5%). The lithium mass fraction in LiCl is 6.94 ÷ (6.94 + 35.45) = 0.1637. If the mixture is 5.00% Li by mass, the LiCl fraction is 0.0500 ÷ 0.1637 = 0.305, or 30.5%." },
    4: { solution: "Answer: B. Tin has 50 electrons. Starting from krypton (36 electrons), the remaining 14 are 4d¹⁰5s²5p², giving [Kr] 4d¹⁰ 5s² 5p². The 4d sublevel is filled before the 5p electrons are added." },
    5: { solution: "Answer: C. Sulfur is 3p⁴ and has two unpaired p electrons; Mg has no unpaired electrons in its filled 3s² sublevel. Cobalt has [Ar] 3d⁷4s², with three unpaired 3d electrons under Hund's rule. Titanium has 3d² and two unpaired d electrons, not four." },
    6: { solution: "Answer: D. Neutral Mn is [Ar] 3d⁵4s². When forming a cation, electrons are removed from 4s before 3d: remove two 4s electrons and one 3d electron to form Mn³⁺ = [Ar] 3d⁴." },
    7: { solution: "Answer: A. The 1s electrons in Li and Be experience stronger attraction to the nucleus than in He because the nuclear charge increases from +2 to +3 to +4. Their binding energies therefore rise, with Li at 6.26 MJ mol⁻¹ and Be at 11.5 MJ mol⁻¹. The correct justification is the larger nuclear charge of Be than Li." },
    8: { solution: "Answer: D. Ca²⁺ and Ar are isoelectronic, but Ca²⁺ has 20 protons while Ar has 18. The stronger nuclear attraction makes Ca²⁺ 1s electrons more tightly bound, so peak X at higher binding energy belongs to Ca²⁺.", conceptHint: "For isoelectronic species, compare nuclear charge: more protons attract the same electron count more strongly.", strategyHint: "The 1s electrons in Ca²⁺ and Ar have the same electron configuration, but Ca²⁺ has 20 protons while Ar has 18.", nextStepHint: "The Ca²⁺ 1s electrons are more tightly bound, so the correct peak is the one at higher binding energy; the diagram is needed to identify whether that is labeled X." },
    9: { solution: "Answer: C (carbon). The spectrum has three subshell peaks with equal relative electron counts: 1s², 2s², and 2p². That electron configuration is carbon, 1s²2s²2p².", conceptHint: "A complete photoelectron spectrum identifies subshells from peak positions and relative peak areas.", strategyHint: "Compare the number of occupied subshells and the relative electron counts represented by the peaks.", nextStepHint: "The choices Li, B, C, and N differ in 1s and 2s/2p electron counts; the spectrum image is required to identify the element without guessing." }
  },
  "topics-1-7-1-8-mcq": {
    1: { solution: "Answer: B (242 pm, 419 kJ mol⁻¹). Potassium is directly above calcium in Group 1 and lies one column to the left. K has a larger atomic radius than Ca and a lower first ionization energy, so the plausible values are 242 pm and 419 kJ mol⁻¹." },
    2: { solution: "Answer: D. Ar has a higher first ionization energy than Cl because its valence electrons experience a greater effective nuclear charge across the same period. Both are in Period 3, and the increasing nuclear charge pulls the electrons closer; the filled-shell statement is not the best explanation for the trend." },
    3: { solution: "Answer: C. Br is below Cl in Group 17, so Br has one additional occupied electron shell. Its valence electrons are farther from the nucleus and more shielded, giving Br a larger atomic radius than Cl." },
    4: { solution: "Answer: C. Nitrogen has a half-filled 2p³ arrangement, while oxygen is 2p⁴ and has one pair of electrons in a 2p orbital. Repulsion between paired electrons makes it slightly easier to remove one electron from O than the smooth across-period trend would predict, so O's first ionization energy is lower than N's." },
    5: { solution: "Answer: B. The large jump is between the third and fourth ionization energies, showing that three electrons are removed relatively easily before a core electron must be removed. The element therefore has three valence electrons; in the second period, that element is boron." },
    6: { solution: "Answer: A (XO). The large increase from the second to the third ionization energy shows that X has two valence electrons. X therefore most commonly forms X²⁺; oxide is O²⁻, so the simplest neutral oxide formula is XO." },
    7: { solution: "Answer: A. Potassium reacts more vigorously because its first ionization energy is lower than calcium's, so K loses a valence electron more readily. The stronger hydration attraction of Ca²⁺ is not the explanation for the faster reaction of K." },
    8: { solution: "Answer: B (BaCl₂). Barium and calcium are both Group 2 metals and form +2 ions. Their chlorides are ionic salts with similar stoichiometry and chemical behavior; SCl₂, BCl₃, and CCl₄ are molecular covalent compounds." },
    9: { solution: "Answer: C (MgCl₂ and MgBr₂). These compounds contain the same cation, Mg²⁺, and halide anions from the same group. Their ions have the same charges and analogous structures, so their chemical properties are most similar." }
  },
  "topics-2-1-2-4-mcq": {
    1: { solution: "Answer: B (SCl₂, CdCl₂, BaCl₂). SCl₂ is molecular covalent and has the least ionic character. CdCl₂ is ionic but Cd²⁺ polarizes the chloride ions more strongly than Ba²⁺ does. BaCl₂ has the greatest ionic character because Ba²⁺ is large and less polarizing, so its bonding is more nearly ionic." },
    2: { solution: "Answer: D (Se–Br < Se–Cl < Se–F). Bond polarity increases with electronegativity difference. Selenium's electronegativity differs least from bromine, more from chlorine, and most from fluorine, giving the listed order." },
    3: { solution: "Answer: C (Mg²⁺ and O²⁻). Coulombic attraction increases with the product of ionic charges and decreases as the distance between ion centers increases. The 2+ and 2− charges give a much larger charge product than the singly charged pairs, and Mg²⁺ is smaller than Ca²⁺, so Mg²⁺–O²⁻ has the strongest attraction and the greatest separation energy." },
    6: { solution: "Answer: B. Br⁻ has a larger ionic radius than Cl⁻, increasing the distance between Na⁺ and the anion. The weaker Coulombic attraction means less energy is required to separate NaBr into gaseous ions than NaCl, so NaBr's lattice energy is below 788 kJ mol⁻¹." },
    4: { solution: "Answer: A. A C–F bond is shorter and stronger than a C–Cl bond, so its potential-energy curve has a shorter equilibrium internuclear distance and a deeper minimum. Option A assigns the shorter, deeper curve to C–F." },
    5: { solution: "Answer: C. A C=C double bond is shorter and stronger than a C–C single bond. Its potential-energy curve therefore has a shorter equilibrium distance and a deeper minimum, shown by the dashed C=C curve in option C." },
    7: { solution: "Answer: A. Boron atoms are much smaller than nickel atoms and can occupy interstitial holes in the metal lattice. Option A shows small B atoms in spaces between the larger Ni atoms, an interstitial alloy." },
    8: { solution: "Answer: A. When ionic layers slide, like charges can become adjacent. The resulting cation–cation and anion–anion repulsions destabilize the lattice and cause it to cleave; option A shows this displacement and alignment." },
    9: { solution: "Answer: B. Pd and Au have similar atomic radii (140 pm and 135 pm), so they form a substitutional alloy in which atoms replace one another in the metal lattice. With 25 mol% Pd, roughly one quarter of the sites should be Pd and distributed through the Au lattice; option B shows this." },
  },
  "topics-1-1-1-3-mcq": {
    1: {
      solution: "Answer: B (MgO). Each sample has a mass of 1.00 g, so compare the oxygen mass fraction in each oxide. For MgO, the fraction is 16.00 ÷ (24.31 + 16.00) = 0.397; for Na₂O it is 16.00 ÷ 61.98 = 0.258, for K₂O it is 16.00 ÷ 94.20 = 0.170, and for CaO it is 16.00 ÷ 56.08 = 0.285. MgO therefore contains the greatest mass of oxygen per gram.",
      conceptHint: "Mass percent depends on the fraction of each formula unit's mass contributed by the element, not just the number of atoms in the formula.",
      strategyHint: "Calculate each oxide's molar mass and the oxygen mass contained in one mole of that oxide.",
      nextStepHint: "Compare (mass of oxygen in one mole of oxide) ÷ (molar mass of oxide). Each sample is 1.00 g, so the greatest oxygen mass corresponds to the greatest oxygen mass fraction.",
    },
    2: {
      solution: "Answer: D (atomic mass between 90 and 92 amu). The spectrum contains several isotopes, with the strongest peak at 90 amu and additional abundance at higher masses. The weighted-average atomic mass must lie above 90 and below 92 amu.",
      conceptHint: "A mass spectrum can show isotopes of the same element at different masses and their relative abundances.",
      strategyHint: "Interpret peak position as mass-to-charge information and peak size as relative abundance; do not confuse isotope peaks with different oxidation states.",
      nextStepHint: "Use the pattern of masses and abundances to decide which conclusion is directly supported by the spectrum, rather than inferring a property the graph does not measure.",
    },
    3: {
      conceptHint: "An empirical formula gives the simplest whole-number ratio of atoms.",
      strategyHint: "Convert each element's mass to moles using its molar mass, then divide all mole amounts by the smallest.",
      nextStepHint: "If the ratios are not close to whole numbers, multiply every ratio by the same small integer until the simplest whole-number ratio is obtained.",
      solution: "Answer: C (C₂H₆O). The mole amounts are approximately 1.00 mol C, 2.98 mol H, and 0.500 mol O. Dividing by the smallest amount gives a ratio near 2:6:1, so the empirical formula is C₂H₆O.",
    },
    4: {
      solution: "Answer: C. Iodine has one naturally occurring isotope, iodine-127, which has 74 neutrons (127 − 53 = 74). Tellurium has several naturally occurring isotopes. A mass spectrum showing multiple isotope peaks is therefore consistent with pure Te even though iodine and tellurium have similar average atomic masses.",
      conceptHint: "Elements can have similar average atomic masses while having different isotope patterns.",
      strategyHint: "Compare the mass spectrum's peak positions and relative abundances with the isotope patterns expected for the candidate elements.",
      nextStepHint: "Base the conclusion on the observed isotope pattern, not on the average mass alone.",
    },
    5: {
      solution: "Answer: B (CH₅N). The 44.0 g CO₂ corresponds to 1.00 mol CO₂ and therefore 1.00 mol C. The 45.0 g H₂O corresponds to 2.50 mol H₂O and therefore 5.00 mol H atoms. The H:C ratio is 5:1, so CH₅N is the listed formula with that ratio; nitrogen is present as stated in the problem.",
      conceptHint: "Combustion analysis uses product amounts to infer how much carbon and hydrogen were present in the original compound.",
      strategyHint: "Convert CO₂ to moles of carbon and H₂O to moles of hydrogen atoms; then use the available choices and nitrogen information to test possible simplest ratios.",
      nextStepHint: "Remember that one mole of CO₂ contains one mole of C, while one mole of H₂O contains two moles of H. Reduce the resulting atom ratio.",
    },
    6: {
      solution: "Answer: B (KCl). The AgCl precipitate mass is 2.23 − 0.80 = 1.43 g. Using 143 g mol⁻¹, n(AgCl) = 1.43/143 = 0.0100 mol. Ag⁺ and Cl⁻ react 1:1, and each MCl contains one Cl⁻, so n(MCl) = 0.0100 mol. The molar mass of MCl is 0.74 g/0.0100 mol = 74 g mol⁻¹, matching KCl (about 74.6 g mol⁻¹).",
      conceptHint: "A precipitation reaction can reveal the amount of an unknown ion through a known mole ratio.",
      strategyHint: "Use the AgCl precipitate mass to calculate moles of AgCl, then relate those moles to MCl and the unknown metal.",
      nextStepHint: "Ag⁺ and Cl⁻ combine in a 1:1 ratio, and each MCl formula unit contains one M⁺. Once moles of M are known, use the sample mass to determine its molar mass.",
    },
    7: {
      conceptHint: "Combustion converts each carbon atom to CO₂ and each pair of hydrogen atoms to one H₂O molecule.",
      strategyHint: "Let the hydrocarbon formula be CₓHᵧ. Compare the mole relationship between CO₂ and H₂O to relate x and y.",
      nextStepHint: "Equimolar CO₂ and H₂O means x = y/2, so the simplest carbon-to-hydrogen ratio must satisfy y = 2x.",
      solution: "Answer: C (C₄H₈). Complete combustion of CₓHᵧ produces x moles of CO₂ and y/2 moles of H₂O per mole of hydrocarbon. Equal product amounts require x = y/2, or H:C = 2:1. C₄H₈ is the listed formula with that ratio.",
    },
    8: {
      solution: "Answer: A. Moisture absorbed by the anhydrous salt before its final mass is recorded makes that final mass too high. The measured mass loss then appears smaller than the actual water originally present, so the calculated percent water is too low (38% instead of 51%). Spattering or decomposition would generally create extra mass loss and overestimate the water percentage.",
      conceptHint: "In a hydrate experiment, the percentage of water is inferred from the mass lost during heating.",
      strategyHint: "Compare the reported water loss with the true amount: a result that is too low means the measured mass loss was too small relative to the original sample.",
      nextStepHint: "Look for a procedural error that leaves water in the solid or otherwise prevents the full expected water mass from being measured as lost.",
    },
  },

  "topics-2-5-2-7-mcq": {
    1: {
      solution: "Answer: D. C₃H₆ requires one C=C double bond and six hydrogens. Option D shows CH₃–CH=CH₂, a valid Lewis structure for propene.",
      conceptHint: "A valid Lewis diagram must satisfy the hydrogen duet rule, the usual octet for carbon, and the molecule's total valence-electron count.",
      strategyHint: "Count all valence electrons first, then check each carbon's number of bonds and each hydrogen's single bond.",
      nextStepHint: "Reject any option that uses too many or too few electrons, gives hydrogen more than one bond, or leaves a carbon with an implausible valence.",
    },
    2: {
      solution: "Answer: B. NO₂⁺ has 16 valence electrons and a linear O=N=O structure with two double bonds. The formal charge is +1 on N and 0 on each O, giving the overall +1 charge.",
      conceptHint: "For a charged Lewis structure, adjust the total valence-electron count for the ion's charge before placing lone pairs and bonds.",
      strategyHint: "Build an O–N–O skeleton, complete oxygen octets, then consider multiple bonds and formal charges.",
      nextStepHint: "Check that the final electron count is 16 and that the formal charges add to the overall +1 charge.",
    },
    3: {
      solution: "Answer: C. The best Lewis structure for NOCl is O=N–Cl: a double bond to oxygen and a single bond to chlorine, with one lone pair on N. This gives formal charges of zero on all three atoms.",
      conceptHint: "Formal charge helps compare Lewis structures; a useful structure usually minimizes unnecessary charge separation while preserving plausible bonding.",
      strategyHint: "For each candidate, count lone-pair electrons and bonding electrons around every atom, then calculate formal charge.",
      nextStepHint: "Prefer a structure with sensible octets and the smallest reasonable formal charges; account for chlorine, nitrogen, and oxygen electronegativities.",
    },
    4: {
      solution: "Answer: B. Diagram 1 places the negative formal charge on oxygen, the most electronegative atom, while diagram 2 places it on nitrogen. A negative charge is more stable on oxygen, so diagram 1 is the more favorable contributor.",
      conceptHint: "When comparing resonance contributors, examine formal charges and which atoms carry them.",
      strategyHint: "Calculate formal charges for each proposed O–C–N arrangement and check that the total charge remains −1.",
      nextStepHint: "A negative formal charge is generally more favorable on the more electronegative oxygen than on carbon, provided octets and bonding remain reasonable.",
    },
    5: {
      conceptHint: "Resonance means electrons are delocalized across multiple valid Lewis contributors; the real molecule is not rapidly switching between separate structures.",
      strategyHint: "Draw the important resonance contributors for ozone, then compare what each predicts for the two O–O bonds.",
      nextStepHint: "Equivalent bonds in the resonance hybrid have the same intermediate bond order rather than one permanent single bond and one permanent double bond.",
      solution: "Answer: D. Ozone is represented by two equivalent resonance structures, with the double bond on either side. The resonance hybrid has two equivalent O–O bonds with average bond order 1.5.",
    },
    6: {
      conceptHint: "Equal bond lengths can be evidence that resonance makes two bonds equivalent in the actual structure.",
      strategyHint: "Compare the two major resonance contributors of acetate and track which C–O bond is double in each.",
      nextStepHint: "Look for the pair of contributors that swaps the double bond between the two oxygens while leaving the atom connectivity unchanged.",
      solution: "Answer: A. The two equivalent resonance contributors for acetate place the C=O double bond on either oxygen and the negative charge on the other. Option A shows these two contributors; resonance makes both C–O bonds equivalent.",
    },
    7: {
      solution: "Answer: B (NF₃). NF₃ is trigonal pyramidal and has a bond angle near 102°, smaller than the tetrahedral angle in CF₄ or the roughly 120° angles in bent SO₂ and linear O=S=O. The lone pair on N compresses the F–N–F angle.",
      conceptHint: "VSEPR predicts bond angles from repulsion between electron domains; lone pairs generally repel more strongly than bonding pairs.",
      strategyHint: "For each candidate, count electron domains around the central atom and distinguish lone pairs from bonded atoms.",
      nextStepHint: "Compare the expected geometry and angle compression. A central atom with more lone-pair repulsion often has the smaller bond angle.",
    },
    8: {
      conceptHint: "Molecular polarity depends on both bond dipoles and the three-dimensional molecular geometry.",
      strategyHint: "Determine the shape of BF₃ and NF₃ separately, then consider whether the individual B–F or N–F bond dipoles cancel as vectors.",
      nextStepHint: "A symmetric trigonal-planar arrangement can cancel equal bond dipoles; a trigonal-pyramidal arrangement does not cancel them completely.",
      solution: "Answer: D. BF₃ is trigonal planar and its B–F bond dipoles cancel. NF₃ is trigonal pyramidal because N has a lone pair, so its N–F bond dipoles do not cancel and it is polar.",
    },
    9: {
      conceptHint: "Use VSEPR to determine molecular geometry before deciding whether the bond dipoles cancel.",
      strategyHint: "Count the central chlorine's electron domains, including lone pairs, and then identify the positions occupied by the three fluorine atoms.",
      nextStepHint: "Three bonds and two lone pairs give five electron domains; the molecular shape is T-shaped, so the bond dipoles do not fully cancel.",
      solution: "Answer: A. ClF₃ has five electron domains around Cl (three bonding pairs and two lone pairs). The two lone pairs occupy equatorial positions, giving a T-shaped molecular geometry; its bond dipoles do not cancel, so it is polar.",
    },
    10: {
      solution: "Answer: A. In acetylene, each carbon has two electron domains and is sp hybridized. In ethylene, each carbon has three electron domains and is sp² hybridized.",
      conceptHint: "Hybridization labels are assigned from the local bonding arrangement in each structure, not from the atom's identity alone.",
      strategyHint: "For each carbon, count regions of electron density around it; a double bond counts as one region for geometry.",
      nextStepHint: "Use two, three, or four regions to identify the corresponding sp, sp², or sp³ model, then repeat for the carbon after the reaction.",
    },
  },
  "topics-5-1-5-3-mcq": {
    1: {
      solution: "Answer: C. The two Mg samples have equal mass, but the particle representation in Figure 2 exposes more Mg surface to the acid. Greater exposed surface area creates more opportunities for effective collisions per unit time, so Figure 2 reacts faster initially.",
      conceptHint: "For a reaction involving a solid, the exposed surface area can affect how often dissolved reactant particles reach reactive sites.",
      strategyHint: "Compare the amount of magnesium and acid first, then compare how much magnesium surface is exposed in the particle models.",
      nextStepHint: "The sample with more exposed reactive surface should have the faster initial rate, assuming other conditions are the same.",
    },
    2: {
      conceptHint: "Reaction rate can increase when reactant concentration is higher or when a solid reactant has greater exposed surface area.",
      strategyHint: "Find the trial combining the greatest acid concentration with the smallest solid-particle size; keep mass and solution volume in view.",
      nextStepHint: "The fastest trial should require the least time to finish because both conditions favor more frequent effective collisions.",
      solution: "Answer: B (Trial 2). The fine powder exposes more reactive surface than a large chunk, and the higher HCl concentration increases the frequency of collisions with the solid. Trial 2 combines both rate-increasing conditions, so it should have the shortest reaction time.",
    },
    3: {
      conceptHint: "Rates of disappearance and formation are related by the coefficients in the balanced chemical equation.",
      strategyHint: "Write the rate ratio for oxalic acid and permanganate using their coefficients, 5 and 2.",
      nextStepHint: "The disappearance rate of permanganate is the oxalic-acid disappearance rate multiplied by 2/5.",
      solution: "Answer: A (8.0 × 10⁻⁴ mol L⁻¹ s⁻¹). The balanced equation consumes 5 mol of H₂C₂O₄ for every 2 mol of MnO₄⁻. Thus the MnO₄⁻ disappearance rate is (2/5)(2.0 × 10⁻³) = 8.0 × 10⁻⁴ mol L⁻¹ s⁻¹.",
    },
    4: {
      conceptHint: "The rate law describes concentration effects; the rate constant stays fixed when temperature and the reaction conditions defining k stay fixed.",
      strategyHint: "Substitute the concentration changes into rate = k[H₂][I₂], multiplying each concentration factor separately.",
      nextStepHint: "Doubling both first-order reactants multiplies the initial rate by four, while the rate constant remains unchanged at the same temperature.",
      solution: "Answer: C. With rate = k[H₂][I₂], doubling [H₂] multiplies rate by 2 and doubling [I₂] multiplies it by another 2. The initial rate is therefore four times as large; because the temperature is unchanged, k stays the same.",
    },
    5: {
      conceptHint: "Integrated rate laws connect concentration to elapsed time; repeated equal-fraction decreases suggest first-order behavior.",
      strategyHint: "Compare successive concentration ratios and determine whether the half-life is constant. For a first-order process, k = 0.693/t₁/₂.",
      nextStepHint: "The data show a half-life of about 4.0 minutes, so calculate k in min⁻¹ using 0.693 divided by that half-life.",
      solution: "Answer: A (0.173 min⁻¹). The concentration halves from 5.76 M to 2.88 M over 4.0 min, and continues to halve over equal intervals, supporting first-order behavior. k = 0.693/t₁/₂ = 0.693/(4.00 min) = 0.173 min⁻¹.",
    },
    6: {
      conceptHint: "The method of initial rates isolates reaction orders by changing one reactant concentration at a time.",
      strategyHint: "Compare trials 1 and 2 to find the order in X, then compare trials 2 and 3 to find the order in Y.",
      nextStepHint: "A twofold increase in X makes the rate fourfold larger, while a twofold increase in Y doubles the rate. Translate those factors into exponents.",
      solution: "Answer: D. Trial 2 consumes Y twice as rapidly as X because the balanced equation is X + 2Y → XY₂. Independently, comparing trials 1 and 2 shows that doubling [X] at constant [Y] quadruples the rate, so the reaction is second order in X; comparing trials 2 and 3 shows that doubling [Y] doubles the rate, so it is first order in Y. The rate law is k[X]²[Y], third order overall.",
    },
    7: {
      solution: "Answer: C. Comparing experiments 1 and 2, [XY] doubles while [A₂] is constant, and the rate doubles, so the reaction is first order in XY. Comparing experiments 2 and 3, [A₂] increases fourfold while [XY] is constant, and the rate increases from 5.0 × 10⁻⁴ to 8.0 × 10⁻³ M s⁻¹ (16-fold), so the reaction is second order in A₂. The rate law is rate = k[XY][A₂]².",
      conceptHint: "Use initial-rate comparisons to determine how the rate depends on each reactant concentration.",
      strategyHint: "Identify pairs of experiments where only one starting concentration changes, then compare the rate ratio.",
      nextStepHint: "For each reactant, solve the exponent that makes its concentration ratio predict the observed rate ratio; combine the exponents for the overall order.",
    },
    8: {
      solution: "Answer: A (zero order). The concentration falls by 0.040 M every 100 s: 0.20→0.16→0.12→0.08 M. A constant absolute concentration change per equal time interval gives a linear [XY]-versus-time relationship, characteristic of zero-order kinetics (rate = k).",
      conceptHint: "For zero-order kinetics, concentration decreases by the same absolute amount in equal time intervals.",
      strategyHint: "Compare the change in [XY] over each 100 s interval; a constant absolute decrease indicates a linear [XY]-versus-time plot.",
      nextStepHint: "Use the requested evidence—such as rate changes or a transformed concentration plot—rather than assuming the catalyst changes the reaction's equilibrium or overall stoichiometry.",
    },
    9: {
      solution: "Answer: C. The graph in the packet shows ln[X] versus time as a straight line. A linear ln[X]-versus-time plot is characteristic of first-order kinetics, so the corresponding rate law is rate = k[X].",
      conceptHint: "A rate law is supported by experimental relationships, not by balancing the overall reaction equation.",
      strategyHint: "Read how the plotted rate or transformed data changes as the relevant concentration changes, then compare that pattern with each candidate law.",
      nextStepHint: "Check which candidate predicts the observed proportionality across the full data set, not just one point.",
    },
    10: {
      solution: "Answer: A (first order, k = 0.012 s⁻¹). The ln[Q] values decrease by about 0.30 every 25 s, so ln[Q] versus time is approximately linear. For a first-order reaction, slope = −k; k ≈ 0.30/25 s = 0.012 s⁻¹.",
      conceptHint: "Concentration-time data can be tested against integrated rate-law relationships to identify reaction order.",
      strategyHint: "Compare [Q], ln[Q], and 1/[Q] against time, or inspect whether the data show a constant half-life.",
      nextStepHint: "Once the order is identified, use the matching integrated equation and keep the time unit consistent when reporting k.",
    },
  },
};

function topicOrder(topic: string): number {
  const [unit, number] = topic.split(".").map(Number);
  return unit * 100 + number;
}

function getTopicSlugs(topicRange: string): string[] {
  const [start, end] = topicRange.split("-");
  const min = topicOrder(start);
  const max = topicOrder(end);
  return Object.entries(TOPIC_SLUGS)
    .filter(([topic]) => topicOrder(topic) >= min && topicOrder(topic) <= max)
    .map(([, slug]) => slug);
}

// This index confirms packet title/range and printed question number only.
// It deliberately contains no copied question text or unverified answers.
export const PACKET_QUESTION_INDEX: PacketQuestionEntry[] = [
  ...PACKET_SOURCES.flatMap((source) =>
    Array.from(
      { length: source.lastQuestion - source.firstQuestion + 1 },
      (_, index): PacketQuestionEntry => {
        const questionNumber = String(source.firstQuestion + index);
        const mappedTopicNumber = QUESTION_TOPIC_OVERRIDES[source.packetId]?.[Number(questionNumber)];
        const mappedTopicSlug = mappedTopicNumber ? TOPIC_SLUGS[mappedTopicNumber] : undefined;
        const questionHints = QUESTION_HINTS[source.packetId]?.[Number(questionNumber)];
        return {
          id: `${source.packetId}-q${questionNumber}`,
          unitId: source.unitId,
          packetId: source.packetId,
          packetTitle: source.packetTitle,
          questionType: "mcq",
          questionNumber,
          topicRange: source.topicRange,
          ...(mappedTopicNumber ? { topicNumber: mappedTopicNumber } : {}),
          topicSlugs: mappedTopicSlug ? [mappedTopicSlug] : getTopicSlugs(source.topicRange),
          skills: [],
          ...(questionHints ?? {}),
          // "indexed" confirms the printed packet/question number exists, but the exact topic has not been verified.
          // Only assign "mapped" when a question-specific topic override has been reviewed.
          sourceStatus: mappedTopicNumber ? "mapped" : "indexed",
          reviewNote: mappedTopicNumber
            ? questionHints?.solution
              ? `Packet and question number indexed; mapped to topic ${mappedTopicNumber}; independently written explanation included and should be reviewed before publication.`
              : questionHints
                ? `Packet and question number indexed; mapped to topic ${mappedTopicNumber}; original staged hints included, but a worked explanation still needs review.`
                : `Packet and question number indexed; mapped to topic ${mappedTopicNumber}. Question-specific hints and explanation still need review.`
            : "Packet and printed question number indexed; exact subtopic mapping and question-specific help still need review.",
        };
      }
    )
  ),
  {
    id: "topics-8-6-8-11-mcq-unnumbered",
    unitId: 8,
    packetId: "topics-8-6-8-11-mcq",
    packetTitle: "Topics 8.6–8.11 MCQ Practice",
    questionType: "mcq",
    questionNumber: "Unnumbered",
    topicRange: "8.6-8.11",
    topicSlugs: getTopicSlugs("8.6-8.11"),
    skills: [],
    ...(QUESTION_HINTS["topics-8-6-8-11-mcq"]?.[1] ?? {}),
    sourceStatus: "indexed",
    reviewNote: "The source PDF begins with an unnumbered prompt before printed Question 2. This entry preserves that prompt without inventing a printed question number.",
  },
];

export interface PacketLookup {
  unitId: number;
  questionType: PacketQuestionType;
  questionNumber: string;
  packetId?: string;
  partLabel?: string;
}

export function findPacketQuestion(lookup: PacketLookup): PacketQuestionEntry | undefined {
  const number = lookup.questionNumber.trim().toLowerCase();
  const part = (lookup.partLabel ?? "").trim().toLowerCase();
  const matches = PACKET_QUESTION_INDEX.filter((entry) =>
    entry.sourceStatus !== "unmapped" &&
    entry.unitId === lookup.unitId &&
    entry.questionType === lookup.questionType &&
    entry.questionNumber.trim().toLowerCase() === number &&
    (entry.partLabel ?? "").trim().toLowerCase() === part &&
    (!lookup.packetId || entry.packetId === lookup.packetId)
  );

  // Never choose an arbitrary match when separate packets reuse a question number.
  return matches.length === 1 ? matches[0] : undefined;
}
