import { beforeEach, describe, expect, it } from "vitest";

import {
  advanceMomentIndex,
  getCurrentMomentIndex,
  resetMomentIndex,
} from "@/features/relationship/recommendation/application/session/recommendationSession";

describe("recommendationSession", () => {
  beforeEach(() => {
    resetMomentIndex();
  });

  it("inicia em zero", () => {
    expect(getCurrentMomentIndex()).toBe(0);
  });

  it("avança o índice", () => {
    advanceMomentIndex();

    expect(getCurrentMomentIndex()).toBe(1);
  });
});