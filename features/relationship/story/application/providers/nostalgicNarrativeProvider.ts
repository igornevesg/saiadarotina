import type { NarrativePackage } from "@/features/relationship/story/domain/Narrative";

export function getNostalgicNarrative(): NarrativePackage {
  return {
    title: "Uma memória especial",
    quote: "Guardar um momento é uma forma de revivê-lo.",
    narrative:
      "Uma nova memória foi registrada. Esse momento agora faz parte da história de vocês.",
    reflection:
      "As memórias mais especiais são aquelas que continuam aquecendo a história depois que acontecem.",
    mood: "nostalgic",
  };
}