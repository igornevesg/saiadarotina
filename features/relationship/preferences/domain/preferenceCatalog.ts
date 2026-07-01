export type RelationshipPreference = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export const relationshipPreferenceCatalog: RelationshipPreference[] = [
  {
    id: "romance",
    icon: "❤️",
    title: "Romance",
    description: "Momentos carinhosos, íntimos e cheios de presença.",
  },
  {
    id: "fun",
    icon: "😊",
    title: "Diversão",
    description: "Experiências leves, engraçadas e descontraídas.",
  },
  {
    id: "games",
    icon: "🎲",
    title: "Jogos",
    description: "Brincadeiras, desafios e dinâmicas para casal.",
  },
  {
    id: "gastronomy",
    icon: "🍷",
    title: "Gastronomia",
    description: "Jantares, drinks, petiscos e experiências à mesa.",
  },
  {
    id: "movies",
    icon: "🎬",
    title: "Filmes",
    description: "Sessões em casa, cinema e noites aconchegantes.",
  },
  {
    id: "relax",
    icon: "🛁",
    title: "Relaxar",
    description: "Momentos calmos, banho, massagem e descanso juntos.",
  },
  {
    id: "deep-talks",
    icon: "🧠",
    title: "Conversas profundas",
    description: "Perguntas, reflexões e conexão emocional.",
  },
  {
    id: "sensuality",
    icon: "🔥",
    title: "Sensualidade",
    description: "Experiências mais íntimas, provocantes e envolventes.",
  },
  {
    id: "surprises",
    icon: "🎁",
    title: "Surpresas",
    description: "Gestos inesperados para sair do automático.",
  },
  {
    id: "travel",
    icon: "✈️",
    title: "Viajar",
    description: "Passeios, viagens curtas e descobertas fora de casa.",
  },
  {
    id: "music",
    icon: "🎵",
    title: "Música",
    description: "Playlists, dança, shows e trilhas para bons momentos.",
  },
  {
    id: "memories",
    icon: "📸",
    title: "Registrar momentos",
    description: "Guardar lembranças, fotos, histórias e pequenos detalhes.",
  },
];