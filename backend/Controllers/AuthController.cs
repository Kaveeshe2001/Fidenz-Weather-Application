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

            if (!response.IsSuccessful && response.Content.Contains("mfa_required"))
            {
                var mfaResponse = JsonSerializer.Deserialize<MfaRequiredResponseDto>(response.Content);
                //give the mfa token to frontend
                return Ok(new { mfaRequired = true, mfaToken = mfaResponse.mfa_token });
            }

            if (response.IsSuccessStatusCode)
            {
                var tokenData = JsonSerializer.Deserialize<AuthResponseDto>(response.Content);
                return Ok(new { mfaRequired = false, token = tokenData });
            }

            return Unauthorized(response.Content);
        }

        [HttpPost("verify-mfa")]
        // OTP verification
        public async Task<IActionResult> VerifyMfa([FromBody] VerifyMfaRequestDto mfaRequest)
        {
            var client = new RestClient($"https://{_config["Auth0:Domain"]}");
            var request = new RestRequest("/oauth/token", Method.Post);

            request.AddJsonBody(new
            {
                grant_type = "http://auth0.com/oauth/grant-type/mfa-otp",
                mfa_token = mfaRequest.MfaToken,
                otp = mfaRequest.Otp,
                client_id = _config["Auth0:ClientId"]
            });

            var response = await client.ExecuteAsync(request);

            if (response.IsSuccessful)
            {
                var tokenData = JsonSerializer.Deserialize<AuthResponseDto>(response.Content);
                return Ok(tokenData);
            }

            return Unauthorized(response.Content);
        }
    }
}
