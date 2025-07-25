using Less.Auth.Users;

namespace Less.Auth.WebApi.Models
{
    public class UserProfile
    {
        public string Account { get; set; } = "";
        public string Code { get; set; } = "";
        public string Name { get; set; } = "";
        public string? Email { get; set; }
        public string? PhoneNum { get; set; }
        public int Sex { get; set; }
        public int Status { get; set; }
        public string? Remark { get; set; }

        public static UserProfile FromUser(User user)
        {
            return new UserProfile()
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
            return FromUser(user);
        }
    }
}
