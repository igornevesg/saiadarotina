import { describe, expect, it } from "vitest";
import { resolveNarrativeStrategy } from "@/features/relationship/story/application/strategies/resolveNarrativeStrategy";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

const romanticContext: StoryContext = {
  dominantEvent: "match",
  totalEvents: 2,
  hasMatch: true,
  hasMemory: true,
  hasExperience: false,
  hasSpecialDate: false,
  hasMilestone: false,
  hasProductInteraction: false,
  suggestedMood: "romantic",
  intelligence: {
    phase: "connection",
    totalEvents: 2,
    totalMatches: 1,
    totalMemories: 1,
    totalExperiences: 0,
    hasRecentActivity: true,
  },
};

describe("resolveNarrativeStrategy", () => {
  it("deve retornar estratégia romântica", () => {
    const strategy = resolveNarrativeStrategy(romanticContext);

    expect(strategy.create([], romanticContext).mood).toBe("romantic");
  });
});