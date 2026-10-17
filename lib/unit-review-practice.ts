export interface ReviewPracticeQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skill: string;
}

export interface UnitReviewPractice {
  mentalModels: { title: string; idea: string; useWhen: string }[];
  questions: ReviewPracticeQuestion[];
  frqFocus: string[];
}

export const UNIT_REVIEW_PRACTICE: Record<number, UnitReviewPractice> = {
  1: {
    mentalModels: [
      { title: "Mass spectrum", idea: "Peak position identifies isotope mass; peak size represents relative abundance.", useWhen: "A prompt gives isotope peaks or asks for average atomic mass." },
      { title: "Electron removal", idea: "Electrons farther from the nucleus and more shielded are generally easier to remove.", useWhen: "Comparing ionization energies or photoelectron spectra." },
      { title: "Periodic trends", idea: "Compare effective nuclear charge, shielding, and valence-electron distance together.", useWhen: "Explaining radius, ionization energy, or attraction for electrons." },
    ],
    questions: [
      { prompt: "An element has isotopes of masses 10 and 11. The mass-10 isotope is more abundant. Which value must be true of the element's average atomic mass?", options: ["Exactly 10","Between 10 and 10.5","Between 10.5 and 11","Exactly 11"], correctIndex: 1, explanation: "A weighted average lies closer to the more abundant isotope. Because mass 10 is more abundant, the average is between 10 and the midpoint 10.5.", skill: "Weighted averages" },
      { prompt: "Which change best explains why atomic radius generally decreases across a period?", options: ["Valence electrons occupy a new principal energy level","Nuclear charge increases while shielding changes less dramatically","The number of neutrons decreases in every atom","The atoms lose valence electrons"], correctIndex: 1, explanation: "Across a period, increasing proton number raises effective nuclear attraction while added electrons enter the same main energy level, so the electron cloud contracts.", skill: "Periodic trends" },
      { prompt: "Two PES peaks are at different binding energies. What does the horizontal position directly indicate?", options: ["The number of atoms in the sample","The electron's binding energy","The sample's molar mass","The number of neutrons"], correctIndex: 1, explanation: "PES peak position corresponds to electron binding energy; peak area or intensity is related to how many electrons occupy that subshell.", skill: "Spectral interpretation" },
    ],
    frqFocus: ["Use peak position and relative peak area as separate pieces of evidence.", "Show mole conversions with units and explain why the weighted average shifts toward the more abundant isotope."],
  },
  2: {
    mentalModels: [
      { title: "Lewis first", idea: "Electron counting and connectivity come before shape or polarity.", useWhen: "A structure, formal charge, resonance, or hybridization is requested." },
      { title: "Shape is 3-D", idea: "Count electron domains, then distinguish electron geometry from molecular geometry.", useWhen: "Comparing bond angles, shape, or lone-pair effects." },
      { title: "Polarity is a vector sum", idea: "Polar bonds do not guarantee a polar molecule; geometry decides whether dipoles cancel.", useWhen: "Comparing molecular dipoles or intermolecular attractions." },
    ],
    questions: [
      { prompt: "A molecule has three identical polar bonds arranged symmetrically in a trigonal-planar shape. What is the best prediction for its net dipole?", options: ["It must be large because all bonds are polar","The bond dipoles cancel, giving no net dipole","It points toward the central atom","It depends only on molar mass"], correctIndex: 1, explanation: "Three equivalent bond-dipole vectors separated symmetrically in a trigonal-planar arrangement cancel.", skill: "Molecular polarity" },
      { prompt: "Which change represents resonance?", options: ["Atoms move to new positions while bonds stay fixed","Electrons move while the atom connectivity stays the same","A molecule changes its total number of electrons","A molecule rotates in space"], correctIndex: 1, explanation: "Resonance contributors preserve atom positions and connectivity while changing electron placement, such as the location of a multiple bond or lone pair.", skill: "Resonance" },
      { prompt: "A central atom has four electron domains, including one lone pair. Which molecular geometry is expected?", options: ["Tetrahedral","Trigonal pyramidal","Trigonal planar","Linear"], correctIndex: 1, explanation: "Four domains give tetrahedral electron geometry. With one domain occupied by a lone pair, the three bonded atoms form a trigonal-pyramidal molecular shape.", skill: "VSEPR" },
    ],
    frqFocus: ["Show electron accounting or formal-charge calculations when they support the claim.", "Justify polarity from bond dipoles and 3-D geometry, not from bond polarity alone."],
  },
  3: {
    mentalModels: [
      { title: "Attractions control properties", idea: "Stronger intermolecular attractions usually mean higher boiling point and lower vapor pressure.", useWhen: "Comparing phase-change temperatures or volatility." },
      { title: "Gas model", idea: "Pressure, volume, temperature, and amount are linked; temperature in gas equations is kelvin.", useWhen: "Calculating gas properties or evaluating nonideal behavior." },
      { title: "Absorbance", idea: "At fixed path length and absorptivity, absorbance is proportional to concentration.", useWhen: "Reading calibration graphs or Beer–Lambert problems." },
    ],
    questions: [
      { prompt: "Two liquids have similar molar masses, but liquid X has stronger intermolecular attractions. Which is most likely?", options: ["X has a higher vapor pressure","X has a lower boiling point","X has a lower vapor pressure","X evaporates faster at the same temperature"], correctIndex: 2, explanation: "Stronger attractions make it harder for particles to escape into the gas phase, lowering vapor pressure and generally raising boiling point.", skill: "Intermolecular forces" },
      { prompt: "A gas is heated at constant pressure while the amount of gas stays constant. What happens to its volume in the ideal-gas model?", options: ["It decreases in proportion to kelvin temperature","It increases in proportion to kelvin temperature","It stays constant","It becomes independent of temperature"], correctIndex: 1, explanation: "At constant pressure and amount, V/T is constant when T is measured in kelvin (Charles's law).", skill: "Gas laws" },
      { prompt: "A calibration line for absorbance versus concentration passes through the origin. If concentration doubles and other conditions stay fixed, what happens to absorbance?", options: ["It halves","It doubles","It quadruples","It stays the same"], correctIndex: 1, explanation: "The Beer–Lambert relationship is linear in concentration when path length and molar absorptivity remain constant.", skill: "Spectroscopy" },
    ],
    frqFocus: ["Explain macroscopic properties using particle-level attractions or motion.", "Label axes and use the slope or proportionality of a graph as evidence."],
  },
  4: {
    mentalModels: [
      { title: "Equations conserve", idea: "Atoms and net charge must balance; coefficients describe mole ratios.", useWhen: "Balancing, writing net ionic equations, or doing stoichiometry." },
      { title: "Moles connect scales", idea: "Convert to moles before using the balanced equation's coefficients.", useWhen: "Mass, yield, titration, or limiting-reactant calculations." },
      { title: "Net ionic filter", idea: "Remove spectator ions but keep solids, liquids, gases, and weak electrolytes intact.", useWhen: "Writing a net ionic equation." },
    ],
    questions: [
      { prompt: "A reaction uses 2 mol A for every 3 mol B. Starting with 4 mol A and 3 mol B, which reactant is limiting?", options: ["A, because it has fewer moles","B, because 3 mol B requires 2 mol A and only 2 mol A are needed","A, because 4 is greater than 3","Neither; the amounts are exactly stoichiometric"], correctIndex: 1, explanation: "The ratio requires 2 mol A per 3 mol B. Three moles B need only 2 mol A, while 4 mol A are available, so B is limiting.", skill: "Limiting reactants" },
      { prompt: "Which species should remain intact when writing a net ionic equation?", options: ["A soluble strong electrolyte","A spectator ion","A pure solid product","A soluble salt that fully dissociates"], correctIndex: 2, explanation: "Pure solids are not split into aqueous ions. Spectator ions are canceled, and soluble strong electrolytes are written as ions.", skill: "Net ionic equations" },
      { prompt: "A student obtains 8.0 g product when the theoretical yield is 10.0 g. What is the percent yield?", options: ["20%","80%","100%","125%"], correctIndex: 1, explanation: "Percent yield = actual/theoretical × 100 = 8.0/10.0 × 100 = 80%.", skill: "Yield calculations" },
    ],
    frqFocus: ["Show the balanced reaction, mole-ratio step, units, and final quantity.", "For net ionic equations, verify both atom balance and total charge."],
  },
  5: {
    mentalModels: [
      { title: "Rate is a slope", idea: "Concentration is the graph's height; reaction rate comes from the slope.", useWhen: "Interpreting concentration-versus-time data." },
      { title: "Order comes from data", idea: "Change one concentration at a time and compare rate factors.", useWhen: "Finding a rate law from experiments." },
      { title: "Mechanism is a model", idea: "A valid mechanism must add to the net reaction and agree with kinetic evidence.", useWhen: "Evaluating elementary steps, intermediates, or catalysts." },
    ],
    questions: [
      { prompt: "Doubling [A] quadruples the rate while [B] stays constant. What is the order in A?", options: ["Zero","First","Second","Fourth"], correctIndex: 2, explanation: "For rate ∝ [A]^m, doubling [A] multiplies rate by 2^m. Since the factor is 4, m = 2.", skill: "Rate laws" },
      { prompt: "Which plot is linear for a first-order reaction?", options: ["[A] versus time","ln[A] versus time","1/[A] versus time","Rate versus product mass"], correctIndex: 1, explanation: "The first-order integrated law is ln[A] = ln[A]₀ − kt, a line with slope −k.", skill: "Integrated rate laws" },
      { prompt: "What does a catalyst change in a reaction pathway?", options: ["The overall balanced equation","The equilibrium constant at fixed temperature","The activation barrier through an alternative pathway","The standard enthalpy of the net reaction"], correctIndex: 2, explanation: "A catalyst supplies an alternative pathway with a lower activation barrier. It does not change the net reaction or equilibrium constant at fixed temperature.", skill: "Catalysis" },
    ],
    frqFocus: ["Use experimental comparisons to justify each reaction order.", "On an energy profile, label activation energy and ΔH separately and explain the catalyst's role."],
  },
  6: {
    mentalModels: [
      { title: "Heat is transferred energy", idea: "q describes energy transfer; ΔH describes enthalpy change for a process at constant pressure.", useWhen: "Choosing signs or interpreting calorimetry." },
      { title: "Hess's law is bookkeeping", idea: "Reverse an equation → reverse ΔH; multiply an equation → multiply ΔH.", useWhen: "Combining reactions or using formation enthalpies." },
      { title: "Enthalpy is a state function", idea: "Reverse a reaction → reverse ΔH; scale it → scale ΔH; add equations → add their ΔH values.", useWhen: "Combining thermochemical equations or checking a Hess’s-law result." },
    ],
    questions: [
      { prompt: "A reaction warms the surrounding solution in a coffee-cup calorimeter. What is the sign of the reaction's heat at constant pressure?", options: ["Positive; the reaction absorbs heat","Negative; the reaction releases heat","Zero; the solution temperature changed","It cannot be determined without the reaction rate"], correctIndex: 1, explanation: "The solution gains heat, so the reacting system loses heat. The reaction is exothermic and qₚ (approximately ΔH for this setup) is negative.", skill: "Calorimetry signs" },
      { prompt: "Given A → B with ΔH = +25 kJ and B → C with ΔH = −70 kJ, what is ΔH for A → C?", options: ["+95 kJ","+45 kJ","−45 kJ","−95 kJ"], correctIndex: 2, explanation: "Add the two equations; B cancels. Hess’s law gives ΔH = +25 + (−70) = −45 kJ for A → C.", skill: "Hess’s law" },
      { prompt: "A thermochemical equation is reversed. What happens to its ΔH value?", options: ["Its sign reverses","Its magnitude doubles","It becomes zero","It remains unchanged"], correctIndex: 0, explanation: "Enthalpy is a state function. Reversing the process reverses the sign of ΔH; scaling the equation scales ΔH by the same factor.", skill: "Hess's law" },
    ],
    frqFocus: ["Show q = mcΔT or q = nΔH_phase, identify the system, and explain the sign of heat transfer.", "For Hess’s law, show every equation transformation, cancel intermediate species, and sum the adjusted ΔH values."],
  },
  7: {
    mentalModels: [
      { title: "Equilibrium is dynamic", idea: "Forward and reverse rates are equal; concentrations stay constant but need not be equal.", useWhen: "Explaining equilibrium at the particle level." },
      { title: "Q is the current snapshot", idea: "Compare Q with K to predict the direction of net reaction.", useWhen: "Predicting shifts after mixing or a disturbance." },
      { title: "Only temperature changes K", idea: "Concentration or pressure changes can change Q and composition without changing K at fixed temperature.", useWhen: "Le Châtelier questions." },
    ],
    questions: [
      { prompt: "For a reaction at a fixed temperature, Q < K. Which direction will the system shift to reach equilibrium?", options: ["Toward reactants","Toward products","No net change is possible","K must decrease first"], correctIndex: 1, explanation: "Q < K means the current product-to-reactant ratio is too small compared with equilibrium, so net reaction proceeds toward products.", skill: "Reaction quotient" },
      { prompt: "Which species is omitted from a Kc expression?", options: ["Aqueous ion","Gas","Aqueous molecule","Pure liquid water"], correctIndex: 3, explanation: "Pure solids and pure liquids have constant activity and are omitted from the equilibrium expression.", skill: "Equilibrium expressions" },
      { prompt: "At equilibrium, which statement is always true?", options: ["Reactant and product concentrations are equal","Forward and reverse reaction rates are equal","All reactions have stopped","K equals 1"], correctIndex: 1, explanation: "Equilibrium is dynamic: both directions continue at equal rates. Concentrations need not be equal and K need not equal 1.", skill: "Dynamic equilibrium" },
    ],
    frqFocus: ["Write the correct K expression from the balanced equation and omit pure solids/liquids.", "Use Q versus K to justify direction and show the ICE setup for equilibrium amounts."],
  },
  8: {
    mentalModels: [
      { title: "Stoichiometry before equilibrium", idea: "When strong acid and base react, account for neutralization before calculating pH.", useWhen: "Mixtures, buffers, and titration problems." },
      { title: "Weak means equilibrium", idea: "A weak acid or base partially reacts; use Ka or Kb rather than assuming complete dissociation.", useWhen: "Calculating pH or percent ionization." },
      { title: "Titration is a changing mixture", idea: "The dominant species changes across initial, buffer, equivalence, and excess-titrant regions.", useWhen: "Interpreting a titration curve." },
    ],
    questions: [
      { prompt: "A weak acid HA is dissolved in water. Which expression defines Ka?", options: ["[HA]/([H₃O⁺][A⁻])","[H₃O⁺][A⁻]/[HA]","[H₃O⁺]/[HA] only","[A⁻]/[H₂O]"], correctIndex: 1, explanation: "For HA + H₂O ⇌ H₃O⁺ + A⁻, liquid water is omitted, so Ka = [H₃O⁺][A⁻]/[HA].", skill: "Acid equilibrium" },
      { prompt: "At the half-equivalence point when a weak acid is titrated with strong base, which relationship applies?", options: ["pH = 7 for every weak acid","[HA] = 0","pH = pKa","Ka = 1"], correctIndex: 2, explanation: "At half-equivalence, the concentrations of HA and A⁻ are equal, so Henderson–Hasselbalch gives pH = pKa under the standard assumptions.", skill: "Titration curves" },
      { prompt: "A solution contains equal concentrations of a weak acid and its conjugate base. What makes it a buffer?", options: ["It contains no ions","The conjugate pair can consume added base or acid","Its pH cannot ever change","It is always neutral"], correctIndex: 1, explanation: "A weak acid reacts with added base, and its conjugate base reacts with added acid, limiting pH change. A buffer resists changes but is not unchangeable.", skill: "Buffers" },
    ],
    frqFocus: ["Identify dominant species before selecting a pH equation.", "Show the neutralization stoichiometry before the equilibrium calculation and justify any approximation."],
  },
  9: {
    mentalModels: [
      { title: "Cell labels follow the reaction", idea: "Oxidation is at the anode, reduction at the cathode; electrons travel anode to cathode.", useWhen: "Drawing a cell or reading cell notation." },
      { title: "Potential is not scaled", idea: "Reverse a half-reaction → reverse E° sign; do not multiply E° by coefficients.", useWhen: "Calculating standard cell potential." },
      { title: "Thermodynamics links redox", idea: "ΔG° = −nFE°cell connects cell potential and free-energy change for the reaction as written.", useWhen: "Predicting spontaneity or relating K and E°." },
    ],
    questions: [
      { prompt: "In a galvanic cell, where does oxidation occur?", options: ["At the cathode","At the anode","At the salt bridge only","At both electrodes equally"], correctIndex: 1, explanation: "Oxidation occurs at the anode and reduction at the cathode. In a galvanic cell, electrons flow through the external circuit from anode to cathode.", skill: "Electrochemical cells" },
      { prompt: "A balanced redox equation requires multiplying one half-reaction by 3. How should its standard reduction potential be treated?", options: ["Multiply the potential by 3","Divide the potential by 3","Keep the potential unchanged","Set the potential to zero"], correctIndex: 2, explanation: "Electrode potential is an intensive property, so multiplying a half-reaction scales its electrons and ΔG but does not scale E°.", skill: "Cell potential" },
      { prompt: "A galvanic cell has E°cell > 0 for the reaction as written. What sign does ΔG° have?", options: ["Positive","Negative","Zero","It depends only on reaction speed"], correctIndex: 1, explanation: "ΔG° = −nFE°cell. With n and F positive, a positive standard cell potential corresponds to negative standard free-energy change.", skill: "Thermodynamics and redox" },
    ],
    frqFocus: ["Balance electrons and charge in half-reactions, and label electron flow and electrode roles.", "Use ΔG° = −nFE°cell with the reaction as written and consistent units."],
  },
};
