using Less.Api.Core;
using Less.Auth.FeatResources;
using Less.Utils;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Less.Auth.Role
{
    public interface IRoleManager
    {
        public Task<Result<None, string>> AssignFeatResources(int roleId, int[] featResourcesId);
        public Task<IList<FeatResource>> GetRoleModules(int roleId);
    }
}
