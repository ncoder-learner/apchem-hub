export interface ReviewPracticeQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  skill: string;
}

export interface ReviewFRQPart {
  label: string;
  prompt: string;
  scoringGuidance: string[];
}

export interface ReviewFRQ {
  title: string;
  stimulus: string;
  parts: ReviewFRQPart[];
}

export interface UnitReviewPractice {
  mentalModels: { title: string; idea: string; useWhen: string }[];
  questions: ReviewPracticeQuestion[];
  frqFocus: string[];
  frqs?: ReviewFRQ[];
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
      { title: "Rate is a derivative", idea: "Concentration is graph height; the slope is rate, and stoichiometric coefficients relate species rates.", useWhen: "Reading curved concentration-time graphs or comparing formation and disappearance." },
      { title: "Rate laws are evidence-based", idea: "Experimental comparisons establish reaction orders; overall balanced coefficients do not, unless a step is elementary.", useWhen: "Determining exponents, k, or whether a mechanism is plausible." },
      { title: "A mechanism must pass two tests", idea: "Elementary steps must sum to the net equation and produce a rate law consistent with measured kinetics.", useWhen: "Evaluating intermediates, catalysts, slow steps, or energy profiles." },
    ],
    questions: [
      { prompt: "For 2A → B, [A] decreases from 0.84 M to 0.60 M in 12.0 s. What is the average rate of formation of B?", options: ["0.010 M·s⁻¹","0.020 M·s⁻¹","0.040 M·s⁻¹","0.080 M·s⁻¹"], correctIndex: 1, explanation: "A disappears at −Δ[A]/Δt = −(0.60−0.84)/12.0 = 0.020 M·s⁻¹. Two A are consumed per B formed, so B forms at half that rate: 0.010 M·s⁻¹.", skill: "Stoichiometric rates" },
      { prompt: "At fixed [B], doubling [A] multiplies rate by 4. At fixed [A], tripling [B] multiplies rate by 3. Which rate law and overall order fit?", options: ["k[A][B], second order","k[A]²[B], third order","k[A]²[B]³, fifth order","k[A][B]², third order"], correctIndex: 1, explanation: "The factors give 2^m = 4, so m = 2; 3^n = 3, so n = 1. Overall order is m+n = 3.", skill: "Experimental rate laws" },
      { prompt: "For rate = k[A]²[B], rate is in M·s⁻¹. What are the units of k?", options: ["s⁻¹","M⁻¹·s⁻¹","M⁻²·s⁻¹","M²·s⁻¹"], correctIndex: 2, explanation: "The concentration term has units M³. Thus k = (M·s⁻¹)/M³ = M⁻²·s⁻¹.", skill: "Rate-constant units" },
      { prompt: "A first-order reaction has k = 0.0462 min⁻¹. What fraction of reactant remains after 30.0 min?", options: ["0.250","0.500","0.750","0.063"], correctIndex: 0, explanation: "For first order, [A]t/[A]0 = e^(−kt) = e^(−0.0462×30.0) ≈ e^(−1.386) = 0.250.", skill: "Integrated rate laws" },
      { prompt: "Which experimental result most strongly supports second-order kinetics in A?", options: ["[A] versus time is linear","ln[A] versus time is linear","1/[A] versus time is linear with positive slope","The half-life is independent of [A]₀"], correctIndex: 2, explanation: "For a second-order reaction in one reactant, 1/[A] = kt + 1/[A]₀, a line with slope +k. A constant half-life instead supports first order.", skill: "Graph linearization" },
      { prompt: "For an elementary step 2NO(g) + O₂(g) → 2NO₂(g), which rate law follows for that step?", options: ["k[NO][O₂]","k[NO]²[O₂]","k[NO₂]²","k[NO]²/[O₂]"], correctIndex: 1, explanation: "Because the reaction is explicitly an elementary step, its reactant molecularities give rate = k[NO]²[O₂]. This inference would not be justified from an overall equation alone.", skill: "Elementary reactions" },
      { prompt: "A proposed mechanism's steps add to the correct net equation, but its predicted rate law conflicts with experiments. What is the best conclusion?", options: ["The mechanism is proven because atoms balance","The mechanism is inconsistent with the kinetic evidence","The measured rate law must be ignored","Any catalyst makes the mechanism valid"], correctIndex: 1, explanation: "A plausible mechanism must satisfy both stoichiometric cancellation and experimental kinetics. Matching only the net equation is insufficient.", skill: "Mechanism evaluation" },
      { prompt: "A reaction has reactants at 25 kJ·mol⁻¹, a transition state at 90 kJ·mol⁻¹, and products at 5 kJ·mol⁻¹. What are forward Ea and ΔH?", options: ["Ea = 85; ΔH = −20 kJ·mol⁻¹","Ea = 65; ΔH = −20 kJ·mol⁻¹","Ea = 65; ΔH = +20 kJ·mol⁻¹","Ea = 90; ΔH = −85 kJ·mol⁻¹"], correctIndex: 1, explanation: "Ea,fwd = 90−25 = 65 kJ·mol⁻¹. ΔH = Hproducts−Hreactants = 5−25 = −20 kJ·mol⁻¹.", skill: "Energy profiles" },
      { prompt: "A catalyst is added to a reversible reaction at constant temperature. Which changes are expected?", options: ["Forward rate rises but reverse rate does not","K increases because products form faster","Both directions are accelerated and K stays constant","ΔH becomes more negative"], correctIndex: 2, explanation: "A catalyst offers a lower-barrier pathway for both directions. It speeds the approach to equilibrium without changing ΔH or K.", skill: "Catalysis" },
      { prompt: "A reactant's concentration-time curve is steep at t = 5 s and nearly flat at t = 40 s. Which conclusion is best supported?", options: ["The concentration is greatest at 40 s","The instantaneous disappearance rate is smaller at 40 s","The reaction has reversed at 40 s","The rate constant must be zero at 40 s"], correctIndex: 1, explanation: "The magnitude of the tangent slope is the instantaneous rate. A flatter curve indicates a smaller rate magnitude; the height is concentration, not rate.", skill: "Graph interpretation" },
      { prompt: "When [A] is doubled, the rate is unchanged. When [B] is doubled, the rate quadruples. Which is the rate law?", options: ["k[A]²[B]","k[B]²","k[A][B]²","k[A]⁰[B]⁰"], correctIndex: 1, explanation: "No rate change on doubling A means zero order in A. A fourfold rate increase on doubling B means second order in B, so rate = k[B]².", skill: "Zero-order behavior" },
      { prompt: "For a first-order reaction, a linear ln[A] versus time plot has slope −0.018 s⁻¹. What is the half-life?", options: ["0.018 s","18 s","38.5 s","55.6 s"], correctIndex: 2, explanation: "For first order, t₁/₂ = 0.693/k = 0.693/0.018 = 38.5 s.", skill: "Half-life" },
      { prompt: "Which statement distinguishes a steady-state intermediate from a species at equilibrium?", options: ["Its concentration must be zero","Its formation rate approximately equals its total consumption rate; elementary steps need not be at equilibrium","It is never consumed","It changes the net reaction equation"], correctIndex: 1, explanation: "Steady state means d[I]/dt ≈ 0 because formation and total consumption balance. It does not require forward and reverse rates of each step to be equal.", skill: "Steady-state approximation" },
      { prompt: "A rate law is rate = k[A]⁰[B]. If [A] increases fivefold and [B] is unchanged, what happens to rate?", options: ["It increases fivefold","It increases twenty-fivefold","It remains unchanged","It decreases fivefold"], correctIndex: 2, explanation: "The exponent on A is zero, so [A]⁰ = 1. Changing [A] has no effect on rate under this rate law.", skill: "Reaction order" },
      { prompt: "Which change increases reaction rate by increasing the fraction of particles with energy at least Ea?", options: ["Adding more solid surface at fixed temperature","Increasing temperature","Diluting a solution","Adding an inert gas at constant volume without changing partial pressures"], correctIndex: 1, explanation: "Increasing temperature changes the molecular energy distribution so a larger fraction exceeds the activation-energy threshold. Surface area and concentration mainly affect collision frequency.", skill: "Collision theory" },
    ],
    frqFocus: ["Determine rate-law orders from controlled trial comparisons and calculate k with units.", "Use concentration-time or transformed graphs as evidence; distinguish slope, concentration, and half-life.", "Evaluate mechanisms against both the net equation and kinetic evidence.", "On energy profiles, calculate activation barriers separately from ΔH."],
    frqs: [
      {
        title: "Experimental kinetics: identify a rate law",
        stimulus: "A student studies A(aq) + B(aq) → products at constant temperature. Initial-rate data are: Trial 1, [A] = 0.10 M, [B] = 0.10 M, rate = 2.0×10⁻³ M·s⁻¹; Trial 2, [A] = 0.20 M, [B] = 0.10 M, rate = 8.0×10⁻³ M·s⁻¹; Trial 3, [A] = 0.10 M, [B] = 0.30 M, rate = 6.0×10⁻³ M·s⁻¹.",
        parts: [
          { label: "a", prompt: "Determine the order in A and justify it using Trials 1 and 2.", scoringGuidance: ["Identify that [B] is held constant.", "Show that doubling [A] multiplies rate by four.", "Conclude second order in A because 2^m = 4."] },
          { label: "b", prompt: "Determine the order in B and write the rate law.", scoringGuidance: ["Identify that [A] is held constant in Trials 1 and 3.", "Tripling [B] triples the rate, so the order in B is one.", "Write rate = k[A]²[B]."] },
          { label: "c", prompt: "Calculate k from Trial 1, including units.", scoringGuidance: ["Substitute 2.0×10⁻³ = k(0.10)²(0.10).", "Calculate k = 2.0 M⁻²·s⁻¹.", "Derive units from rate divided by M³."] },
          { label: "d", prompt: "Predict the initial rate if [A] = 0.15 M and [B] = 0.20 M.", scoringGuidance: ["Use the experimentally determined law, not the balanced equation.", "Substitute k = 2.0 M⁻²·s⁻¹, [A] = 0.15 M, [B] = 0.20 M.", "Obtain 9.0×10⁻³ M·s⁻¹."] },
        ],
      },
      {
        title: "Concentration-time data and integrated kinetics",
        stimulus: "A first-order decomposition begins at [X]₀ = 0.800 M. A plot of ln[X] against time is linear with slope −2.31×10⁻² min⁻¹. Assume temperature remains constant.",
        parts: [
          { label: "a", prompt: "Identify the reaction order and determine k.", scoringGuidance: ["Identify ln[X] versus time as the linear first-order plot.", "State that slope = −k.", "Report k = 2.31×10⁻² min⁻¹."] },
          { label: "b", prompt: "Calculate the half-life of X.", scoringGuidance: ["Use t₁/₂ = 0.693/k for first-order kinetics.", "Substitute k = 2.31×10⁻² min⁻¹.", "Report approximately 30.0 min."] },
          { label: "c", prompt: "Calculate [X] after 45.0 min.", scoringGuidance: ["Use [X]t = [X]₀e⁻ᵏᵗ or the integrated ln form.", "Substitute 0.800e⁻⁽⁰·⁰²³¹⁾⁽⁴⁵·⁰⁾.", "Report approximately 0.283 M with appropriate units."] },
          { label: "d", prompt: "Explain why the slope magnitude becomes smaller on an [X]-versus-time graph as the reaction proceeds.", scoringGuidance: ["Connect the tangent slope to instantaneous disappearance rate.", "Explain that lower [X] gives a lower rate for a first-order process.", "Do not confuse concentration height with rate."] },
        ],
      },
      {
        title: "Mechanism, energy profile, and catalysis",
        stimulus: "A proposed mechanism is Step 1: A + B ⇌ I (fast), Step 2: I + B → P (slow). An energy profile for the uncatalyzed pathway shows two peaks and an intermediate valley. The net reaction is A + 2B → P.",
        parts: [
          { label: "a", prompt: "Show that the elementary steps sum to the stated net reaction and identify I.", scoringGuidance: ["Add the forward Step 1 to Step 2.", "Cancel I because it is formed and then consumed.", "Identify I as an intermediate."] },
          { label: "b", prompt: "Using the fast pre-equilibrium assumption, derive a rate law in A and B.", scoringGuidance: ["From the slow step, rate = k₂[I][B].", "Use K = [I]/([A][B]) to write [I] = K[A][B].", "Substitute to obtain rate = k₂K[A][B]²."] },
          { label: "c", prompt: "The reactant energy is 18 kJ·mol⁻¹ and the first transition state is 74 kJ·mol⁻¹. Calculate the first-step forward activation energy.", scoringGuidance: ["Use transition-state energy minus reactant energy.", "Calculate 74 − 18.", "Report 56 kJ·mol⁻¹."] },
          { label: "d", prompt: "Explain what a catalyst changes and identify one quantity it does not change at constant temperature.", scoringGuidance: ["Describe an alternative pathway with lower activation barrier(s).", "State that it accelerates forward and reverse reactions.", "State that it does not change K or the net ΔH at fixed temperature."] },
        ],
      },
    ],
  },
  6: {
    mentalModels: [
      { title: "Signs follow the system boundary", idea: "Heat gained by the solution is heat lost by the reaction in an ideal insulated calorimeter.", useWhen: "Interpreting temperature changes or assigning ΔH signs." },
      { title: "Choose the equation by the process", idea: "Use mcΔT for a temperature change, nΔH for a phase change, and state-function sums for reaction enthalpy.", useWhen: "Heating curves, calorimetry, and thermochemical calculations." },
      { title: "Enthalpy is bookkeeping", idea: "Formation data use products minus reactants; bond enthalpies use broken minus formed; Hess's law transforms whole equations.", useWhen: "Selecting and checking an enthalpy method." },
    ],
    questions: [
      { prompt: "A reaction warms 75.0 g of solution (c = 4.18 J·g⁻¹·°C⁻¹) from 21.0°C to 27.0°C. What is the approximate reaction heat?", options: ["−1.88 kJ","+1.88 kJ","−18.8 kJ","+1.88 J"], correctIndex: 0, explanation: "qsolution = mcΔT = 75.0×4.18×6.0 = 1881 J = +1.88 kJ. The reaction loses this heat, so qreaction ≈ −1.88 kJ.", skill: "Calorimetry" },
      { prompt: "A calorimeter solution cools by 3.0°C during a reaction. Assuming negligible heat loss to the outside, the reaction is...", options: ["exothermic, qreaction < 0","endothermic, qreaction > 0","at equilibrium, ΔH = 0","impossible to classify"], correctIndex: 1, explanation: "The solution (surroundings) loses heat, so the reaction system gains it. The process is endothermic and qreaction is positive.", skill: "Heat-flow signs" },
      { prompt: "A 0.0250 mol sample reacts and releases 3.75 kJ at constant pressure. What is ΔH per mole of reaction as written?", options: ["−0.150 kJ·mol⁻¹","−150 kJ·mol⁻¹","+150 kJ·mol⁻¹","−3.75 kJ·mol⁻¹"], correctIndex: 1, explanation: "The reaction releases heat, so the sign is negative. ΔH = −3.75 kJ / 0.0250 mol = −150 kJ·mol⁻¹.", skill: "Molar enthalpy" },
      { prompt: "A 20.0 g sample of water warms from 20.0°C to 30.0°C. Using c = 4.18 J·g⁻¹·°C⁻¹, how much heat does it absorb?", options: ["0.836 kJ","8.36 kJ","−0.836 kJ","83.6 J"], correctIndex: 0, explanation: "q = mcΔT = 20.0×4.18×10.0 = 836 J = 0.836 kJ, positive because the water warms.", skill: "Specific heat" },
      { prompt: "During a phase-change plateau, heat is added while temperature remains constant. The energy primarily...", options: ["increases average kinetic energy","changes particle arrangement and intermolecular potential energy","disappears from the system","changes the identity of the element"], correctIndex: 1, explanation: "At the plateau, energy drives the phase transition by changing intermolecular arrangements rather than raising temperature.", skill: "Heating curves" },
      { prompt: "A substance absorbs 12.0 kJ while 0.400 mol vaporizes. What is ΔHvap?", options: ["4.80 kJ·mol⁻¹","30.0 kJ·mol⁻¹","−30.0 kJ·mol⁻¹","12.4 kJ·mol⁻¹"], correctIndex: 1, explanation: "ΔHvap = q/n = 12.0 kJ/0.400 mol = +30.0 kJ·mol⁻¹ because vaporization is endothermic.", skill: "Phase changes" },
      { prompt: "Reactants are at 45 kJ·mol⁻¹, products at 12 kJ·mol⁻¹, and the transition state at 100 kJ·mol⁻¹. Which pair is correct?", options: ["Ea,fwd = 55; ΔH = −33 kJ·mol⁻¹","Ea,fwd = 88; ΔH = −33 kJ·mol⁻¹","Ea,fwd = 55; ΔH = +33 kJ·mol⁻¹","Ea,fwd = 100; ΔH = +55 kJ·mol⁻¹"], correctIndex: 1, explanation: "Ea,fwd = 100−45 = 55, not 88; ΔH = 12−45 = −33. Therefore option A is correct.", skill: "Energy diagrams" },
      { prompt: "For a reaction, ΣD(bonds broken) = 920 kJ·mol⁻¹ and ΣD(bonds formed) = 1,070 kJ·mol⁻¹. Estimate ΔH.", options: ["+150 kJ·mol⁻¹","−150 kJ·mol⁻¹","+1,990 kJ·mol⁻¹","−1,990 kJ·mol⁻¹"], correctIndex: 1, explanation: "ΔH ≈ bonds broken − bonds formed = 920 − 1,070 = −150 kJ·mol⁻¹, an exothermic estimate.", skill: "Bond enthalpies" },
      { prompt: "For a reaction, ΣΔHf°(products) = −420 kJ and ΣΔHf°(reactants) = −275 kJ. What is ΔH°rxn?", options: ["−695 kJ","−145 kJ","+145 kJ","+695 kJ"], correctIndex: 1, explanation: "ΔH°rxn = products − reactants = −420 − (−275) = −145 kJ.", skill: "Formation enthalpies" },
      { prompt: "A thermochemical equation is reversed and then multiplied by 3. The original ΔH is −24 kJ. What is the transformed ΔH?", options: ["−72 kJ","+72 kJ","+8 kJ","−8 kJ"], correctIndex: 1, explanation: "Reverse first: ΔH = +24 kJ. Multiply the equation by 3, so ΔH = +72 kJ.", skill: "Hess's law" },
      { prompt: "Given C(s) + O₂(g) → CO₂(g), ΔH = −394 kJ, and CO(g) + ½O₂(g) → CO₂(g), ΔH = −283 kJ, what is ΔH for C(s) + ½O₂(g) → CO(g)?", options: ["−677 kJ","−111 kJ","+111 kJ","+677 kJ"], correctIndex: 1, explanation: "Reverse the second equation to make CO; ΔH becomes +283 kJ. Add it to −394 kJ, giving −111 kJ.", skill: "Hess's law" },
      { prompt: "Which statement about standard enthalpy of formation is correct?", options: ["It forms any amount of a substance from its elements","It is defined for formation of one mole of substance from elements in standard states","All compounds have ΔHf° = 0","It is always negative"], correctIndex: 1, explanation: "ΔHf° refers to forming exactly one mole of a substance from constituent elements in their standard states. Elemental standard states have value zero by convention.", skill: "Formation enthalpy" },
      { prompt: "Why is a bond-enthalpy estimate for a reaction only approximate?", options: ["The reaction violates energy conservation","Average bond enthalpies depend on molecular environment","Bond formation consumes energy in all cases","Coefficients cannot be used"], correctIndex: 1, explanation: "Tabulated bond enthalpies are average values across environments; exact bond energies differ among molecules.", skill: "Model limitations" },
      { prompt: "A metal loses 2.4 kJ while water gains 2.4 kJ in an insulated calorimeter. Which statement is consistent?", options: ["The metal's q is positive and water's negative","qmetal + qwater = 0","The final temperatures must be equal to 0°C","The system creates 4.8 kJ"], correctIndex: 1, explanation: "Energy conservation requires the heat transfers to sum to zero: −2.4 + 2.4 = 0 kJ.", skill: "Thermal equilibrium" },
      { prompt: "Which change leaves ΔH for a chemical process unchanged?", options: ["Reversing the equation","Multiplying all coefficients by 2","Adding an intermediate reaction step while keeping the same initial and final states","Changing products from gas to liquid"], correctIndex: 2, explanation: "Enthalpy is a state function: different paths between the same initial and final states have the same ΔH. Reversing or scaling the net equation changes its sign or magnitude.", skill: "State functions" },
    ],
    frqFocus: ["Track system and surroundings explicitly and show q = mcΔT with signs and units.", "Separate temperature-change segments from phase-change plateaus.", "Use bond enthalpies or formation enthalpies with correct counting and sign conventions.", "Show every reversal, scaling, cancellation, and adjusted ΔH in Hess's law."],
    frqs: [
      {
        title: "Coffee-cup calorimetry and experimental uncertainty",
        stimulus: "A student mixes 50.0 mL of 1.00 M HCl with 50.0 mL of 1.00 M NaOH in a coffee-cup calorimeter. Assume density = 1.00 g·mL⁻¹ and solution specific heat = 4.184 J·g⁻¹·°C⁻¹. The temperature rises from 22.4°C to 29.1°C.",
        parts: [
          { label: "a", prompt: "Calculate the heat absorbed by the solution.", scoringGuidance: ["Use 100.0 g total solution mass under the given density assumption.", "Calculate ΔT = 6.7°C and qsolution = mcΔT.", "Report qsolution ≈ +2.80 kJ."] },
          { label: "b", prompt: "Determine the reaction heat and explain its sign.", scoringGuidance: ["Use qreaction ≈ −qsolution for the insulated calorimeter.", "Report qreaction ≈ −2.80 kJ.", "Explain that the solution warms by absorbing heat released by the reaction."] },
          { label: "c", prompt: "Calculate the molar enthalpy per mole of water formed.", scoringGuidance: ["Use 0.0500 mol HCl and 0.0500 mol NaOH; 0.0500 mol H₂O forms.", "Divide −2.80 kJ by 0.0500 mol.", "Report approximately −56.0 kJ·mol⁻¹."] },
          { label: "d", prompt: "Explain how heat loss to the cup or room would affect the calculated magnitude of ΔH.", scoringGuidance: ["Recognize the measured solution temperature rise would be smaller than the ideal value.", "The calculated |qsolution| would be underestimated.", "The calculated reaction ΔH would be less negative than the true value."] },
        ],
      },
      {
        title: "Heating curve and phase-change energy",
        stimulus: "A 36.0 g sample of a pure substance is heated. Its temperature rises from 20°C to 80°C, stays at 80°C while the sample melts, then rises from 80°C to 110°C. For the solid, c = 1.50 J·g⁻¹·°C⁻¹; for the liquid, c = 2.00 J·g⁻¹·°C⁻¹. The enthalpy of fusion is 8.00 kJ·mol⁻¹ and molar mass is 60.0 g·mol⁻¹.",
        parts: [
          { label: "a", prompt: "Calculate the heat required to warm the solid to its melting point.", scoringGuidance: ["Use q = mcΔT for the solid segment.", "Substitute 36.0 g, 1.50 J·g⁻¹·°C⁻¹, and 60°C.", "Report 3.24 kJ."] },
          { label: "b", prompt: "Calculate the heat required to melt the sample.", scoringGuidance: ["Convert 36.0 g to 0.600 mol.", "Use q = nΔHfus.", "Report 4.80 kJ."] },
          { label: "c", prompt: "Calculate the heat required to warm the liquid from 80°C to 110°C and the total heat for all three segments.", scoringGuidance: ["Use q = mcΔT with the liquid specific heat to obtain 2.16 kJ.", "Add 3.24 + 4.80 + 2.16 kJ.", "Report total heat = 10.2 kJ."] },
          { label: "d", prompt: "Explain why temperature remains constant during melting even though heat is absorbed.", scoringGuidance: ["State that energy disrupts/interchanges intermolecular arrangement during the phase change.", "Connect the plateau to changing potential energy rather than increasing average kinetic energy.", "Avoid claiming that no energy is absorbed."] },
        ],
      },
      {
        title: "Hess's law from formation data",
        stimulus: "At a given temperature, the following standard formation enthalpies are supplied: ΔHf°[CO₂(g)] = −393.5 kJ·mol⁻¹, ΔHf°[CO(g)] = −110.5 kJ·mol⁻¹, and ΔHf°[O₂(g)] = 0.",
        parts: [
          { label: "a", prompt: "Calculate ΔH° for 2CO(g) + O₂(g) → 2CO₂(g).", scoringGuidance: ["Write products minus reactants using coefficients.", "Calculate 2(−393.5) − [2(−110.5) + 0].", "Report −566.0 kJ for the reaction as written."] },
          { label: "b", prompt: "Explain why ΔHf° for O₂(g) is zero but ΔHf° for CO(g) is not.", scoringGuidance: ["State that O₂(g) is oxygen's standard elemental state.", "State that formation enthalpy is referenced to elements in standard states.", "CO is a compound formed from elements and has a measured nonzero value."] },
          { label: "c", prompt: "Find ΔH° for the reverse of the reaction in part (a).", scoringGuidance: ["Reverse the equation and change the sign.", "Report +566.0 kJ."] },
          { label: "d", prompt: "Explain why the enthalpy result does not reveal how quickly CO oxidizes.", scoringGuidance: ["Distinguish thermodynamic state-function change from kinetics.", "Identify activation energy/pathway as relevant to rate.", "Do not equate exothermicity with fast reaction."] },
        ],
      },
    ],
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
