import { useState } from "react";
import type { TaskProps } from "@/types/globals";
import { useDraggable } from "@dnd-kit/core";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../ui/alert-dialog";

import { deleteTask } from "@/services/task.service";

import { CiCalendar } from "react-icons/ci";
import Username from "./username";
import Tag from "./tag";

interface props {
  task: TaskProps;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
  tasksList: TaskProps[];
}

export default function Task({ task, setTasks, tasksList }: props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTaskDeletion = () => {
    deleteTask(task.taskId!);
    setTasks(tasksList.filter((listedTask) => listedTask.title != task.title));
  };

  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: task.taskId!,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          style={style}
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="flex flex-col h-min bg-gradient-to-tr from-[#1d1f20] via-[#1f1f25] to-borderMain border-1 border-borderMain rounded-md p-4 gap-2 cursor-pointer"
          onContextMenu={(event) => {
            event.preventDefault();
            setDialogOpen((prevState) => !prevState);
          }}
        >
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag) => {
              return (
                <Tag
                  key={tag.tagTitle}
                  tagTitle={tag.tagTitle}
                  color={tag.color}
                />
              );
            })}
          </div>
          <span className="flex border-b-1 border-borderMain text-xs items-center gap-1 text-muted-foreground">
            <CiCalendar />
            {task.date}
          </span>
          <span className="text-muted-foreground text-lg wrap-break-word text-start">
            {task.title}
          </span>
          <Username username={task.username} />
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-gradient-to-tr from-[#1d1f20] via-[#1f1f25] to-borderMain">
        <p className="text-muted-foreground">Right click to delete</p>
      </TooltipContent>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected task
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleTaskDeletion}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Tooltip>
  );
}
