import React from "react";
import RemoveIcon from "./remove";

export type NoteType = {
  id: string;
  title: string;
  done: boolean;
};

const Note: React.FC = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [notes, setNotes] = React.useState<NoteType[]>([
    {
      id: "0",
      title: "something",
      done: false,
    },
    {
      id: "1",
      title: "something cool",
      done: true,
    },
  ]);
  // const [finishNotes, setFinishNotes] = React.useState<NoteType[]>([]);
  const [input, setInput] = React.useState<string>("");

  const addNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") return;
    const newNote: NoteType = {
      id: notes.length.toString(),
      title: input,
      done: false,
    };
    setNotes([...notes, newNote]);
    setInput("");
  };

  const removeNote = (id: string) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const isDone = (id: string) => {
    const filteredNotes = notes.map((note) => {
      if (note.id === id) note.done = !note.done;
      return note;
    });
    setNotes(filteredNotes);
  };

  React.useEffect(() => {
    setLoading(true);
    const json = localStorage.getItem("notes");
    const savedNotes = JSON.parse(json);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(notes);
    localStorage.setItem("notes", json);
  }, [notes]);

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => addNote(e)}>
      {loading && <p className="text-slate-500 text-center">Loading...</p>}
      <main>
        {!loading && (
          <ul className="flex flex-col">
            {notes.map((note) => (
              <li
                className="px-2 py-1 rounded-md hover:bg-slate-400/20 w-full cursor-pointer flex items-center justify-between"
                key={note.id}
                onClick={() => isDone(note.id)}
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-slate-400">#{note.id}</span>
                  <span
                    className={`text-slate-200 ${
                      note.done ? "line-through text-slate-500" : ""
                    }`}
                  >
                    {note.title}
                  </span>
                </div>
                <span className="text-slate-200 w-4 h-4">
                  <RemoveIcon />
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
      <input
        type="text"
        name="note"
        placeholder="...new note"
        className="w-full rounded-md px-2 py-1 bg-transparent ring-1 ring-transparent transition ease-in-out focus:outline-none focus:ring-slate-200 hover:ring-slate-200 cursor-pointer text-gray-200"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <hr className="border-slate-400 opacity-50" />
      <footer className="flex items-center justify-between gap-2">
        <p className="text-xs text-gray-500">{notes.length} notes</p>
        <p className="text-xs text-gray-500">2000/01/01</p>
      </footer>
    </form>
  );
};

export default Note;

// https://docs.astro.build/en/guides/integrations-guide/vercel/
