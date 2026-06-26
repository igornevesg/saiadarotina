type StoryEventProps = {
  icon: string;
  label: string;
  title: string;
  description?: string | null;
};

export function StoryEvent({
  icon,
  label,
  title,
  description,
}: StoryEventProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-500/20 text-xl">
          {icon}
        </div>

        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-pink-300">
            {label}
          </p>

          <h3 className="mt-1 text-base font-semibold text-white">
            {title}
          </h3>

          {description && (
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}