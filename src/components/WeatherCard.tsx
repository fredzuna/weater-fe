import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IWeatherData } from '../interfaces/IWeatherData';
import { useEffect, useState } from 'react';
import { ETemperatureUnit } from '../enums/ETempertureUnit';
import EllipsisTypography from './EllipsisTypography';
import useWeatherSearch from '../hooks/useWeatherSearch';
import TransparentLoader from './TransparentLoader';
import WeatherService from '../services/WeatherService';

interface IProps {
    item: IWeatherData;
}
const WeatherCard = (prop: IProps) => {
    const [ item, setItem] = useState<IWeatherData>(prop.item)
    const [temperatureUnit, setTemperatureUnit] = useState<ETemperatureUnit>(ETemperatureUnit.Celsius);
    const { handleWatherSearch, loading, weather } = useWeatherSearch();    

    const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, value: ETemperatureUnit) => {
        setTemperatureUnit(value)
    };

    const handleRefresh = () => {
        handleWatherSearch(item.location.name)
    }

    const temperatureFeelslike = () => temperatureUnit === ETemperatureUnit.Celsius ? item.current.feelslike_c : item.current.feelslike_f
    const temperatureValue = () => temperatureUnit === ETemperatureUnit.Celsius ? item.current.temp_c : item.current.temp_f;

    useEffect(() => {
        if(weather) {
            setItem(weather);
            WeatherService.updateWeatherDataLocal(weather);
          }
    }, [weather])

    return (
        <Card sx={{ width: 300, position: 'relative' }}>
            <TransparentLoader open={loading} />
            <CardContent>
                <EllipsisTypography
                    text={`${item.location.name}, ${item.location.region} ${item.location.country}`}
                    variant="h5"
                    gutterBottom
                />
                <ToggleButtonGroup
                    value={temperatureUnit}
                    exclusive
                    onChange={handleToggleChange}
                    aria-label="temperature units"
                >
                    <ToggleButton value={ETemperatureUnit.Celsius} aria-label="celsius">
                        °C
                    </ToggleButton>
                    <ToggleButton value={ETemperatureUnit.Fahrenheit} aria-label="fahrenheit">
                        °F
                    </ToggleButton>
                </ToggleButtonGroup>

                <IconButton
                    onClick={handleRefresh}
                    aria-label="refresh"
                >
                    <RefreshIcon />
                </IconButton>

                <Typography variant="body1" gutterBottom>
                    {item.current.condition.text}
                </Typography>

                <img src={item.current.condition.icon} alt="Weather Icon" />

                <Typography variant="h4" gutterBottom>
                    {temperatureValue()}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {`Feels like: ${temperatureFeelslike()}`}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {`UV: ${item.current.uv}`}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {`Humidity: ${item.current.humidity}%`}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {`Local Time: ${item.location.localtime}`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
