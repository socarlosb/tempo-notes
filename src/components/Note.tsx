import React from "react";
import { Toaster } from "react-hot-toast";
import { IconLoading } from "../icons";
import { NoteStateValues, type Note } from "../types";
import { filterNotesLength } from "../utils";
import { ClearNotes } from "./ClearNotes";
import { ExportNotes } from "./ExportNotes";
import { NoteAdd } from "./NoteAdd";
import { NotesList } from "./NotesList";
import { NotesStatistics } from "./NotesStats";
import { NotesTitle } from "./NotesTitle";
import { ProgressBar } from "./ProgressBar";
import { Divider } from "./UI/Divider";

export function Note() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [groupTitle, setGroupTitle] = React.useState<string>("");

  React.useEffect(() => {
    setLoading(true);
    let json = localStorage.getItem("notes");
    let parsedNotes: Note[] = [];
    if (!json) parsedNotes = [];
    else parsedNotes = JSON.parse(json);

    let jsonGroupTitle = localStorage.getItem("group-title");
    let parsedGroupTitle: string = "";
    if (!jsonGroupTitle) parsedGroupTitle = "My board";
    else parsedGroupTitle = JSON.parse(jsonGroupTitle);

    setNotes(parsedNotes);
    setGroupTitle(parsedGroupTitle);
    setLoading(false);
  }, []);

  function updateGroupTitle(text: string) {
    setGroupTitle(text);
    const json = JSON.stringify(text);
    localStorage.setItem("group-title", json);
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
      <div className="flex items-center">
        <ExportNotes notes={notes} groupTitle={groupTitle} />
        <ClearNotes setNotes={setNotes} setGroupTitle={setGroupTitle} />

        <NotesTitle
          title={groupTitle}
          setTitle={updateGroupTitle}
          done={filterNotesLength({ notes, state: "isDone" })}
          total={notes.length}
        />
      </div>

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
      <ProgressBar
        current={filterNotesLength({ notes, state: "isDone" })}
        total={notes.length}
      />
      <NotesStatistics
        isDone={filterNotesLength({ notes, state: "isDone" })}
        inProgress={filterNotesLength({ notes, state: "inProgress" })}
        isPending={filterNotesLength({ notes, state: "isPending" })}
        total={notes.length}
      />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            backgroundColor: "#141921",
            color: "#708bb9",
            fontSize: "0.75em",
          },
        }}
      />
    </div>
  );
}
