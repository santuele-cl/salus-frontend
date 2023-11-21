import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (usersData) => {
        // const users = usersData.map((user) => ({ ...user, id: user._id }));
        return usersAdapter.setAll(initialState, usersData);
      },
      providesTags: (result) => [
        { type: "User", id: "LIST" },
        ...(result?.ids ? result.ids.map((id) => ({ type: "User", id })) : []),
      ],
    }),
    addNewUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: { ...userData },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (updatedUserData) => ({
        url: "/users",
        method: "PATCH",
        body: { ...updatedUserData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({ url: "/users", method: "DELETE", body: { id } }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// returns the query object result
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized stated object with ids and entities
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  //   Pass in a selector that returns the user slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
