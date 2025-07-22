using Less.Auth.Claims;
using Less.DalCore.Repository;
using Microsoft.EntityFrameworkCore;

namespace Less.Auth.Dal.Claims
{
    public class ClaimEntityRepo<TDbContext> : BaseRepository<TDbContext, ClaimEntity, int>
        where TDbContext : DbContext
    {
        public ClaimEntityRepo(TDbContext dbContext) : base(dbContext)
        {
        }
    }
}
