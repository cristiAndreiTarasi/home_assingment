import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { fetchWeatherThunk } from "./weatherThunk";
import { WeatherState } from "../weatherTypes";

const initialState: WeatherState = {
    isLoading: false,
    error: null,
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchWeatherThunk.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchWeatherThunk.fulfilled, (state, action: PayloadAction<any>) => {
          state.isLoading = false;
        })
        .addCase(fetchWeatherThunk.rejected, (state, action: { payload?: any; error: SerializedError; }) => {
            state.isLoading = false;
            state.error = action.payload ? action.payload : action.error.message;
        });
    },
});
  
export default weatherSlice.reducer;
