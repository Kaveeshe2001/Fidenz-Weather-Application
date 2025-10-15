using backend.DTO.OpenWeatherMapDtos;
using backend.IServices;
using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;

namespace backend.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;
        private readonly IMemoryCache _cache;
        private readonly ILogger<WeatherService> _logger;

        public WeatherService(IHttpClientFactory httpClientFactory, IConfiguration config, IMemoryCache cache, ILogger<WeatherService> logger)
        {
            _httpClientFactory = httpClientFactory;
            _config = config;
            _cache = cache;
            _logger = logger;
        }

        public async Task<IEnumerable<WeatherDataDto>> GetWeatherForAllCitiesAsync()
        {
            const string cacheKey = "AllCitiesWeatherData";

            // Try to get data from the cache first
            if (_cache.TryGetValue(cacheKey, out IEnumerable<WeatherDataDto> cachedData))
            {
                _logger.LogInformation("Serving weather data from cache.");
                return cachedData;
            }

            var apiKey = _config["OpenWeatherMap:ApiKey"];
            var cityCodes = await GetCityCodesAsync();
            var weatherTasks = new List<Task<WeatherDataDto>>();
            var client = _httpClientFactory.CreateClient();

            foreach ( var cityCode in cityCodes)
            {
                var url = $"https://api.openweathermap.org/data/2.5/weather?id={cityCode}&appid={apiKey}&units=metric";
                weatherTasks.Add(FetchWeatherForCityAsync(client, url));
            }

            var weatherData = await Task.WhenAll(weatherTasks);
            var validWeatherData = weatherData.Where(w => w != null).ToList();

            // Store the result in the cache with a 5-minute expiration
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(5));

            _cache.Set(cacheKey, validWeatherData, cacheEntryOptions);
            _logger.LogInformation("Fetched new weather data and cached it.");

            return validWeatherData;
        }

        private async Task<WeatherDataDto?> FetchWeatherForCityAsync(HttpClient client, string url)
        {
            try
            {
                //Use JsonSerializerOptions to ignore case sensitivity
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var response = await client.GetFromJsonAsync<OpenWeatherMapResponse>(url, options);
                if (response == null) return null;

                // Map the response to the DTO
                return new WeatherDataDto
                {
                    CityName = response.Name,
                    Condition = response.Weather.FirstOrDefault()?.Description ?? "N/A",
                    Temperature = response.Main.Temp
                };

            } catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch weather data from URL: {Url}", url);
                return null;
            }
        }

        private async Task<IEnumerable<string>> GetCityCodesAsync()
        {
            // Reads the city codes from the JSON file
            var path = Path.Combine(AppContext.BaseDirectory, "Data", "cities.json");
            var json = await File.ReadAllTextAsync(path);
            var cityListContainer = JsonSerializer.Deserialize<CityListContainer>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            return cityListContainer?.List?.Select(c => c.CityCode).ToList() ?? new List<string>();
        }

        private class CityListContainer
        {
            public List<City> List { get; set; }
        }
        private class City { public string CityCode { get; set; } }
    }
}
