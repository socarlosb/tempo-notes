import type React from "react";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={`flex-1 bg-slate-700 rounded-md p-1 border border-transparent hover:border-slate-400 focus:outline-lime-400 focus:border-lime-400 outline-2 focus:border-transparent ${
        className || ""
      }`}
      {...props}
    />
  );
}
