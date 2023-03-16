import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { RootState } from "../store";
import { IUser, renewUser } from "./userSlice";

import api from "../../utils/api";

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

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const currentUser = state.user.currentUser;
    const requestBody = { token: currentUser?.refreshToken };

    try {
      await api.delete("/user/logout", { data: requestBody });
    } catch (error) {}

    toast.success("Logged out successfully");
    return null;
  }
);

export type IRefreshUserAction = {
  successAction: ReturnType<typeof createAsyncThunk>;
  successActionArgs?: Object;
};

export const refreshUser = createAsyncThunk(
  "/user/refreshToken",
  async (args: IRefreshUserAction, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const currentUser = state.user.currentUser;
    const requestBody = { token: currentUser?.refreshToken };

    try {
      let result = (await api.patch<IUser>("/user/refresh-token", requestBody))
        .data;
      result.email = currentUser?.email as string;
      await thunkApi.dispatch(renewUser(result));
      await thunkApi.dispatch(
        args.successAction(args.successActionArgs ? args.successActionArgs : {})
      );

    } catch (error) {
      thunkApi.dispatch(logoutUser());
      return thunkApi.rejectWithValue(null);
    }
  }
);
