import { FilterTasks } from "../store/taskSlice";
import { Task } from "../types";

interface FilterTasksProps {
  tasks: Task[];
  filter: FilterTasks;
}

export const getFilterTasks = ({ filter, tasks }: FilterTasksProps) => {
  switch (filter) {
    case FilterTasks.active:
      return tasks.filter((task) => !task.completed);
    case FilterTasks.completed:
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

export const getEnvVariables = () => {
  import.meta.env;

  return {
    ...import.meta.env,
  };
};
