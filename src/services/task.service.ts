import axios from "axios";
import type { TaskProps, TaskStatus } from "@/types/globals";
const url = "https://kanban-backend-6pkr.onrender.com" 

const getAllTasks = async () => {
  return axios.get(`${url}/tasks`);
};

const createTask = async (newTask: TaskProps) => {
  const somethingIsWrong = Object.values(newTask).some((value) => value === "");

  if (somethingIsWrong) {
    return "404";
  }

  return axios
    .post(`${url}/tasks`, newTask)
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
    .delete(`${url}/tasks/${taskId}`)
    .then((res) => console.log("res: ", res));
};

const updateTaskStatus = async (task: TaskProps, status: TaskStatus) => {
  const modifiedTask: TaskProps = {
    ...task,
    status: status,
  };
  return axios
    .put(`${url}/tasks/${task.taskId}`, modifiedTask)
    .then((res) => console.log("status modified: ", res));
};

export { createTask, getAllTasks, deleteTask, updateTaskStatus };
