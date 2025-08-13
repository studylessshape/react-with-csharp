using Less.Api.Core;
using Less.Auth.Dal.Claims;
using Less.Auth.Users;
using Less.Auth.WebApi.Models;
using Less.Auth.WebApi.Models.UserModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Controllers
{
    /// <summary>
    /// Api about the management of users
    /// </summary>
    [ApiController]
    [Route("api/auth/[controller]/[action]")]
    [Authorize(Roles = $"{ClaimDefines.ROLE_SYSTEM}, {ClaimDefines.ROLE_ADMIN}")]
    public class UserController : ControllerBase
    {
        private readonly IUserManager userManager;
        private readonly IUserRepo userRepo;

        /// <summary>
        /// initialize api
        /// </summary>
        public UserController(IUserManager userManager, IUserRepo userRepo)
        {
            this.userManager = userManager;
            this.userRepo = userRepo;
        }

        /// <summary>
        /// change user state (need admin)
        /// </summary>
        /// <param name="account"></param>
        /// <param name="enable"></param>
        /// <returns></returns>
        [HttpPost("{account}")]
        public async Task<Resp<None>> ChangeUserState(
            [Required] string account,
            [Required] bool enable)
        {
            var res = await userManager.ChangeUserStateAsync(account, enable ? Users.User.ENABLE_STATUS : Users.User.DISABLE_STATUS);
            return Resp.FromResult(res);
        }

        /// <summary>
        /// create user (need admin)
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public async Task<Resp<UserDetails>> CreateUser(CreateUserInput request)
        {
            if (request.Role == null)
            {
                request.Role = ClaimDefines.ROLE_ALL;
            }

            var user = await userManager.CreateUserAsync(request);
            return Resp.FromResult(user.WrapOk<UserDetails>(u => u));
        }

        /// <summary>
        /// update user
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<Resp<UserDetails>> UpdateUser(UpdateUserProfileInput request)
        {
            return Resp.FromResult((await userManager.UpdateUserProfileAsync(request)).WrapOk<UserDetails>(u => u));
        }

        /// <summary>
        /// Get paged users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<Resp<PagedList<UserDetails>>> GetUsers([FromQuery] UserPagedReq pageReq)
        {
            return Resp.Ok(await userRepo.PaginateAsync(pageReq.Page, pageReq.PageSize, UserDetails.FromDataExpr, mapQuery: query => query.OrderBy(u => u.Id)));
        }

        /// <summary>
        /// delete user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<Resp<None>> DeleteUser([Required] UUID id)
        {
            var deleted = await userRepo.DeleteAsync(q => q.Where(u => u.Id == id));
            if (deleted <= 0)
            {
                return Resp.Err<None>("删除失败");
            }
            return Resp.Ok(None.New());
        }

        /// <summary>
        /// delete user
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<Resp<None>> DeleteUserByAccount([Required][MinLength(3)] string account)
        {
            var deleted = await userRepo.DeleteAsync(q => q.Where(u => u.Account == account));
            if (deleted <= 0)
            {
                return Resp.Err<None>("删除失败");
            }
            return Resp.Ok(None.New());
        }
    }
}
