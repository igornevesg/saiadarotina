import { colors, radius } from "@/shared/design";

type ProgressProps = {
  value: number;
};

export function Progress({ value }: ProgressProps) {
  const safeValue = Math.max(0, Math.min(value, 100));

  return (
    <div className={["h-3 w-full overflow-hidden", radius.pill, "bg-white/10"].join(" ")}>
      <div
        className={[
          "h-full",
          radius.pill,
          safeValue >= 80
            ? colors.accent.emerald
            : safeValue >= 60
              ? colors.accent.purple
              : safeValue >= 40
                ? colors.accent.amber
                : colors.accent.pink,
        ].join(" ")}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}