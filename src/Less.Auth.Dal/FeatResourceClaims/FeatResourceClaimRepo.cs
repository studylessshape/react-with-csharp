using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using Less.EntityFramework.Plus;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        private IQueryable<T> MapQuery<T>(IQueryable<FeatResourceClaim> query, IList<Claim> claims, Expression<Func<FeatResourceClaim, T>> predicate)
        {
            if (claims.FirstOrDefault(c => c.Type == ClaimTypes.Role && c.Value == "System") == null)
            {
                query = query
                    // This method can't be translated to sql
                    //.WhereAnyContains(claims, (fc, c) => fc.ClaimEntity.ClaimType == c.Type && fc.ClaimEntity.ClaimValue == c.Value)
                    .WhereAnyContains(claims.Select(c => c.Type).Distinct(), fc => fc.ClaimEntity!.ClaimType)
                    .WhereAnyContains(claims.Select(c => c.Value).Distinct(), fc => fc.ClaimEntity!.ClaimValue);
            }
            return query.Select(predicate).Distinct();
        }

        public async Task<IList<FeatResource>> GetAccessResources(IList<Claim> claims)
        {
            var query = EntitySet.Include(fc => fc.ClaimEntity)
                                 .Include(fc => fc.FeatResource);
            return await MapQuery(query, claims, fc => fc.FeatResource!).OrderBy(f => f.Id).ToListAsync();
        }

        public async Task<IList<FeatResource>> GetPermissions(IList<Claim> claims)
        {
            var query = EntitySet.Include(fc => fc.ClaimEntity)
                                 .Include(fc => fc.FeatResource)
                                 .Where(fc => fc.FeatResource!.Kind == FeatResource.PERMISSION_KIND);
            return await MapQuery(query, claims, fc => fc.FeatResource!).OrderBy(f => f.Id).ToListAsync();
        }
    }
}
