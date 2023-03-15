import { createSlice } from "@reduxjs/toolkit";

import { getTodoList } from "./todoActions";

export enum PriorityType {
  low = "low",
  medium = "medium",
  high = "high",
}
export interface ITodo {
  id: number;
  title: string;
  description: string | null;
  isDone: boolean;
  priority: PriorityType;
}
interface ITodoState {
  todoList: ITodo[];
  loading: boolean;
}

const INITIAL_STATE: ITodoState = {
  todoList: [],
  loading: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodoList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodoList.fulfilled, (state, action) => {
        state.todoList = action.payload ? action.payload : [];
        state.loading = false;
      })
      .addCase(getTodoList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default todoSlice;
