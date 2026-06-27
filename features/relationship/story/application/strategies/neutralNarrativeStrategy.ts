import type { NarrativeStrategy } from "@/features/relationship/story/application/strategies/narrativeStrategy";
import { getNeutralNarrative } from "@/features/relationship/story/application/providers/neutralNarrativeProvider";

export const neutralNarrativeStrategy: NarrativeStrategy = {
  create(events) {
    return getNeutralNarrative(events);
  },
};