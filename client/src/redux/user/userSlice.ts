import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { logoutUser, refreshUser, userLogin } from "./userActions";

export interface IUser {
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface IUserState {
  currentUser: IUser | null;
  loading: boolean;
}

const initialState: IUserState = {
  currentUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    renewUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload as IUser;
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.currentUser = null;
        state.loading = false;
      });
  },
});

export const { renewUser } = userSlice.actions;

export default userSlice;
