import { useContext } from "react";
import TaskContext from "@/contexts/taskContext";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GoPlus } from "react-icons/go";
import type { TagProps } from "@/types/globals";

import Tag from "../tag";
import TagCreatorForm from "./tagCreatorForm";

//temporal
const tags: TagProps[] = [
  {
    tagTitle: "Website",
    color: "#235212",
  },
  {
    tagTitle: "messi",
    color: "#9604fc",
  },
  {
    tagTitle: "testing",
    color: "#aa32b4",
  },
];

export default function TaskCreator() {
  const { task, setTask } = useContext(TaskContext);

  const addTag = (event: React.MouseEvent, title: string, color: string) => {
    event.preventDefault();

    const pickedTag = { tagTitle: title, color: color };
    
    //evitar duplicados
    if (task.tags.some(tag => tag.tagTitle == pickedTag.tagTitle)) {
      return false;
    }

    setTask({
      ...task,
      tags: [...task.tags, pickedTag],
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <GoPlus size="25px" className="rounded-sm p-1 hover:bg-hover" />
      </PopoverTrigger>
      <PopoverContent className="!bg-hover !border-borderMain" align="start">
        <div className="flex flex-col w-full gap-2">
          <div className="border-1 border-borderMain rounded-md p-2">
            <span className="text-muted-foreground text-[14px]">
              Pick a tag
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                return (
                  <a
                    className="cursor-pointer"
                    onClick={(event) => addTag(event, tag.tagTitle, tag.color)}
                  >
                    <Tag tagTitle={tag.tagTitle} color={tag.color} />
                  </a>
                );
              })}
            </div>
          </div>

          <TagCreatorForm />
        </div>
      </PopoverContent>
    </Popover>
  );
}
