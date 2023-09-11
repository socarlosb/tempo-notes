import toast from "react-hot-toast";
import { IconExport } from "../icons";
import { NoteStateValues, type Note } from "../types";

type ExportNotesProps = {
  notes: Note[];
  groupTitle: string;
};
export function ExportNotes({ notes, groupTitle }: ExportNotesProps) {
  async function exportNotes() {
    let formattedTasks = `# ${groupTitle}\n\n`;
    notes.map((note) => {
      formattedTasks += `- [${
        note.state === NoteStateValues.isDone ? "x" : " "
      }] ${note.description}\n`;
    });

    try {
      await navigator.clipboard.writeText(formattedTasks);
      toast.success("Copied to clipboard!", { id: "clipboard" });
    } catch (error) {
      toast.error("Something was wrong");
    }
  }

  return (
    <button
      className="flex justify-end text-slate-400 hover:text-slate-200 p-1 rounded"
      title="Copy to clipboard as markdown"
      onClick={exportNotes}
    >
      <IconExport className="w-4 h-4" />
    </button>
  );
}
