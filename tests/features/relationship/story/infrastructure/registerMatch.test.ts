import { describe, expect, it, vi } from "vitest";

vi.mock("@/infrastructure/eventBus/eventDispatcher", () => ({
  eventDispatcher: {
    dispatch: vi.fn(),
  },
}));

vi.mock("@/features/relationship/events/registerRelationshipListeners", () => ({
  registerRelationshipListeners: vi.fn(),
}));

import { eventDispatcher } from "@/infrastructure/eventBus/eventDispatcher";
import { executeRegisterMatch } from "@/features/relationship/application/use-cases/registerMatch";
import { DomainEvents } from "@/features/platform/events/domainEvents";

describe("Register Match", () => {
  it("deve disparar o evento MatchCreated", async () => {
    await executeRegisterMatch({
      coupleId: "couple-1",
      userId: "user-1",
      ideaId: "idea-1",
      title: "Surpresa romântica",
      matchType: "full",
    });

    expect(eventDispatcher.dispatch).toHaveBeenCalledWith(
      DomainEvents.MatchCreated,
      {
        coupleId: "couple-1",
        userId: "user-1",
        ideaId: "idea-1",
        title: "Surpresa romântica",
        matchType: "full",
      },
      {
        source: "relationship.register-match",
      }
    );
  });
});