using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Models.Role
{
    public class AssignResourceRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int RoleId { get; set; }
        public int[] FeatResourceIds { get; set; } = [];
    }
}
