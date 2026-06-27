import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";

export function getHappyNarrative(): NarrativePackage {
  return {
    chapterTitle: "O começo de uma nova ideia",
    quote: "Toda história começa com um pequeno sim.",
    narrative:
      "Hoje vocês descobriram um interesse em comum. Pode ser o início de uma nova lembrança juntos.",
    reflection:
      "O importante não é apenas combinar, mas transformar essa descoberta em um momento vivido.",
    mood: "happy",
  };
}