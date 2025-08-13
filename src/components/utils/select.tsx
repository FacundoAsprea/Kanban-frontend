import { useContext, useState, useEffect } from "react";
import TaskContext from "@/contexts/taskContext";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import type { TasksSelectorProps } from "@/types/components";
import type { TaskProps, TaskStatus } from "@/types/globals";

export default function TasksSelector({
  className,
  placeholder,
  label,
}: TasksSelectorProps) {
  const { setTask } = useContext(TaskContext);
  const [status, setStatus] = useState("inProgress");

  useEffect(() => {
    setTask(
      (prevState: TaskProps): TaskProps => ({
        ...prevState,
        status: status as TaskStatus,
      })
    );
  }, [status]);

  return (
    <>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger
          className={`w-min hover:bg-hover text-muted-foreground ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {label ? <SelectLabel>{label}</SelectLabel> : <></>}
            <SelectItem value="notStarted">Not started</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="inProgress">In progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
