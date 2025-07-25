using Less.Auth.UserClaims;
using Less.Auth.Users;
using Less.DalCore.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Less.Auth.Dal.UserClaims
{
    public class UserClaimRepo<TDbContext> : BaseRepository<TDbContext, UserClaim, Guid>, IUserClaimRepo
        where TDbContext : DbContext
    {
        public UserClaimRepo(TDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IList<UserClaim>> GetUserCliamsAsync(Guid userId, bool includeUser = false, bool includeClaim = false)
        {
            return await ListAsync(query =>
            {
                query = query.Where(uc => uc.UserId == userId);
                if (includeUser) query = query.Include(uc => uc.User);
                if (includeClaim) query = query.Include(uc => uc.ClaimEntity);

                return query;
            });
        }

        public async Task<IList<UserClaim>> GetUserCliamsAsync(string accout, bool includeClaim = false)
        {
            return await ListAsync(query =>
            {
                query = query.Include(uc => uc.User).Where(uc => uc.User!.Account == accout);
                if (includeClaim) query = query.Include(uc => uc.ClaimEntity);

                return query;
            });
        }

        public Task<IList<UserClaim>> GetUserCliamsAsync(User user, bool includeClaim = false)
        {
            return GetUserCliamsAsync(user.Id, includeClaim: includeClaim);
        }
    }
}
