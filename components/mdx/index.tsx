import type { MDXComponents } from "mdx/types";
import { Lightbulb, WorkedExample, Mistake, Connects } from "./Callouts";
import { BondDiagram } from "./BondDiagram";
import { GeometryDiagram } from "./GeometryDiagram";
import { PhetSim } from "./PhetSim";

/**
 * This is the component map passed to <MDXRemote components={mdxComponents} />.
 * Every custom tag used inside any lesson .mdx file (under content/units/)
 * must be registered here, or MDX will throw "Expected component X to be defined"
 * at render time. That exact error is what broke the previous version of
 * this site — so if you add a new custom component, add it here in the
 * same change, not later.
 */
export const mdxComponents: MDXComponents = {
  Lightbulb,
  WorkedExample,
  Mistake,
  Connects,
  BondDiagram,
  GeometryDiagram,
  PhetSim,

  // Plain element overrides so MDX's default h2/h3/p/etc. pick up the
  // dark-theme prose styles defined in app/globals.css under .lesson-prose.
  // (These classes are redundant with .lesson-prose selectors above them in
  // the DOM, but kept explicit here so this file is self-contained if the
  // CSS file is ever restructured.)
};
