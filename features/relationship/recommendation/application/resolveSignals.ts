import type { RecommendationSignal } from "@/features/relationship/recommendation/public";

type ResolveSignalsOptions = {
  minPriority?: number;
  limit?: number;
};

function isRecommendationSignal(
  signal: RecommendationSignal | null
): signal is RecommendationSignal {
  return signal !== null;
}

export function resolveSignals(
  signals: Array<RecommendationSignal | null>,
  options: ResolveSignalsOptions = {}
): RecommendationSignal[] {
  const minPriority = options.minPriority ?? 0;
  const limit = options.limit ?? signals.length;

  return signals
    .filter(isRecommendationSignal)
    .filter((signal) => signal.priority >= minPriority)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit);
}