using Less.Auth.Claims;
using Less.Auth.Users;
using System;

namespace Less.Auth.UserClaims
{
    public class UserClaim
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
        public int ClaimEntityId { get; set; }
        public ClaimEntity? ClaimEntity { get; set; }
    }
}
