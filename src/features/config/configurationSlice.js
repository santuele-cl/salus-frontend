import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  config: { name: null, logo: null, loginBg: null },
};

export const configurationSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.config = action.payload;
    },
    removeConfig: () => {
      return initialState;
    },
  },
});

export const { setConfig, removeConfig } = configurationSlice.actions;

export const getConfigurationData = (state) => state.config.config;
