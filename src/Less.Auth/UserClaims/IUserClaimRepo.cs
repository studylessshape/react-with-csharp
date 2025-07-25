using Less.Auth.Users;
using Less.DalCore.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Less.Auth.UserClaims
{
    public interface IUserClaimRepo : IRepository<UserClaim, Guid>
    {
        Task<IList<UserClaim>> GetUserCliamsAsync(Guid userId, bool includeUser = false, bool includeClaim = false);
        Task<IList<UserClaim>> GetUserCliamsAsync(string accout, bool includeClaim = false);
        Task<IList<UserClaim>> GetUserCliamsAsync(User user, bool includeClaim = false);
    }
}
