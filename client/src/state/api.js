import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Account", "Raid", "Logs", "Exists"],
  endpoints: (build) => ({
    getAccount: build.query({
      query: (id) => `general/account/${id}`,
      providesTags: ["Account"],
    }),
    getRaids: build.query({
      query: () => `raid/details`,
      providesTags: ["Raid"],
    }),
    checkRaid: build.query({
      query: (start_date, start_time) =>
        `raid/exists/${start_date}/${start_time}`,
      providesTags: ["Exists"],
    }),
    addRaidLogs: build.mutation({
      query: (body) => ({
        url: `log/post`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Logs"],
    }),
    deleteRaidLogs: build.mutation({
      query: (id) => ({
        url: `raid/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Raid"],
    }),
  }),
});

export const {
  useGetAccountQuery,
  useGetRaidsQuery,
  useAddRaidLogsMutation,
  useCheckRaidQuery,
  useDeleteRaidLogsMutation,
} = api;
