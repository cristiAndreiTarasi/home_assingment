interface HourlyUnits {
    time: string;
    temperature_2m: string;
}

export interface TransformedData {
    temperature_2m: number;
}
  
interface Hourly {
    time: string[];
    temperature_2m: number[];
    humidity_2m?: number[]; 
    precipitation_sum?: number[]; 
  }
  
interface DailyUnits {
    time: string;
    sunset: string;
    rain_sum: string;
    showers_sum: string;
    precipitation_hours: string;
}
  
interface Daily {
    time: string[];
    sunset: string[];
    rain_sum: number[];
    showers_sum: number[];
    precipitation_hours: number[];
}
  
export interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly_units: HourlyUnits;
    hourly: Hourly;
    daily_units: DailyUnits;
    daily: Daily;
}

export interface WeatherState {
    isLoading: boolean;
    error: string | null;
}