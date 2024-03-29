import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { IFocusedTodo, ITodo } from "./todoSlice";
import { IRefreshUserAction, refreshUser } from "../user/userActions";

import api from "../../utils/api";
import { RootState } from "../store";

export const getTodoList = createAsyncThunk(
  "todo/getAll",
  async (_, thunkApi) => {
    try {
      const result = (await api.get<ITodo[]>("/todo")).data;
      return result;
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err.response?.status === 403)
        await thunkApi.dispatch(
          refreshUser({
            successAction: getTodoList,
          } as IRefreshUserAction)
        );
      else toast.error(err.response?.data.message);

      return thunkApi.rejectWithValue([]);
    }
  }
);

export const addEditTodo = createAsyncThunk(
  "todo/addEdit",
  async (todo: ITodo, thunkApi) => {
    const isPatchRequest = !!(thunkApi.getState() as RootState).todo
      .focusedData;

    const requestUrl = `/todo${isPatchRequest ? `/${todo.id}` : ""}`;
    const requestData = isPatchRequest
      ? {
          title: todo.title,
          priority: todo.priority,
          description: todo.description,
        }
      : todo;
    const requestMethod = isPatchRequest ? "patch" : "post";
    const successResponseMessage = `${
      isPatchRequest ? "Updated" : "Created"
    } successfully`;

    try {
      const result = (
        await api[requestMethod]<ITodo[]>(requestUrl, requestData)
      ).data;
      toast.success(successResponseMessage);
      return result;
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err.response?.status === 403)
        await thunkApi.dispatch(
          refreshUser({
            successAction: addEditTodo,
          } as IRefreshUserAction)
        );
      else toast.error(err.response?.data.message);

      return thunkApi.rejectWithValue([]);
    }
  }
);

export const markTodoAsComplete = createAsyncThunk(
  "todo/markTodoAsComplete",
  async (todoId: number, thunkApi) => {
    try {
      const result = (
        await api.patch<ITodo[]>(`/todo/${todoId}`, { is_done: 1 })
      ).data;
      toast.success("Confabulations");
      return result;
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err.response?.status === 403)
        await thunkApi.dispatch(
          refreshUser({
            successAction: markTodoAsComplete,
          } as IRefreshUserAction)
        );
      else toast.error(err.response?.data.message);

      return thunkApi.rejectWithValue([]);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (todoId: number, thunkApi) => {
    try {
      await api.delete<ITodo[]>(`/todo/${todoId}`);
      toast.success("Deleted successfully");
      return todoId;
    } catch (error) {
      const err = error as AxiosError<any>;
      if (err.response?.status === 403)
        await thunkApi.dispatch(
          refreshUser({
            successAction: markTodoAsComplete,
          } as IRefreshUserAction)
        );
      else toast.error(err.response?.data.message);

      return thunkApi.rejectWithValue([]);
    }
  }
);

export const setFocusedTodo = createAsyncThunk(
  "todo/focused",
  (focusedTodo: IFocusedTodo) => {
    return focusedTodo;
  }
);
