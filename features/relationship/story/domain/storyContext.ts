import type { NarrativeMood } from "@/features/relationship/story/domain/Narrative";
import type { RelationshipIntelligence } from "@/features/relationship/intelligence/domain/relationshipIntelligence";

export type StoryDominantEvent =
  | "match"
  | "memory"
  | "experience"
  | "specialDate"
  | "milestone"
  | "product"
  | "unknown";

export type StoryContext = {
  dominantEvent: StoryDominantEvent;
  totalEvents: number;
  hasMatch: boolean;
  hasMemory: boolean;
  hasExperience: boolean;
  hasSpecialDate: boolean;
  hasMilestone: boolean;
  hasProductInteraction: boolean;
  suggestedMood: NarrativeMood;
  intelligence: RelationshipIntelligence;
};