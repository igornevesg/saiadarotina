import { describe, expect, it } from "vitest";
import { createDefaultNarrative } from "@/features/relationship/story/infrastructure/narrators/defaultNarrator";

describe("defaultNarrator", () => {
  it("gera pacote narrativo para match e memória no mesmo capítulo", () => {
    const result = createDefaultNarrative({
      events: [
        {
          id: "1",
          type: "match_created",
          title: "Surpresa romântica",
          occurredAt: "2026-06-26T10:00:00.000Z",
        },
        {
          id: "2",
          type: "memory_created",
          title: "Nossa primeira memória",
          occurredAt: "2026-06-26T11:00:00.000Z",
        },
      ],
    });

    expect(result.quote).toBeTruthy();
    expect(result.narrative).toContain("interesse em comum");
    expect(result.reflection).toBeTruthy();
    expect(result.mood).toBe("romantic");
  });
});