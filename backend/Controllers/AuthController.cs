using backend.DTO.AuthDtos;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Text.Json;

namespace backend.Controllers
{
    [Route("backend/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            var options = new RestClientOptions($"https://{_config["Auth0:Domain"]}");
            var client = new RestClient(options);
            var request = new RestRequest("/oauth/token", Method.Post);

            request.AddHeader("content-type", "application/json");
            request.AddJsonBody(new { 
                grant_type = "password",
                username = loginRequest.Email,
                password = loginRequest.Password,
                audience = _config["Auth0:Audience"],
                client_id = _config["Auth0:ClientId"],
                connection = "Username-Password-Authentication"
            });

            RestResponse response = await client.ExecuteAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var tokenData = JsonSerializer.Deserialize<AuthResponseDto>(response.Content!);
                return Ok(tokenData);
            }

            return Unauthorized(response.Content);
        }
    }
}
