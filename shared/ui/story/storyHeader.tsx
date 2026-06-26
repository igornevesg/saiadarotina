type StoryHeaderProps = {
  title: string;
  subtitle: string;
  date: string;
  mood?: string;
};

function getMoodLabel(mood?: string) {
  const labels: Record<string, string> = {
    romantic: "Romântico",
    happy: "Leve",
    adventure: "Aventura",
    nostalgic: "Memória",
    neutral: "História",
  };

  return labels[mood || "neutral"] || "História";
}

export function StoryHeader({
  title,
  subtitle,
  date,
  mood,
}: StoryHeaderProps) {
  return (
    <header className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-300">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold leading-tight text-white">
        {subtitle}
      </h2>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
        <span>
          {new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>

        <span>•</span>

        <span>{getMoodLabel(mood)}</span>
      </div>
    </header>
  );
}