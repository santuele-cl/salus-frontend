import { apiSlice } from "../../app/api/apiSlice";

const EVALUATION_BASE_URL = "/evaluations";

export const evaluationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvaluationByVisitId: builder.query({
      query: ({ id = "0" }) => ({
        url: `${EVALUATION_BASE_URL}/vs/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [
        { type: "Evaluation", id: arg.id },
      ],
    }),
    getEvaluationById: builder.query({
      query: ({ id = "0" }) => ({
        url: `${EVALUATION_BASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [
        { type: "Evaluation", id: arg.id },
      ],
    }),
    addEvaluation: builder.mutation({
      query: ({ visitId, evaluationData, medicationData }) => ({
        url: EVALUATION_BASE_URL,
        method: "POST",
        body: { visitId, evaluationData, medicationData },
      }),
      invalidatesTags: [{ type: "Evaluation", id: "LIST" }],
    }),
  }),
});

export const { useGetEvaluationByVisitIdQuery, useAddEvaluationMutation } =
  evaluationApiSlice;
