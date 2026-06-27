import { analyzeRelationshipIntelligence } from "@/features/relationship/intelligence/application/analyzers/relationshipIntelligenceAnalyzer";
import { analyzeDominantEvent } from "@/features/relationship/story/application/analyzers/dominantEventAnalyzer";
import { analyzeMood } from "@/features/relationship/story/application/analyzers/moodAnalyzer";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

function countByType(events: StoryEvent[]) {
  return events.reduce<Record<string, number>>((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {});
}

export function analyzeStoryEvents(
  events: StoryEvent[]
): Omit<StoryContext, "eventProfile"> {
  const counts = countByType(events);

  const hasMatch = Boolean(counts.match_created);
  const hasMemory = Boolean(counts.memory_created);
  const hasExperience = Boolean(counts.experience_completed);
  const hasSpecialDate = Boolean(counts.special_date_added);
  const hasMilestone = Boolean(counts.milestone_unlocked);
  const hasProductInteraction = Boolean(
    counts.product_clicked || counts.product_purchased
  );

  const dominantEvent = analyzeDominantEvent(events);
  const suggestedMood = analyzeMood({
    dominantEvent,
    hasMatch,
    hasMemory,
    hasExperience,
  });

  const intelligence = analyzeRelationshipIntelligence(events);

  return {
    dominantEvent,
    totalEvents: events.length,
    hasMatch,
    hasMemory,
    hasExperience,
    hasSpecialDate,
    hasMilestone,
    hasProductInteraction,
    suggestedMood,
    intelligence,
  };
}