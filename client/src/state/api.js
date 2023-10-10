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
    "Guild",
    "Profession",
    "Fight",
    "VisitLog",
  ],
  // Account
  endpoints: (build) => ({
    getAccountByApiId: build.query({
      query: (id) => `account/get/api/${id}`,
      providesTags: ["Account"],
    }),
    getAccountByName: build.query({
      query: (name) => `account/get/name/${name}`,
      providesTags: ["Account"],
    }),
    getAccountRoles: build.query({
      query: () => `general/account/roles`,
      providesTags: ["Account"],
    }),
    createAccount: build.mutation({
      query: (body) => ({
        url: `account/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Account"],
    }),
    updateAccount: build.mutation({
      query: (body) => ({
        url: `account/update`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Account"],
    }),
    updateKeyOrCreateAccount: build.mutation({
      query: (body) => ({
        url: `account/update/api`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Account"],
    }),
    //Profession
    getProfessions: build.query({
      query: () => `general/professions`,
      providesTags: ["Profession"],
    }),
    //Fight
    getFightsByRaid: build.query({
      query: (id) => `fight/all/${id}`,
      providesTags: ["Fight"],
    }),
    //VisitLog
    getVisitLogCountDay: build.query({
      query: (startDate) => `visitlog/all/count/day/${startDate}`,
      providesTags: ["VisitLog"],
    }),
    getVisitLogUserCount: build.query({
      query: (startDate) => `visitlog/all/count/user/${startDate}`,
      providesTags: ["VisitLog"],
    }),
    createVisitLog: build.mutation({
      query: (body) => ({
        url: `visitlog/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["VisitLog"],
    }),
    //User
    getUsers: build.query({
      query: () => `general/users`,
      providesTags: ["Account"],
    }),
    getGroups: build.query({
      query: (id) => `character/fights/${id}`,
      providesTags: ["Groups"],
    }),
    //Characters
    getCharacters: build.query({
      query: () => `general/character`,
      providesTags: ["Characters"],
    }),
    getCharactersByRaid: build.query({
      query: (id) => `character/raid/${id}`,
      providesTags: ["Characters"],
    }),
    //Stats
    getStatTypes: build.query({
      query: () => `general/stattypes`,
      providesTags: ["StatTypes"],
    }),
    getCharacterRaidStats: build.query({
      query: ({ id, stat }) => `character/raidstats/${id}/${stat}`,
      providesTags: ["Characters"],
    }),
    //Raid
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
    //Logs
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
    //Guild
    getGuildByApiId: build.query({
      query: (id) => `guild/api/${id}`,
      providesTags: ["Guild"],
    }),
  }),
});

export const {
  useGetAccountByApiIdQuery,
  useGetAccountByNameQuery,
  useGetGroupsQuery,
  useGetStatTypesQuery,
  useCreateAccountMutation,
  useUpdateKeyOrCreateAccountMutation,
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
  useUpdateAccountMutation,
  useGetGuildByApiIdQuery,
  useGetProfessionsQuery,
  useGetFightsByRaidQuery,
  useCreateVisitLogMutation,
  useGetVisitLogCountDayQuery,
  useGetVisitLogUserCountQuery,
} = api;
