import { FocusEvent, KeyboardEvent } from "react";
import { type Task as Tasks } from "../types";
import { ActionTaskButton, TextTask, UpdateInputTask } from "./index";

interface Props {
  task: Tasks;
  toggleTask: (task: Tasks) => void;
  removeTask: (id: string) => void;
  editingTask: (id: string) => void;
  editTask: (task: Tasks) => void;
}

export const Task = ({
  task,
  toggleTask,
  removeTask,
  editingTask,
  editTask,
}: Props) => {
  const handleEditTask = (e: FocusEvent<HTMLInputElement>) => {
    const title = e.target.value;

    updateTask(title);
  };

  const handleAddTaskEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const title = e.currentTarget.value;

      updateTask(title);
    }
  };

  const updateTask = (title: string) => {
    if (title && title !== task.title) {
      const taskTransform = {
        ...task,
        title,
        editing: false,
      };
      editTask(taskTransform);
    }
    editingTask(task.id);
  };

  return (
    <li
      key={task.id}
      className={`flex items-center gap-x-2 border-b-2 border-dotted mb-3 py-1 animate-fadeIn ${
        task.editing && "border-gray-400"
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task)}
        className="w-5 h-5 cursor-pointer"
      />
      {task.editing ? (
        <UpdateInputTask
          task={task}
          onBlur={handleEditTask}
          onKeyDown={handleAddTaskEnter}
        />
      ) : (
        <TextTask task={task} onClick={() => editingTask(task.id)} />
      )}
      <ActionTaskButton
        onClick={() => editingTask(task.id)}
        icon="circum:edit"
        className={task.editing ? "opacity-100" : "opacity-45"}
      />
      <ActionTaskButton
        onClick={() => removeTask(task.id)}
        icon="lets-icons:remove-light"
      />
    </li>
  );
};
