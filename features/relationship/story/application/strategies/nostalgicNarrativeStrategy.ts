import type { NarrativeStrategy } from "@/features/relationship/story/application/strategies/narrativeStrategy";
import { getNostalgicNarrative } from "@/features/relationship/story/application/providers/nostalgicNarrativeProvider";

export const nostalgicNarrativeStrategy: NarrativeStrategy = {
  create() {
    return getNostalgicNarrative();
  },
};