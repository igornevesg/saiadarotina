type TimelineHeaderProps = {
  totalEvents: number;
};

function getChapterTitle(totalEvents: number) {
  if (totalEvents === 0) return "O começo da jornada";
  if (totalEvents < 5) return "Os primeiros passos";
  if (totalEvents < 15) return "Descobrindo novos momentos";
  if (totalEvents < 30) return "Construindo memórias";
  return "Uma história a dois";
}

export function TimelineHeader({ totalEvents }: TimelineHeaderProps) {
  const chapter = Math.max(1, Math.ceil(totalEvents / 5));

  return (
    <header>
      <p className="text-sm text-pink-300">Nossa História</p>

      <h1 className="mt-2 text-3xl font-bold">Nossos momentos</h1>

      <div className="mt-5 rounded-3xl border border-pink-400/20 bg-pink-500/10 p-5">
        <p className="text-sm text-pink-200">Capítulo {chapter}</p>

        <h2 className="mt-2 text-2xl font-bold">
          {getChapterTitle(totalEvents)} ❤️
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Cada match, experiência e memória ajuda a escrever uma nova página da
          história de vocês.
        </p>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-pink-500"
            style={{
              width: `${Math.min(100, Math.max(12, totalEvents * 8))}%`,
            }}
          />
        </div>

        <p className="mt-2 text-xs text-white/40">
          Jornada em construção — não é uma nota, é uma história.
        </p>
      </div>
    </header>
  );
}