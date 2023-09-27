import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../shared/hooks/appDispatch";
import { fetchWeatherThunk } from "../../features/weather/slices/weatherThunk";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { TransformedData, WeatherData } from "../../features/weather/weatherTypes";
import WeatherPageView from "./WeatherPageView";

const WeatherPage: React.FC = () => {
    const [data, setData] = useState<TransformedData[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const weatherData = await dispatch(fetchWeatherThunk({ latitude, longitude })).unwrap();
                    const transformedData = weatherData.hourly.time.map((time, index) => {
                        return {
                            temperature_2m: weatherData.hourly.temperature_2m[index],
                        };
                    });
                    
                    setData(transformedData);
                } catch (error) {
                    console.error("Fetching weather data failed", error);
                }
            }, (error) => {
                console.error("Geolocation Error: ", error);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, [dispatch]);

    return <WeatherPageView data={data} />;
};

export default WeatherPage;
