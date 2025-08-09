using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Models.Role
{
    public class RoleDetail
    {
        [Required]
        public string Role { get; set; } = "";
    }
}
