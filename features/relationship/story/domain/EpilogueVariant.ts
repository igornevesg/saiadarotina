import type { NarrativeMood } from "@/features/relationship/story/domain/Narrative";
import type { RelationshipPhase } from "@/features/relationship/intelligence/domain/relationshipPhase";

export type EpilogueVariant = {
  conditions?: {
    dominantJourney?: RelationshipPhase;
    dominantEmotion?: NarrativeMood;
  };

  title: string;

  text: string;
};