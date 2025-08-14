import type { TaskStatus } from "@/types/globals";
import type { defaultProp } from "@/types/globals";

import { useDroppable } from "@dnd-kit/core";

interface props extends defaultProp {
  type: TaskStatus;
  placeholder: string;
}

export default function TaskDisplayer({ type, placeholder, children }: props) {
  const color = {
    notStarted: "from-[#171e2b]",
    ready: "from-[#231f2e]",
    inProgress: "from-[#2a1429]",
    done: "from-[#1e2d2f]",
    cancelled: "from-[#2a2a2a]",
  };

  const { setNodeRef } = useDroppable({
    id: type,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col h-min w-full lg:flex-1/6 rounded-lg p-3 border-1 gap-2 border-[#252525] bg-gradient-to-bl ${color[type]} to-gray`}
    >
      <span className="text-muted-foreground text-sm">{placeholder}</span>
      <div className="h-max w-full flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}
