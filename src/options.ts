import type { Note } from "./types";
import { randomNum } from "./utils";

export const exampleNotes: Note[] = [
  {
    id: randomNum(),
    description: "first note",
    state: "isDone",
  },
  {
    id: randomNum(),
    description: "second note",
    state: "isPending",
  },
];

export const noteStates = {
  isDone: {
    name: "isDone",
    title: "Done",
    colorClass: "text-lime-400",
  },
  isPending: {
    name: "isPending",
    title: "Pending",
    colorClass: "text-pink-400",
  },
  inProgress: {
    name: "inProgress",
    title: "In Progress",
    colorClass: "text-sky-400",
  },
};
