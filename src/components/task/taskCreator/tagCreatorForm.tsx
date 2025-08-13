import { useState, useContext } from "react";
import TaskContext from "@/contexts/taskContext";
import { Input } from "@/components/ui/input";

// import type { TagProps } from "@/types/globals";

export default function TagCreatorForm() {
  const { task, setTask } = useContext(TaskContext);
  const [tagTitle, setTagTitle] = useState<string>("");
  const [color, setColor] = useState<string>("");

  return (
    <div className="border-1 border-borderMain rounded-md p-2">
      <span className="text-muted-foreground text-[14px]">Create a tag</span>
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          setTask({
            ...task,
            tags: [...task.tags, { tagTitle: tagTitle, color: color }],
          });
        }}
      >
        <Input
          placeholder="Tag name"
          type="text"
          onChange={(event) => {
            event.preventDefault();
            setTagTitle(event.target.value);
          }}
        />
        <input
          type="color"
          onChange={(event) => {
            event.preventDefault();
            setColor(event.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="rounded-md border-1 border-borderMain text-muted-foreground w-min px-3 py-1 hover:bg-black cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
}
