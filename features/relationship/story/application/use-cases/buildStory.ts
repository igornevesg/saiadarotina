import { buildStoryFromTimeline } from "@/features/relationship/story/infrastructure/builders/storyBuilder";
import { mapTimelineToStoryEvents } from "@/features/relationship/story/infrastructure/mappers/timelineToStoryMapper";

type TimelineEventDTO = {
  id: string;
  event_type: string;
  title: string;
  description: string | null;
  created_at: string;
};

type BuildStoryInput = {
  coupleId: string;
  events: TimelineEventDTO[];
};

export async function executeBuildStory(input: BuildStoryInput) {
  const storyEvents = mapTimelineToStoryEvents(input.events);

  return buildStoryFromTimeline({
    coupleId: input.coupleId,
    events: storyEvents,
  });
}