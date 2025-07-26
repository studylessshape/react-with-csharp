using Less.Auth.Users;
using Less.DalCore.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Less.Auth.Dal.Users
{
    internal class UserRepo<TDbContext> : BaseRepository<TDbContext, User, Guid>, IUserRepo
        where TDbContext : DbContext
    {
        public UserRepo(TDbContext dbContext) : base(dbContext)
        {
        }

        public Task<User?> FirstByAccountAsync(string account, bool includeDisableUser = false, bool includeClaims = false)
        {
            return FirstOrDefaultAsync(query =>
            {
                var resQuery = query.Where(u => u.Account == account);
                if (!includeDisableUser)
                {
                    resQuery = resQuery.Where(u => u.Status == User.ENABLE_STATUS);
                }

                if (includeClaims)
                {
                    resQuery = resQuery.Include(u => u.UserClaims).ThenInclude(uc => uc.ClaimEntity);
                }

                return resQuery;
            });
        }

        public Task<User?> FirstByAccountAsync(string account, string password, bool includeDisableUser = false)
        {
            return FirstOrDefaultAsync(query =>
            {
                var resQuery = query.Where(u => u.Account == account && u.Password == password);
                if (!includeDisableUser)
                {
                    resQuery = resQuery.Where(u => u.Status == User.ENABLE_STATUS);
                }

                return resQuery;
            });
        }

        public Task<User?> FirstByCodeAsync(string code, bool includeDisableUser = false)
        {
            return FirstOrDefaultAsync(query =>
            {
                var resQuery = query.Where(u => u.Code == code);
                if (!includeDisableUser)
                {
                    resQuery = resQuery.Where(u => u.Status == User.ENABLE_STATUS);
                }

                return resQuery;
            });
        }
    }
}
