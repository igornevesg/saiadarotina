type EventBadgeProps = {
  label: string;
};

export function EventBadge({ label }: EventBadgeProps) {
  return (
    <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs font-medium text-pink-200">
      {label}
    </span>
  );
}