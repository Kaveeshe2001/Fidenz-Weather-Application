namespace backend.DTO.AuthDtos
{
    public class MfaRequiredResponseDto
    {
        public string mfa_token { get; set; }
    }

    public class VerifyMfaRequestDto
    {
        public string MfaToken { get; set; }
        public string Otp { get; set; }
    }
}
