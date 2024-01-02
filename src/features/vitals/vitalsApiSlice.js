import { apiSlice } from "../../app/api/apiSlice";

const VITALS_BASE_URL = "/vitals";

export const vitalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVitalsByVisitId: builder.query({
      query: ({ id = "0" }) => ({
        url: `${VITALS_BASE_URL}/vs/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [{ type: "Vitals", id: "LIST" }],
    }),
    addVitals: builder.mutation({
      query: ({ visitId, vitalsData }) => ({
        url: VITALS_BASE_URL,
        method: "POST",
        body: { visitId, vitalsData },
      }),
      invalidatesTags: [{ type: "Vitals", id: "LIST" }],
    }),
  }),
});

export const { useGetVitalsByVisitIdQuery, useAddVitalsMutation } =
  vitalsApiSlice;
