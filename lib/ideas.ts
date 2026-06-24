export type IdeaLevel = "romantico" | "picante" | "ousado" | "avancado";

export type Idea = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: IdeaLevel;
  products: string[];
};

export const ideas: Idea[] = [
  {
    id: "massagem",
    title: "Noite de massagem",
    description:
      "Uma experiência leve para relaxar, criar conexão e preparar um momento especial.",
    category: "Intimidade",
    level: "picante",
    products: ["Óleo de massagem", "Vela aromática", "Gel beijável"],
  },
  {
    id: "perguntas",
    title: "Jogo de perguntas íntimas",
    description:
      "Respondam perguntas leves e profundas para se conhecerem melhor.",
    category: "Comunicação",
    level: "romantico",
    products: ["Jogo de cartas para casal", "Dados do amor"],
  },
  {
    id: "banho",
    title: "Banho juntos",
    description:
      "Um momento simples, relaxante e íntimo para quebrar a rotina.",
    category: "Intimidade",
    level: "picante",
    products: ["Sabonete íntimo", "Espuma de banho", "Óleo corporal"],
  },
  {
    id: "surpresa",
    title: "Surpresa romântica",
    description:
      "Preparem uma surpresa simples para demonstrar cuidado e desejo.",
    category: "Romance",
    level: "romantico",
    products: ["Kit romântico", "Vela", "Óleo corporal"],
  },
  {
    id: "desafio",
    title: "Desafio do casal",
    description:
      "Uma missão divertida para deixar o dia mais leve e aproximar vocês.",
    category: "Diversão",
    level: "romantico",
    products: ["Roleta do amor", "Cartas de desafios"],
  },
];