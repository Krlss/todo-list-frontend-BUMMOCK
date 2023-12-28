import { Icon } from "@iconify/react";
import { Task } from "../types";
import { FocusEvent, KeyboardEvent } from "react";

interface ATBProps {
  onClick: () => void;
  icon: string;
  className?: string;
}

export const ActionTaskButton = ({
  icon,
  onClick,
  className = "",
}: ATBProps) => {
  return (
    <button
      onClick={onClick}
      className={`opacity-45 hover:opacity-100 ${className}`}
    >
      <Icon icon={icon} width={30} />
    </button>
  );
};

interface TextTaskProps {
  task: Task;
  onClick: () => void;
}

export const TextTask = ({ task, onClick }: TextTaskProps) => {
  return (
    <span
      className={`${
        task.completed && "line-through text-blue-700 font-bold opacity-30"
      } flex-1 text-lg break-all`}
      onClick={onClick}
    >
      {task.title}
    </span>
  );
};

interface UpdateInputTaskProps {
  task: Task;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const UpdateInputTask = ({
  task,
  onBlur,
  onKeyDown,
}: UpdateInputTaskProps) => {
  return (
    <input
      type="text"
      className="flex-1 text-lg focus:outline-none"
      defaultValue={task.title}
      autoFocus={true}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};
