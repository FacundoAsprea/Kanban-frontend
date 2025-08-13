import axios from "axios";
import type { TaskProps, TaskStatus } from "@/types/globals";

const getAllTasks = async () => {
  console.log("getting tasks...");
  return axios.get("http://localhost:3001/tasks");
};

const createTask = async (newTask: TaskProps) => {
  console.log("creating tasks...");
  const somethingIsWrong = Object.values(newTask).some((value) => value === "");

  if (somethingIsWrong) {
    return "404";
  }

  return axios
    .post("http://localhost:3001/tasks", newTask)
    .then(() => "201")
    .catch((err) => {
      if (err.response.status == 401) {
        return "401";
      }
      return "404";
    });
};

const deleteTask = async (taskId: string) => {
  return axios
    .delete(`http://localhost:3001/tasks/${taskId}`)
    .then((res) => console.log("res: ", res));
};

const updateTaskStatus = async (task: TaskProps, status: TaskStatus) => {
  const modifiedTask: TaskProps = {
    ...task,
    status: status,
  };
  return axios
    .put(`http://localhost:3001/tasks/${task.taskId}`, modifiedTask)
    .then((res) => console.log("status modified: ", res));
};

export { createTask, getAllTasks, deleteTask, updateTaskStatus };
