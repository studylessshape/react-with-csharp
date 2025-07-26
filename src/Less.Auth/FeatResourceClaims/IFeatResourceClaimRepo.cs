using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.FeatResourceClaims
{
    public interface IFeatResourceClaimRepo : IRepository<FeatResourceClaim, Guid>
    {
        Task<IList<FeatResource>> GetAccessResource(IList<Claim> claims);
    }
}
