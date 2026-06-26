type TimelineStatsProps = {
  totalEvents: number;
  totalMatches: number;
  totalMemories: number;
  totalExperiences: number;
};

export function TimelineStats({
  totalEvents,
  totalMatches,
  totalMemories,
  totalExperiences,
}: TimelineStatsProps) {
  return (
    <section className="mt-5 grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-2xl font-bold">{totalEvents}</p>
        <p className="mt-1 text-xs text-white/50">momentos registrados</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-2xl font-bold">{totalMatches}</p>
        <p className="mt-1 text-xs text-white/50">interesses em comum</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-2xl font-bold">{totalExperiences}</p>
        <p className="mt-1 text-xs text-white/50">experiências vividas</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-2xl font-bold">{totalMemories}</p>
        <p className="mt-1 text-xs text-white/50">memórias criadas</p>
      </div>
    </section>
  );
}