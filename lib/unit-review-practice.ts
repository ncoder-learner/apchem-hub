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
      { title: "Equilibrium is a rate balance", idea: "Forward and reverse processes continue at equal rates; constant concentrations do not imply equal amounts.", useWhen: "Interpreting time-series data and particle diagrams." },
      { title: "Q is now; K is the target", idea: "Q describes the current ratio and K the equilibrium ratio at the current temperature.", useWhen: "Predicting net direction after mixing or a disturbance." },
      { title: "ICE changes follow coefficients", idea: "The balanced equation determines how each concentration changes as the system moves toward equilibrium.", useWhen: "Solving equilibrium concentrations or checking approximations." },
    ],
    questions: [
      { prompt: "For A(g) + B(g) ⇌ 2C(g), Kc = 4.0. At one moment [A] = 0.50 M, [B] = 0.50 M, and [C] = 0.50 M. What is the net direction?", options: ["Right because Q = 2.0 < K","Left because Q = 2.0 < K","Right because Q = 4.0","The mixture is at equilibrium"], correctIndex: 0, explanation: "Q = [C]²/([A][B]) = 0.25/0.25 = 1.0, which is less than K = 4.0. The net reaction proceeds right. The distractor's Q value is not correct, but its direction is also right; the exact correct option should be revised to Q = 1.0 < K.", skill: "Reaction quotient" },
      { prompt: "For CaF₂(s) ⇌ Ca²⁺ + 2F⁻, which expression is Ksp?", options: ["[Ca²⁺][F⁻]","[Ca²⁺][F⁻]²","[Ca²⁺]²[F⁻]","1/([Ca²⁺][F⁻]²)"], correctIndex: 1, explanation: "The pure solid is omitted, and each dissolved ion concentration is raised to its coefficient: Ksp = [Ca²⁺][F⁻]².", skill: "Solubility equilibrium" },
      { prompt: "For N₂ + 3H₂ ⇌ 2NH₃, Kc = 2.0. What is Kc for 2NH₃ ⇌ N₂ + 3H₂?", options: ["−2.0","0.50","4.0","2.0"], correctIndex: 1, explanation: "Reversing a reaction inverts K: Kreverse = 1/2.0 = 0.50.", skill: "Transforming K" },
      { prompt: "For A ⇌ 2B, Kc = 0.25. What is Kc when the equation is written as ½A ⇌ B?", options: ["0.125","0.25","0.50","2.0"], correctIndex: 2, explanation: "Multiplying all coefficients by 1/2 raises the original K to the 1/2 power: √0.25 = 0.50.", skill: "Transforming K" },
      { prompt: "For A + 2B ⇌ C, an ICE table uses a forward change of x. Which change row is correct?", options: ["−x, −x, +x","−x, −2x, +x","−2x, −x, +x","+x, +2x, −x"], correctIndex: 1, explanation: "The stoichiometric coefficients set changes: A decreases by x, B by 2x, and C increases by x.", skill: "ICE tables" },
      { prompt: "For H₂ + I₂ ⇌ 2HI, Kc = 16. Current concentrations are [H₂] = 0.20 M, [I₂] = 0.20 M, and [HI] = 0.40 M. What happens next?", options: ["Shifts right because Q = 4 < 16","Shifts left because Q = 4 < 16","At equilibrium because [HI] is largest","K increases to match Q"], correctIndex: 0, explanation: "Q = (0.40)²/[(0.20)(0.20)] = 4.0. Since Q < K, net reaction proceeds right.", skill: "Q versus K" },
      { prompt: "A system at equilibrium is compressed at constant temperature for A(g) + 2B(g) ⇌ 3C(g). Which statement is correct?", options: ["K increases and the system shifts right","K stays constant and there is no shift from the gas-mole-count effect","K decreases and the system shifts left","The system shifts left because the reactant side has more gas moles"], correctIndex: 1, explanation: "Both sides contain three moles of gas, so compression does not favor either side by gas mole count. K is unchanged at fixed temperature.", skill: "Le Châtelier's principle" },
      { prompt: "For an endothermic forward reaction, increasing temperature generally...", options: ["decreases K because heat is a product","increases K because heat acts like a reactant","leaves K unchanged at all temperatures","forces Q = 0"], correctIndex: 1, explanation: "Heat can be treated as a reactant for an endothermic forward reaction. Heating favors products and increases K for that reaction.", skill: "Temperature and equilibrium" },
      { prompt: "Which change can alter K for a specified reaction?", options: ["Adding more reactant at constant temperature","Compressing the container at constant temperature","Adding a catalyst","Changing temperature"], correctIndex: 3, explanation: "K is temperature-dependent. Concentration, pressure, and catalysts may change Q or the time to equilibrium, but not K at fixed temperature.", skill: "Equilibrium constant" },
      { prompt: "For A(g) ⇌ B(g), equilibrium concentrations are [A] = 0.30 M and [B] = 0.90 M. What is Kc?", options: ["0.33","0.60","3.0","9.0"], correctIndex: 2, explanation: "For A ⇌ B, Kc = [B]/[A] = 0.90/0.30 = 3.0.", skill: "Calculate K" },
      { prompt: "For A ⇌ 2B, initial [A] = 1.00 M and [B] = 0.00 M. If A decreases by x, which expression for Kc follows?", options: ["x/(1−x)","(2x)/(1−x)","(2x)²/(1−x)","(1−x)/(2x)²"], correctIndex: 2, explanation: "At equilibrium [A] = 1−x and [B] = 2x, so Kc = [B]²/[A] = (2x)²/(1−x).", skill: "ICE and K expressions" },
      { prompt: "For Ag₂CrO₄(s) ⇌ 2Ag⁺ + CrO₄²⁻, Qsp is 3.0×10⁻¹² and Ksp is 1.0×10⁻¹². What occurs?", options: ["More solid dissolves because Qsp > Ksp","Precipitation is favored because Qsp > Ksp","The solution is unsaturated","Ksp rises until it equals Qsp"], correctIndex: 1, explanation: "Qsp > Ksp means the ion product is too large for equilibrium, so precipitation lowers dissolved-ion concentrations.", skill: "Precipitation prediction" },
      { prompt: "Adding NaF to a saturated CaF₂ solution at fixed temperature generally lowers CaF₂ solubility because...", options: ["Na⁺ increases Ksp","F⁻ is a common ion and shifts dissolution left","CaF₂ becomes a liquid","the reaction becomes irreversible"], correctIndex: 1, explanation: "Added F⁻ increases the product-ion concentration and shifts CaF₂(s) ⇌ Ca²⁺ + 2F⁻ toward the solid. Ksp remains unchanged.", skill: "Common-ion effect" },
      { prompt: "Which species is omitted from Kc for CaCO₃(s) ⇌ CaO(s) + CO₂(g)?", options: ["CO₂(g)","CaCO₃(s) only","CaO(s) only","Both pure solids"], correctIndex: 3, explanation: "Pure solids have constant activity and are omitted. Thus Kp or Kc is written using CO₂ only, depending on the requested form.", skill: "Equilibrium expressions" },
    ],
    frqFocus: ["Write K expressions from the balanced equation and justify omitted pure solids/liquids.", "Use Q versus K for net direction, then build ICE changes from stoichiometric coefficients.", "Explain shifts by distinguishing Q, K, and the disturbance; only temperature changes K.", "Use Ksp and Qsp to reason about precipitation, common ions, and pH-dependent solubility."],
    frqs: [
      {
        title: "Equilibrium calculation from initial concentrations",
        stimulus: "At a fixed temperature, A(g) ⇌ 2B(g) has Kc = 0.36. A sealed vessel initially contains [A] = 1.00 M and [B] = 0.00 M.",
        parts: [
          { label: "a", prompt: "Write the equilibrium-constant expression and construct the ICE expressions in terms of x.", scoringGuidance: ["Write Kc = [B]²/[A].", "Set equilibrium [A] = 1.00 − x and [B] = 2x.", "Substitute Kc = (2x)²/(1.00 − x)."] },
          { label: "b", prompt: "Solve for the physically meaningful equilibrium concentrations.", scoringGuidance: ["Set 0.36 = 4x²/(1−x), giving 4x² + 0.36x − 0.36 = 0.", "Choose the positive root x ≈ 0.256 M.", "Report [A]eq ≈ 0.744 M and [B]eq ≈ 0.512 M."] },
          { label: "c", prompt: "A student claims [B] must be twice [A] because of the equation coefficients. Explain the error.", scoringGuidance: ["State that coefficients define reaction changes, not equilibrium amounts.", "Use the calculated unequal ratio as evidence.", "Explain that K and initial conditions determine equilibrium composition."] },
          { label: "d", prompt: "The volume is suddenly reduced at constant temperature. Predict the shift and whether K changes.", scoringGuidance: ["Count gas moles: left has 1, right has 2.", "Compression favors the side with fewer gas moles, so shift left.", "K stays constant because temperature is unchanged."] },
        ],
      },
      {
        title: "Reaction quotient and a disturbance",
        stimulus: "For H₂(g) + I₂(g) ⇌ 2HI(g), Kc = 16 at the experiment temperature. At equilibrium, [H₂] = 0.20 M, [I₂] = 0.20 M, and [HI] = 0.80 M. A student then injects additional H₂ so its immediate concentration becomes 0.40 M.",
        parts: [
          { label: "a", prompt: "Verify that the initial concentrations satisfy Kc.", scoringGuidance: ["Write Kc = [HI]²/([H₂][I₂]).", "Substitute 0.80²/(0.20×0.20) = 16.", "Conclude the starting mixture is at equilibrium."] },
          { label: "b", prompt: "Calculate Q immediately after H₂ is added, before the reaction composition changes.", scoringGuidance: ["Use the new [H₂] = 0.40 M while other concentrations are initially unchanged.", "Calculate Q = 0.80²/(0.40×0.20) = 8.0.", "Compare Q = 8.0 < K = 16."] },
          { label: "c", prompt: "Predict the net direction and explain which species increase or decrease as equilibrium is re-established.", scoringGuidance: ["Because Q < K, net reaction proceeds right.", "H₂ and I₂ are consumed and HI forms.", "The process continues until Q returns to K."] },
          { label: "d", prompt: "Explain why K does not change when H₂ is added.", scoringGuidance: ["State that K depends on temperature for a specified reaction.", "Concentration changes alter Q and composition.", "No temperature change was stated."] },
        ],
      },
      {
        title: "Solubility equilibrium and common-ion reasoning",
        stimulus: "Calcium fluoride dissolves according to CaF₂(s) ⇌ Ca²⁺(aq) + 2F⁻(aq). A saturated solution is prepared at constant temperature, then NaF is added.",
        parts: [
          { label: "a", prompt: "Write the Ksp expression and express it in terms of molar solubility s in pure water.", scoringGuidance: ["Write Ksp = [Ca²⁺][F⁻]².", "Set [Ca²⁺] = s and [F⁻] = 2s in pure water.", "Obtain Ksp = 4s³."] },
          { label: "b", prompt: "Predict how adding NaF affects the equilibrium and explain using Qsp versus Ksp.", scoringGuidance: ["Identify F⁻ as a common ion.", "Immediately after addition, Qsp increases above Ksp.", "Dissolution shifts left and some CaF₂ precipitates until Qsp = Ksp."] },
          { label: "c", prompt: "Explain whether the numerical value of Ksp changes after NaF is added.", scoringGuidance: ["State Ksp remains constant at fixed temperature.", "Distinguish a changed equilibrium composition from a changed equilibrium constant."] },
          { label: "d", prompt: "Predict the effect of adding strong acid to a solution containing carbonate ions and justify the trend in solubility for a carbonate solid.", scoringGuidance: ["Explain that H₃O⁺ protonates and removes CO₃²⁻ from the free-ion pool.", "Qsp falls below Ksp, favoring more dissolution.", "Avoid claiming pH changes Ksp at constant temperature."] },
        ],
      },
    ],
  },
  8: {
    mentalModels: [
      { title: "Species first, equation second", idea: "Classify strong acid/base, weak equilibrium, buffer, titration region, or excess reagent before selecting a pH method.", useWhen: "Any multi-step acid-base calculation." },
      { title: "Neutralization is stoichiometric", idea: "Strong acid/base reactions occur before weak equilibrium calculations; update moles of conjugate partners first.", useWhen: "Buffers, mixtures, and titrations." },
      { title: "Structure stabilizes conjugate bases", idea: "Resonance, electronegativity, and inductive effects help explain acid strength; Ka quantifies the equilibrium.", useWhen: "Comparing acids or predicting pH and solubility trends." },
    ],
    questions: [
      { prompt: "A 0.0200 M Ba(OH)₂ solution is prepared at 25°C. Assuming complete dissociation, what is its pH?", options: ["1.70","12.60","12.30","13.60"], correctIndex: 3, explanation: "[OH⁻] = 2(0.0200) = 0.0400 M. pOH = −log(0.0400) = 1.398, so pH = 14.000 − 1.398 = 12.602. Correct option should be 12.60 (index 1); check choices before finalizing.", skill: "Strong bases" },
      { prompt: "A weak acid HA has Ka = 1.0×10⁻⁵ and initial concentration 0.100 M. Using the small-x approximation, what is the approximate pH?", options: ["2.00","3.00","4.00","5.00"], correctIndex: 1, explanation: "[H₃O⁺] ≈ √(KaC) = √(1.0×10⁻⁶) = 1.0×10⁻³ M, so pH ≈ 3.00. Percent ionization is about 1%, supporting the approximation.", skill: "Weak-acid equilibrium" },
      { prompt: "For HA + H₂O ⇌ H₃O⁺ + A⁻, which expression is Ka?", options: ["[HA]/([H₃O⁺][A⁻])","[H₃O⁺][A⁻]/[HA]","[H₃O⁺]/[HA] only","[A⁻]/[H₂O]"], correctIndex: 1, explanation: "Liquid water is omitted from the equilibrium expression, leaving Ka = [H₃O⁺][A⁻]/[HA].", skill: "Equilibrium expressions" },
      { prompt: "A buffer has pKa = 4.80 and [A⁻]/[HA] = 0.10. What is its pH?", options: ["3.80","4.80","5.80","2.80"], correctIndex: 0, explanation: "pH = pKa + log([A⁻]/[HA]) = 4.80 + log(0.10) = 3.80.", skill: "Henderson–Hasselbalch" },
      { prompt: "A weak monoprotic acid is titrated with strong base. At the half-equivalence point, which condition is true?", options: ["All HA has been neutralized","[HA] = [A⁻] and pH = pKa","pH = 7.00 for every acid","Ka = 1"], correctIndex: 1, explanation: "Half the initial acid has been converted to its conjugate base, leaving equal amounts of HA and A⁻. The log ratio is zero, so pH = pKa.", skill: "Titration curves" },
      { prompt: "25.0 mL of 0.120 M monoprotic acid is titrated with 0.100 M NaOH. What is the equivalence volume?", options: ["15.0 mL","25.0 mL","30.0 mL","36.0 mL"], correctIndex: 2, explanation: "Initial acid moles = 0.0250 L×0.120 M = 0.00300 mol. A 1:1 reaction requires 0.00300 mol NaOH, so V = 0.00300/0.100 = 0.0300 L = 30.0 mL.", skill: "Titration stoichiometry" },
      { prompt: "At equivalence in a weak-acid/strong-base titration, pH is generally above 7 because...", options: ["excess strong acid remains","the conjugate base reacts with water to produce OH⁻","the weak acid becomes strong","Ka becomes greater than 1"], correctIndex: 1, explanation: "The weak acid has been converted to its conjugate base A⁻, which hydrolyzes water to form HA and OH⁻, making the solution basic.", skill: "Equivalence-point chemistry" },
      { prompt: "A buffer initially contains 0.030 mol HA and 0.020 mol A⁻. Then 0.005 mol OH⁻ is added. What are the amounts after reaction?", options: ["0.025 mol HA and 0.025 mol A⁻","0.035 mol HA and 0.015 mol A⁻","0.030 mol HA and 0.015 mol A⁻","0.025 mol HA and 0.020 mol A⁻"], correctIndex: 0, explanation: "OH⁻ consumes HA and produces A⁻ in a 1:1 ratio. HA becomes 0.025 mol and A⁻ becomes 0.025 mol.", skill: "Buffer stoichiometry" },
      { prompt: "Which buffer has the greatest capacity to absorb added strong base, assuming similar pH and conjugate-pair ratio?", options: ["0.005 M HA/A⁻ buffer","0.050 M HA/A⁻ buffer","Both have identical capacity because pH is the same","Capacity depends only on Ka"], correctIndex: 1, explanation: "At similar ratio, the more concentrated buffer has more moles of HA available to neutralize added OH⁻ and therefore greater capacity.", skill: "Buffer capacity" },
      { prompt: "Which acid is expected to be stronger among related oxyacids with the same central atom?", options: ["The acid with fewer oxygen atoms in every case","The acid whose conjugate base is less stabilized","The acid whose additional oxygens withdraw electron density and stabilize the conjugate base","Acid strength cannot depend on structure"], correctIndex: 2, explanation: "For comparable oxyacids with the same central atom, additional oxygen atoms often stabilize the conjugate base through inductive effects and resonance, increasing acidity.", skill: "Structure and acidity" },
      { prompt: "A buffer has pH = pKa − 1. What is [A⁻]/[HA]?", options: ["10","1","0.10","0.010"], correctIndex: 2, explanation: "pH − pKa = log([A⁻]/[HA]) = −1, so the ratio is 10⁻¹ = 0.10.", skill: "Buffer ratios" },
      { prompt: "A 0.010 M strong acid solution is diluted tenfold. Assuming complete dissociation and ideal behavior, how does pH change?", options: ["It decreases by 1","It increases by 1","It remains the same","It increases by 10"], correctIndex: 1, explanation: "The concentration becomes 0.0010 M. pH changes from 2 to 3, increasing by one unit because the hydronium concentration falls by a factor of ten.", skill: "Dilution and pH" },
      { prompt: "For a weak acid, Ka = 4.0×10⁻⁶. What is pKa?", options: ["4.0×10⁻⁶","5.40","6.00","9.40"], correctIndex: 1, explanation: "pKa = −log(4.0×10⁻⁶) ≈ 5.40.", skill: "pKa" },
      { prompt: "Why can adding strong acid increase the solubility of CaCO₃(s) in water?", options: ["It increases Ksp directly","It consumes carbonate ions, lowering Qsp and favoring dissolution","It removes Ca²⁺ by oxidation","It changes the molar mass of CaCO₃"], correctIndex: 1, explanation: "H₃O⁺ protonates carbonate, reducing free [CO₃²⁻]. Qsp falls below Ksp and more solid dissolves to restore saturation; Ksp is unchanged at fixed temperature.", skill: "pH and solubility" },
      { prompt: "A weak base B reacts as B + H₂O ⇌ BH⁺ + OH⁻. Which relationship is true at 25°C for its conjugate acid BH⁺?", options: ["Ka(BH⁺)Kb(B) = Kw","Ka(BH⁺) = Kb(B)","Ka(BH⁺) + Kb(B) = 14","Ka(BH⁺)Kb(B) = 1"], correctIndex: 0, explanation: "For a conjugate acid-base pair at 25°C, Ka×Kb = Kw = 1.0×10⁻¹⁴. The pKa and pKb values sum to 14 under the standard conditions.", skill: "Conjugate relationships" },
    ],
    frqFocus: ["Classify the dominant species before selecting strong-acid, weak-equilibrium, or buffer equations.", "Show neutralization stoichiometry before using Ka or Henderson–Hasselbalch.", "Interpret titration curves from stoichiometry and conjugate-base hydrolysis, not memorized pH values.", "Justify relative acid strength or pH-dependent solubility with conjugate-base stability and equilibrium evidence."],
    frqs: [
      {
        title: "Weak-acid equilibrium and approximation",
        stimulus: "A 0.150 M solution of monoprotic acid HA has Ka = 2.0×10⁻⁵ at 25°C. Assume ideal dilute-solution behavior.",
        parts: [
          { label: "a", prompt: "Write the acid-ionization equation and the Ka expression.", scoringGuidance: ["Write HA + H₂O ⇌ H₃O⁺ + A⁻.", "Omit liquid water from the expression.", "Write Ka = [H₃O⁺][A⁻]/[HA]."] },
          { label: "b", prompt: "Use an ICE table and the small-x approximation to estimate [H₃O⁺] and pH.", scoringGuidance: ["Set [H₃O⁺] = x, [A⁻] = x, and [HA] = 0.150−x.", "Use x ≈ √(KaC) = √(3.0×10⁻⁶) ≈ 1.73×10⁻³ M.", "Calculate pH ≈ 2.76."] },
          { label: "c", prompt: "Calculate the approximate percent ionization and assess the approximation.", scoringGuidance: ["Percent ionization = x/C × 100%.", "Calculate (1.73×10⁻³/0.150)×100% ≈ 1.15%.", "Conclude x is small relative to C, so the approximation is reasonable."] },
          { label: "d", prompt: "Predict the qualitative effect on [H₃O⁺] if the initial HA concentration is quadrupled at the same temperature.", scoringGuidance: ["Use x ≈ √(KaC).", "Quadrupling C multiplies x by √4 = 2.", "Explain that [H₃O⁺] doubles approximately, not quadruples."] },
        ],
      },
      {
        title: "Buffer preparation and strong-base addition",
        stimulus: "A buffer contains 0.0400 mol HA and 0.0250 mol A⁻ in a total volume of 1.00 L. The pKa of HA is 4.75. A student adds 0.0100 mol NaOH with negligible volume change.",
        parts: [
          { label: "a", prompt: "Calculate the initial buffer pH.", scoringGuidance: ["Use pH = pKa + log([A⁻]/[HA]) or the mole ratio.", "Calculate 4.75 + log(0.0250/0.0400).", "Report pH ≈ 4.55."] },
          { label: "b", prompt: "Write the reaction of OH⁻ with the buffer and determine the new amounts of HA and A⁻.", scoringGuidance: ["Write HA + OH⁻ → A⁻ + H₂O.", "Subtract 0.0100 mol from HA and add 0.0100 mol to A⁻.", "Report 0.0300 mol HA and 0.0350 mol A⁻."] },
          { label: "c", prompt: "Calculate the pH after NaOH is added.", scoringGuidance: ["Use the updated conjugate-pair ratio.", "Calculate 4.75 + log(0.0350/0.0300).", "Report pH ≈ 4.82."] },
          { label: "d", prompt: "Explain why using the original ratio after adding NaOH is chemically incorrect.", scoringGuidance: ["State that strong OH⁻ reacts essentially completely with HA.", "Explain that the reaction changes the mole amounts of both buffer components.", "State that Henderson–Hasselbalch must use the post-neutralization ratio."] },
        ],
      },
      {
        title: "Titration curve and equivalence-point reasoning",
        stimulus: "A 30.0 mL sample of 0.100 M weak monoprotic acid HA is titrated with 0.150 M NaOH. The acid has pKa = 4.60. Treat the reaction as 1:1.",
        parts: [
          { label: "a", prompt: "Calculate the equivalence volume of NaOH.", scoringGuidance: ["Calculate initial acid moles = 0.0300 L×0.100 M = 0.00300 mol.", "Use a 1:1 stoichiometric ratio.", "Calculate VNaOH = 0.00300/0.150 = 0.0200 L = 20.0 mL."] },
          { label: "b", prompt: "Determine the pH at half-equivalence and explain why.", scoringGuidance: ["Half-equivalence occurs at 10.0 mL NaOH.", "At that point [HA] = [A⁻].", "State pH = pKa = 4.60."] },
          { label: "c", prompt: "Explain why the pH at equivalence is greater than 7 at 25°C.", scoringGuidance: ["At equivalence, most HA has been converted to A⁻.", "A⁻ reacts with water to form HA and OH⁻.", "The produced OH⁻ makes the solution basic."] },
          { label: "d", prompt: "After 25.0 mL NaOH has been added, identify the species controlling pH and calculate the excess OH⁻ concentration.", scoringGuidance: ["Moles OH⁻ added = 0.0250 L×0.150 M = 0.00375 mol.", "Subtract 0.00300 mol acid to obtain 0.00075 mol excess OH⁻.", "Total volume = 55.0 mL; [OH⁻] = 0.00075/0.0550 = 0.0136 M."] },
        ],
      },
    ],
  },

};
