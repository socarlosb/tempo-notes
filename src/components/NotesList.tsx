import { IconDone, IconInProgress, IconIsPending, IconRemove } from "../icons";
import { noteStates } from "../options";
import { NoteStateValues, type Note } from "../types";
import { removeNote, updateDescriptionNote, updateNoteState } from "../utils";
import { Input } from "./UI/Input";

type NotesListProps = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
};

export function NotesList({ notes, setNotes }: NotesListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {notes.map((note, index) => {
        return (
          <li key={note.id}>
            <NotesListItem
              note={note}
              index={index}
              notes={notes}
              setNotes={setNotes}
            />
          </li>
        );
      })}
    </ul>
  );
}

function NotesListItem({
  notes,
  setNotes,
  note,
  index,
}: {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  note: Note;
  index: number;
}) {
  const noteStateClass =
    note.state === NoteStateValues.isDone
      ? noteStates.isDone.colorClass
      : note.state === NoteStateValues.isPending
      ? noteStates.isPending.colorClass
      : noteStates.inProgress.colorClass;

  function handleChange({
    note,
    description,
  }: {
    note: Note;
    description: string;
  }) {
    const updateNotes = updateDescriptionNote({
      notes,
      note,
      description,
    });
    setNotes(updateNotes);
  }

  function handleState({
    notes,
    note,
    state,
  }: {
    notes: Note[];
    note: Note;
    state: string;
  }) {
    const updateNotes = updateNoteState({ note, notes, state });
    setNotes(updateNotes);
  }

  function handleRemove({ notes, note }: { notes: Note[]; note: Note }) {
    const updateNotes = removeNote({ note, notes });
    setNotes(updateNotes);
  }

  return (
    <div className="flex items-center gap-1">
      <p className={`font-semibold ${noteStateClass || ""}`}>{index + 1}</p>
      <Input
        type="text"
        value={note.description}
        onChange={(e) => handleChange({ note, description: e.target.value })}
        className={`${noteStateClass}`}
      />
      {note.state !== NoteStateValues.inProgress && (
        <button
          type="button"
          className={`w-6 h-6 ${noteStates.inProgress.colorClass || ""}`}
          onClick={() =>
            handleState({ note, notes, state: NoteStateValues.inProgress })
          }
          title="Mark note as in progress"
        >
          <IconInProgress />
        </button>
      )}
      {note.state !== NoteStateValues.isPending && (
        <button
          type="button"
          className={`w-6 h-6 ${noteStates.isPending.colorClass || ""}`}
          onClick={() =>
            handleState({ note, notes, state: NoteStateValues.isPending })
          }
          title="Mark note as pending"
        >
          <IconIsPending />
        </button>
      )}
      {note.state !== NoteStateValues.isDone && (
        <button
          type="button"
          className={`w-6 h-6 ${noteStates.isDone.colorClass || ""}`}
          onClick={() =>
            handleState({ note, notes, state: NoteStateValues.isDone })
          }
          title="Mark note as done"
        >
          <IconDone />
        </button>
      )}
      <button
        type="button"
        className="w-6 h-6 text-red-400"
        onClick={() => handleRemove({ note, notes })}
        title="Remove note"
      >
        <IconRemove />
      </button>
    </div>
  );
}
