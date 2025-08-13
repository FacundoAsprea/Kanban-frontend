import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import TaskCreator from "@/components/task/taskCreator";
import TaskDisplayer from "./taskDisplayer";
import Task from "@/components/task";

import { getAllTasks, updateTaskStatus } from "@/services/task.service";
import type { TaskProps, TaskStatus } from "@/types/globals";

const status: { status: TaskStatus; placeholder: string }[] = [
  {
    status: "notStarted",
    placeholder: "Not started",
  },
  {
    status: "ready",
    placeholder: "Ready",
  },
  {
    status: "inProgress",
    placeholder: "In progress",
  },
  {
    status: "done",
    placeholder: "Done",
  },
  {
    status: "cancelled",
    placeholder: "Cancelled",
  },
];

export default function Kanban() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<TaskProps[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id 
    const columnStatus = over.id 

    console.log("active: ", active)
    
    const tasksAfterDrag = tasks.map(task => task.taskId === taskId ? { ...task, status: columnStatus } as TaskProps : task)
    setTasks(tasksAfterDrag)
    updateTaskStatus(tasks.find(task => task.taskId === taskId)!, columnStatus as TaskStatus)
  };

  useEffect(() => {
    getAllTasks().then((res) => {
      setTasks(res.data);
      setSearchQuery(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="flex flex-col gap-3 text-sm">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-muted-foreground text-5xl">Kanban</h1>
        <TaskCreator setTasks={setTasks} />
      </div>
      <div className="flex justify-between w-full h-full">
        <Input
          className="w-[calc(40%-6px)] min-w-[300px]"
          placeholder="Search for a specific task..."
          type="text"
          onChange={(event) =>
            setSearchQuery(
              tasks.filter((task) => task.title.includes(event.target.value))
            )
          }
        />
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        {loading ? (
          <></>
        ) : tasks.length > searchQuery.length ? (
          //Filtro
          <section className="h-full flex gap-2 max-sm:flex-wrap">
            {status.map((status) => (
              <TaskDisplayer
                type={status.status}
                placeholder={status.placeholder}
              >
                {searchQuery
                  .filter((task) => task.status === status.status)
                  .map((task) => (
                    <Task task={task} setTasks={setTasks} tasksList={tasks} />
                  ))}
              </TaskDisplayer>
            ))}
          </section>
        ) : (
          //Todas las tasks
          <section className="h-full flex gap-2 max-sm:flex-wrap">
            {status.map((status) => (
              <TaskDisplayer
                type={status.status}
                placeholder={status.placeholder}
              >
                {tasks
                  .filter((task) => task.status === status.status)
                  .map((task) => (
                    <Task task={task} setTasks={setTasks} tasksList={tasks} />
                  ))}
              </TaskDisplayer>
            ))}
          </section>
        )}
      </DndContext>
    </main>
  );
}
