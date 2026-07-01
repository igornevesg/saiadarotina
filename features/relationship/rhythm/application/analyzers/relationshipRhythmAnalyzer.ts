import type { InsightMetrics } from "@/features/relationship/insights/public";
import type {
  RelationshipRhythm,
  RelationshipRhythmStatus,
} from "@/features/relationship/rhythm/domain/relationshipRhythm";
import { relationshipRhythmThresholds } from "@/features/relationship/rhythm/domain/relationshipRhythmThresholds";

function resolveRhythmStatus(metrics: InsightMetrics): RelationshipRhythmStatus {
  const { needsNewExperiences, fallingIntoRoutine, active } =
    relationshipRhythmThresholds;

  if (
    metrics.totalExperiences <= needsNewExperiences.maxExperiences &&
    metrics.relationshipDays >= needsNewExperiences.minRelationshipDays
  ) {
    return "needsNewExperiences";
  }

  if (
    metrics.totalExperiences <= fallingIntoRoutine.maxExperiences &&
    metrics.relationshipDays >= fallingIntoRoutine.minRelationshipDays
  ) {
    return "fallingIntoRoutine";
  }

  if (
    metrics.totalExperiences >= active.minExperiences ||
    metrics.totalMemories >= active.minMemories
  ) {
    return "active";
  }

  return "stable";
}

export function analyzeRelationshipRhythm(
  metrics: InsightMetrics
): RelationshipRhythm {
  const status = resolveRhythmStatus(metrics);

  if (status === "needsNewExperiences") {
    return {
      status,
      title: "Nossa rotina pede uma nova descoberta",
      narrative:
        "Nossa história parece ter entrado em um período mais quieto. Talvez seja hora de viver algo diferente e transformar um dia comum em uma nova lembrança.",
      recommendation:
        "Experimentar uma nova experiência juntos pode reacender a curiosidade e escrever um capítulo diferente.",
    };
  }

  if (status === "fallingIntoRoutine") {
    return {
      status,
      title: "Nossa relação pode estar caindo na rotina",
      narrative:
        "Alguns sinais mostram que nossa história está precisando de novos momentos. Isso não é um problema, é um convite para sair do automático.",
      recommendation:
        "Talvez seja hora de experimentar novas experiências e criar uma lembrança que fuja do comum.",
    };
  }

  if (status === "active") {
    return {
      status,
      title: "Nossa história segue em movimento",
      narrative:
        "Os momentos registrados mostram que seguimos criando memórias, descobertas e experiências que fortalecem nossa conexão.",
      recommendation:
        "Continuar vivendo pequenas novidades ajuda essa história a permanecer viva.",
    };
  }

  return {
    status,
    title: "Nossa história está em um ritmo tranquilo",
    narrative:
      "Nem toda fase precisa ser intensa. Às vezes, a relação também cresce nos dias calmos e nos pequenos gestos.",
    recommendation:
      "Quando fizer sentido, uma nova experiência pode trazer frescor para a nossa jornada.",
  };
}