import type { DashboardPresentationCard } from "@/features/relationship/dashboard/presentation/presenters/dashboardPresenter";
import { Section, Stack, StoryBlock } from "@/shared/ui/components";

type Props = {
  cards: DashboardPresentationCard[];
};

export function OpportunitiesSection({ cards }: Props) {
  return (
    <Section title="Nosso próximo capítulo">
      <Stack>
        {cards.map((card) => (
          <StoryBlock
            key={card.id}
            icon={card.icon}
            title={card.title}
            narrative={card.narrative}
            reflection={card.reflection}
            badge={card.badge}
          />
        ))}
      </Stack>
    </Section>
  );
}