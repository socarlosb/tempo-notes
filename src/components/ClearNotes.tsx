import React from "react";
import toast from "react-hot-toast";
import { IconClear } from "../icons";
import { type Note } from "../types";
import { cn } from "../utils";

type ExportNotesProps = {
  setNotes: (value: Note[]) => void;
  setGroupTitle: (value: string) => void;
};
export function ClearNotes({ setNotes, setGroupTitle }: ExportNotesProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  function openDialog() {
    setIsOpen(true);
  }

  function closeDialog() {
    setIsOpen(false);
  }

  function handleClear() {
    setNotes([]);
    setGroupTitle("");
    localStorage.removeItem("notes");
    localStorage.removeItem("group-title");
    toast.success("All clear");
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="flex justify-end text-slate-400 hover:text-slate-200 p-1 rounded"
        title="Clear everything"
        onClick={openDialog}
      >
        <IconClear className="w-4 h-4" />
      </button>
      <div
        className={cn(
          "absolute top-0 left-0 bg-slate-800/50 w-full h-full z-10 blur-sm",
          isOpen ? "block" : "hidden"
        )}
        onClick={closeDialog}
      ></div>
      <dialog
        open={isOpen}
        className={cn(
          "p-4 z-20 absolute bg-slate-600 text-slate-200 top-1/2 rounded w-1/2",
          isOpen ? "block" : "hidden"
        )}
      >
        <p className="text-center mb-4">
          Are you user you want to clear all notes and title?
        </p>
        <form method="dialog" className="flex gap-4">
          <button
            className="w-full rounded text-center border py-1 border-slate-200 font-semibold hover:bg-slate-200 hover:text-slate-950"
            onClick={handleClear}
          >
            Yes
          </button>
          <button
            className="w-full rounded text-center border py-1 border-rose-400 font-semibold text-rose-400 hover:bg-rose-400 hover:text-slate-50"
            onClick={closeDialog}
          >
            cancel
          </button>
        </form>
      </dialog>
    </>
  );
}
