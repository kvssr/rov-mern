import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Account",
    "Raid",
    "Logs",
    "Exists",
    "Characters",
    "StatTypes",
    "Groups",
  ],
  endpoints: (build) => ({
    getAccount: build.query({
      query: (id) => `general/account/get/${id}`,
      providesTags: ["Account"],
    }),
    getUsers: build.query({
      query: () => `general/users`,
      providesTags: ["Account"],
    }),
    getAccountRoles: build.query({
      query: () => `general/account/roles`,
      providesTags: ["Account"],
    }),
    getGroups: build.query({
      query: (id) => `character/fights/${id}`,
      providesTags: ["Groups"],
    }),
    getCharacters: build.query({
      query: () => `general/character`,
      providesTags: ["Characters"],
    }),
    getCharactersByRaid: build.query({
      query: (id) => `character/raid/${id}`,
      providesTags: ["Characters"],
    }),
    getStatTypes: build.query({
      query: () => `general/stattypes`,
      providesTags: ["StatTypes"],
    }),
    getCharacterRaidStats: build.query({
      query: ({ id, stat }) => `character/raidstats/${id}/${stat}`,
      providesTags: ["Characters"],
    }),
    addAccount: build.mutation({
      query: (body) => ({
        url: `general/account/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Account"],
    }),
    getRaids: build.query({
      query: () => `raid/details`,
      providesTags: ["Raid"],
    }),
    getRaidById: build.query({
      query: (details) => `raid/details/${details.id}/${details.stat}`,
      providesTags: ["Raid"],
    }),
    getRaidsInfoList: build.query({
      query: () => `raid/infolist`,
      providesTags: ["Raid"],
    }),
    getPersRaidStats: build.query({
      query: (body) => ({
        url: `raid/personalstats`,
        params: body,
      }),
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
  useGetGroupsQuery,
  useGetStatTypesQuery,
  useAddAccountMutation,
  useGetRaidsQuery,
  useGetRaidByIdQuery,
  useAddRaidLogsMutation,
  useCheckRaidQuery,
  useDeleteRaidLogsMutation,
  useGetRaidsInfoListQuery,
  useGetCharactersQuery,
  useGetCharactersByRaidQuery,
  useGetCharacterRaidStatsQuery,
  useGetPersRaidStatsQuery,
  useGetAccountRolesQuery,
  useGetUsersQuery,
} = api;
