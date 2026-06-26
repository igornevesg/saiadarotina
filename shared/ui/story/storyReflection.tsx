type StoryReflectionProps = {
  reflection: string;
};

export function StoryReflection({
  reflection,
}: StoryReflectionProps) {
  return (
    <section className="mt-8 rounded-2xl border border-pink-400/10 bg-pink-500/5 p-5">
      <p className="text-center italic leading-7 text-white/70">
        {reflection}
      </p>
    </section>
  );
}