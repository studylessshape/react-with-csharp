using Less.Api.Core;
using Less.Auth.Claims;
using Less.Auth.Dal.Claims;
using Less.Auth.WebApi.Models.Role;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Less.Auth.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize(Roles = $"{ClaimDefines.ROLE_SYSTEM}, {ClaimDefines.ROLE_ADMIN}")]
    public class RoleController : ControllerBase
    {
        private readonly IClaimEntityRepo claimRepo;

        public RoleController(IClaimEntityRepo claimRepo)
        {
            this.claimRepo = claimRepo;
        }

        /// <summary>
        /// Assign resources to claim role
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<Resp<None>> AssignResources(AssignResourceRequest request)
        {
            var claim = claimRepo.
        }
    }
}
