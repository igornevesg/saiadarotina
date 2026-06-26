import type { StoryEvent } from "@/features/relationship/story/domain/Chapter";

type NarrativeInput = {
  events: StoryEvent[];
};

export function createDefaultNarrative(input: NarrativeInput) {
  const hasMatch = input.events.some((event) => event.type === "match_created");
  const hasMemory = input.events.some((event) => event.type === "memory_created");
  const hasExperience = input.events.some(
    (event) => event.type === "experience_completed"
  );

  if (hasMatch && hasMemory) {
    return "Hoje vocês descobriram um interesse em comum e decidiram guardar esse momento na história de vocês.";
  }

  if (hasMatch) {
    return "Hoje vocês descobriram um interesse em comum. Pode ser o início de uma nova lembrança juntos.";
  }

  if (hasMemory) {
    return "Uma nova memória foi registrada. Esse momento agora faz parte da história de vocês.";
  }

  if (hasExperience) {
    return "Vocês viveram uma nova experiência juntos. Mais uma página foi escrita nessa jornada.";
  }

  if (input.events.length > 1) {
    return "Vários pequenos momentos ajudaram a escrever mais uma página dessa jornada.";
  }

  return "Um acontecimento especial entrou para a história de vocês.";
}