
import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { TransformedData, WeatherState } from "../../features/weather/weatherTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";


// I could've used styled-components for custom styles
const jumboStyle = {
    minHeight: "100vh",     
    display: "flex",
    alignItems: "center",    
    justifyContent: "center"  
};

const textStyle = {
    fontSize: "2.5rem" ,
    color: "rgba(255, 255, 255, 0.5)"    
};

interface WeatherPageViewProps {
    data: TransformedData[];
}

const WeatherPageView: React.FC<WeatherPageViewProps> = ({ data }) => {
    const isLoading = useSelector((state: RootState) => state.weather.isLoading);

    if (isLoading || data.length === 0) {
        return <div className="container-fluid bg-dark" style={jumboStyle}>
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }
    
    return <div className="container-fluid bg-dark" style={jumboStyle}>
        <div className="text-center" style={textStyle}>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="temperature_2m" stroke="#8884d8" />
                <XAxis 
                    dataKey="time"
                    tick={{ fontSize: "12px" }}
                />
                <YAxis 
                    tick={{ fontSize: "12px" }}
                    tickFormatter={(tick) => tick.toFixed(2)}
                />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "10px" }} />
            </LineChart>
        </div>
    </div>; 
}

export default WeatherPageView;