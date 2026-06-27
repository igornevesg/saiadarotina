import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { ChapterEventProfile } from "@/features/relationship/story/domain/chapterEventProfile";

function count(events: StoryEvent[], type: string) {
  return events.filter((event) => event.type === type).length;
}

export function buildChapterEventProfile(
  events: StoryEvent[]
): ChapterEventProfile {
  const totalMatches = count(events, "match_created");
  const totalMemories = count(events, "memory_created");
  const totalExperiences = count(events, "experience_completed");
  const totalPurchases = count(events, "product_purchased");
  const totalProductClicks = count(events, "product_clicked");

  const totalProductInteractions = totalPurchases + totalProductClicks;

  return {
    hasMatch: totalMatches > 0,
    hasMemory: totalMemories > 0,
    hasExperience: totalExperiences > 0,
    hasPurchase: totalPurchases > 0,
    hasProductInteraction: totalProductInteractions > 0,
    hasSpecialDate: count(events, "special_date_added") > 0,

    totalMatches,
    totalMemories,
    totalExperiences,
    totalPurchases,
    totalProductInteractions,
  };
}