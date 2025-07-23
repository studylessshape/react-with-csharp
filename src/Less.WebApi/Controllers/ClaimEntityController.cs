using Less.Auth.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Less.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ClaimEntityController : ControllerBase
    {
        private readonly IClaimEntityRepo claimRepo;

        public ClaimEntityController(IClaimEntityRepo claimRepo)
        {
            this.claimRepo = claimRepo;
        }

        [HttpGet]
        public async Task<IList<ClaimEntity>> GetAll()
        {
            return await claimRepo.ListAsync();
        }

        [HttpPost]
        public async Task Update(int id, string claimType, string claimValue)
        {
            await claimRepo.UpdateAsync(q => q.Where(c => c.Id == id), c => new ClaimEntity()
            {
                ClaimType = claimType,
                ClaimValue = claimValue
            }, true);
        }
    }
}
