import { describe, expect, it } from "vitest";

import { resolveSignals } from "@/features/relationship/recommendation/application/resolveSignals";
import type { RecommendationSignal } from "@/features/relationship/recommendation/public";

const routineSignal: RecommendationSignal = {
  id: "routine",
  priority: 90,
  reason: {
    id: "routine",
    title: "Nossa relação pode estar entrando na rotina",
    narrative:
      "Faz alguns dias desde nossa última lembrança. Talvez seja uma boa oportunidade para viver algo diferente.",
    priority: 90,
  },
};

const adventureSignal: RecommendationSignal = {
  id: "adventure",
  priority: 60,
  reason: {
    id: "adventure",
    title: "Nossa história pode ganhar uma nova descoberta",
    narrative:
      "Uma pequena novidade pode transformar um dia comum em uma lembrança especial.",
    priority: 60,
  },
};

describe("resolveSignals", () => {
  it("remove sinais nulos e ordena por prioridade", () => {
    const result = resolveSignals([adventureSignal, null, routineSignal]);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("routine");
    expect(result[1].id).toBe("adventure");
  });

  it("filtra sinais abaixo da prioridade mínima", () => {
    const result = resolveSignals(
      [adventureSignal, routineSignal],
      { minPriority: 80 }
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("routine");
  });

  it("limita a quantidade de sinais retornados", () => {
    const result = resolveSignals(
      [adventureSignal, routineSignal],
      { limit: 1 }
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("routine");
  });
});