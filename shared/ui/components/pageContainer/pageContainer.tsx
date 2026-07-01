import { spacing } from "@/shared/design";

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return <main className={spacing.page}>{children}</main>;
}