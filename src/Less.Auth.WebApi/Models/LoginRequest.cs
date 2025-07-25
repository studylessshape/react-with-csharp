using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Models
{
    public class LoginRequest
    {
        [Required]
        [MinLength(1)]
        public string Account { get; set; } = "";
        [Required]
        [MinLength(1)]
        public string Password { get; set; } = "";
    }
}
