using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Models
{
    public class RoleDetail
    {
        [Required]
        public string Role { get; set; } = "";
    }
}
