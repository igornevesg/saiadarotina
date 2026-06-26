import { TimelineTexts } from "@/shared/constants/timelineTexts";

export function TimelineEmpty() {
  return (
    <div className="mt-8 rounded-3xl border border-pink-400/20 bg-pink-500/10 p-6 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-500/20 text-3xl">
        📖
      </div>

      <h2 className="text-2xl font-bold">{TimelineTexts.emptyTitle}</h2>

      <p className="mt-3 text-white/65">{TimelineTexts.emptyDescription}</p>
    </div>
  );
}