using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Less.Auth.Dal.FeatResources
{
    public class FeatResourceRepo<TDcContext> : BaseRepository<TDcContext, FeatResource, int>, IFeatResourceRepo
        where TDcContext : DbContext
    {
        public FeatResourceRepo(TDcContext dbContext) : base(dbContext)
        {
        }

        public override Task<FeatResource> AddAsync(FeatResource entity, bool save = true)
        {
            entity.Url = entity.Url.Trim();
            return base.AddAsync(entity, save);
        }

        public async Task<bool> HasMenu(string name, int? parentId)
        {
            return await AnyAsync(f => f.Kind == FeatResource.MENU_KIND && f.Name == name && f.ParentId == parentId);
        }

        public async Task<bool> HasPermission(string name, int? parentId)
        {
            return await AnyAsync(f => f.Kind == FeatResource.PERMISSION_KIND && f.Name == name && f.ParentId == parentId);
        }
    }
}
