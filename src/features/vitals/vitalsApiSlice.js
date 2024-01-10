import { apiSlice } from "../../app/api/apiSlice";

const VITALS_BASE_URL = "/vitals";

export const vitalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVitalsByVisitId: builder.query({
      query: ({ id = "0" }) => ({
        url: `${VITALS_BASE_URL}/vs/${id}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Vitals", id: "LIST" }],
    }),
    getVitalById: builder.query({
      query: ({ id = "0" }) => {
        return {
          url: `${VITALS_BASE_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: (_result, _error, arg) => [{ type: "Vitals", id: arg.id }],
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

export const {
  useGetVitalsByVisitIdQuery,
  useGetVitalByIdQuery,
  useAddVitalsMutation,
} = vitalsApiSlice;
