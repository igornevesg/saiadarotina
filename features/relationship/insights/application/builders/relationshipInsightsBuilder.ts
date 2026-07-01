import { analyzeCoupleProfile } from "@/features/relationship/insights/application/analyzers/coupleProfileAnalyzer";
import { analyzeRelationshipTraits } from "@/features/relationship/insights/application/analyzers/relationshipTraitsAnalyzer";
import { buildInsightCards } from "@/features/relationship/insights/application/providers/insightCardProvider";
import { buildRelationshipSnapshot } from "@/features/relationship/insights/application/builders/relationshipSnapshotBuilder";
import type { RelationshipInsights } from "@/features/relationship/insights/domain/relationshipInsights";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

type BuildRelationshipInsightsInput = {
  events: StoryEvent[];
  totalChapters: number;
};

export function buildRelationshipInsights({
  events,
  totalChapters,
}: BuildRelationshipInsightsInput): RelationshipInsights {
  const snapshot = buildRelationshipSnapshot({
    events,
    totalChapters,
  });

  const traits = analyzeRelationshipTraits(snapshot);

  const profile = analyzeCoupleProfile({
    snapshot,
    traits,
  });

  const cards = buildInsightCards(profile, snapshot);

  return {
    metrics: snapshot.metrics,
    score: snapshot.score,
    profile,
    cards,
  };
}   