import { Card, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

export function AchievementsSection() {
  return (
    <Stack>
      <h2 className={typography.sectionTitle}>Conquistas</h2>

      <Card>
        <div className="flex gap-4">
          <span className="text-2xl">🏆</span>

          <div>
            <h3 className={typography.cardTitle}>Primeira página escrita</h3>

            <p className={["mt-2", typography.body].join(" ")}>
              Já começamos a transformar momentos em história.
            </p>
          </div>
        </div>
      </Card>
    </Stack>
  );
}