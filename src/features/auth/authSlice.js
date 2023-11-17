import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    removeAccessToken: () => {
      return initialState;
    },
  },
});

export const { setAccessToken, removeAccessToken } = authSlice.actions;

export const getAccessToken = (state) => state.auth.accessToken;
