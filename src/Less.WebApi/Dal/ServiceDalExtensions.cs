using Less.Auth.Dal;
using Less.DalCore;
using Microsoft.EntityFrameworkCore;

namespace Less.WebApi.Dal
{
    public static class ServiceDalExtensions
    {
        public static IServiceCollection AddCoreDal(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CoreDbContext>(opts =>
            {
                var cs = configuration.GetConnectionString("TestConnectPG")
                    ?? throw new ArgumentNullException("TestConnectPG", "No connection string named \"TestConnectPG\"");
                //opts.UseSqlite(cs, sqliteOpts =>
                //{
                //    sqliteOpts.MigrationsAssembly(typeof(ServiceDalExtensions).Assembly.GetName().Name);
                //});
                opts.UseNpgsql(cs, npgsqlOpts =>
                {
                    npgsqlOpts.MigrationsAssembly(typeof(ServiceDalExtensions).Assembly);
                });
#if DEBUG
                opts.EnableSensitiveDataLogging();
#endif
            });
            services.AddAuthDalWithDefault<CoreDbContext>();

            return services;
        }
    }
}
