import {
  Section,
  TimelinePreview,
  type TimelinePreviewItem,
} from "@/shared/ui/components";

type Props = {
  items: TimelinePreviewItem[];
};

export function TimelinePreviewSection({ items }: Props) {
  return (
    <Section title="O que vivemos recentemente">
      <TimelinePreview items={items} />
    </Section>
  );
}