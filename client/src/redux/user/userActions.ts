import { createAsyncThunk } from "@reduxjs/toolkit";


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
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);
