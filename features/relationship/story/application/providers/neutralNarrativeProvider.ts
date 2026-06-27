import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";
import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

export function getNeutralNarrative(events: StoryEvent[]): NarrativePackage {
  return {
    title: "Um pequeno momento da jornada",
    quote: "Nem todo capítulo precisa ser grande para ser importante.",
    narrative:
      events.length > 1
        ? "Vários pequenos momentos ajudaram a escrever mais uma página dessa jornada."
        : "Um acontecimento especial entrou para a história de vocês.",
    reflection:
      "Às vezes, são os detalhes discretos que constroem as lembranças mais duradouras.",
    mood: "neutral",
  };
}