import { expect } from "vitest";

export function expectValidStory(story: any) {
  expect(story).toBeDefined();

  expect(story.chapters).toBeDefined();

  expect(Array.isArray(story.chapters)).toBe(true);

  expect(story.totalChapters).toBeGreaterThan(0);
}