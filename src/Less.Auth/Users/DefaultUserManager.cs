using Less.Api.Core;
using Less.Auth.Claims;
using Less.Auth.Dal;
using Less.Auth.UserClaims;
using Less.Utils;
using Less.Utils.ResultExtensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.Users
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
            var result = from user in FindUserAsync(account)
                         from change in ChangePasswordAsync(user, newPassword)
                         select change;
            return await result;
        }

        private async Task<Result<None, string>> ChangePasswordAsync(User user, string newPassword)
        {
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
                Name = name,
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
            var result = from user in FindUserAsync(accout)
                         from disabled in DisableUserAsync(user)
                         select disabled;
            return await result;
        }

        private async Task<Result<None, string>> DisableUserAsync(User user)
        {
            if (user.Status == User.DISABLE_STATUS) return None.Ok<string>();

            user.Status = User.DISABLE_STATUS;
            await userRepo.SaveChangesAsync();

            return None.Ok<string>();
        }

        public async Task<Result<None, string>> EnableUserAsync(string accout)
        {
            var result = from user in FindUserAsync(accout)
                         from enabled in EnableUserAsync(user)
                         select enabled;
            return await result;
        }

        private async Task<Result<None, string>> EnableUserAsync(User user)
        {
            if (user.Status == User.ENABLE_STATUS) return None.Ok<string>();

            user.Status = User.ENABLE_STATUS;
            await userRepo.SaveChangesAsync();

            return None.Ok<string>();
        }

        public async Task<IList<Claim>?> LoadClaimsAsync(string account)
        {
            var user = await userRepo.FirstByAccountAsync(account, includeClaims: true);
            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>();
            claims.AddRange((await claimRepo.ListAsync(query => query.Where(c => user.UserClaims.Any(uc => uc.ClaimEntityId == c.Id)))).Select(c => new Claim(c.ClaimType, c.ClaimValue)));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, account));
            var claimRole = claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);
            claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, claimRole?.Value ?? "All"));
            return claims;
        }

        public async Task<Result<User, string>> UpdateUserProfileAsync(UpdateUserProfileInput updateInput)
        {
            var result = from user in FindUserAsync(updateInput.Accout)
                         from _ in UpdateUserProfileAsync(user, updateInput)
                         select user;
            return await result;
        }

        private async Task<Result<User, string>> UpdateUserProfileAsync(User user, UpdateUserProfileInput updateInput)
        {
            if (updateInput.Code != null)
            {
                if (await userRepo.AnyAsync(u => u.Code != user.Code && u.Code == updateInput.Code))
                {
                    return "指定的用户代码已存在！".ToErr<User, string>();
                }
                user.Code = updateInput.Code;
            }
            if (updateInput.Email != null)
            {
                if (await userRepo.AnyAsync(u => u.Email != user.Email && u.Email == updateInput.Email))
                {
                    return "邮箱已被绑定！".ToErr<User, string>();
                }
                user.Email = updateInput.Email;
            }
            if (updateInput.PhoneNum != null)
            {
                if (await userRepo.AnyAsync(u => u.PhoneNum != user.PhoneNum && u.PhoneNum == updateInput.PhoneNum))
                {
                    return "手机号已被绑定！".ToErr<User, string>();
                }
                user.PhoneNum = updateInput.PhoneNum;
            }
            if (updateInput.Name != null)
            {
                user.Name = updateInput.Name;
            }
            if (updateInput.Remark != null)
            {
                user.Remark = updateInput.Remark;
            }

            await userRepo.SaveChangesAsync();

            return user.ToOk<User, string>();
        }

        public async Task<Result<User, string>> ValidateCodeAsync(string userCode)
        {
            var user = await userRepo.FirstByCodeAsync(userCode);
            if (user == null)
            {
                return "用户不存在或代码错误".ToErr<User, string>();
            }

            return user.ToOk<User, string>();
        }

        public async Task<Result<User, string>> ValidateUserAsync(string account, string password)
        {
            var result = from user in FindUserAsync(account)
                         let passHash = passwordHasher.GetPasswordHash(password, user.Salt)
                         where user.Password == passHash
                         select user;
            return (await result).WrapErr(_ => "用户不存在或密码错误");
        }
    }
}
