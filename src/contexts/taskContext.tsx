import { createContext } from "react"
import type { TaskProps } from "@/types/globals";

interface contextProps {
  task: TaskProps;
  setTask: (t: TaskProps | ((prevState : TaskProps) => TaskProps)) => void;
}


const TaskContext = createContext<contextProps>({} as contextProps);

export default TaskContext
