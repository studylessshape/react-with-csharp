using Less.Api.Core;
using Less.Auth.Dal.Claims;
using Less.Auth.Users;
using Less.Auth.WebApi.Models;
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
            var res = enable ? await userManager.EnableUserAsync(account) : await userManager.DisableUserAsync(account);
            return Resp.FromResult(res);
        }

        /// <summary>
        /// create user (need admin)
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public async Task<Resp<UserProfile>> CreateUser([FromBody] UserAccountPassword request)
        {
            var user = await userManager.CreateUserAsync(request.Account, request.Password, request.Account, request.Account, "All");
            return Resp.FromResult(user.WrapOk<UserProfile>(u => u));
        }

        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<Resp<IList<User>>> GetAllAsync()
        {
            return Resp.Ok(await userRepo.ListAsync());
        }

        /// <summary>
        /// delete user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<Resp<None>> DeleteUser(Guid id)
        {
            var deleted = await userRepo.DeleteAsync(q => q.Where(u => u.Id == id));
            if (deleted <= 0)
            {
                return Resp.Err<None>("删除失败");
            }
            return Resp.Ok(None.New());
        }
    }
}
