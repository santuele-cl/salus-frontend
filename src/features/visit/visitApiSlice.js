import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const visitAdapter = createEntityAdapter({});

const initialState = visitAdapter.getInitialState();

const VISIT_BASE_URL = "/visits";

export const visitApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVisitsByPatientChartId: builder.query({
      query: (patientChartId = "0") => ({
        url: `${VISIT_BASE_URL}/patientChart/${patientChartId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (visits) => {
        return visits;
      },
      providesTags: (result) => [
        { type: "Visits", id: "LIST" },
        ...(result?.ids
          ? result.ids.map((id) => ({ type: "Visits", id }))
          : []),
      ],
    }),
    getVisit: builder.query({
      query: ({ visitId = "0" }) => ({
        url: `${VISIT_BASE_URL}/${visitId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (visit) => {
        return visitAdapter.setAll(initialState, visit);
      },
      providesTags: (_result, _error, arg) => [
        { type: "Visits", id: arg.visitId },
      ],
    }),
    addVisit: builder.mutation({
      query: ({ patientChartId, visitData }) => ({
        url: VISIT_BASE_URL,
        method: "POST",
        body: { patientChartId, visitData },
      }),
      invalidatesTags: [{ type: "Visits", id: "LIST" }],
    }),
    updateVisit: builder.mutation({
      query: (updatedVisitData) => ({
        url: VISIT_BASE_URL,
        method: "PATCH",
        body: { ...updatedVisitData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Visits", id: arg.id }],
    }),
    deleteVisit: builder.mutation({
      query: ({ id }) => ({
        url: `${VISIT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Visits", id: arg.id }],
    }),
  }),
});

export const {
  useGetVisitsByPatientChartIdQuery,
  useGetVisitQuery,
  useAddVisitMutation,
  useUpdateVisitMutation,
  useDeleteVisitMutation,
} = visitApiSlice;

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
