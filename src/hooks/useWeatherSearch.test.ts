 import { waitFor, renderHook } from "@testing-library/react";
 import { act } from "react-dom/test-utils";
import useWeatherSearch from "./useWeatherSearch";
import { fetchData } from "../services/Api";

const mockWeatherData = {
  "location": {
      "name": "Londres",
      "region": "Catamarca",
      "country": "Argentina",
      "lat": -27.72,
      "lon": -67.12,
      "tz_id": "America/Argentina/Catamarca",
      "localtime_epoch": 1700677490,
      "localtime": "2023-11-22 15:24"
  },
  "current": {
      "last_updated_epoch": 1700676900,
      "last_updated": "2023-11-22 15:15",
      "temp_c": 19.8,
      "temp_f": 67.6,
      "is_day": 1,
      "condition": {
          "text": "Patchy rain possible",
          "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
          "code": 1063
      },
      "wind_mph": 8.3,
      "wind_kph": 13.3,
      "wind_degree": 147,
      "wind_dir": "SSE",
      "pressure_mb": 1008,
      "pressure_in": 29.77,
      "precip_mm": 0.02,
      "precip_in": 0,
      "humidity": 62,
      "cloud": 79,
      "feelslike_c": 19.8,
      "feelslike_f": 67.6,
      "vis_km": 10,
      "vis_miles": 6,
      "uv": 4,
      "gust_mph": 9.5,
      "gust_kph": 15.3
  }
}

// Mock fetchData function
jest.mock("../services/Api", () => ({
  fetchData: jest.fn(),
}));

describe("useWeatherSearch", () => {
  test("should fetch weather data and update state", async () => {
    const { result } = renderHook(() => useWeatherSearch());

    (fetchData as jest.Mock).mockResolvedValue(mockWeatherData);

    await act(async () => {
      result.current.handleWatherSearch("mockCity");
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.weather).toEqual(mockWeatherData);
  });

  test("should handle error and update loading state", async () => {
    const { result } = renderHook(() => useWeatherSearch());
    
    (fetchData as jest.Mock).mockRejectedValue(new Error('API error'));

    await act(async () => {
      result.current.handleWatherSearch("mockCity");
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.loading).toBe(false);
    expect(result.current.weather).toBeUndefined();
    expect(result.current.error).toEqual('API error');    
  });
});
