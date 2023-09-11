import React from "react";
import type { Note } from "../types";
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
    <form onSubmit={(e) => addNote(e)} className="flex w-full">
      <Input
        type="text"
        name="note"
        placeholder="...new note"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}
