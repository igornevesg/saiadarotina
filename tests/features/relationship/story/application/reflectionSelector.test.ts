import { describe, expect, it } from "vitest";
import { selectReflection } from "@/features/relationship/story/application/selectors/reflectionSelector";

describe("reflectionSelector", () => {
  it("seleciona uma reflexão de forma determinística", () => {
    const reflections = ["Reflexão A", "Reflexão B", "Reflexão C"];

    const first = selectReflection(reflections, "seed-1");
    const second = selectReflection(reflections, "seed-1");

    expect(first).toBe(second);
    expect(reflections).toContain(first);
  });

  it("retorna string vazia quando não há reflexões", () => {
    expect(selectReflection([], "seed-1")).toBe("");
  });
});