import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { setConfig } from "./configurationSlice";

const configAdapter = createEntityAdapter({});

const initialState = configAdapter.getInitialState();

const ENDPOINT_BASE_URL = "/config";

export const configurationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfiguration: builder.query({
      query: () => ({
        url: ENDPOINT_BASE_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 10,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setConfig(data));
        } catch (error) {
          // console.log(error);
        }
      },
      // transformResponse: (responseData) => {
      //   // console.log(responseData);
      //   // return configAdapter.setAll(initialState, responseData);
      //   return responseData;
      // },
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
        url: `${ENDPOINT_BASE_URL}/C58923F`,
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

// // returns the query object result
// export const selectRolesResult = rolesApiSlice.endpoints.getRoles.select();

// // creates memoized selector
// const selectRolesData = createSelector(
//   selectRolesResult,
//   (rolesResult) => rolesResult.data // normalized stated object with ids and entities
// );

// export const {
//   selectAll: selectAllRoles,
//   selectById: selectRoleById,
//   selectIds: selectRoleIds,
//   //   Pass in a selector that returns the user slice of state
// } = rolesAdapter.getSelectors(
//   (state) => selectRolesData(state) ?? initialState
// );
