using Less.Auth.Claims;
using Less.DalCore.Repository;
using Less.Utils;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.Dal.Claims
{
    public class ClaimEntityRepo<TDbContext> : BaseRepository<TDbContext, ClaimEntity, int>, IClaimEntityRepo
        where TDbContext : DbContext
    {
        public ClaimEntityRepo(TDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Result<ClaimEntity, string>> AddClaimAsync(string type, string value)
        {
            if (await FirstOrDefaultAsync(c => c.ClaimType == type && c.ClaimValue == value) != null)
            {
                return "Claim 已存在".ToErr<ClaimEntity, string>();
            }

            var added = await AddAsync(new ClaimEntity()
            {
                ClaimType = type,
                ClaimValue = value
            });

            return added.ToOk<ClaimEntity, string>();
        }

        public async Task<Result<ClaimEntity, string>> AddRoleAsync(string role)
        {
            return await AddClaimAsync(ClaimTypes.Role, role);
        }
    }
}
