using Less.Api.Core;
using Less.Auth.Dal.Claims;
using Less.Auth.Extensions;
using Less.Auth.FeatResourceClaims;
using Less.Auth.FeatResources;
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
        private readonly IUserRepo userRepo;
        private readonly IFeatResourceClaimRepo featResourceClaimRepo;
        private readonly IFeatResourceRepo featResourceRepo;

        public LoginController(IUserManager userManager, IUserRepo userRepo, IFeatResourceClaimRepo featResourceClaimRepo, IFeatResourceRepo featResourceRepo)
        {
            this.userManager = userManager;
            this.userRepo = userRepo;
            this.featResourceClaimRepo = featResourceClaimRepo;
            this.featResourceRepo = featResourceRepo;
        }

        /// <summary>
        /// Login and set claims
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<Resp<UserState>> Login(LoginRequest request)
        {
            if (HttpContext.User.Identity?.IsAuthenticated == true)
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
                return Resp.Err<UserState>("用户已登录", StatusCodes.Status400BadRequest);
            }
            var validateResult = await userManager.ValidateUserAsync(request.Account, request.Password);
            if (validateResult.IsError)
            {
                return Resp.Err<UserState>(validateResult.ErrorValue);
            }

            var user = validateResult.ResultValue;
            var claims = await userManager.LoadClaimsAsync(user.Account);
            var claimIdentity = new ClaimsIdentity(claims, ClaimsIdentity.DefaultIssuer);
            var principal = new ClaimsPrincipal([claimIdentity]);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties() { IsPersistent = true, ExpiresUtc = DateTime.UtcNow.AddDays(7) });

            var featResources = await featResourceClaimRepo.GetPermissions(claims);
            var userState = UserProfile.FromUser<UserState>(user);
            userState.Roles = claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToArray();
            userState.Permissions = featResources.Where(fr => fr.Kind == FeatResource.PERMISSION_KIND).Select(fr => fr.Name).ToArray();

            return Resp.Ok(userState);
        }

        /// <summary>
        /// Logout and remove claims
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        public async Task<Resp<None>> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Resp.Ok(None.New());
        }

        /// <summary>
        /// Get login state
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public async Task<Resp<UserState>> GetLoginState()
        {
            var claims = HttpContext.User.Claims.ToList();
            var user = await userRepo.FirstByAccountAsync(claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(c => c.Value).First());
            if (user == null || user.Status == Users.User.DISABLE_STATUS)
            {
                return Resp.Err<UserState>("未能获取到当前登录的账户", 401);
            }

            IList<FeatResource> featResources;

            if (claims.HasRole(ClaimDefines.ROLE_SYSTEM))
            {
                featResources = await featResourceRepo.ListAsync();
            }
            else
            {
                featResources = await featResourceClaimRepo.GetPermissions(claims);
            }

            var userState = UserProfile.FromUser<UserState>(user);
            userState.Roles = claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToArray();
            userState.Permissions = featResources.Where(fr => fr.Kind == FeatResource.PERMISSION_KIND).Select(fr => fr.Name).ToArray();

            return Resp.Ok(userState);
        }

        /// <summary>
        /// Get resource can be accessed by current user
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public async Task<Resp<IList<FeatResourceDto>>> GetAccessResources()
        {
            var claims = HttpContext.User.Claims.ToArray();
            IList<FeatResourceDto> result;

            if (claims.HasRole(ClaimDefines.ROLE_SYSTEM))
            {
                result = (await featResourceRepo.ListAsync()).Select(FeatResourceDto.FromData).ToList();
                return Resp.Ok(result);
            }

            result = (await featResourceClaimRepo.GetAccessResources(claims)).Select(FeatResourceDto.FromData).ToList();

            return Resp.Ok(result);
        }

        [HttpGet]
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
