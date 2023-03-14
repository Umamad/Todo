import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import api from "../../utils/api";

import { IUser } from "./userSlice";

export type IUserLoginCredentials = {
  email: string;
  password: string;
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (userCredentials: IUserLoginCredentials) => {
    try {
      const user = (await api.post<IUser>(`/user/login`, userCredentials)).data;
      toast.success(`Welcome ${user.email}`);
      return user;
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(err.response?.data.message);
    }
  }
);
