"use client";

import { buildRelationshipStory } from "@/features/relationship/story/public";
import { listMemoryStoryEvents } from "@/features/relationship/memory/public";
import { StoryPage } from "@/features/relationship/story/ui/storyPage/storyPage";

export function StoryPageClient() {
  const events = listMemoryStoryEvents();

  const story = buildRelationshipStory({
    coupleId: "mock-couple",
    events:
      events.length > 0
        ? events
        : [
            {
              id: "memory-1",
              type: "memory",
              title: "Noite romântica em casa",
              description:
                "Uma noite simples, mas cheia de presença, conversa e carinho.",
              occurredAt: new Date().toISOString(),
            },
          ],
  });

  return <StoryPage story={story} />;
}