using Less.Api.Core;
using Less.Auth.FeatResources;
using Less.DalCore.Repository;
using Less.Utils;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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

        public async Task<bool> HasMenu(string name)
        {
            return await AnyAsync(f => f.Kind == FeatResource.MENU_KIND && f.Name == name);
        }

        public async Task<bool> HasPermission(string name)
        {
            return await AnyAsync(f => f.Kind == FeatResource.PERMISSION_KIND && f.Name == name);
        }

        public async Task<Result<None, string>> UpdateMenuAsync(FeatResource featResource)
        {
            if (featResource.Kind != FeatResource.MENU_KIND)
            {
                return "不能使用该方法修改非菜单资源".ToErr<None, string>();
            }

            var entity = await FindAsync(featResource.Id);
            if (entity == null)
            {
                return "数据库中不存在该条数据".ToErr<None, string>();
            }
            if (await AnyAsync(q => q.Where(f => f.Id != entity.Id && f.Name == featResource.Name)))
            {
                return "资源名已存在".ToErr<None, string>();
            }

            if (entity.ParentId != featResource.ParentId)
            {
                var isSetParentToChild = featResource.ParentId != null
                                     && await AnyAsync(query => query.Where(f => f.ParentId == featResource.Id && f.Id == featResource.ParentId));
                if (isSetParentToChild)
                {
                    // 当当前资源的子资源的某一个，为当前资源的新父级时，现将对应子资源的父级设置为当前资源的父级
                    await UpdateAsync(query => query.Where(f => f.ParentId == entity.Id && f.Id == featResource.ParentId),
                                      f => new FeatResource() { ParentId = entity.ParentId },
                                      false);
                    // 然后设置其他资源的父级为当前资源的父级
                    await UpdateAsync(query => query.Where(f => f.ParentId == featResource.Id && f.Id != featResource.ParentId),
                                      f => new FeatResource() { ParentId = featResource.ParentId },
                                      false);
                }
            }

            entity.ParentId = featResource.ParentId;
            entity.Name = featResource.Name;
            entity.Description = featResource.Description;
            entity.Url = featResource.Url;
            entity.Order = featResource.Order;
            entity.Tag = featResource.Tag;
            entity.Icon = featResource.Icon;

            await SaveChangesAsync();

            return None.New().ToOk<None, string>();
        }
    }
}
