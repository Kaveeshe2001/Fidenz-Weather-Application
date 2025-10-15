namespace backend.DTO.OpenWeatherMapDtos
{
    public class OpenWeatherMapResponse
    {
        public string Name { get; set; }
        public MainData Main { get; set; }
        public WeatherDescription[] Weather { get; set; }
    }

    public class MainData
    {
        public float Temp { get; set; }
    }

    public class WeatherDescription 
    {
        public string Description { get; set; }
    }
}
