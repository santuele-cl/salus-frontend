import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "./api/apiSlice";
import { authSlice } from "../features/auth/authSlice";
import { configurationSlice } from "../features/config/configurationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    config: configurationSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
