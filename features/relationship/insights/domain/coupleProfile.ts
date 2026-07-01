import type { CoupleOpportunity } from "@/features/relationship/insights/domain/coupleOpportunity";
import type { CoupleStrength } from "@/features/relationship/insights/domain/coupleStrength";

export type CoupleProfile = {
  primaryStrength: CoupleStrength;

  secondaryStrength: CoupleStrength;

  opportunities: CoupleOpportunity[];
};