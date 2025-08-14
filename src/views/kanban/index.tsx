import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import TaskCreator from "@/components/task/taskCreator";
import TaskDisplayer from "./taskDisplayer";
import Task from "@/components/task";
import Loader from "@/components/loading";

import { getAllTasks, updateTaskStatus } from "@/services/task.service";
import type { TaskProps, TaskStatus } from "@/types/globals";

const status: { status: TaskStatus; placeholder: string }[] = [
  //List used for creating the columns
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTasks = tasks.filter((task) =>
    task.title.includes(searchQuery)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const columnStatus = over.id;

    const tasksAfterDrag = tasks.map(
      (
        task //List of tasks with the changes applied
      ) =>
        task.taskId === taskId
          ? ({ ...task, status: columnStatus } as TaskProps)
          : task
    );
    setTasks(tasksAfterDrag); //UI Update
    updateTaskStatus(
      //DB Update
      tasks.find((task) => task.taskId === taskId)!,
      columnStatus as TaskStatus
    );
  };

  const getData = () => {
    getAllTasks()
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
        console.log("Connection with the backend established");
      })
      .catch(() => {
        console.log("Waiting for the backend...")
        getData()                                 //If the backend doesnt answer, then recall the function
      });
  };

  //Getting the data
  useEffect(() => {
    getData()
  }, []);

  return (
    <main className="flex flex-col gap-3 text-sm">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-blue-500 text-5xl">k<strong className="text-white">ARG</strong>ban</h1>
        <TaskCreator setTasks={setTasks} />
      </div>
      <div className="flex justify-between w-full h-full">
        <Input
          className="w-[calc(40%-6px)] min-w-[300px]"
          placeholder="Search for a specific task by its title..."
          type="text"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        {loading ? (
          <section className="h-full flex items-center justify-center">
            <Loader />
          </section>
        ) : searchQuery.length >= 1 ? (
          //Filtro
          <section className="h-full flex gap-2 max-sm:flex-wrap">
            {status.map((status) => (
              <TaskDisplayer
                type={status.status}
                placeholder={status.placeholder}
              >
                {filteredTasks
                  .filter((task) => task.status === status.status)
                  .map((task) => (
                    <Task task={task} setTasks={setTasks} tasksList={tasks} />
                  ))}
              </TaskDisplayer>
            ))}
          </section>
        ) : (
          //Todas las tasks
          <section className="h-full flex gap-2 w-full flex-wrap">
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
