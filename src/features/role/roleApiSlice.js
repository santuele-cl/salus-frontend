import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const rolesAdapter = createEntityAdapter({
  selectId: (e) => e.id,
});

const initialState = rolesAdapter.getInitialState();

const ENDPOINT_BASE_URL = "/roles";

export const rolesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ({
        url: ENDPOINT_BASE_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (responseData) => {
        console.log(responseData);
        return rolesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => [
        { type: "Roles", id: "LIST" },
        ...(result?.ids ? result.ids.map((id) => ({ type: "Role", id })) : []),
      ],
    }),
    addNewRole: builder.mutation({
      query: (newRoleData) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        body: { ...newRoleData },
      }),
      invalidatesTags: [{ type: "Roles", id: "LIST" }],
    }),
    updateRole: builder.mutation({
      query: (updatedRoleData) => ({
        url: ENDPOINT_BASE_URL,
        method: "PATCH",
        body: { ...updatedRoleData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Role", id: arg.id }],
    }),
    deleteRole: builder.mutation({
      query: ({ roleId }) => ({
        url: ENDPOINT_BASE_URL,
        method: "DELETE",
        body: { roleId },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Role", id: arg.id }],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useAddNewRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApiSlice;

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
