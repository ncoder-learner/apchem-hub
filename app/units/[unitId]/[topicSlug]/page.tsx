import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTopicContent, getUnitTopics, getUnitsWithContent } from "@/lib/content";
import { getUnit } from "@/lib/units";
import { mdxComponents } from "@/components/mdx";
import { TopicLab } from "@/components/TopicLab";
import { LessonView } from "@/components/LessonView";

interface PageProps {
  params: Promise<{ unitId: string; topicSlug: string }>;
}

export default async function TopicPage({ params }: PageProps) {
  const { unitId: unitIdParam, topicSlug } = await params;
  const unitId = Number(unitIdParam);

  const unit = getUnit(unitId);
  if (!unit) return notFound();

  const topic = getTopicContent(unitId, topicSlug);
  if (!topic) return notFound();

  const topics = getUnitTopics(unitId);
  // Put the topic model immediately after the opening explanation, rather than before the lesson starts.
  // Unit 4 and 5 already author their labs inline in MDX, so do not duplicate them.
  const firstParagraphEnd = topic.body.indexOf("\n\n");
  const bodyWithInlineLab = unitId !== 4 && unitId !== 5 && firstParagraphEnd >= 0
    ? `${topic.body.slice(0, firstParagraphEnd)}\n\n<TopicLab unitId={${unitId}} topicNumber="${topic.topicNumber}" title={${JSON.stringify(topic.title)}} />\n\n${topic.body.slice(firstParagraphEnd + 2)}`
    : topic.body;

  return (
    <LessonView
      unitId={unitId}
      unitTitle={unit.title}
      topics={topics}
      activeSlug={topicSlug}
      title={topic.title}
      summary={topic.summary}
      topicNumber={topic.topicNumber}
    >
      <MDXRemote source={bodyWithInlineLab} components={mdxComponents} />
    </LessonView>
  );
}

export function generateStaticParams() {
  return getUnitsWithContent().flatMap((unitId) =>
    getUnitTopics(unitId).map((topic) => ({
      unitId: String(unitId),
      topicSlug: topic.slug,
    }))
  );
}
