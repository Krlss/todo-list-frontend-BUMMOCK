import { KeyboardEvent, useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./store";
import { useTaskActions } from "./useTaskActions";
import { FilterTasks, fetchTask } from "../store/taskSlice";

export const useApp = () => {
  const { remainingTasks, tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const { addNewTask, changeFilterTask } = useTaskActions();

  // task writing
  const [task, setTask] = useState("");

  const handleAddTaskEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      handleAddTask();
    }
  };

  const handleAddTask = () => {
    addNewTask(task);
    changeFilterTask(FilterTasks.all);
    setTask("");
  };

  useEffect(() => {
    dispatch(fetchTask());
  }, []);

  return {
    handleAddTask,
    handleAddTaskEnter,
    remainingTasks,
    task,
    setTask,
    tasks,
  };
};
