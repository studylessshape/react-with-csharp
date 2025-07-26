using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using Less.EntityFramework.Plus.WhereOrFeat;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.Dal.FeatResourceClaims
{
    public class FeatResourceClaimRepo<TDbContext> : BaseRepository<TDbContext, FeatResourceClaim, Guid>, IFeatResourceClaimRepo
        where TDbContext : DbContext
    {
        public FeatResourceClaimRepo(TDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IList<FeatResource>> GetAccessResource(IList<Claim> claims)
        {
            return await ListAsync(query =>
            {
                query = query.Include(fc => fc.ClaimEntity)
                    .WhereAnyContains(claims, (fc, c) => (fc.ClaimEntity!.ClaimType == c.Type && fc.ClaimEntity.ClaimValue == c.Value));
                return query.Include(fc => fc.FeatResource);
            }, fc => fc.FeatResource!);
        }
    }
}
