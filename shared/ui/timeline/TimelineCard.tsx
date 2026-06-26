import { EventBadge } from "@/shared/ui/badges/EventBadge";
import { TimelineTexts } from "@/shared/constants/timelineTexts";

type TimelineCardProps = {
  item: {
    id: string;
    event_type: string;
    title: string;
    description: string | null;
    created_at: string;
    metadata: Record<string, any> | null;
  };
  icon: string;
  label: string;
  formattedDate: string;
};

function getNarrative(type: string) {
  const narratives: Record<string, string> = {
    match_created: "Um novo capítulo começou.",
    experience_completed: "Vocês viveram um novo momento juntos.",
    memory_created: "Uma lembrança foi registrada.",
    milestone_unlocked: "Uma nova conquista entrou para a história.",
    special_date_added: "Uma data importante foi guardada.",
    product_clicked: "Um produto fez parte dessa descoberta.",
    product_purchased: "Um produto entrou para esse momento.",
    story_generated: "A história de vocês ganhou uma nova página.",
  };

  return narratives[type] || "Um novo acontecimento foi registrado.";
}

export function TimelineCard({
  item,
  icon,
  label,
  formattedDate,
}: TimelineCardProps) {
  return (
    <article className="relative rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex gap-4">
        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-500/20 text-2xl">
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <EventBadge label={label} />

            <span className="text-xs text-white/35">{formattedDate}</span>
          </div>

          <p className="mt-3 text-sm font-medium text-pink-100/80">
            {getNarrative(item.event_type)}
          </p>

          <h2 className="mt-2 text-xl font-bold">{item.title}</h2>

          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {item.description}
            </p>
          )}

          {item.metadata?.matchType && (
            <p className="mt-3 text-xs text-white/40">
              {TimelineTexts.matchTypeLabel}{" "}
              {item.metadata.matchType === "full"
                ? TimelineTexts.matchTypes.full
                : TimelineTexts.matchTypes.partial}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}