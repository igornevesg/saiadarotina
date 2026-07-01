import type { Moment } from "@/features/relationship/moment/public";

export const romanceMomentCatalog: Moment[] = [
  {
    id: "romantic-night-at-home",
    title: "Noite romântica em casa",
    narrative:
      "Nossa rotina pode ganhar novas cores com uma noite preparada com carinho, conversa e presença.",
    category: "romance",
    intensity: "light",
    estimatedDurationMinutes: 90,
    icon: "🌙",
    tags: ["romance", "casa", "velas", "massagem", "conexao"],
    productHint:
      "Para tornar esse momento ainda mais especial, em breve vamos sugerir opções que combinam com essa experiência.",
  },
  {
    id: "home-movie-night",
    title: "Cinema em casa",
    narrative:
      "Uma noite simples, sem pressa e com presença pode virar uma lembrança especial na nossa história.",
    category: "connection",
    intensity: "light",
    estimatedDurationMinutes: 120,
    icon: "🍿",
    tags: ["casa", "filme", "conexao", "leveza"],
    productHint:
      "Em breve vamos sugerir pequenos detalhes para deixar esse momento ainda mais gostoso.",
  },
  {
    id: "massage-night",
    title: "Noite de massagem",
    narrative:
      "Um momento de cuidado e toque pode ajudar a desacelerar e trazer mais conexão para a nossa rotina.",
    category: "sensual",
    intensity: "medium",
    estimatedDurationMinutes: 60,
    icon: "🕯️",
    tags: ["massagem", "toque", "sensual", "relaxamento", "conexao"],
    productHint:
      "Esse momento poderá combinar com produtos de massagem, aromas e itens para criar um clima especial.",
  },
  {
    id: "living-room-picnic",
    title: "Piquenique na sala",
    narrative:
      "Transformar um espaço comum em um pequeno cenário diferente pode trazer leveza e novidade para a nossa noite.",
    category: "fun",
    intensity: "light",
    estimatedDurationMinutes: 75,
    icon: "✨",
    tags: ["casa", "diversao", "novidade", "romance"],
    productHint:
      "Em breve vamos sugerir formas simples de deixar esse momento ainda mais memorável.",
  },
];