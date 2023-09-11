import React from "react";
import { noteStates } from "../options";
import { Input } from "./UI/Input";

type NotesTitleProps = {
  done: number;
  total: number;
};

export function NotesTitle({ done = 0, total = 0 }: NotesTitleProps) {
  const [title, setTitle] = React.useState<string>("My board");

  return (
    <header className="w-full flex gap-2 font-semibold items-center justify-between">
      <Input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="text-xl font-extrabold"
      />
      <span
        className={`${
          total !== 0 && done === total ? noteStates.isDone.colorClass : ""
        }`}
      >
        [{done}/{total}]
      </span>
    </header>
  );
}
