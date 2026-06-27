import { describe, expect, it } from "vitest";
import { selectNarrativeVariant } from "@/features/relationship/story/application/selectors/narrativeVariantSelector";
import type { NarrativeVariant } from "@/features/relationship/story/domain/NarrativeVariant";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";

function makeContext(overrides: Partial<StoryContext> = {}): StoryContext {
  return {
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
      phase: "discovery",
      totalEvents: 2,
      totalMatches: 1,
      totalMemories: 1,
      totalExperiences: 0,
      hasRecentActivity: true,
    },
    ...overrides,
  };
}

const variants: NarrativeVariant[] = [
  {
    conditions: {
      relationshipPhase: "discovery",
      maxMemories: 2,
    },
    package: {
      title: "Descoberta inicial",
      quote: "Quote descoberta",
      narrative: "Narrativa descoberta",
      reflection: "Reflexão descoberta",
      mood: "romantic",
    },
  },
  {
    conditions: {
      relationshipPhase: "connection",
      minMemories: 3,
    },
    package: {
      title: "Conexão crescente",
      quote: "Quote conexão",
      narrative: "Narrativa conexão",
      reflection: "Reflexão conexão",
      mood: "romantic",
    },
  },
  {
    package: {
      title: "Fallback geral",
      quote: "Quote fallback",
      narrative: "Narrativa fallback",
      reflection: "Reflexão fallback",
      mood: "neutral",
    },
  },
];

describe("narrativeVariantSelector", () => {
  it("seleciona variante compatível com fase e quantidade de memórias", () => {
    const result = selectNarrativeVariant(variants, makeContext(), "seed-1");

    expect(result.title).toBe("Descoberta inicial");
  });

  it("seleciona variante de conexão quando fase e memória são compatíveis", () => {
    const result = selectNarrativeVariant(
      variants,
      makeContext({
        intelligence: {
          phase: "connection",
          totalEvents: 10,
          totalMatches: 2,
          totalMemories: 5,
          totalExperiences: 0,
          hasRecentActivity: true,
        },
      }),
      "seed-1"
    );

    expect(result.title).toBe("Conexão crescente");
  });

  it("usa fallback quando nenhuma condição específica combina", () => {
    const result = selectNarrativeVariant(
      variants,
      makeContext({
        intelligence: {
          phase: "routine",
          totalEvents: 10,
          totalMatches: 2,
          totalMemories: 5,
          totalExperiences: 0,
          hasRecentActivity: false,
        },
      }),
      "seed-1"
    );

    expect(result.title).toBe("Fallback geral");
  });
});