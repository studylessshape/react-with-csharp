using Less.Api.Core;
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
            return (await ListAsync(query =>
            {
                query = query.Include(fc => fc.ClaimEntity)
                    // This method can't be translated to sql
                    //.WhereAnyContains(claims, (fc, c) => fc.ClaimEntity.ClaimType == c.Type && fc.ClaimEntity.ClaimValue == c.Value)
                    .WhereAnyContains(fc => fc.ClaimEntity!.ClaimType, claims.Select(c => c.Type))
                    .WhereAnyContains(fc => fc.ClaimEntity!.ClaimValue, claims.Select(c => c.Value));
                return query.Include(fc => fc.FeatResource);
            }, fc => fc.FeatResource!))
            .Distinct(GenericEqualComparer.Create<FeatResource>((f1, f2) => f1?.Id == f2?.Id))
            .ToList();
        }
    }
}
