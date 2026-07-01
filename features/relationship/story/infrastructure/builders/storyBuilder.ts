import { buildStorySummary } from "@/features/relationship/story/application/builders/storySummaryBuilder";
import { getRomanticEpilogue } from "@/features/relationship/story/application/providers/epilogue/romanticEpilogueProvider";
import { groupStoryEvents } from "@/features/relationship/story/application/groupers/storyGrouper";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { RelationshipStory } from "@/features/relationship/story/domain/Story";
import { buildChapterFromEvents } from "@/features/relationship/story/infrastructure/builders/chapterBuilder";

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

  const summary = buildStorySummary({
    chapters,
  });

  const epilogue = getRomanticEpilogue(summary);

  return {
    coupleId: params.coupleId,
    chapters,
    epilogue,
    totalChapters: chapters.length,
    generatedAt: new Date().toISOString(),
  };
}