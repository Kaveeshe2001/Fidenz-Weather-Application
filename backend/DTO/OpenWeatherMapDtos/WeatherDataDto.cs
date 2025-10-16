namespace backend.DTO.OpenWeatherMapDtos
{
    public class WeatherDataDto
    {
        public string CityName { get; set; }
        public string Condition { get; set; }
        public float Temperature { get; set; }
        public float TempMin { get; set; }
        public float TempMax { get; set; }
        public int Pressure { get; set; }
        public int Humidity { get; set; }
        public int Visibility { get; set; }
        public float WindSpeed { get; set; }
        public int WindDegree { get; set; }
        public long Sunrise { get; set; }
        public long Sunset { get; set; }
    }
}
