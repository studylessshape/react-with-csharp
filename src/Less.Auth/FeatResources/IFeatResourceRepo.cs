using Less.Api.Core;
using Less.DalCore.Repository;
using Less.Utils;
using System.Threading.Tasks;

namespace Less.Auth.FeatResources
{
    public interface IFeatResourceRepo : IRepository<FeatResource, int>
    {
        public Task<bool> HasMenu(string name, int? parentId);
        public Task<bool> HasPermission(string name, int? parentId);
        public Task<Result<None, string>> UpdateMenuAsync(FeatResource featResource);
    }
}
