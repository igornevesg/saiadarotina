import { buildInsightMetrics } from "@/features/relationship/insights/application/builders/insightMetricsBuilder";
import { buildRelationshipScore } from "@/features/relationship/insights/application/builders/relationshipScoreBuilder";
import type { RelationshipSnapshot } from "@/features/relationship/insights/domain/relationshipSnapshot";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

type BuildRelationshipSnapshotInput = {
  events: StoryEvent[];
  totalChapters: number;
};

export function buildRelationshipSnapshot({
  events,
  totalChapters,
}: BuildRelationshipSnapshotInput): RelationshipSnapshot {
  const metrics = buildInsightMetrics({
    events,
    totalChapters,
  });

  const score = buildRelationshipScore(metrics);

  return {
    metrics,
    score,
  };
}