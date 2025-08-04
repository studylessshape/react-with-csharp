using Less.Api.Core;
using Less.Auth.Dal.Claims;
using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
using Less.Auth.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Less.Auth.WebApi.Controllers
{
    [Route("api/auth/[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = $"{ClaimDefines.ROLE_SYSTEM}, {ClaimDefines.ROLE_ADMIN}")]
    public class FeatResourceController : ControllerBase
    {
        private readonly IFeatResourceRepo resourceRepo;
        private readonly IFeatResourceClaimRepo featResourceClaimRepo;

        public FeatResourceController(IFeatResourceRepo resourceRepo,
                                      IFeatResourceClaimRepo featResourceClaimRepo)
        {
            this.resourceRepo = resourceRepo;
            this.featResourceClaimRepo = featResourceClaimRepo;
        }

        /// <summary>
        /// Get all menus
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<Resp<IList<FeatResource>>> GetMenus()
        {
            var list = await resourceRepo.ListAsync(query => query.Where(f => f.Kind == FeatResource.MENU_KIND));
            return Resp.Ok(list);
        }

        /// <summary>
        /// Get all permissions
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<Resp<IList<FeatResource>>> GetPermissions()
        {
            var list = await resourceRepo.ListAsync(query => query.Where(f => f.Kind == FeatResource.PERMISSION_KIND));
            return Resp.Ok(list);
        }

        /// <summary>
        /// Get permissions belong to menu
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<Resp<IList<FeatResource>>> GetPermissionsBelongMenu(int menuId)
        {
            var list = await resourceRepo.ListAsync(query => query.Where(f => f.Kind == FeatResource.PERMISSION_KIND && f.ParentId == menuId));
            return Resp.Ok(list);
        }

        /// <summary>
        /// Create menu for sidebar
        /// </summary>
        /// <param name="detail"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<Resp<FeatResource>> CreateMenu(FeatResourceDetail detail)
        {
            if (await resourceRepo.HasMenu(detail.Name, detail.ParentId))
            {
                return Resp.Err<FeatResource>("资源名重复");
            }

            var resource = await resourceRepo.AddAsync(detail.ToMenuData());
            return Resp.Ok(resource);
        }

        /// <summary>
        /// Create permission
        /// </summary>
        /// <param name="detail"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<Resp<FeatResource>> CreatePermission(FeatResourceDetail detail)
        {
            if (await resourceRepo.HasPermission(detail.Name, detail.ParentId))
            {
                return Resp.Err<FeatResource>("资源名重复");
            }

            var resource = await resourceRepo.AddAsync(detail.ToPermissionData());
            return Resp.Ok(resource);
        }

        /// <summary>
        /// Delete resource
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public async Task<Resp<None>> DeleteResource(int id)
        {
            var deleteCount = await resourceRepo.DeleteAsync(query => query.Where(f => f.Id == id));
            if (deleteCount == 0)
            {
                return Resp.Err<None>("删除失败，没有对应的资源");
            }

            return Resp.Ok(None.New());
        }

        /// <summary>
        /// Update menu resource
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<Resp<None>> UpdateMenu(FeatResource data)
        {
            var result = await resourceRepo.UpdateMenuAsync(data);
            return Resp.FromResult(result);
        }
    }
}
