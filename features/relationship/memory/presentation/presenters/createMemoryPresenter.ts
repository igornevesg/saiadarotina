import type { Moment } from "@/features/relationship/moment/public";
import type { MemoryContext } from "@/features/relationship/memory/public";

export type CreateMemoryPresentation = {
  sourceTitle: string;
  sourceNarrative: string;
  suggestedTitle: string;
  narrativeLabel: string;
  saveLabel: string;
  context: MemoryContext;
  feelingOptions: {
    id: string;
    label: string;
  }[];
};

export function presentCreateMemory(
  sourceMoment: Moment,
  context: MemoryContext
): CreateMemoryPresentation {
  const isConnection = context.origin === "connection";

  return {
    sourceTitle: isConnection
      ? `Momento de conexão: ${context.title}`
      : sourceMoment.title,

    sourceNarrative: isConnection
      ? context.description ?? "Uma conversa especial entre vocês."
      : sourceMoment.narrative,

    suggestedTitle: isConnection
      ? `Nossa conversa sobre ${context.title.toLowerCase()}`
      : sourceMoment.title,

    narrativeLabel: isConnection
      ? "Como foi essa conversa?"
      : "Como foi viver esse momento?",

    saveLabel: isConnection
      ? "📖 Guardar essa conversa na nossa história"
      : "📖 Guardar na nossa história",

    context,

    feelingOptions: [
      { id: "connected", label: "🥰 Muito conectados" },
      { id: "fun", label: "😊 Divertidos" },
      { id: "calm", label: "😌 Tranquilos" },
      { id: "surprised", label: "✨ Surpreendidos" },
      { id: "romantic", label: "❤️ Apaixonados" },
    ],
  };
}