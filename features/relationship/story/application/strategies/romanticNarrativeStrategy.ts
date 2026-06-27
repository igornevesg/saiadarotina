import type { NarrativeStrategy } from "@/features/relationship/story/application/strategies/narrativeStrategy";
import { getRomanticNarrative } from "@/features/relationship/story/application/providers/romanticNarrativeProvider";

export const romanticNarrativeStrategy: NarrativeStrategy = {
  create(events) {
    const seed = events.map((event) => event.id).join("-");

    return getRomanticNarrative(seed);
  },
};