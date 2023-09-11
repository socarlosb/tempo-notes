type NotesStatisticsProps = {
  isDone: number;
  inProgress: number;
  isPending: number;
  total: number;
};

export function NotesStatistics({
  isDone = 0,
  inProgress = 0,
  isPending = 0,
  total = 0,
}: NotesStatisticsProps) {
  const donePercentage = (isDone / total) * 100 || 0;

  return (
    <footer className="font-semibold text-sm flex flex-col gap-1">
      <div>
        <span className={`${donePercentage > 50 && "text-lime-400"}`}>
          {donePercentage.toFixed(0)}%
        </span>{" "}
        of all tasks complete.
      </div>
      <div className="flex gap-4 w-full items-center justify-between text-lg">
        <p>
          <span className="text-lime-400 pe-1">{isDone}</span>done
        </p>
        <p>
          <span className="text-sky-400 pe-1">{inProgress}</span>in-progress
        </p>
        <p>
          <span className="text-pink-400 pe-1">{isPending}</span>pending
        </p>
        <p>
          <span className="text-sky-400 pe-1">{total}</span>total
        </p>
      </div>
    </footer>
  );
}
