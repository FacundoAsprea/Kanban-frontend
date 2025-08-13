import { useContext } from "react";
import TaskContext from "@/contexts/taskContext";

export default function TaskTitleInput() {
  const { task, setTask } = useContext(TaskContext);
  return (
    <form
      className="border-b-1 border-borderMain"
      onSubmit={(event) => event.preventDefault()}
      onBlur={(event) => {
        setTask({ ...task, title: event.target.value });
      }}
    >
      <textarea
        className="text-white text-[25px] outline-none mt-5 resize-none max-h-[50px]"
        placeholder="Task title"
      ></textarea>
    </form>
  );
}
