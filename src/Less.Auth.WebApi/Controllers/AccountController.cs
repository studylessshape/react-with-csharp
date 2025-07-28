using Less.Api.Core;
using Less.Auth.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace Less.Auth.WebApi.Controllers
{
    [ApiController]
    [Route("/api/auth/[controller]/[action]")]
    public class AccountController(IUserManager userManager) : ControllerBase
    {
        private readonly IUserManager userManager = userManager;

        /// <summary>
        /// change password by user
        /// </summary>
        /// <param name="newPassword"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        public async Task<Resp<None>> ChangePassword([Required] string newPassword)
        {
            var account = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (account == null)
            {
                return Resp.Err<None>("获取登录凭证失败");
            }

            var changeRes = await userManager.ChangePasswordAsync(account, newPassword);
            return Resp.FromResult(changeRes);
        }
    }
}
