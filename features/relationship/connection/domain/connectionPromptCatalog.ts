export type ConnectionPrompt = {
  id: string;
  title: string;
  question: string;
  category:
    | "romance"
    | "gratitude"
    | "dreams"
    | "fun"
    | "memories";
  estimatedMinutes: number;
};

export const connectionPromptCatalog: ConnectionPrompt[] = [
  {
    id: "gratitude-1",
    title: "Gratidão",
    question:
      "Qual pequena atitude minha fez diferença para você esta semana?",
    category: "gratitude",
    estimatedMinutes: 5,
  },
  {
    id: "romance-1",
    title: "Romance",
    question:
      "Quando foi a última vez que você se sentiu muito amado(a) por mim?",
    category: "romance",
    estimatedMinutes: 5,
  },
  {
    id: "memories-1",
    title: "Memórias",
    question:
      "Qual momento nosso você gostaria de viver novamente exatamente igual?",
    category: "memories",
    estimatedMinutes: 5,
  },
  {
    id: "dreams-1",
    title: "Sonhos",
    question:
      "Qual experiência você sonha que ainda vamos viver juntos?",
    category: "dreams",
    estimatedMinutes: 10,
  },
  {
    id: "fun-1",
    title: "Diversão",
    question:
      "Qual situação nossa sempre faz você rir quando lembra?",
    category: "fun",
    estimatedMinutes: 5,
  },
];