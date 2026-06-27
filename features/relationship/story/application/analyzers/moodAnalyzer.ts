import type { NarrativeMood } from "@/features/relationship/story/domain/Narrative";
import type { StoryDominantEvent } from "@/features/relationship/story/domain/storyContext";

type MoodAnalyzerInput = {
  dominantEvent: StoryDominantEvent;
  hasMatch: boolean;
  hasMemory: boolean;
  hasExperience: boolean;
};

export function analyzeMood(input: MoodAnalyzerInput): NarrativeMood {
  if (input.dominantEvent === "memory") return "nostalgic";

  if (input.hasMatch && input.hasMemory) return "romantic";

  if (input.hasExperience) return "adventure";

  if (input.hasMatch) return "happy";

  return "neutral";
}