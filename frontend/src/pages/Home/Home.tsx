import { useEffect, useState } from "react"
import Footer from "../../components/Shared/Footer"
import Navbar from "../../components/Shared/Navbar"
import type { WeatherData } from "../../models/Weather";
import { getWeatherData } from "../../services/WeatherService";
import WeatherCard from "../../components/ui/Card/WeatherCard";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
      } catch (error) {
        setError('Failed to load initial weather data.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialWeather();
  }, []);

  const handleAddCity = () => {
    alert(`Add city: ${cityInput}`);
    setCityInput('');
  };

  return (
    <div className="app-background">
      <Navbar />

      <div className="mx-auto p-4 flex flex-col gap-5 items-center justify-center">
        <img 
          src={logo} 
          alt="logo" 
          className="w-45 sm:w-45 cursor-pointer"
          onClick={() => navigate('/')}
        />

        <div className="flex flex-col sm:flex-row mb-8 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter a City"
            className="flex-grow p-3 rounded-lg bg-gray-950 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <button
            onClick={handleAddCity}
            className="px-6 py-3 rounded-lg bg-purple-800 text-white font-semibold hover:bg-purple-900 transition-colors cursor-pointer"
          >
            Add City
          </button>
        </div>

        {isLoading && <p>Loading weather...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
            {weatherData.map((weather, index) => (
              <WeatherCard key={weather.cityName || index} weather={weather} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Home
