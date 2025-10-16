namespace backend.DTO.OpenWeatherMapDtos
{
    public class OpenWeatherMapResponse
    {
        public string Name { get; set; }
        public MainData Main { get; set; }
        public WeatherDescription[] Weather { get; set; }
        public WindData Wind { get; set; }
        public SysData Sys { get; set; }
        public int Visibility { get; set; }
    }

    public class MainData
    {
        public float Temp { get; set; }
        public float Temp_Min { get; set; } 
        public float Temp_Max { get; set; } 
        public int Pressure { get; set; }
        public int Humidity { get; set; }
    }

    public class WeatherDescription 
    {
        public string Description { get; set; }
    }

    public class WindData
    {
        public float Speed { get; set; }
        public int Deg { get; set; }
    }

    public class SysData
    {
        public long Sunrise { get; set; }
        public long Sunset { get; set; }
    }
}
