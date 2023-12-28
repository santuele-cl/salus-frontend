import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

const USER_BASE_URL = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: ({ id }) => ({
        url: `${USER_BASE_URL}/${id ? id : "U"}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (userData) => {
        return userData;
      },
      providesTags: (_result, _error, arg) => [{ type: "User", id: arg.id }],
    }),
    getUsers: builder.query({
      query: () => ({
        url: USER_BASE_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (usersData) => {
        return usersAdapter.setAll(initialState, usersData);
      },
      providesTags: (result) => [
        { type: "User", id: "LIST" },
        ...(result?.ids ? result.ids.map((id) => ({ type: "User", id })) : []),
      ],
    }),
    addNewUser: builder.mutation({
      query: (userData) => ({
        url: USER_BASE_URL,
        method: "POST",
        body: { ...userData },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (updatedUserData) => ({
        url: USER_BASE_URL,
        method: "PATCH",
        body: { ...updatedUserData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `${USER_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// // returns the query object result
// export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// // creates memoized selector
// const selectUsersData = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data // normalized stated object with ids and entities
// );

// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   //   Pass in a selector that returns the user slice of state
// } = usersAdapter.getSelectors(
//   (state) => selectUsersData(state) ?? initialState
// );
