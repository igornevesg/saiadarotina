"use client";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
};

export function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <div
      style={{
        animationDelay: `${delay}ms`,
      }}
      className="animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      {children}
    </div>
  );
}