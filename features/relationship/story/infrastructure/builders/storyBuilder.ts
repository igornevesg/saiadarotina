import type { RelationshipStory } from "@/features/relationship/story/domain/Story";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import { buildChapterFromEvents } from "@/features/relationship/story/infrastructure/builders/chapterBuilder";
import { groupStoryEvents } from "@/features/relationship/story/application/groupers/storyGrouper";

export function buildStoryFromTimeline(params: {
  coupleId: string;
  events: StoryEvent[];
}): RelationshipStory {
  const groups = groupStoryEvents(params.events);

  const chapters = groups
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((group, index) =>
      buildChapterFromEvents(group.date, group.events, index)
    );

  return {
    coupleId: params.coupleId,
    chapters,
    totalChapters: chapters.length,
    generatedAt: new Date().toISOString(),
  };
}