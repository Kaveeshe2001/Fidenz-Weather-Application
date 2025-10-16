import { RiCloseLine, RiSendPlaneLine } from "@remixicon/react";
import type { WeatherData } from "../../../models/Weather";
import { getWeatherStyles } from "../../../utils/weatherStyles";

interface WeatherCardProps {
    weather: WeatherData;
    onRemove?: (cityName: string) => void;
}

const WeatherCard = ({ weather, onRemove }: WeatherCardProps) => {
    const { bgColor, icon: WeatherIcon } = getWeatherStyles(weather.condition);

  const handleRemove = () => {
    if (onRemove) {
        onRemove(weather.cityName);
    }
  };

  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true
    });

  const formattedTemp = Math.round(weather.temperature);
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="rounded-lg shadow-xl overflow-hidden cursor-pointer flex flex-col">
        <div
            className={`relative p-8 text-white bg-no-repeat bg-bottom ${bgColor}`}
            style={{ backgroundImage: `url('/card-bg.svg')` }}
        >
            {onRemove && (
            <button
                onClick={handleRemove}
                className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Remove city"
            >
                <RiCloseLine size={24} />
            </button>
            )}

            {/*Top Section*/}
            <div className="flex justify-between items-start mb-4">
                <div>
                <h2 className="text-3xl text-gray-300 font-bold">{weather.cityName}</h2>
                <p className="text-sm text-gray-300">{currentTime}, {currentDate}</p>
                </div>
                <div className="text-5xl text-gray-300 font-extrabold flex items-center">
                    {formattedTemp}°C
                </div>
            </div>

            {/*Center Section*/}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    {WeatherIcon}
                    <p className="text-sm text-gray-300 capitalize">{weather.condition}</p> 
                </div>
                <div className="text-gray-300 text-sm">
                    <p>Temp Min: {Math.round(weather.temperature - 3)}°C</p>
                    <p>Temp Max: {Math.round(weather.temperature + 5)}°C</p>
                </div>
            </div>
        </div>

        <div className="p-6" style={{ backgroundColor: '#30333d' }}>
            <div className="flex justify-between items-center text-sm text-gray-300">
                {/* Left Details */}
                <div className="space-y-1">
                    <p>Pressure: {weather.pressure}hPa</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Visibility: {(weather.visibility / 1000).toFixed(1)}km</p>
                </div>

                <div className="border-r border-gray-200" />

                {/* Center Wind Details */}
                <div className="flex flex-col items-center gap-1">
                    <RiSendPlaneLine size={24} style={{ transform: `rotate(${weather.windDegree}deg)` }} />
                    <p>{weather.windSpeed.toFixed(1)}m/s {weather.windDegree} Degree</p>
                </div>

                <div className="border-r border-gray-200" />

                {/* Right Details */}
                <div className="space-y-1 text-right">
                    <p>Sunrise: {formatTime(weather.sunrise)}</p>
                    <p>Sunset: {formatTime(weather.sunset)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherCard;
