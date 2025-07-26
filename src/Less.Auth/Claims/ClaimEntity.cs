using Less.Auth.FeatResourceClaims;
using Less.Auth.UserClaims;
using System.Collections.Generic;

namespace Less.Auth.Claims
{
    public class ClaimEntity
    {
        public int Id { get; set; }
        public string ClaimType { get; set; } = "";
        public string ClaimValue { get; set; } = "";
        public bool CanBeDeleted { get; set; } = true;
        public virtual ICollection<UserClaim> UserClaims { get; } = new List<UserClaim>();
        public virtual ICollection<FeatResourceClaim> FeatResourceClaims { get; } = new List<FeatResourceClaim>();
    }
}
