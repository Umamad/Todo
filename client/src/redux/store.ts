import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/userSlice";
import { todoSlice } from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [todoSlice.name]: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
