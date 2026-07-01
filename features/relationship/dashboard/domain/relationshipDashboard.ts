import type { RelationshipInsights } from "@/features/relationship/insights/domain/relationshipInsights";
import type { RelationshipStory } from "@/features/relationship/story/domain/Story";

export type RelationshipDashboard = {
  story: RelationshipStory;

  insights: RelationshipInsights;
};