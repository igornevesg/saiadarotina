import type { NarrativeStrategy } from "@/features/relationship/story/application/strategies/narrativeStrategy";
import { getHappyNarrative } from "@/features/relationship/story/application/providers/happyNarrativeProvider";

export const happyNarrativeStrategy: NarrativeStrategy = {
  create() {
    return getHappyNarrative();
  },
};