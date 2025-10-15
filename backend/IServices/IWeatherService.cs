using backend.DTO.OpenWeatherMapDtos;

namespace backend.IServices
{
    public interface IWeatherService
    {
        Task<IEnumerable<WeatherDataDto>> GetWeatherForAllCitiesAsync();
    }
}
