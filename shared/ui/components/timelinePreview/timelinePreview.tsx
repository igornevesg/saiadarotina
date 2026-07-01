import { Card, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

export type TimelinePreviewItem = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  timeLabel: string;
};

type Props = {
  items: TimelinePreviewItem[];
};

export function TimelinePreview({ items }: Props) {
  return (
    <Card>
      <Stack>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={item.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl">
                  {item.icon}
                </span>

                {!isLast && <div className="mt-2 h-full w-px bg-white/10" />}
              </div>

              <div className={isLast ? "" : "pb-6"}>
                <p className={typography.small}>{item.timeLabel}</p>

                <h3 className={["mt-1", typography.cardTitle].join(" ")}>
                  {item.title}
                </h3>

                <p className={["mt-2", typography.body].join(" ")}>
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </Stack>
    </Card>
  );
}