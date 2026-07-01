import { spacing, typography } from "@/shared/design";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section className={spacing.section}>
      <h2 className={typography.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}