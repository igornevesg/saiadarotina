import { buildRelationshipInsights } from "@/features/relationship/insights/application/builders/relationshipInsightsBuilder";
import type { RelationshipInsights } from "@/features/relationship/insights/domain/relationshipInsights";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

type BuildRelationshipEngineInput = {
  events: StoryEvent[];
  totalChapters: number;
};

export function buildRelationshipEngine({
  events,
  totalChapters,
}: BuildRelationshipEngineInput): RelationshipInsights {
  return buildRelationshipInsights({
    events,
    totalChapters,
  });
}