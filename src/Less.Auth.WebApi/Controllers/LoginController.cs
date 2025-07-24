using Less.Auth.Users;
using Microsoft.AspNetCore.Mvc;

namespace Less.Auth.WebApi.Controllers
{
    [ApiController]
    [Route("/api/auth/[controller]/[action]")]
    public class LoginController : ControllerBase
    {
        private readonly IUserManager userManager;

        public LoginController(IUserManager userManager)
        {
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task Login(string account, string password)
        {

        }
    }
}
