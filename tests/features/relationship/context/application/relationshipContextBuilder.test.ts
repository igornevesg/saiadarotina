import { describe, expect, it } from "vitest";

import { buildRelationshipContext } from "@/features/relationship/context/public";

describe("relationshipContextBuilder", () => {
  it("constrói um contexto inicial para inteligência da relação", () => {
    const context = buildRelationshipContext();

    expect(context.daysSinceLastMemory).toBeGreaterThanOrEqual(0);
    expect(context.totalMemories).toBeGreaterThanOrEqual(0);
    expect(context.favoriteMoments).toBeGreaterThanOrEqual(0);
  });
});