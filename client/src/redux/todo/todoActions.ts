import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { ITodo } from "./todoSlice";

import api from "../../utils/api";

export const getTodoList = createAsyncThunk("todo/getAll", async () => {
  try {
    const result = (await api.get<ITodo[]>("/todo")).data;
    console.log(result);
    return result;
  } catch (error) {
    const err = error as AxiosError<any>;
    toast.error(err.response?.data.message);
  }
});
