export const NoteStateValues = {
  isDone: "isDone",
  inProgress: "inProgress",
  isPending: "isPending",
};

export type NoteState = "isDone" | "inProgress" | "isPending";

export type Note = {
  id: string;
  description: string;
  state: NoteState;
};
