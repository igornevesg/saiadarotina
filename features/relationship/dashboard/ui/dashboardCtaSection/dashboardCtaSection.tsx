import { Card, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

type Props = {
  title: string;
  narrative: string;
  actionLabel: string;
};

export function DashboardCtaSection({
  title,
  narrative,
  actionLabel,
}: Props) {
  return (
    <Card className="border-pink-300/20 bg-pink-500/10">
      <Stack>
        <div>
          <p className={typography.eyebrow}>Nosso próximo passo</p>

          <h2 className={["mt-3", typography.sectionTitle].join(" ")}>
            {title}
          </h2>

          <p className={["mt-3", typography.body].join(" ")}>
            {narrative}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-pink-400 md:w-fit"
        >
          {actionLabel}
        </button>
      </Stack>
    </Card>
  );
}