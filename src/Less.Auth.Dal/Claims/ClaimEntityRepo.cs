using Less.Auth.Claims;
using Less.Auth.Users;
using Less.DalCore.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Less.Auth.Dal.Claims
{
    public class ClaimEntityRepo<TDbContext> : BaseRepository<TDbContext, ClaimEntity, int>, IClaimEntityRepo
        where TDbContext : DbContext
    {
        public ClaimEntityRepo(TDbContext dbContext) : base(dbContext)
        {
        }

        public Task<IList<ClaimEntity>> GetClaimsAsync(string accout)
        {
            return ListAsync(query => query.Include(c => c.UserClaims)
                                           .ThenInclude(uc => uc.User)
                                           .Where(c => c.UserClaims.Any(uc => uc.User!.Account == accout)));
        }

        public Task<IList<ClaimEntity>> GetClaimsAsync(User user)
        {
            return ListAsync(query => query.Include(c => c.UserClaims)
                                           .Where(c => c.UserClaims.Any(uc => uc.UserId == user.Id)));
        }
    }
}
