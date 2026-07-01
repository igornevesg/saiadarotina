import { opportunityCards } from "@/features/relationship/insights/application/cards/opportunityCards";
import { strengthCards } from "@/features/relationship/insights/application/cards/strengthCards";
import { celebrationCards } from "@/features/relationship/insights/application/cards/celebrationCards";
import type { CoupleProfile } from "@/features/relationship/insights/domain/coupleProfile";
import type { InsightCard } from "@/features/relationship/insights/domain/insightCard";
import type { RelationshipSnapshot } from "@/features/relationship/insights/domain/relationshipSnapshot";

export function buildInsightCards(
  profile: CoupleProfile,
  snapshot: RelationshipSnapshot
): InsightCard[] {
  const cards: InsightCard[] = [];

  cards.push(strengthCards[profile.primaryStrength]);

  for (const opportunity of profile.opportunities) {
    cards.push(opportunityCards[opportunity]);
  }

  if (snapshot.metrics.totalMemories >= 50) {
    cards.push(celebrationCards.fiftyMemories);
  } else if (snapshot.metrics.totalMemories >= 10) {
    cards.push(celebrationCards.tenMemories);
  } else if (snapshot.metrics.totalMemories >= 1) {
    cards.push(celebrationCards.firstMemory);
  }

  if (snapshot.metrics.totalExperiences >= 10) {
    cards.push(celebrationCards.tenExperiences);
  } else if (snapshot.metrics.totalExperiences >= 1) {
    cards.push(celebrationCards.firstExperience);
  }

  if (snapshot.metrics.relationshipDays >= 365) {
    cards.push(celebrationCards.oneYear);
  }

  return cards;
}