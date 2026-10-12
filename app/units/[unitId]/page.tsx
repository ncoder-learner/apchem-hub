import { redirect, notFound } from "next/navigation";
import { getUnitTopics } from "@/lib/content";
import { getUnit } from "@/lib/units";

export default async function UnitPage({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId: unitIdParam } = await params;
  const unitId = Number(unitIdParam);

  if (!getUnit(unitId)) return notFound();

  const topics = getUnitTopics(unitId);
  if (topics.length === 0) return notFound();

  redirect(`/units/${unitId}/${topics[0].slug}`);
}
