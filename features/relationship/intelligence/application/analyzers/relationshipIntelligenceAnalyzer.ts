import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { RelationshipIntelligence } from "@/features/relationship/intelligence/domain/relationshipIntelligence";

function getDaysSinceLastEvent(events: StoryEvent[]) {
  if (events.length === 0) return null;

  const latestEvent = [...events].sort(
    (a, b) =>
      new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
  )[0];

  const now = new Date();
  const latestDate = new Date(latestEvent.occurredAt);

  return Math.floor(
    (now.getTime() - latestDate.getTime()) / 1000 / 60 / 60 / 24
  );
}

export function analyzeRelationshipIntelligence(
  events: StoryEvent[]
): RelationshipIntelligence {
  const totalMatches = events.filter((event) => event.type === "match_created")
    .length;

  const totalMemories = events.filter((event) => event.type === "memory_created")
    .length;

  const totalExperiences = events.filter(
    (event) => event.type === "experience_completed"
  ).length;

  const daysSinceLastEvent = getDaysSinceLastEvent(events);

  const hasRecentActivity =
    daysSinceLastEvent !== null && daysSinceLastEvent <= 7;

  let phase: RelationshipIntelligence["phase"] = "discovery";

  if (totalExperiences > 0) {
    phase = "adventure";
  } else if (totalMemories >= 3) {
    phase = "connection";
  } else if (events.length >= 8 && !hasRecentActivity) {
    phase = "routine";
  } else if (events.some((event) => event.type === "milestone_unlocked")) {
    phase = "celebration";
  }

  return {
    phase,
    totalEvents: events.length,
    totalMatches,
    totalMemories,
    totalExperiences,
    hasRecentActivity,
  };
}