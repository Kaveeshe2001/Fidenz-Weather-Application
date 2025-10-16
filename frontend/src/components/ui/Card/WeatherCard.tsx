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
    <div className="relative bg-gradient-to-br from-indigo-800 to-purple-900 rounded-lg shadow-xl p-6 text-white flex flex-col justify-between h-auto min-h-[200px]">
      {onRemove && (
        <button
            onClick={handleRemove}
            className="absolute top-2 right-2 text-white hover:text-red-300 transition-colors"
            aria-label="Remove city"
        >
            &times;
        </button>
      )}

      {/*Top Section*/}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">{weather.cityName}</h2>
          <p className="text-sm text-gray-300">{currentTime}, {currentDate}</p>
          <p className="text-lg capitalize mt-1">{weather.condition}</p> 
        </div>
        <div className="text-5xl font-extrabold flex items-center">
            {formattedTemp}°C
            <img src="..." alt="weather icon" className="w-10 h-10 ml-2" />
        </div>
      </div>

      {/*Bottom Section*/}
      <div className="flex justify-between items-center text-sm text-gray-300 mt-4 pt-4 border-t border-gray-700">
        <div>
            <p>Temp Min: {Math.round(weather.temperature - 3)}°C</p>
            <p>Temp Max: {Math.round(weather.temperature + 5)}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mt-4">
        <p>Pressure: 1018hPa</p>
        <p>Sunrise: 6:05am</p>
        <p>Humidity: 78%</p>
        <p>Sunset: 6:05pm</p>
        <p>Visibility: 8.0km</p>
        <p>Wind: 4.0m/s 120 Degree</p>
      </div>
    </div>
  )
}

export default WeatherCard
