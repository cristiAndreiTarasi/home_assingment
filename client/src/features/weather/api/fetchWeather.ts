import { fetchAPIInstace } from "../../../shared/fetchApiInstance";
import { WeatherData } from "../weatherTypes";

export const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
    try {
        const response: { data: WeatherData; status: number; } = await fetchAPIInstace(`/get-weather?latitude=${latitude}&longitude=${longitude}`);
        
        if (response.status >= 400 && response.status < 600) {
            throw new Error("Fetching weather data failed");
        }
        
        return response.data;
    } catch (error) {
        throw error;
    }
};
