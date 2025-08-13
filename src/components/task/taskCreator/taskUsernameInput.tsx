import { useContext } from "react";
import TaskContext from "@/contexts/taskContext";

export default function TaskUsernameInput() {
  const { task, setTask } = useContext(TaskContext);
  return (
    <form
      className="h-[20px]"
      onSubmit={(event) => event.preventDefault()}
      onBlur={(event) => {
        setTask({ ...task, username: event.target.value });
      }}
    >
      <textarea
        maxLength={12}
        className="my-auto text-gray-400 text-[16px] outline-none resize-none h-full"
        placeholder="..."
      ></textarea>
    </form>
  );
}