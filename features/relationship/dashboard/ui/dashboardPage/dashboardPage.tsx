import type { getDashboard } from "@/features/relationship/dashboard/application/providers/dashboardProvider";

import {
  Card,
  PageContainer,
  ReflectionBlock,
  Stack,
} from "@/shared/ui/components";
import { typography } from "@/shared/design";
import { ConnectionSection } from "@/features/relationship/dashboard/ui/connectionSection/connectionSection";
import { AchievementsSection } from "@/features/relationship/dashboard/ui/achievementsSection/achievementsSection";
import { DashboardCtaSection } from "@/features/relationship/dashboard/ui/dashboardCtaSection/dashboardCtaSection";
import { DashboardHero } from "@/features/relationship/dashboard/ui/dashboardHero/dashboardHero";
import { LatestChapterSection } from "@/features/relationship/dashboard/ui/latestChapterSection/latestChapterSection";
import { NextMomentSection } from "@/features/relationship/dashboard/ui/nextMomentSection/nextMomentSection";
import { OpportunitiesSection } from "@/features/relationship/dashboard/ui/opportunitiesSection/opportunitiesSection";
import { StrengthsSection } from "@/features/relationship/dashboard/ui/strengthsSection/strengthsSection";
import { TimelinePreviewSection } from "@/features/relationship/dashboard/ui/timelinePreviewSection/timelinePreviewSection";
import { PreferencesSummarySection } from "@/features/relationship/dashboard/ui/preferencesSummarySection/preferencesSummarySection";

type DashboardPagePresentation = ReturnType<typeof getDashboard>;

type Props = {
  presentation: DashboardPagePresentation;
};

export function DashboardPage({ presentation }: Props) {
  return (
    <PageContainer>
      <Stack size="lg">
        <DashboardHero hero={presentation.hero} />
        <ConnectionSection />
        <Card className="border-pink-300/20 bg-pink-500/10">
          <div>
            <p className={typography.eyebrow}>❤️ {presentation.dna.title}</p>

            <h2 className={["mt-2", typography.sectionTitle].join(" ")}>
              {presentation.dna.profile}
            </h2>

            <p className={["mt-3", typography.body].join(" ")}>
              {presentation.dna.narrative}
            </p>

            <ul className="mt-4 space-y-2">
              {presentation.dna.signals.map((signal) => (
                <li key={signal} className={typography.body}>
                  • {signal}
                </li>
              ))}
            </ul>
          </div>
        </Card>
        <PreferencesSummarySection />

        <NextMomentSection recommendation={presentation.recommendation} />

        <ReflectionBlock
          icon={presentation.reflection.icon}
          quote={presentation.reflection.quote}
        />

        <TimelinePreviewSection items={presentation.timelinePreview} />

        <StrengthsSection cards={presentation.sections.strengths} />

        <OpportunitiesSection cards={presentation.sections.opportunities} />

        <LatestChapterSection chapter={presentation.latestChapter} />

        <AchievementsSection />

        <DashboardCtaSection
          title="Vamos escrever o próximo capítulo?"
          narrative="Os melhores momentos da nossa história ainda estão por vir. Uma nova lembrança pode começar com um gesto simples hoje."
          actionLabel="Criar uma nova memória"
        />
      </Stack>
    </PageContainer>
  );
}