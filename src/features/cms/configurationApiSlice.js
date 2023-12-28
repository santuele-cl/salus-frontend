import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const rolesAdapter = createEntityAdapter({});

const initialState = rolesAdapter.getInitialState();

const ENDPOINT_BASE_URL = "/configuration";

export const configurationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfiguration: builder.query({
      query: () => ({
        url: ENDPOINT_BASE_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (responseData) => {
        return rolesAdapter.setAll(initialState, responseData);
      },
      providesTags: () => [{ type: "Configuration" }],
    }),
    addConfiguration: builder.mutation({
      query: (configData) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        body: { ...configData },
      }),
      invalidatesTags: [{ type: "Configuration" }],
    }),
    updateConfiguration: builder.mutation({
      query: (updatedConfig) => ({
        url: ENDPOINT_BASE_URL,
        method: "PATCH",
        body: { ...updatedConfig },
      }),
      invalidatesTags: [{ type: "Configuration" }],
    }),
    deleteConfiguration: builder.mutation({
      query: ({ configId }) => ({
        url: ENDPOINT_BASE_URL,
        method: "DELETE",
        body: { configId },
      }),
      invalidatesTags: [{ type: "Configuration" }],
    }),
  }),
});

export const {
  useGetConfigurationQuery,
  useAddConfigurationMutation,
  useUpdateConfigurationMutation,
  useDeleteConfigurationMutation,
} = configurationApiSlice;
