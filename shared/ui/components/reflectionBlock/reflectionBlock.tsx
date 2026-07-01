import { Card } from "@/shared/ui/components";
import { typography } from "@/shared/design";

type Props = {
  icon: string;
  quote: string;
};

export function ReflectionBlock({
  icon,
  quote,
}: Props) {
  return (
    <Card className="border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-2xl py-6 text-center">

        <div className="mb-6 text-4xl">
          {icon}
        </div>

        <blockquote
          className={[
            typography.body,
            "italic leading-8 text-white/85",
          ].join(" ")}
        >
          “{quote}”
        </blockquote>

      </div>
    </Card>
  );
}