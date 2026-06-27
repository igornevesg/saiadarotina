import type { StoryChapter } from "@/features/relationship/story/domain/Chapter";
import type { NarrativeMood } from "@/features/relationship/story/domain/Narrative";
import type { RelationshipPhase } from "@/features/relationship/intelligence/domain/relationshipPhase";
import type { StorySummaryContext } from "@/features/relationship/story/domain/storySummaryContext";

type BuildStorySummaryInput = {
  chapters: StoryChapter[];
};

function countEvents(chapters: StoryChapter[]) {
  return chapters.reduce((total, chapter) => total + chapter.events.length, 0);
}

function countByType(chapters: StoryChapter[], type: string) {
  return chapters.reduce((total, chapter) => {
    return total + chapter.events.filter((event) => event.type === type).length;
  }, 0);
}

function getDominantEmotion(chapters: StoryChapter[]): NarrativeMood {
  const counts = chapters.reduce<Record<string, number>>((acc, chapter) => {
    acc[chapter.mood] = (acc[chapter.mood] || 0) + 1;
    return acc;
  }, {});

  const mostFrequent = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

  return (mostFrequent?.[0] as NarrativeMood) || "neutral";
}

function getDominantJourney(chapters: StoryChapter[]): RelationshipPhase {
  const totalExperiences = countByType(chapters, "experience_completed");
  const totalMemories = countByType(chapters, "memory_created");
  const totalMatches = countByType(chapters, "match_created");
  const totalSpecialDates = countByType(chapters, "special_date_added");

  if (totalSpecialDates > 0) return "celebration";
  if (totalExperiences > totalMatches && totalExperiences > 0) return "adventure";
  if (totalMemories >= 3) return "connection";
  if (totalMatches > 0) return "discovery";

  return "routine";
}

export function buildStorySummary({
  chapters,
}: BuildStorySummaryInput): StorySummaryContext {
  return {
    totalChapters: chapters.length,
    totalEvents: countEvents(chapters),
    totalMatches: countByType(chapters, "match_created"),
    totalMemories: countByType(chapters, "memory_created"),
    totalExperiences: countByType(chapters, "experience_completed"),
    totalSpecialDates: countByType(chapters, "special_date_added"),
    dominantJourney: getDominantJourney(chapters),
    dominantEmotion: getDominantEmotion(chapters),
  };
}