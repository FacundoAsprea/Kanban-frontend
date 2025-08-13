import { useState } from "react";
import TaskContext from "@/contexts/taskContext";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { createTask } from "@/services/task.service";

import type { TaskProps } from "@/types/globals";

import TasksSelector from "@/components/utils/select";
import Tag from "../tag";
import TagCreator from "./tagCreator";
import DataItem from "./dataItem";
import TaskCreatorHeader from "./header";
import TaskTitleInput from "./taskTitleInput";
import TaskUsernameInput from "./taskUsernameInput";

import { GoPlus } from "react-icons/go";
interface props {
  setTasks : React.Dispatch<React.SetStateAction<TaskProps[]>>
}
export default function TaskCreator({ setTasks } : props) {
  const date = new Date();
  const [task, setTask] = useState<TaskProps>({
    status: "inProgress",
    tags: [],
    title: "",
    username: "",
    date: date.toLocaleDateString(),
  });

  const deleteTag = (event: React.MouseEvent, tagTitle: string) => {
    event.preventDefault();

    const newTags = task.tags.filter((tag) => tag.tagTitle != tagTitle);
    setTask((prevState) => ({
      ...prevState,
      tags: newTags,
    }));
  };

  return (
    <TaskContext.Provider value={{ task, setTask }}>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <button className="flex gap-3 items-center rounded-md h-min text-muted-foreground border-1 border-borderMain px-3 py-2 bg-transparent hover:bg-[#1c1c1c] cursor-pointer">
            Add new task <GoPlus />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div
            className="flex flex-col bg-transparent h-full p-3"
            onContextMenu={(event) => event.preventDefault()}
          >
            <TaskCreatorHeader />
            <TaskTitleInput />

            <dl className="text-muted-foreground/75 flex flex-col text-[14px] mt-3 gap-3">
              <DataItem dt="Due date" dd={task.date} />
              <DataItem
                dt="Status"
                dd={
                  <TasksSelector
                    placeholder="Select status"
                    label=""
                    className="!border-none"
                  />
                }
              />
              <DataItem
                dt="Tags"
                dtClassName="!my-0"
                dd={
                  <div className="flex flex-wrap gap-1">
                    {task.tags ? (
                      task.tags.map((tag) => {
                        return (
                          <Tooltip>
                            <TooltipTrigger
                              className="flex items-center"
                              onAuxClick={(event) =>
                                deleteTag(event, tag.tagTitle)
                              }
                            >
                              <Tag
                                key={tag.tagTitle}
                                tagTitle={tag.tagTitle}
                                color={tag.color}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="text-muted-foreground bg-hover border-1 border-borderMain">
                              <span>Right-click to delete</span>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })
                    ) : (
                      <></>
                    )}
                    <TagCreator />
                  </div>
                }
              />
              <DataItem dt="Username" dd={<TaskUsernameInput />} />
            </dl>
            <Button
              variant="outline"
              className="mt-auto cursor-pointer"
              onClick={() => {
                createTask(task)
                .then((createTaskStatusCode) => {
                  if (createTaskStatusCode === "201") {
                    toast("Task has been created", {
                      description: date.toLocaleString(),
                      action: {
                        label: "Accept",
                        onClick: () => true,
                      },
                    });
                    setTasks(prevState => [...prevState, task])
                    return
                  } 
                  else if (createTaskStatusCode === "401") {
                    return toast("Task could not be created", {
                      description: "Duplicateds are not allowed",
                      action: {
                        label: "Accept",
                        onClick: () => true,
                      },
                    });
                  }
                  toast("Task could not be created", {
                    description: "There was an error while creating the task",
                    action: {
                      label: "Accept",
                      onClick: () => true,
                    },
                  });
                });
              }}
            >
              Create task
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </TaskContext.Provider>
  );
}
