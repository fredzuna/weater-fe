export interface IWeatherCard {
    location: string;
    region: string;
    country: string;
    conditionText: string;
    icon: string;
    temperature: number;
    feelsLikeTemperature: number;
    uv: number;
    humidity: number;
    localTime: string;
}