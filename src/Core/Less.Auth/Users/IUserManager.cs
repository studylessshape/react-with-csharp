using Less.Api.Core;
using Less.Utils;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.Users
{
    public class UpdateUserProfileInput
    {
        public string Accout { get; } = "";
        public string? Name { get; }
        public string? Code { get; }
        public string? Email { get; }
        public string? PhoneNum { get; }
        public string? Remark { get; }
    }

    public interface IUserManager
    {
        Task<IList<Claim>> LoadClaimsAsync(string account);
        Task<Result<User, string>> ValidateUserAsync(string account, string password);
        Task<Result<User, string>> ValidateCodeAsync(string userCode);
        Task<Result<User, string>> CreateUserAsync(string accout, string password, string name, string code, string? role);
        Task<Result<User, string>> UpdateUserProfileAsync(UpdateUserProfileInput updateInput);
        Task<Result<None, string>> ChangePasswordAsync(string account, string newPassword);
        Task<Result<None, string>> EnableUserAsync(string accout);
        Task<Result<None, string>> DisableUserAsync(string accout);
    }
}
