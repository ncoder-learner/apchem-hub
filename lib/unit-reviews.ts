export interface UnitReviewSection {
  title: string;
  summary: string;
  steps: string[];
}

export interface UnitReviewData {
  focus: string;
  examWeight: string;
  connect: string;
  strategies: UnitReviewSection[];
  traps: string[];
  frqChecklist: string[];
  readiness: string[];
}

export const UNIT_REVIEWS: Record<number, UnitReviewData> = {
  1: {
    focus: "Atomic structure, mass spectra, electron configurations, periodic trends, and electrostatic attraction.",
    examWeight: "7–9% of the multiple-choice section",
    connect: "Use particle counts and electron structure to explain measurable properties. Strong answers connect a trend to nuclear charge, shielding, distance, or the number and arrangement of electrons.",
    strategies: [
      { title: "Mass and particle conversions", summary: "Keep mass, moles, and number of entities distinct.", steps: ["Write the quantity and unit given.", "Choose a conversion factor that cancels the starting unit.", "Track the specified entity: atoms, molecules, ions, or formula units.", "Check significant figures and whether the magnitude is reasonable."] },
      { title: "Explain a periodic trend", summary: "State the comparison, then justify it with a physical cause.", steps: ["Identify the property being compared.", "Compare effective nuclear charge, shielding, and valence-electron distance as relevant.", "Explain how the net electrostatic attraction changes.", "Connect that change to the observed property rather than only naming the trend."] },
    ],
    traps: ["Treating a mole as a mass instead of a counting unit.", "Using the average atomic mass as though every atom has that exact mass.", "Explaining every periodic trend with only 'more protons' while ignoring shielding and distance.", "Confusing a photoelectron peak's height or area with its binding energy position."],
    frqChecklist: ["Show conversion factors and units so cancellations are visible.", "For trend explanations, name the relevant particles and the direction of the attraction change.", "Use spectral evidence from peak positions or relative peak sizes rather than describing a graph vaguely."],
    readiness: ["I can convert between particles, moles, and grams using dimensional analysis.", "I can interpret isotope data and calculate a weighted average.", "I can write electron configurations and relate them to PES evidence.", "I can justify periodic trends using electrostatic reasoning."],
  },
  2: {
    focus: "Chemical bonding, potential energy, ionic solids, Lewis structures, resonance, molecular geometry, and polarity.",
    examWeight: "7–9% of the multiple-choice section",
    connect: "Translate between representations: a Lewis structure shows connectivity and electron accounting; VSEPR predicts three-dimensional shape; bond polarity and molecular geometry together determine the net molecular dipole.",
    strategies: [
      { title: "Build and check a Lewis structure", summary: "Account for every valence electron before judging the structure.", steps: ["Count total valence electrons, adjusting for ionic charge.", "Choose a reasonable skeleton and connect atoms with single bonds.", "Complete terminal-atom octets, then place remaining electrons.", "Create multiple bonds if needed and check formal charges and the total electron count.", "For resonance, keep atom positions fixed and move electrons, not nuclei."] },
      { title: "Predict geometry and polarity", summary: "Separate electron geometry, molecular geometry, and molecular polarity.", steps: ["Draw or inspect the Lewis structure.", "Count electron domains around the central atom; a multiple bond is one domain.", "Determine electron geometry, then molecular geometry from atom positions.", "Evaluate bond dipoles as vectors; decide whether they cancel.", "State the evidence for polarity instead of relying on symmetry as a memorized shortcut."] },
      { title: "Keep hybridization and geometry requirements separate", summary: "Use the level of detail expected by the course without losing the underlying model.", steps: ["Be able to connect steric numbers 2, 3, and 4 with sp, sp², and sp³ hybridization.", "Be able to predict molecular shapes for steric numbers 5 and 6 from electron-domain geometry and lone-pair placement.", "Do not substitute a hybridization label for a geometry explanation; answer the specific question asked.", "Treat hybridization as a model for describing bonding, not as direct evidence that d orbitals participate in expanded-octet bonding."] },
    ],
    traps: ["Counting a double bond as two electron domains.", "Confusing electron geometry with molecular geometry.", "Assuming every molecule with polar bonds is polar.", "Moving atoms when drawing resonance structures.", "Treating the shape of a two-dimensional Lewis structure as the actual three-dimensional geometry."],
    frqChecklist: ["Show valence-electron accounting and formal charges when requested.", "Label the geometry clearly and distinguish lone pairs from bonded atoms.", "Explain polarity using bond dipoles and their vector sum.", "Use the potential-energy curve to identify favorable separation and explain bond length or strength from the model."],
    readiness: ["I can construct and evaluate Lewis structures.", "I can identify resonance and compare formal charges.", "I can predict VSEPR shapes from electron domains and lone pairs.", "I can justify molecular polarity using bond dipoles.", "I can interpret bonding and potential-energy diagrams."],
  },
  3: {
    focus: "Intermolecular forces, properties of solids and liquids, gases, solutions, concentration, and spectroscopy.",
    examWeight: "18–22% of the multiple-choice section",
    connect: "Observable properties follow from particle-level attractions and motion. Always identify the particles and interactions before predicting boiling point, vapor pressure, solubility, or gas behavior.",
    strategies: [
      { title: "Compare intermolecular forces", summary: "Use particle structure and the specific interactions available.", steps: ["Identify whether the particles are atoms, molecules, or ions.", "Check for London dispersion forces, permanent dipoles, and hydrogen bonding where applicable.", "Compare size, polarizability, shape, and interaction strength only after identifying the forces.", "Connect stronger attractions to the property asked about, such as higher boiling point or lower vapor pressure."] },
      { title: "Solve concentration and spectroscopy problems", summary: "Track the quantity that changes and the quantity measured.", steps: ["Write the relevant relationship and define each variable.", "Convert units before substituting values.", "Keep path length and concentration distinct in Beer–Lambert reasoning.", "Use the trend or slope of a graph to justify the conclusion."] },
    ],
    traps: ["Confusing intramolecular bonds with intermolecular attractions.", "Claiming hydrogen bonding occurs whenever hydrogen is present; check the atoms directly bonded to H.", "Assuming stronger intermolecular forces make vapor pressure higher.", "Treating gas particles as having zero volume or no attractions under all conditions.", "Mixing up absorbance, transmittance, and concentration."],
    frqChecklist: ["Name the particles and explain the attractions between them.", "Connect a macroscopic property to particle-level behavior.", "Show units in concentration calculations and interpret graph axes.", "State assumptions when applying an ideal-gas or solution model."],
    readiness: ["I can compare intermolecular forces and explain their effects on properties.", "I can interpret particle diagrams and phase changes.", "I can use gas-law relationships and identify ideal-model limitations.", "I can calculate solution concentration and interpret Beer–Lambert relationships."],
  },
  4: {
    focus: "Reaction equations, net ionic equations, physical and chemical changes, stoichiometry, titration, reaction classes, and redox.",
    examWeight: "7–9% of the multiple-choice section",
    connect: "Chemical equations conserve atoms and charge. Use the balanced equation to connect microscopic particle ratios to measurable amounts.",
    strategies: [
      { title: "Solve stoichiometry problems", summary: "A balanced equation is a mole-ratio map.", steps: ["Balance the chemical equation first.", "Convert the given quantity to moles.", "Use the coefficient ratio to find moles of the requested species.", "Convert to the requested unit and check whether a limiting reactant constrains the amount.", "For yield, distinguish theoretical yield from actual yield."] },
      { title: "Write a net ionic equation", summary: "Show only species that participate in the chemical change.", steps: ["Write the balanced molecular equation with appropriate states.", "Separate strong aqueous electrolytes into ions.", "Keep solids, liquids, gases, and weak electrolytes intact.", "Cancel spectator ions and verify both atoms and total charge."] },
    ],
    traps: ["Using mass ratios directly instead of converting to moles.", "Choosing a limiting reactant by comparing starting masses alone.", "Splitting solids, liquids, gases, or weak acids into ions.", "Forgetting to conserve charge in net ionic equations or redox bookkeeping.", "Confusing a coefficient with a subscript."],
    frqChecklist: ["Show the balanced equation and mole-ratio setup.", "Identify the limiting reactant by comparing possible product amounts.", "Include units, appropriate significant figures, and a clear final quantity.", "For net ionic equations, verify atoms and charge on both sides."],
    readiness: ["I can balance equations and distinguish molecular, ionic, and net ionic forms.", "I can solve limiting-reactant and percent-yield problems.", "I can use reaction stoichiometry in titration calculations.", "I can classify reactions and identify oxidation, reduction, and redox agents."],
  },
  5: {
    focus: "Reaction rates, rate laws, integrated rate laws, collision theory, mechanisms, energy profiles, and catalysis.",
    examWeight: "7–9% of the multiple-choice section",
    connect: "Kinetics links measured concentration changes to particle collisions and reaction pathways. Distinguish what data show directly from what a model proposes about the mechanism.",
    strategies: [
      { title: "Read a concentration–time graph", summary: "Rate comes from slope, not the height of the curve.", steps: ["Read the axes and units first.", "Use Δconcentration/Δtime for an average rate.", "Use the tangent slope for an instantaneous rate when asked.", "Apply the negative sign for a reactant's rate of disappearance.", "Use stoichiometric coefficients when relating rates of different species."] },
      { title: "Determine a rate law", summary: "Use experiments that isolate a concentration change.", steps: ["Compare trials where only one reactant concentration changes.", "Calculate the rate factor and concentration factor.", "Infer the order for that reactant from the factors.", "Repeat for each reactant and calculate k with units appropriate to the total order.", "Check that the proposed law is consistent with all data."] },
    ],
    traps: ["Confusing concentration with rate or graph height with slope.", "Assuming reaction orders equal balanced-equation coefficients.", "Applying integrated-rate equations without checking which order the data support.", "Treating a catalyst as changing the overall ΔG or equilibrium constant.", "Assuming a plausible mechanism is proven by a rate law alone."],
    frqChecklist: ["Show the rate calculation and include units.", "Support rate-law orders with comparisons between experimental trials.", "For energy diagrams, identify reactants, products, activation energy, and any intermediates.", "Explain how a catalyst changes the pathway and activation barrier without changing the net reaction."],
    readiness: ["I can calculate average and instantaneous rates from data or graphs.", "I can determine rate-law orders and the rate constant from experiments.", "I can use integrated-rate and half-life relationships where applicable.", "I can interpret energy profiles and evaluate proposed mechanisms.", "I can explain collision theory and catalysis at the particle level."],
  },
  6: {
    focus: "Endothermic and exothermic processes, calorimetry, enthalpy, entropy, and Gibbs free energy.",
    examWeight: "7–9% of the multiple-choice section",
    connect: "Thermodynamic conclusions depend on the system, surroundings, and conditions. Keep heat flow, enthalpy, entropy, and free energy conceptually distinct.",
    strategies: [
      { title: "Solve calorimetry problems", summary: "Track which object gains heat and which loses it.", steps: ["Identify the system and surroundings.", "Use q = mcΔT for a solution or material when appropriate.", "Apply energy conservation so heat gained and lost balance for an isolated calorimetry setup.", "Convert between heat and molar enthalpy only after finding the amount reacted.", "Check the sign against whether the reaction is exothermic or endothermic."] },
      { title: "Evaluate spontaneity", summary: "Use the Gibbs relationship at the stated temperature.", steps: ["Identify the signs of ΔH and ΔS.", "Use ΔG = ΔH − TΔS with consistent units.", "Determine the sign of ΔG at the specified temperature.", "If the sign can change with temperature, solve for the threshold only after setting ΔG = 0.", "Do not equate spontaneity with speed."] },
    ],
    traps: ["Calling an endothermic process nonspontaneous by definition.", "Mixing joules and kilojoules in ΔG calculations.", "Using Celsius instead of kelvin in thermodynamic equations.", "Assuming a spontaneous reaction must be fast.", "Confusing system heat with surroundings heat."],
    frqChecklist: ["Define the system and show the energy relationship used.", "Keep temperature in kelvin for thermodynamic calculations.", "Show consistent energy units and the sign of each thermodynamic quantity.", "Explain spontaneity using ΔG under the stated conditions, not reaction speed."],
    readiness: ["I can interpret exothermic and endothermic energy diagrams.", "I can calculate heat transfer with calorimetry.", "I can reason about entropy changes using particle arrangements and energy dispersal.", "I can calculate ΔG and explain temperature dependence."],
  },
  7: {
    focus: "Dynamic equilibrium, equilibrium constants, reaction quotients, ICE tables, and responses to disturbances.",
    examWeight: "7–9% of the multiple-choice section",
    connect: "At equilibrium, forward and reverse rates are equal; concentrations are constant but are not necessarily equal. Compare Q with K to predict the direction of net change.",
    strategies: [
      { title: "Write an equilibrium expression", summary: "Use the balanced equation and omit pure solids and liquids.", steps: ["Balance the reaction.", "Write product activities over reactant activities, each raised to its coefficient.", "Omit pure solids and pure liquids from K.", "Substitute equilibrium values, not initial values.", "Check whether the question asks for Kc, Kp, or a direction-of-shift prediction."] },
      { title: "Use Q to predict direction", summary: "Q and K have the same form but use different concentrations or pressures.", steps: ["Calculate Q using the current mixture.", "Compare Q with K.", "If Q < K, net reaction proceeds toward products; if Q > K, toward reactants.", "If Q = K, the system is at equilibrium.", "Use stoichiometry and an ICE table to calculate new equilibrium amounts when needed."] },
    ],
    traps: ["Assuming equilibrium means equal reactant and product concentrations.", "Including pure solids or liquids in the equilibrium expression.", "Changing K when concentration or pressure changes at constant temperature.", "Using the wrong exponent from the balanced equation.", "Predicting shift direction from Le Châtelier's principle without first identifying the actual disturbance."],
    frqChecklist: ["Write the balanced equation and equilibrium expression.", "Show the ICE setup and justify any approximation.", "Use Q versus K when predicting reaction direction.", "State what changes and what remains fixed, especially temperature and K."],
    readiness: ["I can explain dynamic equilibrium in terms of equal forward and reverse rates.", "I can write K expressions and calculate K from equilibrium data.", "I can use Q to predict direction.", "I can solve equilibrium concentration problems and explain disturbances."],
  },
  8: {
    focus: "Acid–base models, pH, Ka and Kb, conjugate pairs, buffers, titrations, and acid–base equilibria.",
    examWeight: "11–15% of the multiple-choice section",
    connect: "Acid–base calculations are equilibrium calculations. Identify the reaction and the dominant species before choosing an equation; a memorized formula cannot replace species reasoning.",
    strategies: [
      { title: "Choose a pH calculation method", summary: "Classify the solution before calculating.", steps: ["Identify whether the solute is a strong acid/base, weak acid/base, buffer, or mixture after neutralization.", "Write the relevant reaction and determine the major species.", "Use stoichiometry first when strong acid and base react.", "Use equilibrium relationships for weak acids and bases when needed.", "Convert concentration to pH or pOH and check that the result fits the solution."] },
      { title: "Interpret a titration curve", summary: "Use the reaction stoichiometry and equilibrium region.", steps: ["Identify the titrant and analyte and write their reaction.", "Locate the equivalence point from stoichiometry.", "Determine which species dominate before, at, and after equivalence.", "At a half-equivalence point for a weak acid titrated with strong base, use pH = pKa under the appropriate conditions.", "Use the curve's shape and buffer region as evidence, not just the starting pH."] },
    ],
    traps: ["Treating a weak acid as fully dissociated.", "Using an equilibrium approximation without checking its validity.", "Assuming the equivalence-point pH is always 7.", "Using Henderson–Hasselbalch before accounting for a strong neutralization reaction.", "Confusing Ka with acid concentration or pKa with pH."],
    frqChecklist: ["Write the acid–base reaction and identify conjugate pairs.", "Use stoichiometry before equilibrium when a strong acid/base reacts.", "Show the equilibrium expression and assumptions for weak-acid/base calculations.", "Label titration axes and identify equivalence or buffer regions when interpreting a curve."],
    readiness: ["I can identify acids, bases, and conjugate pairs.", "I can calculate pH for strong and weak acids or bases.", "I can reason about buffers and titration curves.", "I can relate Ka, Kb, pKa, and conjugate-acid/base strength."],
  },
  9: {
    focus: "Entropy and free-energy applications, electrochemical cells, cell potentials, and the relationship between redox and thermodynamics.",
    examWeight: "7–9% of the multiple-choice section",
    connect: "Redox reactions transfer electrons; electrochemical cells use that transfer to produce or consume electrical energy. Cell notation, electron flow, signs, and thermodynamic relationships must be mutually consistent.",
    strategies: [
      { title: "Analyze a galvanic cell", summary: "Oxidation occurs at the anode and reduction at the cathode.", steps: ["Separate the overall redox reaction into oxidation and reduction half-reactions.", "Balance atoms and charge, including electrons.", "Identify the anode as the oxidation site and the cathode as the reduction site.", "Electrons flow through the external circuit from anode to cathode.", "Use reduction potentials consistently to calculate E°cell = E°cathode − E°anode."] },
      { title: "Connect cell potential to thermodynamics", summary: "The sign of cell potential relates to the sign of free-energy change under stated conditions.", steps: ["Use ΔG° = −nFE°cell with consistent units.", "Check that a positive E°cell corresponds to negative ΔG° for the reaction as written.", "Use the Nernst equation only when nonstandard conditions are specified and the required quantities are known.", "Do not multiply electrode potentials by coefficients when balancing half-reactions."] },
    ],
    traps: ["Reversing anode and cathode labels between galvanic and electrolytic contexts without checking the reaction.", "Multiplying standard reduction potentials by stoichiometric coefficients.", "Using the wrong sign when subtracting the anode reduction potential.", "Confusing electron flow with conventional current.", "Claiming spontaneity guarantees a rapid reaction."],
    frqChecklist: ["Show balanced half-reactions and electron accounting.", "Label anode, cathode, electron flow, and ion migration where relevant.", "Show the cell-potential equation and signs.", "Connect E°cell and ΔG° using the reaction as written and consistent units."],
    readiness: ["I can balance redox half-reactions.", "I can identify anode, cathode, and electron flow.", "I can calculate standard cell potential from reduction potentials.", "I can connect cell potential, free energy, and spontaneity.", "I can explain what changes under nonstandard conditions."],
  },
};
