import { buildRelationshipEngine } from "@/features/relationship/insights/public";
import { buildRelationshipStory } from "@/features/relationship/story/public";
import type { RelationshipDashboard } from "@/features/relationship/dashboard/domain/relationshipDashboard";
import type { StoryEvent } from "@/features/relationship/story/public";

type BuildRelationshipDashboardInput = {
  coupleId: string;
  events: StoryEvent[];
};

export function buildRelationshipDashboard({
  coupleId,
  events,
}: BuildRelationshipDashboardInput): RelationshipDashboard {
  const story = buildRelationshipStory({
  coupleId,
  events,
});

  const insights = buildRelationshipEngine({
  events,
  totalChapters: story.totalChapters,
}); 

  return {
    story,
    insights,
  };
}