type StoryNarrativeProps = {
  narrative: string;
};

export function StoryNarrative({
  narrative,
}: StoryNarrativeProps) {
  return (
    <section className="mt-5 rounded-3xl border border-pink-400/10 bg-gradient-to-r from-pink-500/10 to-violet-500/10 p-5">
      <p className="leading-8 text-white/80 italic">
        {narrative}
      </p>
    </section>
  );
}