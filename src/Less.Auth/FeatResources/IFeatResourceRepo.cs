using Less.DalCore.Repository;
using Less.Utils;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.FeatResources
{
    public interface IFeatResourceRepo : IRepository<FeatResource, int>
    {
        Task<Result<IList<FeatResource>, string>> GetAccessResource(IList<Claim> claims);
    }
}
