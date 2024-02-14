import IQueryWeatherData from "../interfaces/IQueryWeatherData";
import { IWeatherCard } from "../interfaces/IWeatherCard";
import { IWeatherData } from "../interfaces/IWeatherData";

const WeatherService = {
    saveWeatherDataToLocal: (weatherData: IQueryWeatherData) => {
        localStorage.setItem('queryWeatherData', JSON.stringify(weatherData));
    },
    
    getWeatherDataFromLocal: (): IQueryWeatherData | null => {
        const storedWeatherData = localStorage.getItem('queryWeatherData');
        return storedWeatherData ? JSON.parse(storedWeatherData) : null;
    },

    updateWeatherDataLocal: (weather: IWeatherData) => {
        const weatherData = WeatherService.getWeatherDataFromLocal() || {};
        weatherData[weather.location.name] = weather;
        WeatherService.saveWeatherDataToLocal({...weatherData});
    },

    prepareCardData: (item: IWeatherData) => {
        const { location, current } = item;
        
        const data: IWeatherCard = {
            location: location.name,
            region: location.region,
            country: location.country,
            conditionText: current.condition.text,
            icon: current.condition.icon,
            temperature: current.temp_c,
            feelsLikeTemperature: current.feelslike_c,
            uv: current.uv,
            humidity: current.humidity,
            localTime: location.localtime,
        };

        return data
    }
}

export default WeatherService