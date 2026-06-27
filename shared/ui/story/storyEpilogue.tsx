type StoryEpilogueProps = {
  epilogue: {
    title: string;
    text: string;
  };
};

export function StoryEpilogue({ epilogue }: StoryEpilogueProps) {
  return (
    <section className="rounded-[36px] border border-pink-300/10 bg-pink-500/5 p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-pink-300">
        Epílogo
      </p>

      <h2 className="mt-3 text-2xl font-bold text-white">{epilogue.title}</h2>

      <p className="mt-5 leading-8 text-white/70">{epilogue.text}</p>
    </section>
  );
}