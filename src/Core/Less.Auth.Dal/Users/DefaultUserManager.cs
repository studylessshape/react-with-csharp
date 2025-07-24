using Less.Api.Core;
using Less.Auth.Claims;
using Less.Auth.UserClaims;
using Less.Auth.Users;
using Less.Utils;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.Dal.Users
{
    internal class DefaultUserManager<TDbContext> : IUserManager
        where TDbContext : DbContext
    {
        private readonly IUserRepo userRepo;
        private readonly IClaimEntityRepo claimRepo;
        private readonly IUserClaimRepo userClaimRepo;
        private readonly IPasswordHasher passwordHasher;
        private readonly TDbContext dbContext;

        public DefaultUserManager(IUserRepo userRepo, IClaimEntityRepo claimRepo, IUserClaimRepo userClaimRepo, IPasswordHasher passwordHasher, TDbContext dbContext)
        {
            this.userRepo = userRepo;
            this.claimRepo = claimRepo;
            this.userClaimRepo = userClaimRepo;
            this.passwordHasher = passwordHasher;
            this.dbContext = dbContext;
        }

        private async Task<Result<User, string>> FindUserAsync(string account)
        {
            var user = await userRepo.FirstByAccountAsync(account);
            if (user == null)
            {
                return "用户不存在！".ToErr<User, string>();
            }

            return user.ToOk<User, string>();
        }

        public async Task<Result<None, string>> ChangePasswordAsync(string account, string newPassword)
        {
            var user = await userRepo.FirstByAccountAsync(account);
            if (user == null)
            {
                return "用户不存在！".ToErr<None, string>();
            }

            var newHash = passwordHasher.GetPasswordHash(newPassword);
            user.Password = newHash.Password;
            user.Salt = newHash.Salt;

            await userRepo.SaveChangesAsync();
            return None.Ok<string>();
        }

        public async Task<Result<User, string>> CreateUserAsync(string accout, string password, string name, string code, string? role)
        {
            if (await userRepo.AnyAsync(u => u.Account == accout || u.Code == code))
            {
                return "账户或用户代码已存在！".ToErr<User, string>();
            }
            int? claimEntityId = null;
            if (role != null)
            {
                claimEntityId = (await claimRepo.FirstOrDefaultAsync(c => c.ClaimType == ClaimTypes.Role && c.ClaimValue == role))?.Id;
                if (claimEntityId == null)
                    return "指定角色不存在！".ToErr<User, string>();
            }

            var hashPass = passwordHasher.GetPasswordHash(password);

            var user = await userRepo.AddAsync(new User()
            {
                Account = accout,
                Password = hashPass.Password,
                Salt = hashPass.Salt,
                Code = code,
            }, false);

            if (claimEntityId != null)
            {
                await userClaimRepo.AddAsync(new UserClaim()
                {
                    UserId = user.Id,
                    ClaimEntityId = claimEntityId.Value
                }, false);
            }

            await dbContext.SaveChangesAsync();
            return user.ToOk<User, string>();
        }

        public async Task<Result<None, string>> DisableUserAsync(string accout)
        {
            var user = await userRepo.FirstByAccountAsync(accout, true);
            if (user == null)
            {
                return "用户不存在！".ToErr<None, string>();
            }

            if (user.Status == User.DISABLE_STATUS) return None.Ok<string>();

            user.Status = User.DISABLE_STATUS;
            await userRepo.SaveChangesAsync();

            return None.Ok<string>();
        }

        public async Task<Result<None, string>> EnableUserAsync(string accout)
        {
            var user = await userRepo.FirstByAccountAsync(accout, true);
            if (user == null)
            {
                return "用户不存在！".ToErr<None, string>();
            }

            if (user.Status == User.ENABLE_STATUS) return None.Ok<string>();

            user.Status = User.ENABLE_STATUS;
            await userRepo.SaveChangesAsync();

            return None.Ok<string>();
        }

        public Task<IList<Claim>> LoadClaimsAsync(string account)
        {
            throw new System.NotImplementedException();
        }

        public Task<Result<User, string>> UpdateUserProfileAsync(UpdateUserProfileInput updateInput)
        {
            throw new System.NotImplementedException();
        }

        public Task<Result<User, string>> ValidateCodeAsync(string userCode)
        {
            throw new System.NotImplementedException();
        }

        public Task<Result<User, string>> ValidateUserAsync(string account, string password)
        {
            throw new System.NotImplementedException();
        }
    }
}
