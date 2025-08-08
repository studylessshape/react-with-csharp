namespace Less.Auth.WebApi.Models.Role
{
    public class AssignResourceRequest
    {
        public int RoleId { get; set; }
        public int[] FeatResourceIds { get; set; } = [];
    }
}
