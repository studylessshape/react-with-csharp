using Less.Api.Core;
using Less.Auth.Claims;
using Less.DalCore.Repository;
using Less.EntityFramework.Plus;
using Less.Utils;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
                return "对象已存在".ToErr<ClaimEntity, string>();
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

        public async Task<Result<None, string>> DeleteClaimsAsync(int[] ids)
        {
            if (ids.Length == 0)
            {
                return "需要指定删除的 Id".ToErr<None, string>();
            }

            var transaction = dbContext.Database.BeginTransaction();
            var count = await DeleteAsync(q => q.Where(c => c.CanBeDeleted).WhereAnyContains(ids, c => c.Id));
            if (count != ids.Length)
            {
                transaction.Rollback();
                return "删除失败".ToErr<None, string>();
            }
            transaction.Commit();

            return None.New().ToOk<string>();
        }

        public async Task<Result<None, string>> UpdateClaimAsync(int id, string newType, string newValue)
        {
            if (await AnyAsync(c => c.Id != id && c.ClaimType == newType && c.ClaimValue == newValue))
            {
                return "对象已存在".ToErr<None, string>();
            }

            var count = await UpdateAsync(query => query.Where(c => c.Id == id && c.CanBeDeleted), c => new ClaimEntity() { ClaimType = newType, ClaimValue = newValue });
            return count >= 1 ? None.New().ToOk<string>() : "更新失败".ToErr<None, string>();
        }

        public async Task<Result<None, string>> UpdateRoleAsync(int id, string role)
        {
            return await UpdateClaimAsync(id, ClaimTypes.Role, role);
        }
    }
}
