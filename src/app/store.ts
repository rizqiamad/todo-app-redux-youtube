import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "../features/task";

const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: { tasks },
});

store.subscribe(() => {
  localStorage.setItem("tasks", JSON.stringify(store.getState().tasks));
});

export type RootState = ReturnType<typeof store.getState>;
