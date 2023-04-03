import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gwapi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.guildwars2.com/v2" }),
  reducerPath: "gwApi",
  tagTypes: ["Characters"],
  endpoints: (build) => ({
    getCharacters: build.query({
      query: (apikey) => `characters?access_token=${apikey}`,
      providesTags: ["Characters"],
    }),
    getAccount: build.query({
      query: (apikey) => `account?access_token=${apikey}`,
      providesTags: ["Account"],
    }),
  }),
});

export const { useGetCharactersQuery, useGetAccountQuery } = gwapi;
