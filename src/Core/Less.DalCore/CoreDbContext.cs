using Less.DalCore.EntityConfiguration;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Less.DalCore
{
    public class CoreDbContext : DbContext
    {
        private readonly IEnumerable<EntityConfigurationHolder> configurations;

        public CoreDbContext(IEnumerable<EntityConfigurationHolder> configurations) : this(new DbContextOptions<CoreDbContext>(), configurations)
        {
        }

        public CoreDbContext(DbContextOptions<CoreDbContext> options, IEnumerable<EntityConfigurationHolder> configurations) : base(options)
        {
            var thisType = GetType();
            this.configurations = configurations.Where(cfg => cfg.DbContextType == thisType).OrderBy(cfg => cfg.Priority);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var cfg in configurations)
            {
                cfg.Action(modelBuilder);
            }
        }
    }
}
