using Less.Api.Core;
using Less.Auth.Claims;
using Less.Auth.FeatResourceClaims;
using Less.EntityFramework.Plus;
using Less.Utils;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.Role
{
    internal class RoleManager : IRoleManager
    {
        private readonly IClaimEntityRepo claimRepo;
        private readonly IFeatResourceClaimRepo featResourceClaimRepo;

        public RoleManager(IClaimEntityRepo claimRepo, IFeatResourceClaimRepo featResourceClaimRepo)
        {
            this.claimRepo = claimRepo;
            this.featResourceClaimRepo = featResourceClaimRepo;
        }

        public async Task<Result<None, string>> AssignFeatResources(int roleId, int[] featResourcesIds)
        {
            var has = await claimRepo.AnyAsync(c => c.Id == roleId && c.ClaimType == ClaimTypes.Role);
            if (!has)
            {
                return "不存在或指定的声明不符合要求".ToErr<None, string>();
            }

            var featClaimIds = await featResourceClaimRepo.ListAsync(query => query.Where(fc => fc.ClaimEntityId == roleId), fc => fc.FeatResourceId);
            var needDeletedIds = featClaimIds.Except(featResourcesIds);
            var needAddedIds = featResourcesIds.Except(featClaimIds);

            // delete not exist in given feats' ids
            await featResourceClaimRepo.DeleteAsync(q => q.Where(fc => fc.ClaimEntityId == roleId)
                                                          .WhereAnyContains(needDeletedIds, fc => fc.FeatResourceId)
                                                    , false);
            // add all not exist feats relation
            await featResourceClaimRepo.AddRangeAsync(needAddedIds.Select(fid => new FeatResourceClaim()
            {
                ClaimEntityId = roleId,
                FeatResourceId = fid,
            }));

            return None.New().ToOk<string>();
        }
    }
}
