import { describe, expect, it } from "vitest";
import { buildStoryEpilogue } from "@/features/relationship/story/application/builders/storyEpilogueBuilder";

describe("storyEpilogueBuilder", () => {
  it("gera um epílogo com resumo da jornada", () => {
    const epilogue = buildStoryEpilogue({
      chapters: [
        {
          id: "1",
          title: "Capítulo I",
          subtitle: "",
          headline: "",
          narrative: "",
          quote: "",
          reflection: "",
          mood: "romantic",
          events: [
            {
              id: "1",
              occurredAt: new Date(),
              type: "match_created",
            },
            {
              id: "2",
              occurredAt: new Date(),
              type: "memory_created",
            },
            {
              id: "3",
              occurredAt: new Date(),
              type: "experience_completed",
            },
          ],
        },
      ],
    });

    expect(epilogue.title).toBeTruthy();
    expect(epilogue.text).toContain("capítulo");
    expect(epilogue.generatedAt).toBeTruthy();
  });
});