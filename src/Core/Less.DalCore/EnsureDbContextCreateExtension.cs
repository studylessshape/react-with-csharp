using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace Less.DalCore
{
    public static class EnsureDbContextCreateExtension
    {
        public static void EnsureDbContextCreate<TDbContext>(this IServiceProvider service)
            where TDbContext : DbContext
        {
            using var scope = service.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<TDbContext>() ?? throw new NullReferenceException($"Get services {typeof(TDbContext).FullName} failed!");
            context.Database.EnsureCreated();
        }

        public static async Task EnsureDbContextCreateAsync<TDbContext>(this IServiceProvider service)
            where TDbContext : DbContext
        {
            using var scope = service.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<TDbContext>() ?? throw new NullReferenceException($"Get services {typeof(TDbContext).FullName} failed!");
            await context.Database.EnsureCreatedAsync();
        }
    }
}
