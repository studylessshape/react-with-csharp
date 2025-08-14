using Less.Auth.Users;
using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Models
{
    public class UserProfile
    {
        public string Account { get; set; } = "";
        public string Code { get; set; } = "";
        public string Name { get; set; } = "";
        [EmailAddress]
        public string? Email { get; set; }
        [Phone]
        public string? PhoneNum { get; set; }
        public int Sex { get; set; }
        public int Status { get; set; }
        public string? Remark { get; set; }

        public static T FromUser<T>(User user)
            where T : UserProfile, new()
        {
            return new T()
            {
                Account = user.Account,
                Code = user.Code,
                Name = user.Name,
                Email = user.Email,
                PhoneNum = user.PhoneNum,
                Sex = user.Sex,
                Status = user.Status,
                Remark = user.Remark
            };
        }

        public static implicit operator UserProfile(User user)
        {
            return FromUser<UserProfile>(user);
        }
    }
}
