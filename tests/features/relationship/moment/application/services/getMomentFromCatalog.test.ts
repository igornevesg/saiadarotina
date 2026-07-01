import { describe, expect, it } from "vitest";

import { getMomentFromCatalog } from "@/features/relationship/moment/application/services/getMomentFromCatalog";
import type { Moment } from "@/features/relationship/moment/public";

const catalog: Moment[] = [
  {
    id: "first-moment",
    title: "Primeiro momento",
    narrative: "Um momento para testar o catálogo vivo.",
    category: "romance",
    intensity: "light",
    estimatedDurationMinutes: 60,
    icon: "✨",
    tags: ["teste"],
  },
  {
    id: "second-moment",
    title: "Segundo momento",
    narrative: "Outro momento para testar progressão.",
    category: "connection",
    intensity: "light",
    estimatedDurationMinutes: 90,
    icon: "🌙",
    tags: ["teste", "progressao"],
  },
];

describe("getMomentFromCatalog", () => {
  it("retorna o primeiro momento por padrão", () => {
    const moment = getMomentFromCatalog(catalog);

    expect(moment.id).toBe("first-moment");
  });

  it("retorna o momento pelo índice preferido", () => {
    const moment = getMomentFromCatalog(catalog, {
      preferredIndex: 1,
    });

    expect(moment.id).toBe("second-moment");
  });

  it("normaliza índice maior que o tamanho do catálogo", () => {
    const moment = getMomentFromCatalog(catalog, {
      preferredIndex: 3,
    });

    expect(moment.id).toBe("second-moment");
  });

  it("lança erro quando o catálogo está vazio", () => {
    expect(() => getMomentFromCatalog([])).toThrow(
      "Catálogo de momentos vazio."
    );
  });
});