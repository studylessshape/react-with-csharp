using Less.Api.Core;
using Less.Utils;
using System.Threading.Tasks;

namespace Less.Auth.Role
{
    public interface IRoleManager
    {
        public Task<Result<None, string>> AssignFeatResources(int roleId, int[] featResourcesId);
    }
}
