import { colors, radius } from "@/shared/design";

type BadgeProps = {
  children: React.ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-3 py-1 text-xs font-semibold",
        radius.pill,
        colors.background.cardStrong,
        colors.text.secondary,
      ].join(" ")}
    >
      {children}
    </span>
  );
}