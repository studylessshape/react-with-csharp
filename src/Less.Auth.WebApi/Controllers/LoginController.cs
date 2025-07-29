using Less.Api.Core;
using Less.Auth.Users;
using Less.Auth.WebApi.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Less.Auth.WebApi.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class LoginController : ControllerBase
    {
        private readonly IUserManager userManager;
        private readonly IUserRepo userRepo;

        public LoginController(IUserManager userManager, IUserRepo userRepo)
        {
            this.userManager = userManager;
            this.userRepo = userRepo;
        }

        /// <summary>
        /// Login and set claims
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<Resp<UserProfile>> Login([FromBody] UserAccountPassword request)
        {
            var validateResult = await userManager.ValidateUserAsync(request.Account, request.Password);
            if (validateResult.IsError)
            {
                return Resp.Err<UserProfile>(validateResult.ErrorValue);
            }
            var user = validateResult.ResultValue;
            var claims = await userManager.LoadClaimsAsync(user.Account);
            var claimIdentity = new ClaimsIdentity(claims, ClaimsIdentity.DefaultIssuer);
            var principal = new ClaimsPrincipal([claimIdentity]);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
            return Resp.Ok<UserProfile>(user);
        }

        /// <summary>
        /// Logout and remove claims
        /// </summary>
        /// <returns></returns>
        [HttpPost("Logout")]
        [Authorize]
        public async Task<Resp<None>> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Resp.Ok(None.New());
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<Resp<UserProfile>> GetProfile()
        {
            var account = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (account == null)
            {
                return Resp.Err<UserProfile>("获取用户信息失败", 403);
            }

            var user = await userRepo.FirstByAccountAsync(account.Value);
            if (user == null)
            {
                return Resp.Err<UserProfile>("获取用户信息失败", 403);
            }

            return Resp.Ok<UserProfile>(user);
        }
    }
}
