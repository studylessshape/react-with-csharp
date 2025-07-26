using Less.Auth.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Less.Auth
{
    public static class DefaultServiceRegistExtensions
    {
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
        /// Add default <see cref="IUserManager"/> (local auth)
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddDefaultUserManager<TDbContext>(this IServiceCollection services)
            where TDbContext : DbContext
        {
            services.AddScoped<IUserManager, DefaultUserManager<TDbContext>>();
            return services;
        }

        /// <summary>
        /// Add all default services
        /// </summary>
        /// <typeparam name="TDbContext"></typeparam>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddDefaultAuthService<TDbContext>(this IServiceCollection services)
            where TDbContext : DbContext
        {
            return services.AddDefaultPasswordHasher()
                .AddDefaultUserManager<TDbContext>();
        }
    }
}
