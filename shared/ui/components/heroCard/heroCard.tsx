import { colors, radius, shadows, spacing } from "@/shared/design";

type HeroCardProps = {
  children: React.ReactNode;
};

export function HeroCard({ children }: HeroCardProps) {
  return (
    <section
      className={[
        radius.hero,
        spacing.card,
        colors.background.softPink,
        "border",
        colors.border.pink,
        shadows.glow,
      ].join(" ")}
    >
      {children}
    </section>
  );
}