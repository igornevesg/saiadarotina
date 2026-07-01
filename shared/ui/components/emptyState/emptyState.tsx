import { Card } from "@/shared/ui/components/card/card";
import { typography } from "@/shared/design";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card>
      <h3 className={typography.cardTitle}>{title}</h3>
      <p className={["mt-2", typography.body].join(" ")}>{description}</p>
    </Card>
  );
}