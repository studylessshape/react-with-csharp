using Less.Auth.Claims;
using Less.Auth.Users;
using System;

namespace Less.Auth.UserClaims
{
    /// <summary>
    /// 用户和 Claim 的关系表
    /// </summary>
    public class UserClaim
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public UUID UserId { get; set; }
        public User? User { get; set; }
        public int ClaimEntityId { get; set; }
        public ClaimEntity? ClaimEntity { get; set; }
    }
}
