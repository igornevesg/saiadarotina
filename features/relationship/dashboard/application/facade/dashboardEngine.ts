import { buildRelationshipDashboard } from "@/features/relationship/dashboard/application/builders/relationshipDashboardBuilder";
import type { RelationshipDashboard } from "@/features/relationship/dashboard/domain/relationshipDashboard";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

type BuildDashboardInput = {
  coupleId: string;
  events: StoryEvent[];
};

export function buildDashboardEngine({
  coupleId,
  events,
}: BuildDashboardInput): RelationshipDashboard {
  return buildRelationshipDashboard({
    coupleId,
    events,
  });
}