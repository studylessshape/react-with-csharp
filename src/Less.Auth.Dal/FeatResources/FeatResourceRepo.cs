using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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
    }
}
