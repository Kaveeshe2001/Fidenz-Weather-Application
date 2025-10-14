using System.ComponentModel.DataAnnotations;

namespace backend.DTO.AuthDtos
{
    public class LoginRequestDto
    {
        [Required]
        public string Email { get; set; }
        [Required] 
        public string Password { get; set; }
    }
}
