import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoType, PriorityType } from "../../types/Todo.type";

interface TodoStateType {
  todoList: TodoType[];
}

const INITIAL_ID: number = 1;
const INITIAL_STATE: TodoStateType = {
  todoList: [
    {
      id: 1,
      title: "Fix initial basket add",
      description: null,
      isDone: false,
      priority: PriorityType.high,
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: INITIAL_STATE,
  reducers: {
    addNewTodo: (state, action: PayloadAction<TodoType>) => {
      let nextId: number = INITIAL_ID;
      const todoListLength: number = state.todoList.length;

      if (todoListLength !== 0) {
        const latestTodo: TodoType = state.todoList[todoListLength - 1];
        nextId = latestTodo.id + 1;
      }

      const newTodo = Object.assign(action.payload, {
        id: nextId,
      });

      state.todoList.push(newTodo);
    },
  },
});

export const { addNewTodo } = todoSlice.actions;
