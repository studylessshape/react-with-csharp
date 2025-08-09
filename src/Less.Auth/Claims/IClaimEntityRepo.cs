using Less.Api.Core;
using Less.DalCore.Repository;
using Less.Utils;
using System.Threading.Tasks;

namespace Less.Auth.Claims
{
    public interface IClaimEntityRepo : IRepository<ClaimEntity, int>
    {
        public Task<Result<ClaimEntity, string>> AddClaimAsync(string type, string value);
        public Task<Result<ClaimEntity, string>> AddRoleAsync(string role);
        public Task<Result<None, string>> UpdateClaimAsync(int id, string newType, string newValue);
        public Task<Result<None, string>> UpdateRoleAsync(int id, string role);
        public Task<Result<None, string>> DeleteClaimAsync(int id);
    }
}
