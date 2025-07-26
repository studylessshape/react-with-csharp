using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using Less.Utils;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.Dal.FeatResources
{
    public class FeatResourceRepo<TDcContext> : BaseRepository<TDcContext, FeatResource, int>, IFeatResourceRepo
        where TDcContext : DbContext
    {
        public FeatResourceRepo(TDcContext dbContext) : base(dbContext)
        {
        }

        public Task<Result<IList<FeatResource>, string>> GetAccessResource(IList<Claim> claims)
        {
            throw new System.NotImplementedException();
        }
    }
}
