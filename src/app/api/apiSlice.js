import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  removeAccessToken,
  setAccessToken,
} from "../../features/auth/authSlice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include", //if true, send httpOnly cookie along with the request
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log("args", args); // request url, method, body
  // console.log("api", api); // signal, dispatch, getState()
  // console.log(extraOptions); //custom like {shout: true}

  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result?.error?.status === 401) {
    // api.dispatch(api.util.resetApiState());

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          "/auth/refresh",
          api,
          extraOptions
        );

        if (refreshResult?.data) {
          const { accessToken } = refreshResult.data;
          api.dispatch(setAccessToken(accessToken));

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(removeAccessToken());
          // await baseQuery(
          //   { url: "/auth/logout", method: "POST" },
          //   api,
          //   extraOptions
          // );
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  // console.log(result);
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Roles", "Users", "Configuration", "Vitals"],
  endpoints: () => ({}),
});
