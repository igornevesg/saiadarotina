import { spacing } from "@/shared/design";

type StackProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export function Stack({ children, size = "md" }: StackProps) {
  const className =
    size === "sm"
      ? spacing.stackSm
      : size === "lg"
        ? spacing.stackLg
        : spacing.stackMd;

  return <div className={className}>{children}</div>;
}