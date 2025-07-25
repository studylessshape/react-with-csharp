using Less.Api.Core;
using Less.Auth.FeatResources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Less.Auth.WebApi.Controllers
{
    [Route("api/auth/[controller]/[action]")]
    [ApiController]
    public class FeatResourceController : ControllerBase
    {
        private readonly IFeatResourceRepo resourceRepo;

        public FeatResourceController(IFeatResourceRepo resourceRepo)
        {
            this.resourceRepo = resourceRepo;
        }

        [EndpointName(nameof(GetAccessResource))]
        [EndpointSummary("Get resource can be accessed by current user")]
        [HttpGet]
        [Authorize]
        public Task<Resp<IList<FeatResource>>> GetAccessResource()
        {
            throw new NotImplementedException();
        }
    }
}
