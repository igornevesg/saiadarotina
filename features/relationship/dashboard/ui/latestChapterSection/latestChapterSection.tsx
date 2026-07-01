import type { DashboardPresentationModel } from "@/features/relationship/dashboard/presentation/presenters/dashboardPresenter";
import { Card, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

type Props = {
  chapter: DashboardPresentationModel["latestChapter"];
};

export function LatestChapterSection({ chapter }: Props) {
  return (
    <Stack>
      <h2 className={typography.sectionTitle}>Último capítulo</h2>

      {!chapter ? (
        <Card>
          <p className={typography.body}>
            A nossa história ainda está esperando pelo primeiro capítulo.
          </p>
        </Card>
      ) : (
        <Card>
          <p className={typography.eyebrow}>Livro da História</p>

          <h3 className={["mt-3", typography.cardTitle].join(" ")}>
            {chapter.title}
          </h3>

          <p className={["mt-2", typography.body].join(" ")}>
            {chapter.headline}
          </p>

          <p className={["mt-4", typography.small].join(" ")}>
            {chapter.summary}
          </p>
        </Card>
      )}
    </Stack>
  );
}