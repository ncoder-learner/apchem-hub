import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTopicContent, getUnitTopics } from "@/lib/content";
import { getUnit } from "@/lib/units";
import { mdxComponents } from "@/components/mdx";
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
      topicNumber={topic.topicNumber}
    >
      <MDXRemote source={topic.body} components={mdxComponents} />
    </LessonView>
  );
}

// 1. Await params if you are using Next.js 15+
// 2. Return both unitId and topicSlug for full static path generation
export async function generateStaticParams({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params;
  const topics = getUnitTopics(Number(unitId));
  
  return topics.map((t) => ({
    unitId: unitId,
    topicSlug: t.slug,
  }));
}
