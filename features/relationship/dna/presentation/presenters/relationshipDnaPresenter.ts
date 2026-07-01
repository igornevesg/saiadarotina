import type { RelationshipDnaViewModel } from "@/features/relationship/dna/presentation/viewModels/relationshipDnaViewModel";

export function presentRelationshipDna(): RelationshipDnaViewModel {
  return {
    title: "Nosso DNA",
    profile: "Românticos e tranquilos",
    narrative:
      "A nossa história mostra que valorizamos momentos simples, presença e experiências que aproximam.",
    signals: [
      "Gostamos de viver experiências com calma.",
      "Criamos boas lembranças nos pequenos detalhes.",
      "Nossa conexão cresce quando damos espaço para estar presentes.",
    ],
  };
}