import { describe, expect, it } from "vitest";
import { selectQuote } from "@/features/relationship/story/application/selectors/quoteSelector";

describe("quoteSelector", () => {
  it("seleciona uma quote de forma determinística", () => {
    const quotes = ["Quote A", "Quote B", "Quote C"];

    const first = selectQuote(quotes, "seed-1");
    const second = selectQuote(quotes, "seed-1");

    expect(first).toBe(second);
    expect(quotes).toContain(first);
  });

  it("retorna string vazia quando não há quotes", () => {
    expect(selectQuote([], "seed-1")).toBe("");
  });
});