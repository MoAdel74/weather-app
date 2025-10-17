import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    result: null,
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },
});
export default weatherSlice.reducer;
export const { changeResult } = weatherSlice.actions;
