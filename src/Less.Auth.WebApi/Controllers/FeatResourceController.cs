using Less.Api.Core;
using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
using Less.Auth.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Less.Auth.WebApi.Controllers
{
    [Route("api/auth/[controller]/[action]")]
    [ApiController]
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
        /// Get resource can be accessed by current user
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public async Task<Resp<IList<FeatResourceDto>>> GetAccessResource()
        {
            var claims = HttpContext.User.Claims.ToArray();
            IList<FeatResourceDto> result;

            if (claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "System"))
            {
                result = (await resourceRepo.ListAsync()).Select(FeatResourceDto.FromData).ToList();
                return Resp.Ok(result);
            }

            result = (await featResourceClaimRepo.GetAccessResource(claims)).Select(FeatResourceDto.FromData).ToList();

            return Resp.Ok(result);
        }
    }
}
