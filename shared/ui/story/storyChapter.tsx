import { StoryEvent } from "./storyEvent";
import { StoryNarrative } from "./storyNarrative";
import { StoryHeader } from "./storyHeader";
import { StoryQuote } from "./storyQuote";
import { StoryReflection } from "./storyReflection";
import { StoryDivider } from "./storyDivider";

type StoryChapterProps = {
  chapter: {
    id: string;
    title: string;
    subtitle: string;
    quote: string;
    narrative: string;
    reflection: string;
    mood: string;
    date: string;
    events: {
      id: string;
      type: string;
      title: string;
      description?: string | null;
      occurredAt: string;
      icon: string;
      label: string;
    }[];
  };
};

export function StoryChapter({ chapter }: StoryChapterProps) {
  return (
    <article className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <StoryHeader
        title={chapter.title}
        subtitle={chapter.subtitle}
        date={chapter.date}
        mood={chapter.mood}
      />

      <StoryDivider />

      <StoryQuote quote={chapter.quote} />

      <StoryNarrative narrative={chapter.narrative} />

      <StoryDivider />

      <div className="space-y-4">
        {chapter.events.map((event) => (
          <StoryEvent
            key={event.id}
            icon={event.icon}
            label={event.label}
            title={event.title}
            description={event.description}
          />
        ))}
      </div>

      <StoryReflection reflection={chapter.reflection} />
    </article>
  );
}