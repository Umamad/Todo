import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { userLogin } from "./userActions";

export interface IUser {
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface IUserState {
  currentUser: IUser | null;
  isLogin: boolean;
  loading: boolean;
}

const initialState: IUserState = {
  currentUser: null,
  isLogin: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.currentUser = action.payload as IUser;
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice;
