import { describe, expect, it } from "vitest";

import { evaluateRoutineRecommendation } from "@/features/relationship/recommendation/policies/routineRecommendationPolicy";

describe("routineRecommendationPolicy", () => {
  it("gera um sinal de rotina quando faz 7 dias ou mais desde a última memória", () => {
    const signal = evaluateRoutineRecommendation({
      daysSinceLastMemory: 7,
    });

    expect(signal).not.toBeNull();
    expect(signal?.id).toBe("routine");
    expect(signal?.priority).toBe(90);
    expect(signal?.reason.id).toBe("routine");
  });

  it("não gera sinal quando ainda há uma memória recente", () => {
    const signal = evaluateRoutineRecommendation({
      daysSinceLastMemory: 3,
    });

    expect(signal).toBeNull();
  });
});