using Less.Auth.Users;
using System.Linq.Expressions;

namespace Less.Auth.WebApi.Models
{
    public class UserDetails : UserProfile
    {
        public Guid Id { get; set; }

        public static Expression<Func<User, UserDetails>> FromDataExpr { get; } = user => new UserDetails
        {
            Id = user.Id,
            Account = user.Account,
            Name = user.Name,
            Code = user.Code,
            Email = user.Email,
            PhoneNum = user.PhoneNum,
            Sex = user.Sex,
            Status = user.Status,
            Remark = user.Remark,
        };
    }
}
