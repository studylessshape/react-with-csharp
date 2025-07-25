using Less.Auth.Users;
using Less.DalCore.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Less.Auth.Claims
{
    public interface IClaimEntityRepo : IRepository<ClaimEntity, int>
    {
        Task<IList<ClaimEntity>> GetClaimsAsync(string accout);
        Task<IList<ClaimEntity>> GetClaimsAsync(User user);
    }
}
