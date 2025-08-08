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

        public async Task<Result<None, string>> AssignFeatResources(int roleId, int[] featResourcesId)
        {
            var claim = await claimRepo.FindAsync(roleId);
            if (claim == null || claim.ClaimType != ClaimTypes.Role)
            {
                return "指定的声明不符合要求".ToErr<None, string>();
            }

            // delete not exist in given feats' ids
            await featResourceClaimRepo.DeleteAsync(query => query.Where(fc => fc.ClaimEntityId == roleId).WhereNotContains(fc => fc.FeatResourceId, featResourcesId), false);
            // add all not exist feats relation
            await featResourceClaimRepo.AddAsync()
        }
    }
}
