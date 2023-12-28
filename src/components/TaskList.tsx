import { useAppSelector } from "../hooks/store";
import { useTaskActions } from "../hooks/useTaskActions";
import { getFilterTasks } from "../utils";
import { Task } from "./Task";

export const TaskList = () => {
  const { tasks, filter } = useAppSelector((state) => state.task);

  const { toggleCompleteTask, removeExistTask, changeEditing, changeDataTask } =
    useTaskActions();

  return (
    <ul className="pt-28">
      {getFilterTasks({ tasks, filter }).map((task) => (
        <Task
          key={task.id}
          task={task}
          toggleTask={toggleCompleteTask}
          removeTask={removeExistTask}
          editingTask={changeEditing}
          editTask={changeDataTask}
        />
      ))}

      {getFilterTasks({ tasks, filter }).length === 0 && (
        <li className="text-center text-gray-400 text-2xl">No tasks to show</li>
      )}
    </ul>
  );
};
