import { useEffect, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import SearchComponent from '../components/SearchComponent';
import WeatherCard from '../components/WeatherCard';
import WeatherService from '../services/WeatherService';
import useWeatherSearch from '../hooks/useWeatherSearch';
import IQueryWeatherData from '../interfaces/IQueryWeatherData';

export default function Home() {
  const [ weatherData, setWeatherData ] = useState<IQueryWeatherData>({});
  const { handleWatherSearch, weather, loading } = useWeatherSearch();

  const onSearch = (wordToSearch: string) => {
    handleWatherSearch(wordToSearch)
  }

  useEffect(() => {
    const weatherDataFromLocal = WeatherService.getWeatherDataFromLocal();
    if (weatherDataFromLocal) {
      setWeatherData(weatherDataFromLocal)
    }
  }, [])

  useEffect(() => {    
    if(weather) {
      weatherData[weather.location.name] = weather;
      const newWeatherData = {...weatherData};

      setWeatherData(newWeatherData)
      WeatherService.saveWeatherDataToLocal(newWeatherData);
    }
  }, [weather])

  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <SearchComponent onSearch={onSearch} isLoading={loading}/>
        <Box display={"flex"} flexWrap={"wrap"} columnGap={"8px"} rowGap={"8px"}>
          {Object.entries(weatherData).map(([city, item]) => (
            <WeatherCard key={city} item={item} />
          ))}
        </Box>
      </Paper>
    </Container>
  );
}