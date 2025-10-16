using backend.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("backend/weather")]
    [ApiController]
    public class WeatherController : Controller
    {
        private readonly IWeatherService _weatherService;

        public WeatherController(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetWeatherData()
        {
            var weatherData = await _weatherService.GetWeatherForAllCitiesAsync();
            return Ok(weatherData);
        }
    }
}
