import { Badge, Card, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

export type StoryBlockProps = {
  icon: string;
  title: string;
  narrative: string;
  reflection?: string;
  badge?: string;
  footer?: React.ReactNode;
};

export function StoryBlock({
  icon,
  title,
  narrative,
  reflection,
  badge,
  footer,
}: StoryBlockProps) {
  return (
    <Card className="overflow-hidden">
      <Stack size="md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <span className="text-3xl">{icon}</span>

            <div>
              <h3 className={typography.cardTitle}>{title}</h3>

              <p className={["mt-3", typography.body].join(" ")}>
                {narrative}
              </p>
            </div>
          </div>

          {badge && <Badge>{badge}</Badge>}
        </div>

        {reflection && (
          <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-4 italic text-white/80">
            “{reflection}”
          </blockquote>
        )}

        {footer}
      </Stack>
    </Card>
  );
}