import type { Note } from "./types";

export function filterNotesLength({
  notes,
  state,
}: {
  notes: Note[];
  state: "isPending" | "inProgress" | "isDone";
}) {
  return notes.filter((note) => note.state === state).length;
}

export function randomNum() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function updateDescriptionNote({
  notes,
  note,
  description,
}: {
  notes: Note[];
  note: Note;
  description: string;
}) {
  const updateNotes = notes.map((object) => {
    if (object.id === note.id) {
      return { ...object, description };
    }
    return object;
  });

  return updateNotes;
}

export function updateNoteState({
  notes,
  note,
  state,
}: {
  notes: Note[];
  note: Note;
  state: string;
}) {
  const updateNotes = notes.map((object) => {
    if (object.id === note.id) {
      return { ...object, state };
    }
    return object;
  });

  return updateNotes as Note[];
}

export function removeNote({ notes, note }: { notes: Note[]; note: Note }) {
  const updateNotes = notes.filter((object) => {
    return object.id !== note.id;
  });

  return updateNotes;
}
