import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../App";

const initialState: ITask[] = [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<ITask>) => {
      state.push(payload);
    },
    setCheck: (state, { payload }: PayloadAction<number>) => {
      state[payload].isChecked = !state[payload].isChecked;
    },
    editTask: (
      state,
      { payload }: PayloadAction<{ newTask: string; idx: number }>
    ) => {
      state[payload.idx].task = payload.newTask;
    },
    deleteTask: (state, { payload }: PayloadAction<number>) => {
      state.splice(payload, 1);
    },
  },
});

export const { addTask, deleteTask, setCheck, editTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
