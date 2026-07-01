import type { RelationshipContext } from "@/features/relationship/context/public";
import type { RecommendationSignal } from "@/features/relationship/recommendation/public";

const routinePriority = 90;

export function evaluateRoutineRecommendation(
  context: RelationshipContext
): RecommendationSignal | null {
  const routinePriority = 90;

  if (context.daysSinceLastMemory < 7) {
    return null;
  }

  return {
    id: "routine",
    priority: routinePriority,
    reason: {
      id: "routine",
      title: "Nossa relação pode estar entrando na rotina",
      narrative:
        "Faz alguns dias desde nossa última lembrança. Talvez seja uma boa oportunidade para viver algo diferente.",
      priority: routinePriority,
    },
  };
}