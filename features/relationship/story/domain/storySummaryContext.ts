import type { NarrativeMood } from "@/features/relationship/story/domain/Narrative";
import type { RelationshipPhase } from "@/features/relationship/intelligence/domain/relationshipPhase";

export type StorySummaryContext = {
  totalChapters: number;
  totalEvents: number;

  totalMatches: number;
  totalMemories: number;
  totalExperiences: number;
  totalSpecialDates: number;

  dominantJourney: RelationshipPhase;
  dominantEmotion: NarrativeMood;
};