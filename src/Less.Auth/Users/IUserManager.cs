using Less.Api.Core;
using Less.Utils;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Less.Auth.Users
{
    public class UpdateUserProfileInput
    {
        public string Account { get; set; } = "";
        [MinLength(6)]
        public string? Password { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        [Phone]
        public string? PhoneNum { get; set; }
        public string? Remark { get; set; }
        public int? Sex { get; set; }
        public int? Status { get; set; }
    }

    public class CreateUserInput
    {
        [Required]
        [MinLength(3)]
        public string Account { get; set; } = "";
        [Required]
        [MinLength(6)]
        public string Password { get; set; } = "";
        public string? Name { get; set; }
        public string Code { get; set; } = "";
        [EmailAddress]
        public string? Email { get; set; }
        [Phone]
        public string? PhoneNum { get; set; }
        public string? Remark { get; set; }
        public int Sex { get; set; }
        public int Status { get; set; }
        public string? Role { get; set; }
    }

    public interface IUserManager
    {
        Task<IList<Claim>> LoadClaimsAsync(string account);
        Task<Result<User, string>> ValidateUserAsync(string account, string password);
        Task<Result<User, string>> ValidateCodeAsync(string userCode);
        Task<Result<User, string>> CreateUserAsync(CreateUserInput input);
        Task<Result<User, string>> UpdateUserProfileAsync(UpdateUserProfileInput updateInput);
        Task<Result<None, string>> ChangePasswordAsync(string account, string newPassword);
        Task<Result<None, string>> ChangeUserStateAsync(string accout, int status);
    }
}
