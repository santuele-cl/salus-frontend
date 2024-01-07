import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const visitAdapter = createEntityAdapter({});

const initialState = visitAdapter.getInitialState();

const LABPROCCAT_BASE_RUL = "/procedurecategories";

export const labOrdersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabProcedureCategories: builder.query({
      query: () => ({
        url: LABPROCCAT_BASE_RUL,
        method: "GET",
      }),
      keepUnusedDataFor: 60 * 5,
      providesTags: (result) => [{ type: "LabProcCategories", id: "LIST" }],
    }),
    getLabOrderById: builder.query({
      query: ({ labOrderId = "0" }) => ({
        url: `${LABPROCCAT_BASE_RUL}/${labOrderId}`,
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
        url: LABPROCCAT_BASE_RUL,
        method: "POST",
        body: { patientChartId, labOrderData },
      }),
      invalidatesTags: [{ type: "LabOrders", id: "LIST" }],
    }),
    updateLabOrder: builder.mutation({
      query: ({ updatedLabOrderData, labOrderId }) => ({
        url: `${LABPROCCAT_BASE_RUL}/${labOrderId}`,
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
        url: `${LABPROCCAT_BASE_RUL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "LabOrders", id: arg.id },
      ],
    }),
  }),
});

export const { useGetLabProcedureCategoriesQuery } = labOrdersApiSlice;

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
