import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { ITodo } from "./todoSlice";
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
      .addEditFormInitialData;

    const requestUrl = `/todo${isPatchRequest ? `/${todo.id}` : ""}`;
    const requestMethod = isPatchRequest ? "patch" : "post";
    const successResponseMessage = `${
      isPatchRequest ? "Updated" : "Created"
    } successfully`;

    try {
      const result = (
        await api[requestMethod]<ITodo[]>(requestUrl, todo)
      ).data;
      toast.success(successResponseMessage);
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
