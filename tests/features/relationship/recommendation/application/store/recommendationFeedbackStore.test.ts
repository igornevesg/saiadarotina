import { beforeEach, describe, expect, it } from "vitest";

import {
  clearRecommendationFeedback,
  listRecommendationFeedback,
  saveRecommendationFeedback,
} from "@/features/relationship/recommendation/application/store/recommendationFeedbackStore";

describe("recommendationFeedbackStore", () => {
  beforeEach(() => {
    clearRecommendationFeedback();
  });

  it("salva feedback", () => {
    saveRecommendationFeedback({
      momentId: "romantic-night",
      action: "liked",
      createdAt: new Date(),
    });

    expect(listRecommendationFeedback()).toHaveLength(1);
  });

  it("mantém ordem cronológica", () => {
    saveRecommendationFeedback({
      momentId: "1",
      action: "liked",
      createdAt: new Date(),
    });

    saveRecommendationFeedback({
      momentId: "2",
      action: "anotherSuggestion",
      createdAt: new Date(),
    });

    expect(listRecommendationFeedback()[1].momentId).toBe("2");
  });
});