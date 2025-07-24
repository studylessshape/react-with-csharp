using Less.Auth.Users;
using Less.DalCore.Repository;
using System;
using System.Threading.Tasks;

namespace Less.Auth.Dal
{
    public interface IUserRepo : IRepository<User, Guid>
    {
        Task<User?> FirstByAccountAsync(string account, bool includeDisableUser = false);
        Task<User?> FirstByAccountAsync(string account, string password, bool includeDisableUser = false);
        Task<User?> FirstByCodeAsync(string code, bool includeDisableUser = false);
    }
}
