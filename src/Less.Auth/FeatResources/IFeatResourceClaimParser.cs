using System.Collections.Generic;
using System.Security.Claims;

namespace Less.Auth.FeatResources
{
    public interface IFeatResourceClaimParser
    {
        IList<Claim> StringToClaims(string? value);
        string ClaimsToString(IList<Claim> claims);
    }
}
