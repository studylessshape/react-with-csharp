using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using Less.EntityFramework.Plus.WhereOrFeat;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
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
            var query = EntitySet.Include(fc => fc.ClaimEntity)
                    // This method can't be translated to sql
                    //.WhereAnyContains(claims, (fc, c) => fc.ClaimEntity.ClaimType == c.Type && fc.ClaimEntity.ClaimValue == c.Value)
                    .WhereAnyContains(fc => fc.ClaimEntity!.ClaimType, claims.Select(c => c.Type).Distinct())
                    .WhereAnyContains(fc => fc.ClaimEntity!.ClaimValue, claims.Select(c => c.Value).Distinct())
                    .Include(fc => fc.FeatResource)
                    .Select(fc => fc.FeatResource!)
                    .Distinct()
                    .OrderBy(f => f.Id);
            return await query.ToListAsync();
        }
    }
}
