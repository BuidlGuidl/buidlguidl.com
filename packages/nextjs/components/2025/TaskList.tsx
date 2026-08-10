import { ReactNode } from "react";

// Task list styled for the dark terminal window
export const TaskList = ({ tasks }: { tasks: ReactNode[] }) => (
  <div className="grid gap-2">
    {tasks.map((task, index) => (
      <div key={index} className="flex items-start gap-3 text-white/70">
        <span className="text-secondary text-xs mt-1">◆</span>
        <span className="text-sm leading-relaxed">{task}</span>
      </div>
    ))}
  </div>
);
