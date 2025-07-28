using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Models
{
    public class UserAccountPassword
    {
        [Required]
        [MinLength(1)]
        public string Account { get; set; } = "";
        [Required]
        [MinLength(1)]
        public string Password { get; set; } = "";
    }
}
