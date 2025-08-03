namespace Less.Auth.WebApi.Models
{
    public class UserState : UserProfile
    {
        public string[] Permissions { get; set; } = [];
        public string[] Roles { get; set; } = [];
    }
}
