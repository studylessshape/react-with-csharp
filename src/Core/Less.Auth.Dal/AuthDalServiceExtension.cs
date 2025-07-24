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
        /// <summary>
        /// <para>Before add auth dal services, you need provider the implements of: </para>
        /// <list type="bullet">
        /// <item><see cref="IPasswordHasher"/></item>
        /// <item><see cref="IFeatResourceClaimParser"/></item>
        /// <item><see cref="IUserManager"/></item>
        /// </list>
        /// </summary>
        /// <typeparam name="TDbContext"></typeparam>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddAuthDal<TDbContext>(this IServiceCollection services)
           where TDbContext : DbContext
        {
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

        /// <summary>
        /// Add default <see cref="IPasswordHasher"/> (argon2)
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddDefaultPasswordHasher(this IServiceCollection services)
        {
            services.AddTransient<IPasswordHasher, DefaultPasswordHasher>();
            return services;
        }

        /// <summary>
        /// Add default <see cref="IFeatResourceClaimParser"/> (format: t=&lt;t&gt;,v=&lt;t&gt;[;])
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        private static IServiceCollection AddDefaultFeatResourceClaimParser(this IServiceCollection services)
        {
            services.AddTransient<IFeatResourceClaimParser, DefaultFeatResourceClaimParser>();
            return services;
        }

        /// <summary>
        /// Add default <see cref="IUserManager"/> (local auth)
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        private static IServiceCollection AddDefaultUserManager(this IServiceCollection services)
        {
            services.AddScoped<IUserManager, DefaultUserManager>();
            return services;
        }

        /// <summary>
        /// <para>Add auth dal services with default <see cref="IPasswordHasher"/>, <see cref="IFeatResourceClaimParser"/> and <see cref="IUserManager"/></para>
        /// </summary>
        /// <typeparam name="TDbContext"></typeparam>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddAuthDalWithDefault<TDbContext>(this IServiceCollection services)
            where TDbContext : DbContext
        {
            services.AddDefaultPasswordHasher();
            services.AddDefaultFeatResourceClaimParser();
            services.AddDefaultUserManager();

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
