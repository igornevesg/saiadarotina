import type { ConnectionPrompt } from "../../domain/connectionPromptCatalog";

export function presentConnection(prompt: ConnectionPrompt) {
  return {
    title: "Momento de conexão",
    icon: "❤️",

    introduction:
      "Reserve alguns minutos apenas para vocês. Às vezes uma única pergunta aproxima mais do que uma longa conversa.",

    prompt,

    actionLabel: "❤️ Conversamos sobre isso",

    secondaryActionLabel: "🔄 Outra pergunta",
  };
}