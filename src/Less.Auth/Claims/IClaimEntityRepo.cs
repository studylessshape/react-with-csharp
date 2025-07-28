using Less.DalCore.Repository;
using Less.Utils;
using System.Threading.Tasks;

namespace Less.Auth.Claims
{
    public interface IClaimEntityRepo : IRepository<ClaimEntity, int>
    {
        public Task<Result<ClaimEntity, string>> AddClaimAsync(string type, string value);
        public Task<Result<ClaimEntity, string>> AddRoleAsync(string role);
    }
}
