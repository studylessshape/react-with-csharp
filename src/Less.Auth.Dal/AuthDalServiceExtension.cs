using Less.Auth.Claims;
using Less.Auth.Dal.Claims;
using Less.Auth.Dal.Users;
using Less.Auth.Users;
using Less.DalCore.EntityConfiguration;
using Less.DalCore.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Less.Auth.Dal
{
    public static class AuthDalServiceExtension
    {
        public static IServiceCollection AddAuthDal<TDbContext>(this IServiceCollection services)
            where TDbContext : DbContext
        {
            services.AddEntityConfiguration<TDbContext, User>(new UserEntityConfiguration(), 100);
            services.AddScoped<IUserRepo, UserRepo<TDbContext>>();
            services.AddEntityConfiguration<TDbContext, ClaimEntity>(new ClaimsEntityConfiguration(), 100);
            services.AddScoped<IRepository<ClaimEntity, int>, ClaimEntityRepo<TDbContext>>();

            return services;
        }
    }
}
