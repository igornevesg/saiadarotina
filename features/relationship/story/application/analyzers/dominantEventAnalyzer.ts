import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { StoryDominantEvent } from "@/features/relationship/story/domain/storyContext";

function countByType(events: StoryEvent[]) {
  return events.reduce<Record<string, number>>((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {});
}

export function analyzeDominantEvent(events: StoryEvent[]): StoryDominantEvent {
  const counts = countByType(events);

  const groups: Record<string, StoryDominantEvent> = {
    match_created: "match",
    memory_created: "memory",
    experience_completed: "experience",
    special_date_added: "specialDate",
    milestone_unlocked: "milestone",
    product_clicked: "product",
    product_purchased: "product",
  };

  const mostFrequent = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

  if (!mostFrequent) return "unknown";

  return groups[mostFrequent[0]] || "unknown";
}