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
      <MDXRemote source={topic.body} components={mdxComponents} />
      <TopicLab unitId={unitId} topicNumber={topic.topicNumber} title={topic.title} />
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
