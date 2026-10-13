# Visual and hands-on learning audit

Scope reviewed: existing lesson files in Units 1–5 on the `master` baseline, then the changes in PR #10. This is a lesson-content audit, not a claim that the live site has been visually tested in a browser.

## Unit-by-unit findings

| Unit | Baseline finding | Work in PR #10 | Remaining review |
|---|---|---|---|
| 1 — Atomic structure and properties | All 9 lessons already contained at least one relevant `ChemVisual` and several included data tables or multiple representations. | Added an interactive Coulomb's-law model to 1.9. | Review whether the static models in 1.1–1.8 would benefit from direct manipulation after seeing the rendered pages. |
| 2 — Molecular and ionic compound structure | All 7 lessons already contained at least one visual component; 2.7 has extensive geometry visuals and already embeds PhET Molecule Shapes. | Added a bond-potential-energy explorer to 2.2 and an interactive Lewis-structure explorer to 2.5 and 2.6. | Check that all static Lewis, resonance, and geometry diagrams render cleanly at mobile widths. |
| 3 — Intermolecular forces and properties | All 13 lessons already contained at least one relevant `Unit3Visual`, table, or other instructional representation. | Added interactive models to 3.4 (ideal gas law), 3.11–3.12 (photon energy), and 3.13 (Beer–Lambert law); embedded PhET Gas Properties in 3.4. | Consider a better non-ideal-gas interactive model for 3.6 and a hands-on solubility model for 3.7–3.10 if a scientifically defensible model is available. |
| 4 — Chemical reactions | The 9 lessons had no registered visual or simulation components. This was the clearest coverage gap. | Added a dedicated interactive model to **all 9 lessons**: balancing, net ionic equations, particle changes, limiting reactants, titration, reaction patterns, pH, and redox. Embedded PhET Balancing Chemical Equations and Acid-Base Solutions. | Review the activities against each lesson's CED objective; improve any model that oversimplifies the target concept. |
| 5 — Kinetics | The 11 lessons had no registered visual or simulation components despite kinetics being highly graph- and mechanism-dependent. | Added a dedicated interactive model to **all 11 lessons**: concentration-time curves, rate laws, collision theory, and reaction-energy profiles. | The collision model is explicitly schematic, not a molecular-dynamics simulation. Replace or supplement it if a more faithful embeddable model is available. |

## Reusable interactive models added

- **Balance equations:** change coefficients and see atom counts on both sides.
- **Rate law / kinetics:** change concentration, order, rate constant, or initial concentration and inspect the resulting model.
- **Collision theory:** change temperature and particle concentration; explanatory text separates encounter frequency from collision energy.
- **Energy profiles:** compare reaction enthalpy and activation barriers, with or without a catalyst.
- **Ideal gas law:** vary temperature, amount, and volume; calculated pressure and the pressure–volume graph update.
- **Acid/base and titration:** inspect pH from hydrogen-ion concentration and explore an idealized strong acid–strong base titration curve.
- **Reaction accounting:** net ionic equations, limiting reactants, reaction patterns, redox electron transfer, and particle-level physical versus chemical changes.
- **Bonding and atomic interactions:** Coulomb's law, bond potential-energy curves, Lewis structures, and photon energy.
- **Spectrophotometry:** vary concentration and path length and observe the Beer–Lambert graph.

## PhET embeds verified for direct runnable URLs

- Balancing Chemical Equations: https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations_en.html
- Molecule Shapes (already present in Unit 2, Topic 2.7): https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_en.html
- Gas Properties: https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_en.html
- Acid-Base Solutions: https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_en.html

## Units 6–9

These units must follow the same standard when authored. Their topic-specific visual plan should be designed from the College Board CED, not copied from the Unit 4 or Unit 5 widgets. Likely high-value visual families include calorimetry and enthalpy diagrams (Unit 6), equilibrium concentration/ICE-table models (Unit 7), acid-base titration and pH models (Unit 8), and electrochemical cell diagrams/potential models (Unit 9).

## Release gate

The PR's GitHub Actions workflow runs TypeScript type-checking and a production build. Passing CI is necessary but not sufficient: inspect the actual rendered lesson pages, exercise each control, test the PhET embeds, and check mobile layout before merging.
