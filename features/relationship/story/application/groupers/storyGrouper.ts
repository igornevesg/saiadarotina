import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

export type StoryEventGroup = {
  date: string;
  events: StoryEvent[];
};

function getDateKey(date: string) {
  return new Date(date).toISOString().split("T")[0];
}

function getDaysDifference(dateA: string, dateB: string) {
  const first = new Date(dateA);
  const second = new Date(dateB);

  const diffMs = Math.abs(second.getTime() - first.getTime());

  return Math.floor(diffMs / 1000 / 60 / 60 / 24);
}

function shouldStayInSameGroup(params: {
  previousEvent: StoryEvent;
  currentEvent: StoryEvent;
}) {
  const previousDate = getDateKey(params.previousEvent.occurredAt);
  const currentDate = getDateKey(params.currentEvent.occurredAt);

  if (previousDate === currentDate) return true;

  const daysDifference = getDaysDifference(
    params.previousEvent.occurredAt,
    params.currentEvent.occurredAt
  );

  const currentClosesPreviousStory =
    params.previousEvent.type === "match_created" &&
    params.currentEvent.type === "memory_created" &&
    daysDifference <= 1;

  if (currentClosesPreviousStory) return true;

  return false;
}

export function groupStoryEvents(events: StoryEvent[]): StoryEventGroup[] {
  if (events.length === 0) return [];

  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime()
  );

  const groups: StoryEventGroup[] = [];

  for (const event of sortedEvents) {
    const lastGroup = groups[groups.length - 1];
    const previousEvent = lastGroup?.events[lastGroup.events.length - 1];

    if (
      lastGroup &&
      previousEvent &&
      shouldStayInSameGroup({
        previousEvent,
        currentEvent: event,
      })
    ) {
      lastGroup.events.push(event);
      continue;
    }

    groups.push({
      date: getDateKey(event.occurredAt),
      events: [event],
    });
  }

  return groups;
}