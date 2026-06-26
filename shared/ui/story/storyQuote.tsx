type StoryQuoteProps = {
  quote: string;
};

export function StoryQuote({
  quote,
}: StoryQuoteProps) {
  return (
    <section className="my-8 text-center">
      <p className="text-2xl text-pink-300">❝</p>

      <p className="mx-auto mt-2 max-w-md text-lg italic leading-8 text-white/80">
        {quote}
      </p>

      <p className="mt-2 text-2xl text-pink-300">❞</p>
    </section>
  );
}