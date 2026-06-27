import { buildStoryContext } from "@/features/relationship/story/application/builders/storyContextBuilder";
import { storyServices } from "@/features/relationship/story/application/services/storyServices";
import type {
  StoryChapter,
  StoryChapterEvent,
  StoryEvent,
} from "@/features/relationship/story/domain/Chapter";

function getIcon(type: string) {
  const icons: Record<string, string> = {
    match_created: "❤️",
    memory_created: "📖",
    experience_completed: "✨",
    special_date_added: "📅",
    milestone_unlocked: "🏆",
    product_clicked: "🛍️",
    product_purchased: "🎁",
    story_generated: "📝",
  };

  return icons[type] || "💫";
}

function getLabel(type: string) {
  const labels: Record<string, string> = {
    match_created: "Interesse em comum",
    memory_created: "Memória criada",
    experience_completed: "Experiência vivida",
    special_date_added: "Data especial",
    milestone_unlocked: "Conquista",
    product_clicked: "Produto explorado",
    product_purchased: "Produto adquirido",
    story_generated: "História gerada",
  };

  return labels[type] || "Acontecimento";
}

function toRoman(value: number) {
  const romans: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  let remaining = value;

  for (const [number, roman] of romans) {
    while (remaining >= number) {
      result += roman;
      remaining -= number;
    }
  }

  return result;
}

export function buildChapterFromEvents(
  date: string,
  events: StoryEvent[],
  index: number
): StoryChapter {
  const chapterEvents: StoryChapterEvent[] = events.map((event) => ({
    ...event,
    icon: getIcon(event.type),
    label: getLabel(event.type),
  }));

  const context = buildStoryContext(events);
  const narrative = storyServices.narrator.create(events, context);

  return {
    id: `${date}-${index}`,
    title: `Capítulo ${toRoman(index + 1)}`,
    subtitle: narrative.chapterTitle,
    quote: narrative.quote,
    narrative: narrative.narrative,
    reflection: narrative.reflection,
    mood: narrative.mood,
    date,
    events: chapterEvents,
  };
}