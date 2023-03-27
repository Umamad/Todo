import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { ITodo } from "./todoSlice";
import { IRefreshUserAction, refreshUser } from "../user/userActions";

import api from "../../utils/api";

export const getTodoList = createAsyncThunk(
  "todo/getAll",
  async (_, thunkApi) => {
    try {
      const result = (await api.get<ITodo[]>("/todo")).data;
      console.log(result);
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
