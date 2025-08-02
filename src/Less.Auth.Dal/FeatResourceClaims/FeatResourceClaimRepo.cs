using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using Less.EntityFramework.Plus.WhereOrFeat;
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
                    .WhereAnyContains(fc => fc.ClaimEntity!.ClaimType, claims.Select(c => c.Type).Distinct())
                    .WhereAnyContains(fc => fc.ClaimEntity!.ClaimValue, claims.Select(c => c.Value).Distinct());
            }
            return query.Select(predicate).Distinct();
        }

        public async Task<IList<FeatResource>> GetAccessMenu(IList<Claim> claims)
        {
            var query = EntitySet.Include(fc => fc.ClaimEntity)
                                 .Include(fc => fc.FeatResource)
                                 .Where(fc => fc.FeatResource!.Kind == FeatResource.MENU_KIND);
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
