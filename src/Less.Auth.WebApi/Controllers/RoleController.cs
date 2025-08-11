using Less.Api.Core;
using Less.Auth.Claims;
using Less.Auth.Dal.Claims;
using Less.Auth.Role;
using Less.Auth.WebApi.Models.ClaimEntities;
using Less.Auth.WebApi.Models.Role;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace Less.Auth.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize(Roles = $"{ClaimDefines.ROLE_SYSTEM}, {ClaimDefines.ROLE_ADMIN}")]
    public class RoleController : ControllerBase
    {
        private readonly IClaimEntityRepo claimRepo;
        private readonly IRoleManager roleManager;

        public RoleController(IClaimEntityRepo claimRepo, IRoleManager roleManager)
        {
            this.claimRepo = claimRepo;
            this.roleManager = roleManager;
        }

        /// <summary>
        /// get paged roles
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<Resp<PagedList<ClaimEntityDto>>> GetRoles([FromQuery] RolePageReq req)
        {
            return Resp.Ok(await claimRepo.PaginateAsync(req.Page,
                                                         req.PageSize,
                                                         ClaimEntityDto.FromDataExpr,
                                                         query => query.Where(c => c.ClaimType == ClaimTypes.Role).OrderBy(c => c.Id)));
        }

        /// <summary>
        /// create role
        /// </summary>
        /// <param name="detail"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<Resp<ClaimEntityDto>> CreateRole(RoleDetail detail)
        {
            return Resp.FromResult((await claimRepo.AddRoleAsync(detail.Role)).WrapOk(ClaimEntityDto.FromData));
        }

        /// <summary>
        /// update role
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<Resp<None>> UpdateRole(ClaimEntityDto entity)
        {
            return Resp.FromResult(await claimRepo.UpdateRoleAsync(entity.Id, entity.ClaimValue));
        }

        /// <summary>
        /// delete role by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<Resp<None>> DeleteRole([Required][Range(1, int.MaxValue)] int id)
        {
            return Resp.FromResult(await claimRepo.DeleteClaimAsync(id));
        }

        /// <summary>
        /// Assign resources to claim role
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<Resp<None>> AssignResources(AssignResourceRequest request)
        {
            var result = await roleManager.AssignFeatResources(request.RoleId, request.FeatResourceIds);
            return Resp.FromResult(result);
        }
    }
}
