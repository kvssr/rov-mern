import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statBlacklist: [
    "Big Boomer",
    "Explosive Temper",
    "Explosive Entrance",
    "Med Kit",
  ],
  mode: "dark",
  guildApiId: "48B067A2-21A7-4858-8007-4ECA99798EBF",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
