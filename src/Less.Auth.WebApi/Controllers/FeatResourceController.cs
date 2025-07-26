using Less.Api.Core;
using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
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

        public FeatResourceController(IFeatResourceRepo resourceRepo, IFeatResourceClaimRepo featResourceClaimRepo)
        {
            this.resourceRepo = resourceRepo;
            this.featResourceClaimRepo = featResourceClaimRepo;
        }

        [EndpointName(nameof(GetAccessResource))]
        [EndpointSummary("Get resource can be accessed by current user")]
        [HttpGet]
        [Authorize]
        public async Task<Resp<IList<FeatResource>>> GetAccessResource()
        {
            var claims = HttpContext.User.Claims.ToArray();
            if (claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "System"))
            {
                return Resp.Ok(await resourceRepo.ListAsync());
            }
            return Resp.Ok(await featResourceClaimRepo.GetAccessResource(claims));
        }
    }
}
