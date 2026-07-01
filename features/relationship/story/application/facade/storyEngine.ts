import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { RelationshipStory } from "@/features/relationship/story/domain/Story";
import { buildStoryFromTimeline } from "@/features/relationship/story/infrastructure/builders/storyBuilder";

type BuildRelationshipStoryInput = {
  coupleId: string;
  events: StoryEvent[];
};

export function buildRelationshipStory({
  coupleId,
  events,
}: BuildRelationshipStoryInput): RelationshipStory {
  return buildStoryFromTimeline({
    coupleId,
    events,
  });
}