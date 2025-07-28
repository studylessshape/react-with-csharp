using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using Microsoft.EntityFrameworkCore;

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
