import { useLocation, useNavigate } from "react-router-dom"
import type { WeatherData } from "../../models/Weather";
import { getWeatherStyles } from "../../utils/weatherStyles";
import { RiArrowLeftLine, RiSendPlaneLine } from "@remixicon/react";
import Navbar from "../../components/Shared/Navbar";
import logo from "../../assets/logo.svg"
import Footer from "../../components/Shared/Footer";

const WeatherDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { weather } = location.state as { weather: WeatherData };

  const { bgColor, icon: WeatherIcon } = getWeatherStyles(weather.condition);

  //Helper to format UNIX timestamps
  const formatTime = (timestamp: number) => 
    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", hour12: true
    });
   
  const currentDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const currentTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <div className="flex flex-col items-center">
        <Navbar />
        <div className="">
            <img 
                src={logo} 
                alt="logo" 
                className="w-45 sm:w-45 cursor-pointer mt-20"
                onClick={() => navigate('/')}
            />
        </div>
        <div className="app-background min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl rounded-lg shadow-xl overflow-hidden">
                {/* Top Section */}
                <div className={`relative p-6 text-white ${bgColor}`}>
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 text-gray-300/80 hover:text-gray-300 cursor-pointer"
                        aria-label="Go back"
                    >
                        <RiArrowLeftLine size={24} />
                    </button>

                    <div className="px-30">
                        <div className="text-center mt-8">
                            <h1 className="text-3xl text-gray-300 font-bold">{weather.cityName}</h1>
                            <p className="text-sm text-white/80">{currentTime}, {currentDate}</p>
                        </div>

                        <div className="flex justify-between mt-6">
                            <div className="flex flex-col items-center gap-2">
                                {WeatherIcon}
                                <p className="text-lg text-gray-300 capitalize">{weather.condition}</p>
                            </div>

                            <div className="border-r border-white/20 mx-4"></div>

                            <div className="flex flex-col gap-2 items-center text-6xl text-gray-300 font-extrabold">
                                {Math.round(weather.temperature)}°C
                                <div className="text-right text-gray-300 text-sm">
                                    <p>Temp Min: {Math.round(weather.tempMin)}°C</p>
                                    <p>Temp Max: {Math.round(weather.tempMax)}°C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="p-6" style={{ backgroundColor: "#30333d" }}>
                    <div className="flex justify-between text-sm text-gray-300">
                        {/* Left Details */}
                        <div className="space-y-1">
                            <p>Pressure: {weather.pressure}hPa</p>
                            <p>Humidity: {weather.humidity}%</p>
                            <p>Visibility: {(weather.visibility / 1000).toFixed(1)}km</p>
                        </div>

                        <div className="border-r border-white/20 mx-4"></div>

                        {/* Center Wind Details */}
                        <div className="flex flex-col items-center gap-2">
                            <RiSendPlaneLine size={24} style={{ transform: `rotate(${weather.windDegree}deg)` }} />
                            <p>{weather.windSpeed.toFixed(1)}m/s {weather.windDegree} Degree</p>
                        </div>

                        <div className="border-r border-white/20 mx-4"></div>

                        {/* Right Details */}
                        <div className="space-y-1 text-right">
                            <p>Sunrise: {formatTime(weather.sunrise)}</p>
                            <p>Sunset: {formatTime(weather.sunset)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default WeatherDetailPage
