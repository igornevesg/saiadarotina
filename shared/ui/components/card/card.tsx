import { colors, radius, shadows, spacing, animations } from "@/shared/design";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={[
        radius.card,
        spacing.card,
        colors.background.card,
        "border",
        colors.border.subtle,
        shadows.soft,
        animations.transition,
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}