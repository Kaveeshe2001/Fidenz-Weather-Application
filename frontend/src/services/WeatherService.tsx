import type { WeatherData } from "../models/Weather";
import apiClient from "./apiClient";

export const getWeatherData = async (): Promise<WeatherData[]> => {
    const response = await apiClient.get<WeatherData[]>('weather');
    return response.data;
};