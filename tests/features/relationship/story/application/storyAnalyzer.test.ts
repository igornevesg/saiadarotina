import { describe, expect, it } from "vitest";
import { analyzeStoryEvents } from "@/features/relationship/story/application/analyzers/storyAnalyzer";
import { relationshipFactory } from "@/tests/factories/relationshipFactory";

describe("storyAnalyzer", () => {
  it("identifica match e memória como contexto romântico", () => {
    const context = analyzeStoryEvents([
      relationshipFactory.storyEvent({ type: "match_created" }),
      relationshipFactory.storyEvent({ type: "memory_created" }),
    ]);

    expect(context.hasMatch).toBe(true);
    expect(context.hasMemory).toBe(true);
    expect(context.suggestedMood).toBe("romantic");
  });

  it("identifica memória como evento dominante nostálgico", () => {
    const context = analyzeStoryEvents([
      relationshipFactory.storyEvent({ type: "memory_created" }),
      relationshipFactory.storyEvent({ type: "memory_created" }),
      relationshipFactory.storyEvent({ type: "match_created" }),
    ]);

    expect(context.dominantEvent).toBe("memory");
    expect(context.suggestedMood).toBe("nostalgic");
  });

  it("retorna contexto neutro quando não há eventos", () => {
    const context = analyzeStoryEvents([]);

    expect(context.dominantEvent).toBe("unknown");
    expect(context.totalEvents).toBe(0);
    expect(context.suggestedMood).toBe("neutral");
  });
});