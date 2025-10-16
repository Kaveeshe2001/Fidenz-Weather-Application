import { RiSendPlaneLine } from "@remixicon/react";
import type { WeatherData } from "../../../models/Weather";

interface WeatherCardProps {
    weather: WeatherData;
    onRemove?: (cityName: string) => void;
}

const WeatherCard = ({ weather, onRemove }: WeatherCardProps) => {
  const handleRemove = () => {
    if (onRemove) {
        onRemove(weather.cityName);
    }
  };

  const formattedTemp = Math.round(weather.temperature);
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="relative bg-gradient-to-br from-indigo-800 to-purple-900 rounded-lg shadow-xl p-6 text-white flex flex-col justify-between h-auto min-h-[200px] cursor-pointer">
      {onRemove && (
        <button
            onClick={handleRemove}
            className="absolute top-2 right-2 text-white hover:text-red-300 transition-colors cursor-pointer"
            aria-label="Remove city"
        >
            X
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
        <div>
          <p className="text-sm text-gray-300 capitalize mt-1">{weather.condition}</p> 
        </div>
        <div className="text-gray-300 text-sm">
            <p>Temp Min: {Math.round(weather.temperature - 3)}°C</p>
            <p>Temp Max: {Math.round(weather.temperature + 5)}°C</p>
        </div>
      </div>

      {/*Bottom Section*/}
      <div className="text-gray-300 mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between gap-2  text-sm text-gray-300 mt-4">
            <div>
                <p>Pressure: 1018hPa</p>
                <p>Sunrise: 6:05am</p>
                <p>Humidity: 78%</p>
            </div>
            <div className="border-r" />
            <div className="flex flex-col justify-center items-center gap-1">
                <RiSendPlaneLine />
                <p>4.0m/s 120 Degree</p>
            </div>
            <div className="border-r" />
            <div>
                <p>Sunset: 6:05pm</p>
                <p>Visibility: 8.0km</p>
            </div>
        </div>
      </div>

      
    </div>
  )
}

export default WeatherCard
