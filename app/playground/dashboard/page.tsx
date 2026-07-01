import { Badge, HeroCard, PageContainer, Progress, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

const mockDashboard = {
  hero: {
    title: "Retrato da relação",
    subtitle:
      "Vocês estão construindo uma história cheia de conexão, descobertas e momentos que merecem ser lembrados.",
    score: "84%",
    progress: 84,
    badge: "Relação muito forte",
  },
};

export default function DashboardPlaygroundPage() {
  return (
    <PageContainer>
      <HeroCard>
        <Stack size="lg">
          <div>
            <p className={typography.eyebrow}>Saia da Rotina</p>

            <h1 className={["mt-3", typography.pageTitle].join(" ")}>
              {mockDashboard.hero.title}
            </h1>

            <p className={["mt-4 max-w-2xl", typography.body].join(" ")}>
              {mockDashboard.hero.subtitle}
            </p>
          </div>

          <Stack size="sm">
            <div className="flex items-end justify-between gap-4">
              <span className="text-5xl font-bold text-white">
                {mockDashboard.hero.score}
              </span>

              <Badge>{mockDashboard.hero.badge}</Badge>
            </div>

            <Progress value={mockDashboard.hero.progress} />
          </Stack>
        </Stack>
      </HeroCard>
    </PageContainer>
  );
}