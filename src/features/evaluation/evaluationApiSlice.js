import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const evaluationAdapter = createEntityAdapter({});

const initialState = evaluationAdapter.getInitialState();

const EVALUATION_BASE_URL = "/evalutions";

export const evaluationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatientEvaluations: builder.query({
      query: ({ id = "0" }) => ({
        url: `${EVALUATION_BASE_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (evaluations) => {
        return evaluations;
      },
      providesTags: (_result, _error, arg) => [
        { type: "Evaluation", id: arg.id },
      ],
    }),
    getAllEvaluations: builder.query({
      query: () => ({
        url: EVALUATION_BASE_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (evaluations) => {
        return evaluationAdapter.setAll(initialState, evaluations);
      },
      providesTags: (result) => [
        { type: "Evaluation", id: "LIST" },
        ...(result?.ids
          ? result.ids.map((id) => ({ type: "Evaluation", id }))
          : []),
      ],
    }),
    addEvaluation: builder.mutation({
      query: (evaluationData) => ({
        url: EVALUATION_BASE_URL,
        method: "POST",
        body: { ...evaluationData },
      }),
      invalidatesTags: [{ type: "Evaluation", id: "LIST" }],
    }),
    updateEvaluation: builder.mutation({
      query: (updatedEvaluationData) => ({
        url: EVALUATION_BASE_URL,
        method: "PATCH",
        body: { ...updatedEvaluationData },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Evaluation", id: arg.id },
      ],
    }),
    deleteEvaluation: builder.mutation({
      query: ({ id }) => ({
        url: `${EVALUATION_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Evaluation", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetPatientEvaluationsQuery,
  useLazyGetPatientEvaluationsQuery,
  useGetAllEvaluationsQuery,
  useAddEvaluationMutation,
  useUpdateEvaluationMutation,
  useDeleteEvaluationMutation,
} = evaluationApiSlice;

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
