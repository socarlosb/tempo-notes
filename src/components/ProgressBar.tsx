import { cn } from "../utils";

type ProgressBarProps = { current: number; total: number };

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100 || 0;
  const isHalf = percentage > 50;
  const isAlmost = percentage > 80;

  return (
    <div className="h-[1px] w-full bg-lime-800 mb-1">
      <div
        className={cn(
          "h-[1px] bg-lime-700",
          isHalf && "bg-lime-500",
          isAlmost && "bg-lime-400"
        )}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
