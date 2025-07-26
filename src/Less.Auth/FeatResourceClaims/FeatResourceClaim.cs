using Less.Auth.Claims;
using Less.Auth.FeatResources;
using System;

namespace Less.Auth.FeatResourceClaims
{
    /// <summary>
    /// <para>功能资源和 Claim 关系表</para>
    /// </summary>
    public class FeatResourceClaim
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int FeatResourceId { get; set; }
        public FeatResource? FeatResource { get; set; }
        public int ClaimEntityId { get; set; }
        public ClaimEntity? ClaimEntity { get; set; }
    }
}
