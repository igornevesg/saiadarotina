import type { RelationshipStory } from "../../domain/Story";
import type { StoryEvent } from "../../domain/Chapter";
import { buildChapterFromEvents } from "./chapterBuilder";

function getDateKey(date: string) {
  return new Date(date).toISOString().split("T")[0];
}

export function buildStoryFromTimeline(params: {
  coupleId: string;
  events: StoryEvent[];
}): RelationshipStory {
  const grouped = params.events.reduce<Record<string, StoryEvent[]>>(
    (acc, event) => {
      const key = getDateKey(event.occurredAt);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(event);

      return acc;
    },
    {}
  );

  const chapters = Object.entries(grouped)
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([date, events], index) => buildChapterFromEvents(date, events, index));

  return {
    coupleId: params.coupleId,
    chapters,
    totalChapters: chapters.length,
    generatedAt: new Date().toISOString(),
  };
}