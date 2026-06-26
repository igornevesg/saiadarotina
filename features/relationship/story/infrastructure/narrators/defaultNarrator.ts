import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";
import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";

type NarrativeInput = {
  events: StoryEvent[];
};

export function createDefaultNarrative(
  input: NarrativeInput
): NarrativePackage {
  const hasMatch = input.events.some((event) => event.type === "match_created");
  const hasMemory = input.events.some((event) => event.type === "memory_created");
  const hasExperience = input.events.some(
    (event) => event.type === "experience_completed"
  );

  if (hasMatch && hasMemory) {
    return {
      quote: "Alguns momentos começam com uma descoberta simples.",
      narrative:
        "Hoje vocês descobriram um interesse em comum e decidiram guardar esse momento na história de vocês.",
      reflection:
        "Quando uma descoberta vira memória, ela começa a fazer parte da jornada do casal.",
      mood: "romantic",
    };
  }

  if (hasMatch) {
    return {
      quote: "Toda história começa com um pequeno sim.",
      narrative:
        "Hoje vocês descobriram um interesse em comum. Pode ser o início de uma nova lembrança juntos.",
      reflection:
        "O importante não é apenas combinar, mas transformar essa descoberta em um momento vivido.",
      mood: "happy",
    };
  }

  if (hasMemory) {
    return {
      quote: "Guardar um momento é uma forma de revivê-lo.",
      narrative:
        "Uma nova memória foi registrada. Esse momento agora faz parte da história de vocês.",
      reflection:
        "As memórias mais especiais são aquelas que continuam aquecendo a história depois que acontecem.",
      mood: "nostalgic",
    };
  }

  if (hasExperience) {
    return {
      quote: "Experiências vividas viram páginas que ninguém apaga.",
      narrative:
        "Vocês viveram uma nova experiência juntos. Mais uma página foi escrita nessa jornada.",
      reflection:
        "Cada experiência realizada aproxima o casal de uma história mais rica e verdadeira.",
      mood: "adventure",
    };
  }

  return {
    quote: "Nem todo capítulo precisa ser grande para ser importante.",
    narrative:
      input.events.length > 1
        ? "Vários pequenos momentos ajudaram a escrever mais uma página dessa jornada."
        : "Um acontecimento especial entrou para a história de vocês.",
    reflection:
      "Às vezes, são os detalhes discretos que constroem as lembranças mais duradouras.",
    mood: "neutral",
  };
}