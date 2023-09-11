import React from "react";
import { IconLoading } from "../icons";
import { NoteStateValues, type Note } from "../types";
import { cn, filterNotesLength } from "../utils";
import { NoteAdd } from "./NoteAdd";
import { NotesList } from "./NotesList";
import { NotesStatistics } from "./NotesStats";
import { NotesTitle } from "./NotesTitle";

function Divider() {
  return <div className="h-[1px] bg-slate-600"></div>;
}
function Progress({ current, total }: { current: number; total: number }) {
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

export function Note() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState<string>("");

  React.useEffect(() => {
    setLoading(true);
    let json = localStorage.getItem("notes");
    let parsedNotes: Note[] = [];
    if (!json) parsedNotes = [];
    else parsedNotes = JSON.parse(json);

    let jsonTitle = localStorage.getItem("title");
    let parsedTitle: string = "";
    if (!jsonTitle) parsedTitle = "My board";
    else parsedTitle = JSON.parse(jsonTitle);

    setNotes(parsedNotes);
    setTitle(parsedTitle);
    setLoading(false);
  }, []);

  function updateTitle(text: string) {
    setTitle(text);
    const json = JSON.stringify(text);
    localStorage.setItem("title", json);
  }

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
    <div className="text-slate-400 text-base flex flex-col gap-2 h-full">
      <NotesTitle
        title={title}
        setTitle={updateTitle}
        done={filterNotesLength({ notes, state: "isDone" })}
        total={notes.length}
      />
      <Divider />
      {loading && (
        <div className="w-full flex flex-1 h-20 items-center justify-center">
          <IconLoading className="animate-spin h-6 w-6" />
        </div>
      )}
      {!loading && (
        <>
          <NotesList
            notes={notes}
            setNotes={updateNotes}
            className="flex-1 overflow-y-auto"
          />
          <NoteAdd notes={notes} setNotes={updateNotes} />
        </>
      )}

      <Progress
        current={filterNotesLength({ notes, state: "isDone" })}
        total={notes.length}
      />
      <NotesStatistics
        isDone={filterNotesLength({ notes, state: "isDone" })}
        inProgress={filterNotesLength({ notes, state: "inProgress" })}
        isPending={filterNotesLength({ notes, state: "isPending" })}
        total={notes.length}
      />
    </div>
  );
}
