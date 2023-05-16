// Redux slice that containt User state

"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserInterface {
  name: string;
  email: string;
  token: string; // JWT
}

const initialState: UserInterface = {
  name: "",
  email: "",
  token: "",
};

export const userStateSlice = createSlice({
  name: "UserState",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ name: string; email: string; token: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: () => {
      localStorage.removeItem("persist:root");
      return initialState;
    },
  },
});

export const { login, logout } = userStateSlice.actions;
export default userStateSlice.reducer;
