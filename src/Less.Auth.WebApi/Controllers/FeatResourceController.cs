using Less.Api.Core;
using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
using Less.Auth.WebApi.Models;
using Less.Utils.Mapper;
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
        private readonly IMapperFactory mapperFactory;

        public FeatResourceController(IFeatResourceRepo resourceRepo, IFeatResourceClaimRepo featResourceClaimRepo, IMapperFactory mapperFactory)
        {
            this.resourceRepo = resourceRepo;
            this.featResourceClaimRepo = featResourceClaimRepo;
            this.mapperFactory = mapperFactory;
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
            var mapper = mapperFactory.GetMapper<FeatResource, FeatResourceDto>();
            IList<FeatResourceDto> result;

            if (claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "System"))
            {
                result = (await resourceRepo.ListAsync()).Select(mapper.MapTo).ToList();
                return Resp.Ok(result);
            }

            result = (await featResourceClaimRepo.GetAccessResource(claims)).Select(mapper.MapTo).ToList();

            return Resp.Ok(result);
        }
    }
}
