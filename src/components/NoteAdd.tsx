import React from "react";
import { IconAdd } from "../icons";
import { type Note } from "../types";
import { randomNum } from "../utils";
import { Input } from "./UI/Input";

type NoteAddProps = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
};

export function NoteAdd({ notes, setNotes }: NoteAddProps) {
  const [input, setInput] = React.useState<string>("");

  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") return;
    const newNote: Note = {
      id: randomNum(),
      description: input,
      state: "isPending",
    };
    setNotes([...notes, newNote]);
    setInput("");
  };

  return (
    <form
      onSubmit={(e) => addNote(e)}
      className="flex w-full items-center relative group"
    >
      <span className="absolute inset-y-0 left-0 flex group-focus-within:text-lime-400">
        <button
          tabIndex={-1}
          type="submit"
          className="focus:outline-none focus:shadow-outline ps-2"
        >
          <IconAdd className="w-4 h-4" />
        </button>
      </span>
      <Input
        type="text"
        name="task"
        placeholder="add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="ps-8"
      />
    </form>
  );
}
