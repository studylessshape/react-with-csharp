using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Less.DalCore.EntityConfiguration
{
    public static class ServiceForEntityConfigurationHolderExtension
    {
        public static IServiceCollection AddEntityConfiguration<TDbContext, TEntity>(this IServiceCollection services, IEntityTypeConfiguration<TEntity> configuration, int priority)
            where TDbContext : DbContext
            where TEntity : class
        {
            var holder = EntityConfigurationHolderFactory.Create<TDbContext, TEntity>(configuration, priority);
            services.AddSingleton(holder);
            return services;
        }

        public static IServiceCollection AddEntityConfiguration<TDbContext, TEntity>(this IServiceCollection services, Func<IEntityTypeConfiguration<TEntity>> configuration, int priority)
            where TDbContext : DbContext
            where TEntity : class
        {
            var holder = EntityConfigurationHolderFactory.Create<TDbContext, TEntity>(configuration, priority);
            services.AddSingleton(holder);
            return services;
        }
    }
}
