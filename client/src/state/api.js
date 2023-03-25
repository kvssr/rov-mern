import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Account", "Raid", "Logs"],
  endpoints: (build) => ({
    getAccount: build.query({
      query: (id) => `general/account/${id}`,
      providesTags: ["Account"],
    }),
    getRaids: build.query({
      query: () => `raid/details`,
      providesTags: ["Raid"],
    }),
    postRaidLogs: build.query({
      query: (logs) => ({ url: `log/post`, data: logs }),
      providesTags: ["Logs"],
    }),
  }),
});

export const { useGetAccountQuery, useGetRaidsQuery, usePostRaidLogsQuery } =
  api;
