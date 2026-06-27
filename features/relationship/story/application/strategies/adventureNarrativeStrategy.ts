import type { NarrativeStrategy } from "@/features/relationship/story/application/strategies/narrativeStrategy";
import { getAdventureNarrative } from "@/features/relationship/story/application/providers/adventureNarrativeProvider";

export const adventureNarrativeStrategy: NarrativeStrategy = {
  create() {
    return getAdventureNarrative();
  },
};