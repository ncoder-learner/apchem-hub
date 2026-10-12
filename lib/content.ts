import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * CONTENT SCHEMA — read this before touching anything in content/units/.
 *
 * One MDX file = one topic/lesson. Files live at:
 *   content/units/unit-{N}/{topicNumber-slug}.mdx
 * e.g. content/units/unit-2/2-7-vsepr-and-hybridization.mdx
 *
 * Every file MUST start with frontmatter shaped like TopicFrontmatter below.
 * There is no intro/topics[]/outro split and no magic marker comment
 * anywhere in this schema — each file IS one topic, full stop. The topic
 * list for a unit is derived by scanning that unit's folder and reading
 * each file's frontmatter, sorted by topicNumber.
 *
 * Why this instead of one-file-per-unit with a split marker (the old
 * approach): the marker approach broke twice because intro content and
 * topic content were rendered through different paths with different
 * component availability, and nobody could tell that from looking at a
 * single file. One file per topic means one file = one render path, always.
 *
 * To add a new topic: drop a new .mdx file in the right unit folder with
 * correct frontmatter. Nothing else needs to change — no manifest to edit,
 * no index to update.
 */

export interface TopicFrontmatter {
  title: string;
  unit: number;
  topicNumber: string; // e.g. "2.7" — used for both display and sort order
  slug: string; // must match the route segment, e.g. "2-7-vsepr-and-hybridization"
  summary: string;
}

export interface TopicMeta extends TopicFrontmatter {
  filename: string;
}

export interface TopicContent extends TopicMeta {
  body: string; // raw MDX, not yet compiled
}

const CONTENT_ROOT = path.join(process.cwd(), "content", "units");

function unitDir(unitId: number): string {
  return path.join(CONTENT_ROOT, `unit-${unitId}`);
}

function readFrontmatter(unitId: number, filename: string): TopicMeta {
  const raw = fs.readFileSync(path.join(unitDir(unitId), filename), "utf8");
  const { data } = matter(raw);
  const fm = data as Partial<TopicFrontmatter>;

  const missing = (["title", "unit", "topicNumber", "slug", "summary"] as const).filter(
    (key) => fm[key] === undefined || fm[key] === null || fm[key] === ""
  );
  if (missing.length > 0) {
    throw new Error(
      `content/units/unit-${unitId}/${filename} is missing required frontmatter field(s): ${missing.join(", ")}`
    );
  }

  return { ...(fm as TopicFrontmatter), filename };
}

/** All topics for a unit, sorted by topicNumber. Empty array if the unit
 * folder doesn't exist yet — that's a valid state (unit known, no content). */
export function getUnitTopics(unitId: number): TopicMeta[] {
  const dir = unitDir(unitId);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const topics = files.map((filename) => readFrontmatter(unitId, filename));

  return topics.sort((a, b) =>
    a.topicNumber.localeCompare(b.topicNumber, undefined, { numeric: true })
  );
}

/** Full content (frontmatter + raw MDX body) for one topic. */
export function getTopicContent(unitId: number, slug: string): TopicContent | null {
  const topics = getUnitTopics(unitId);
  const meta = topics.find((t) => t.slug === slug);
  if (!meta) return null;

  const raw = fs.readFileSync(path.join(unitDir(unitId), meta.filename), "utf8");
  const { content } = matter(raw);

  return { ...meta, body: content };
}

/** Which unit IDs currently have at least one topic file. Used on the home
 * page so unpopulated units show as "coming soon" instead of 404ing. */
export function getUnitsWithContent(): number[] {
  if (!fs.existsSync(CONTENT_ROOT)) return [];
  return fs
    .readdirSync(CONTENT_ROOT)
    .filter((name) => /^unit-\d+$/.test(name))
    .map((name) => Number(name.replace("unit-", "")))
    .filter((id) => getUnitTopics(id).length > 0)
    .sort((a, b) => a - b);
}
