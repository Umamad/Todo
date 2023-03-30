import { createSlice } from "@reduxjs/toolkit";

import {
  getTodoList,
  addEditTodo,
  markTodoAsComplete,
  deleteTodo,
} from "./todoActions";

export enum PriorityType {
  low = "low",
  medium = "medium",
  high = "high",
}
export interface ITodo {
  id?: number;
  title: string;
  description: string | null;
  is_done: boolean;
  priority: PriorityType;
}
interface ITodoState {
  todoList: ITodo[];
  addEditFormInitialData: ITodo | null;
  loading: boolean;
}

const INITIAL_STATE: ITodoState = {
  todoList: [],
  addEditFormInitialData: null,
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

    builder
      .addCase(addEditTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEditTodo.fulfilled, (state, action) => {
        if (action.payload) {
          state.todoList = action.payload;
        }
        state.loading = false;
      })
      .addCase(addEditTodo.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(markTodoAsComplete.pending, (state) => {
        state.loading = true;
      })
      .addCase(markTodoAsComplete.fulfilled, (state, action) => {
        if (action.payload) {
          state.todoList = action.payload;
        }
        state.loading = false;
      })
      .addCase(markTodoAsComplete.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        if (action.payload) {
          state.todoList = state.todoList.filter(
            (todo) => todo.id !== action.payload
          );
        }
        state.loading = false;
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default todoSlice;
