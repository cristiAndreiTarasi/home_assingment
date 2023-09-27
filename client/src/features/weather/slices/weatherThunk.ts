import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../api/fetchWeather";
import { WeatherData } from "../weatherTypes";


export const fetchWeatherThunk = createAsyncThunk<WeatherData, { latitude: number, longitude: number }>(
    "weather/fetchWeather",
    async (location, thunkAPI) => {
        try {
            return await fetchWeather(location.latitude, location.longitude);
        } catch (error) {
            return thunkAPI.rejectWithValue("Fetching weather data failed");
        }
    }
);
