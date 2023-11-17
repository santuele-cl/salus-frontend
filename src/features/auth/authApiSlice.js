import { apiSlice } from "../../app/api/apiSlice";
import { removeAccessToken, setAccessToken } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ mutation, query }) => ({
    login: mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(removeAccessToken());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: query({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          console.log(accessToken);
          dispatch(setAccessToken(accessToken));
        } catch (error) {
          // console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshQuery } =
  authApiSlice;
