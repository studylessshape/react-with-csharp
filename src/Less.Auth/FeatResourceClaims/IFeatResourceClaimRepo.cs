using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.FeatResourceClaims
{
    public interface IFeatResourceClaimRepo : IRepository<FeatResourceClaim, Guid>
    {
        Task<IList<FeatResource>> GetAccessMenu(IList<Claim> claims);
        Task<IList<FeatResource>> GetPermissions(IList<Claim> claims);
    }
}
