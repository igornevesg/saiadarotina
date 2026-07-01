import { romanceMomentCatalog } from "@/features/relationship/moment/application/catalogs/romanceMomentCatalog";
import type { Moment } from "@/features/relationship/moment/public";
import type { RecommendationSignal } from "@/features/relationship/recommendation/public";
import { getMomentFromCatalog } from "@/features/relationship/moment/application/services/getMomentFromCatalog";
import {
  getCurrentMomentIndex,
} from "@/features/relationship/recommendation/application/session/recommendationSession";

export function selectMomentFromSignals(
  signals: RecommendationSignal[]
): Moment {
  const hasRoutineSignal = signals.some((signal) => signal.id === "routine");

  if (hasRoutineSignal) {
    return getMomentFromCatalog(romanceMomentCatalog, {
  preferredIndex: getCurrentMomentIndex(),
});
  }

  return getMomentFromCatalog(romanceMomentCatalog, {
  preferredIndex: getCurrentMomentIndex(),
});
}