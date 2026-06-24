import Link from "next/link";

type AppButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
};

export default function AppButton({
  children,
  href,
  variant = "primary",
}: AppButtonProps) {
  const className =
    variant === "primary"
      ? "w-full rounded-2xl bg-pink-500 px-5 py-4 text-center font-semibold text-white shadow-lg shadow-pink-900/30 active:scale-[0.98]"
      : "w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-center font-semibold text-white active:scale-[0.98]";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return <button className={className}>{children}</button>;
}