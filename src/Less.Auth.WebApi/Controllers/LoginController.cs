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
    [Route("api/auth/[action]")]
    public class LoginController : ControllerBase
    {
        private readonly IUserManager userManager;

        public LoginController(IUserManager userManager)
        {
            this.userManager = userManager;
        }

        [EndpointName("Login")]
        [EndpointSummary("Login and set claims in Cookies")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<Resp<UserProfile>> Login([FromBody] LoginRequest request)
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

        [HttpPost]
        [Authorize]
        public async Task<Resp<None>> Logout()
        {
            await HttpContext.SignOutAsync();
            return Resp.Ok(None.New());
        }
    }
}
