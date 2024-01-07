import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const visitAdapter = createEntityAdapter({});

const initialState = visitAdapter.getInitialState();

const LABORDERS_BASE_URL = "/laborders";

export const labOrdersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabOrdersByPatientChartId: builder.query({
      query: (patientChartId = "0") => ({
        url: `${LABORDERS_BASE_URL}/pc/${patientChartId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      providesTags: (result) => [
        { type: "LabOrders", id: "LIST" },
        ...(result?.ids
          ? result.ids.map((id) => ({ type: "LabOrders", id }))
          : []),
      ],
    }),
    getLabOrderById: builder.query({
      query: ({ labOrderId = "0" }) => ({
        url: `${LABORDERS_BASE_URL}/${labOrderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      transformResponse: (labOrder) => {
        return labOrder;
      },
      providesTags: (_result, _error, arg) => [
        { type: "LabOrders", id: arg.labOrderId },
      ],
    }),
    addLabOrder: builder.mutation({
      query: ({ patientChartId, labOrderData }) => ({
        url: LABORDERS_BASE_URL,
        method: "POST",
        body: { patientChartId, labOrderData },
      }),
      invalidatesTags: [{ type: "LabOrders", id: "LIST" }],
    }),
    updateLabOrder: builder.mutation({
      query: ({ updatedLabOrderData, labOrderId }) => ({
        url: `${LABORDERS_BASE_URL}/${labOrderId}`,
        method: "PATCH",
        body: { updatedLabOrderData: { ...updatedLabOrderData } },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "LabOrders", id: "LIST" },
        { type: "LabOrders", id: arg.labOrderId },
      ],
    }),
    deleteLabOrder: builder.mutation({
      query: ({ id }) => ({
        url: `${LABORDERS_BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "LabOrders", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetLabOrdersByPatientChartIdQuery,
  useGetLabOrderByIdQuery,
  useAddLabOrderMutation,
  useUpdateLabOrderMutation,
} = labOrdersApiSlice;

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
