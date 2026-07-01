import { describe, expect, it } from "vitest";

import { selectMomentFromSignals } from "@/features/relationship/recommendation/public";
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

describe("momentSelector", () => {
  it("seleciona um momento para quebrar a rotina quando há sinal de rotina", () => {
    const moment = selectMomentFromSignals([routineSignal]);

    expect(moment.id).toBe("romantic-night-at-home");
    expect(moment.tags).toContain("massagem");
  });

  it("seleciona o momento padrão quando não há sinais", () => {
    const moment = selectMomentFromSignals([]);

    expect(moment.id).toBe("romantic-night-at-home");
  });
});