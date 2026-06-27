import { describe, expect, it } from "vitest";
import { groupStoryEvents } from "@/features/relationship/story/application/groupers/storyGrouper";

describe("storyGrouper", () => {
  it("agrupa eventos do mesmo dia", () => {
    const groups = groupStoryEvents([
      {
        id: "1",
        type: "match_created",
        title: "Match",
        occurredAt: "2026-07-01T10:00:00Z",
      },
      {
        id: "2",
        type: "memory_created",
        title: "Memória",
        occurredAt: "2026-07-01T20:00:00Z",
      },
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].events).toHaveLength(2);
  });

  it("mantém match seguido de memória em dias consecutivos no mesmo capítulo", () => {
    const groups = groupStoryEvents([
      {
        id: "1",
        type: "match_created",
        title: "Match",
        occurredAt: "2026-07-01T22:00:00Z",
      },
      {
        id: "2",
        type: "memory_created",
        title: "Memória",
        occurredAt: "2026-07-02T09:00:00Z",
      },
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0].events).toHaveLength(2);
  });

  it("separa eventos distantes em capítulos diferentes", () => {
    const groups = groupStoryEvents([
      {
        id: "1",
        type: "match_created",
        title: "Match",
        occurredAt: "2026-07-01T10:00:00Z",
      },
      {
        id: "2",
        type: "memory_created",
        title: "Memória",
        occurredAt: "2026-07-10T10:00:00Z",
      },
    ]);

    expect(groups).toHaveLength(2);
  });

  it("mantém os grupos em ordem cronológica", () => {
    const groups = groupStoryEvents([
      {
        id: "2",
        type: "memory_created",
        title: "Segundo",
        occurredAt: "2026-07-05T10:00:00Z",
      },
      {
        id: "1",
        type: "match_created",
        title: "Primeiro",
        occurredAt: "2026-07-01T10:00:00Z",
      },
    ]);

    expect(groups[0].events[0].title).toBe("Primeiro");
    expect(groups[1].events[0].title).toBe("Segundo");
  });

  it("retorna lista vazia quando não existem eventos", () => {
    expect(groupStoryEvents([])).toEqual([]);
  });
});