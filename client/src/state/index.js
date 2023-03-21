import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  accountId: "641438eff2e06ed9fdbba341",
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
