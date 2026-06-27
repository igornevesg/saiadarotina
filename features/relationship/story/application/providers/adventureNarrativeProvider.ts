import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";

export function getAdventureNarrative(): NarrativePackage {
  return {
    title: "Uma experiência vivida",
    quote: "Experiências vividas viram páginas que ninguém apaga.",
    narrative:
      "Vocês viveram uma nova experiência juntos. Mais uma página foi escrita nessa jornada.",
    reflection:
      "Cada experiência realizada aproxima o casal de uma história mais rica e verdadeira.",
    mood: "adventure",
  };
}