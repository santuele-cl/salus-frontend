import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const patientAdapter = createEntityAdapter({});

const initialState = patientAdapter.getInitialState();

const PATIENT_BASE_URL = "/patients";

export const patientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatientById: builder.query({
      query: ({ id = "0" }) => ({
        url: `${PATIENT_BASE_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (patient) => {
        return patient;
      },
      providesTags: (_result, _error, arg) => [{ type: "Patient", id: arg.id }],
    }),
    getPatients: builder.query({
      query: () => ({
        url: PATIENT_BASE_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (patients) => {
        return patientAdapter.setAll(initialState, patients);
      },
      providesTags: (result) => [
        { type: "Patient", id: "LIST" },
        ...(result?.ids
          ? result.ids.map((id) => ({ type: "Patient", id }))
          : []),
      ],
    }),
    addPatient: builder.mutation({
      query: (patientData) => ({
        url: PATIENT_BASE_URL,
        method: "POST",
        body: { ...patientData },
      }),
      invalidatesTags: [{ type: "Patient", id: "LIST" }],
    }),
    updatePatient: builder.mutation({
      query: (updatedPatientData) => ({
        url: PATIENT_BASE_URL,
        method: "PATCH",
        body: { ...updatedPatientData },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Patient", id: arg.id },
      ],
    }),
    deletePatient: builder.mutation({
      query: ({ id }) => ({
        url: `${PATIENT_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Patient", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useLazyGetPatientByIdQuery,
  useAddPatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApiSlice;

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
