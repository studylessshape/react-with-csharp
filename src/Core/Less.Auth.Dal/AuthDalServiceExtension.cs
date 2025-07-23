using Less.Auth.Claims;
using Less.Auth.Dal.Claims;
using Less.Auth.Dal.FeatResources;
using Less.Auth.Dal.UserClaims;
using Less.Auth.Dal.Users;
using Less.Auth.FeatResources;
using Less.Auth.UserClaims;
using Less.Auth.Users;
using Less.DalCore.EntityConfiguration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Less.Auth.Dal
{
    public static class AuthDalServiceExtension
    {
        public static IServiceCollection AddAuthDal<TDbContext>(this IServiceCollection services)
            where TDbContext : DbContext
        {
            services.AddDefaultClaimParser();
            services.AddEntityConfiguration<TDbContext, User, UserEntityConfiguration>(100);
            services.AddScoped<IUserRepo, UserRepo<TDbContext>>();

            services.AddEntityConfiguration<TDbContext, ClaimEntity, ClaimsEntityConfiguration>(100);
            services.AddScoped<IClaimEntityRepo, ClaimEntityRepo<TDbContext>>();

            services.AddEntityConfiguration<TDbContext, FeatResource, FeatResourceEntityConfiguration>(100);
            services.AddScoped<IFeatResourceRepo, FeatResourceRepo<TDbContext>>();

            services.AddEntityConfiguration<TDbContext, UserClaim, UserClaimEntityConfiguration>(101);
            services.AddScoped<IUserClaimRepo, UserClaimRepo<TDbContext>>();

            return services;
        }
    }
}
