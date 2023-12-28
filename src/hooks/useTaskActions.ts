import {
  FilterTasks,
  addTaskAsync,
  remainingTasks,
  removeTaskAsync,
  updateTaskAsync,
  setEditing,
  setFilter,
  setTasks,
} from "../store/taskSlice";
import { useEffect } from "react";
import { Task } from "../types";

import { useAppDispatch, useAppSelector } from "./store";

export const useTaskActions = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);

  const addNewTask = (title: string) => {
    dispatch(addTaskAsync(title));
  };

  const removeExistTask = (id: string) => {
    dispatch(removeTaskAsync(id));
  };

  const toggleCompleteTask = (task: Task) => {
    const { editing, ...anotherData } = task;
    const updatedTask = {
      ...anotherData,
      completed: !anotherData.completed,
    };

    dispatch(updateTaskAsync(updatedTask));
  };

  const changeFilterTask = (filter: FilterTasks) => {
    dispatch(setFilter(filter));
  };

  const changeDataTask = (task: Task) => {
    dispatch(updateTaskAsync(task));
  };

  const getRemainingTasks = () => {
    dispatch(remainingTasks());
  };

  const changeEditing = (id: string) => {
    dispatch(setEditing(id));
  };

  const initialTasks = (tasks: Task[]) => {
    dispatch(setTasks(tasks));
  };

  useEffect(() => {
    getRemainingTasks();
  }, [tasks]);

  return {
    addNewTask,
    removeExistTask,
    toggleCompleteTask,
    changeFilterTask,
    changeDataTask,
    changeEditing,
    initialTasks,
  };
};
