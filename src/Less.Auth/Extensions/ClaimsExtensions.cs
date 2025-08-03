using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Less.Auth.Extensions
{
    public static class ClaimsExtensions
    {
        public static bool HasRole(this IEnumerable<Claim> claims, string roleName)
        {
            return claims.Any(c => c.Type == ClaimTypes.Role && c.Value == roleName);
        }
    }
}
