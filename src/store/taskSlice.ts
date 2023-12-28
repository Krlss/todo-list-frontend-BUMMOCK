import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type Task } from "../types";
import axios from "axios";
import toast from "react-hot-toast";

export enum FilterTasks {
  all = "All",
  active = "Active",
  completed = "Completed",
}

type TaskId = string;

export const fetchTask = createAsyncThunk("task/fetch", async () => {
  const { data } = await axios.get("");
  return data.data;
});

export const addTaskAsync = createAsyncThunk(
  "task/addTaskAsync",
  async (title: string) => {
    const { data } = await axios.post("/create", { title });
    return data;
  }
);

export const removeTaskAsync = createAsyncThunk(
  "task/removeTaskAsync",
  async (id: string) => {
    const { data } = await axios.delete(`/delete/${id}`);
    return data;
  }
);

export const updateTaskAsync = createAsyncThunk(
  "task/updateTaskAsync",
  async (task: Task) => {
    const { editing, ...anotherData } = task;
    const { data } = await axios.patch(`/update/${task.id}`, anotherData);
    return data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [] as Task[],
    filter: FilterTasks.all,
    loading: false,
    remainingTasks: 0,
  },
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    remainingTasks: (state) => {
      state.remainingTasks = state.tasks.filter(
        (task) => !task.completed
      ).length;
    },
    setFilter: (state, action: PayloadAction<FilterTasks>) => {
      state.filter = action.payload;
    },
    setEditing: (state, action: PayloadAction<TaskId>) => {
      const id = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, editing: !task.editing } : task
      );
    },
  },
  extraReducers: (builder) => {
    // fetch task
    builder.addCase(fetchTask.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(fetchTask.rejected, (state) => {
      state.loading = false;
      toast.error("Failed to fetch data", {
        position: "top-center",
      });
    });

    // add task async
    builder.addCase(addTaskAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
      toast.success("Task added successfully");
    });
    builder.addCase(addTaskAsync.rejected, (state) => {
      state.loading = false;
      toast.error("Failed to add task");
    });

    // remove task
    builder.addCase(removeTaskAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      toast.success("Task removed successfully");
    });
    builder.addCase(removeTaskAsync.rejected, (state) => {
      state.loading = false;
      toast.error("Failed to remove task");
    });

    // update task
    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      toast.success("Task updated successfully");
    });
    builder.addCase(updateTaskAsync.rejected, (state) => {
      toast.error("Failed to update task");
      state.loading = false;
    });
  },
});

export const { remainingTasks, setEditing, setFilter, setLoading, setTasks } =
  taskSlice.actions;
