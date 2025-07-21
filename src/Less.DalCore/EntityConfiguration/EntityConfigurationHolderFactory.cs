using Microsoft.EntityFrameworkCore;
using System;

namespace Less.DalCore.EntityConfiguration
{
    public static class EntityConfigurationHolderFactory
    {
        public static EntityConfigurationHolder Create<TDbContext, TEntity>(IEntityTypeConfiguration<TEntity> configuration, int priority)
            where TDbContext : DbContext
            where TEntity : class
        {
            return new EntityConfigurationHolder(typeof(TDbContext), (mb) => configuration.Configure(mb.Entity<TEntity>()), priority);
        }

        public static EntityConfigurationHolder Create<TDbContext, TEntity>(Func<IEntityTypeConfiguration<TEntity>> configuration, int priority)
            where TDbContext : DbContext
            where TEntity : class
        {
            return new EntityConfigurationHolder(typeof(TDbContext), (mb) => configuration().Configure(mb.Entity<TEntity>()), priority);
        }
    }
}
