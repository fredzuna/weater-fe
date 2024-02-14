import { useState } from "react";
import { IQueryParams } from "../interfaces/IQueryParams";
import { get } from "../services/Api";
import { IWeatherData } from "../interfaces/IWeatherData";

const useWeatherSearch = () => {
  const [weather, setWeather] = useState<IWeatherData>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (value: string) => {
    value = value.toLowerCase();

    if (!value) {
      return;
    }

    const params: IQueryParams = {
      q: value,
    };

    setLoading(true)
    setError(null);

    try {
      const data = await get('weather', params);
      setWeather(data);
    } catch (error: any) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { handleWatherSearch: handleSearch, weather, setWeather, loading, error };
};

export default useWeatherSearch