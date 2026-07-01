import type { RelationshipStory } from "@/features/relationship/story/public";
import type { StoryViewModel } from "@/features/relationship/story/presentation/viewModels/storyViewModel";

function formatDateLabel(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Data especial";
  }

  const today = new Date();
  const differenceInMs = today.getTime() - parsedDate.getTime();
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  if (differenceInDays <= 0) return "Hoje";
  if (differenceInDays === 1) return "Ontem";
  if (differenceInDays <= 6) return `Há ${differenceInDays} dias`;

  return parsedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getMoodLabel(mood: string): string {
  const labels: Record<string, string> = {
    romantic: "❤️ Romântico",
    joyful: "😊 Leve e divertido",
    reflective: "✨ Reflexivo",
    intimate: "🥰 Conectados",
    calm: "😌 Tranquilo",
  };

  return labels[mood] ?? "❤️ Momento especial";
}

export function presentStory(story: RelationshipStory): StoryViewModel {
  const totalEvents = story.chapters.reduce(
    (total, chapter) => total + chapter.events.length,
    0
  );

  const lastChapter = story.chapters[0];

  return {
    hero: {
      eyebrow: "📖 Nossa História",
      title: "Cada lembrança virou um capítulo.",
      narrative:
        "Nossa história continua sendo escrita por todos os momentos que escolhemos viver juntos.",
    },

    stats: {
      chaptersLabel: `${story.totalChapters} ${
        story.totalChapters === 1 ? "capítulo" : "capítulos"
      }`,
      experiencesLabel: `${totalEvents} ${
        totalEvents === 1 ? "experiência vivida" : "experiências vividas"
      }`,
      lastMemoryLabel: lastChapter
        ? `Última lembrança: ${formatDateLabel(lastChapter.date)}`
        : "Nenhuma lembrança registrada ainda",
    },

    chapters: story.chapters.map((chapter, index) => ({
      id: chapter.id,
      chapterLabel: `Capítulo ${index + 1}`,
      title: chapter.title,
      headline: chapter.headline,
      quote: chapter.quote,
      narrative: chapter.narrative,
      reflection: chapter.reflection,
      dateLabel: formatDateLabel(chapter.date),
      moodLabel: getMoodLabel(chapter.mood),
      events: chapter.events.map((event) => ({
        id: event.id,
        icon: event.icon,
        title: event.title,
        label: event.label,
        description: event.description,
      })),
    })),

    epilogue: story.epilogue
      ? {
          title: story.epilogue.title,
          text: story.epilogue.text,
        }
      : undefined,
  };
}