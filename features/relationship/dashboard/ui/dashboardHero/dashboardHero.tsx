import type { DashboardPresentationModel } from "@/features/relationship/dashboard/presentation/presenters/dashboardPresenter";

import {
  Badge,
  HeroCard,
  Progress,
  Stack,
} from "@/shared/ui/components";

import { typography } from "@/shared/design";

type Props = {
  hero: DashboardPresentationModel["hero"];
};

export function DashboardHero({ hero }: Props) {
  return (
    <HeroCard>
      <Stack size="lg">

        <div>

          <p className={typography.eyebrow}>
            Nossa História
          </p>

          <h1 className={["mt-3", typography.pageTitle].join(" ")}>
            {hero.title}
          </h1>

          <p className={["mt-4 max-w-xl", typography.body].join(" ")}>
            {hero.subtitle}
          </p>

        </div>

        <div className="max-w-md">

          <div className="mb-4 flex items-center gap-4">

            <span className="text-6xl font-bold text-white">
              {hero.score}
            </span>

            <Badge>
              {hero.badge}
            </Badge>

          </div>

          <Progress value={hero.progress} />

        </div>

      </Stack>
    </HeroCard>
  );
}