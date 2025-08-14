using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Models
{
    public class UserAccountPassword
    {
        [Required]
        [MinLength(3)]
        public string Account { get; set; } = "";
        [Required]
        [MinLength(6)]
        [PasswordPropertyText]
        public string Password { get; set; } = "";
    }
}
