import type { Moment } from "@/features/relationship/moment/domain/moment";

export function getNextMoment(): Moment {
  return {
    id: "candlelight-dinner-home",
    title: "Jantar à luz de velas em casa",
    narrative:
      "Hoje pode ser uma boa oportunidade para desacelerar, preparar um ambiente diferente e criar uma lembrança só nossa.",
    category: "romance",
    intensity: "light",
    estimatedDurationMinutes: 90,
    icon: "🌙",
    tags: ["romance", "jantar", "velas", "conexao", "casa"],
    productHint:
      "Para tornar esse momento ainda mais especial, em breve vamos sugerir opções que combinam com essa experiência.",
  };
}