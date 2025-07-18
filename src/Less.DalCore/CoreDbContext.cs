using Microsoft.EntityFrameworkCore;

namespace Less.DalCore
{
    public class CoreDbContext : DbContext
    {
        public CoreDbContext() : base()
        {

        }

        public CoreDbContext(DbContextOptions<CoreDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
