import { describe, expect, it } from "vitest";

import { buildRecommendationPipeline } from "@/features/relationship/recommendation/public";

describe("buildRecommendationPipeline", () => {
  it("constrói o pipeline de recomendação", () => {
    const result = buildRecommendationPipeline();

    expect(result.context.daysSinceLastMemory).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(result.signals)).toBe(true);
    expect(result.recommendation).toBeTruthy();
    expect(result.recommendation.moment.title.length).toBeGreaterThan(3);
    expect(result.recommendation.presentation.why.length).toBeGreaterThan(3);
  });
});