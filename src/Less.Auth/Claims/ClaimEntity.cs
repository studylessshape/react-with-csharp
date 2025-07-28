namespace Less.Auth.Claims
{
    public class ClaimEntity
    {
        public int Id { get; set; }
        public string ClaimType { get; set; } = "";
        public string ClaimValue { get; set; } = "";
        public bool CanBeDeleted { get; set; } = true;
    }
}
