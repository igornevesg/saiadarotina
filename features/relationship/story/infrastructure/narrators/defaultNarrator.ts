import type { Narrator } from "@/features/relationship/story/application/narrators/narrator";
import { buildStoryContext } from "@/features/relationship/story/application/builders/storyContextBuilder";
import { resolveNarrativeStrategy } from "@/features/relationship/story/application/strategies/resolveNarrativeStrategy";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

class DefaultNarrator implements Narrator {
  create(
    events: StoryEvent[],
    context: StoryContext
  ): NarrativePackage {
    const strategy = resolveNarrativeStrategy(context);

    return strategy.create(events, context);
  }
}

export const defaultNarrator = new DefaultNarrator();

export function createDefaultNarrative(input: {
  events: StoryEvent[];
}): NarrativePackage {
  const context = buildStoryContext(input.events);

  return defaultNarrator.create(input.events, context);
}