import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

type TimelineEventDTO = {
  id: string;
  event_type: string;
  title: string;
  description: string | null;
  created_at: string;
};

export function mapTimelineToStoryEvents(
  events: TimelineEventDTO[]
): StoryEvent[] {
  return events.map((event) => ({
    id: event.id,
    type: event.event_type,
    title: event.title,
    description: event.description,
    occurredAt: event.created_at,
  }));
}