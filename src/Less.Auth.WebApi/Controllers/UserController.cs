using Less.Api.Core;
using Less.Auth.Users;
using Less.Auth.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace Less.Auth.WebApi.Controllers
{
    /// <summary>
    /// Api about user
    /// </summary>
    [ApiController]
    [Route("api/auth/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly IUserManager userManager;

        /// <summary>
        /// initialize api
        /// </summary>
        public UserController(IUserManager userManager)
        {
            this.userManager = userManager;
        }

        [EndpointName("ChangePassword")]
        [EndpointSummary("change password by user")]
        [HttpPost]
        [Authorize]
        public async Task<Resp<None>> ChangePassword([Required] string newPassword)
        {
            var account = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (account == null)
            {
                return Resp.Err<None>("用户登录状态错误！");
            }

            var changeRes = await userManager.ChangePasswordAsync(account, newPassword);
            return Resp.FromResult(changeRes);
        }

        [EndpointName("ChangeUserState")]
        [EndpointSummary("change user state (need admin)")]
        [HttpPost]
        [Authorize(Roles = "System, Admin")]
        public async Task<Resp<None>> ChangeUserState(
            [Required] string account,
            [Required] bool enable)
        {
            var res = enable ? await userManager.EnableUserAsync(account) : await userManager.DisableUserAsync(account);
            return Resp.FromResult(res);
        }

        [EndpointName("CreateUser")]
        [EndpointSummary("create user (need admin)")]
        [HttpPut]
        [Authorize(Roles = "System, Admin")]
        public async Task<Resp<UserProfile>> CreateUserAsync(string accout, string password)
        {
            var user = await userManager.CreateUserAsync(accout, password, accout, accout, "All");
            return Resp.FromResult(user.WrapOk<UserProfile>(u => u));
        }
    }
}
