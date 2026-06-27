import type { NarrativeStrategy } from "@/features/relationship/story/application/strategies/narrativeStrategy";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";
import { adventureNarrativeStrategy } from "@/features/relationship/story/application/strategies/adventureNarrativeStrategy";
import { happyNarrativeStrategy } from "@/features/relationship/story/application/strategies/happyNarrativeStrategy";
import { neutralNarrativeStrategy } from "@/features/relationship/story/application/strategies/neutralNarrativeStrategy";
import { nostalgicNarrativeStrategy } from "@/features/relationship/story/application/strategies/nostalgicNarrativeStrategy";
import { romanticNarrativeStrategy } from "@/features/relationship/story/application/strategies/romanticNarrativeStrategy";

export function resolveNarrativeStrategy(
  context: StoryContext
): NarrativeStrategy {
  if (context.hasMatch && context.hasMemory) {
    return romanticNarrativeStrategy;
  }

  if (context.dominantEvent === "memory") {
    return nostalgicNarrativeStrategy;
  }

  if (context.dominantEvent === "experience") {
    return adventureNarrativeStrategy;
  }

  if (context.dominantEvent === "match") {
    return happyNarrativeStrategy;
  }

  return neutralNarrativeStrategy;
}