import React from "react";
import { IconLoading } from "../icons";
import { NoteStateValues, type Note } from "../types";
import { filterNotesLength } from "../utils";
import { NoteAdd } from "./NoteAdd";
import { NotesList } from "./NotesList";
import { NotesStatistics } from "./NotesStats";
import { NotesTitle } from "./NotesTitle";

function Divider() {
  return <div className="border-b-2 border-slate-500 mx-4 my-2"></div>;
}

export function NewNote() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    let json = localStorage.getItem("notes");
    let parsedNotes: Note[] = [];
    if (!json) parsedNotes = [];
    else parsedNotes = JSON.parse(json);

    setNotes(parsedNotes);
    setLoading(false);
  }, []);

  function updateNotes(notes: Note[]) {
    setLoading(true);

    // orderIsDoneToBottom
    notes.sort((a, b) => {
      if (
        a.state === NoteStateValues.isDone &&
        b.state !== NoteStateValues.isDone
      ) {
        return 1;
      }
      if (
        a.state !== NoteStateValues.isDone &&
        b.state === NoteStateValues.isDone
      ) {
        return -1;
      }

      return 0;
    });

    // orderInProgressToTop
    notes.sort((a, b) => {
      if (
        a.state === NoteStateValues.inProgress &&
        b.state !== NoteStateValues.inProgress
      ) {
        return -1;
      }
      if (
        a.state !== NoteStateValues.inProgress &&
        b.state === NoteStateValues.inProgress
      ) {
        return 1;
      }

      return 0;
    });

    setNotes(notes);
    const json = JSON.stringify(notes);
    localStorage.setItem("notes", json);
    setLoading(false);
  }

  return (
    <div className="text-slate-400 text-lg flex flex-col gap-2">
      <NotesTitle
        done={filterNotesLength({ notes, state: "isDone" })}
        total={notes.length}
      />

      <Divider />

      {loading && (
        <div className="w-full flex h-20 items-center justify-center">
          <IconLoading className="animate-spin" />
        </div>
      )}
      {!loading && (
        <>
          <NotesList notes={notes} setNotes={updateNotes} />
          <NoteAdd notes={notes} setNotes={updateNotes} />
        </>
      )}

      <Divider />

      <NotesStatistics
        isDone={filterNotesLength({ notes, state: "isDone" })}
        inProgress={filterNotesLength({ notes, state: "inProgress" })}
        isPending={filterNotesLength({ notes, state: "isPending" })}
        total={notes.length}
      />
    </div>
  );
}
