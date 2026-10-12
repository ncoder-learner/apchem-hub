import Link from "next/link";
import { UNITS } from "@/lib/units";
import { getUnitTopics, getUnitsWithContent } from "@/lib/content";

export default function HomePage() {
  const populatedUnitIds = new Set(getUnitsWithContent());

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10">
        <p className="mb-2 text-sm font-medium text-accent">AP Chemistry</p>
        <h1 className="text-4xl font-bold text-ink">AP Chem Hub</h1>
        <p className="mt-3 max-w-2xl text-ink-dim">
          Lesson-by-lesson coverage of the full 9-unit AP Chemistry course, built to actually
          teach the material, not just summarize it.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {UNITS.map((unit) => {
          const hasContent = populatedUnitIds.has(unit.id);
          const topics = hasContent ? getUnitTopics(unit.id) : [];
          const firstTopic = topics[0];

          const card = (
            <div
              className={`h-full rounded-xl border p-5 transition-colors ${
                hasContent
                  ? "border-border bg-card hover:border-accent"
                  : "border-border/60 bg-card/40 opacity-60"
              }`}
            >
              <p className="text-xs font-medium text-ink-dim">Unit {unit.id}</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">{unit.title}</h2>
              <p className="mt-2 text-sm text-ink-dim">
                {hasContent ? `${topics.length} lesson${topics.length === 1 ? "" : "s"} available` : "Coming soon"}
              </p>
            </div>
          );

          return hasContent && firstTopic ? (
            <Link key={unit.id} href={`/units/${unit.id}/${firstTopic.slug}`}>
              {card}
            </Link>
          ) : (
            <div key={unit.id}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
