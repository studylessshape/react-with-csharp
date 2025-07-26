using Less.Auth.FeatResources;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Infrastructure;

namespace Less.Auth.Dal.FeatResources
{
    public class FeatResourceEntityConfiguration : IEntityTypeConfiguration<FeatResource>
    {
        private static FeatResource[]? featResources;
        internal static FeatResource[] InitFeatResources
        {
            get
            {
                featResources ??= new FeatResource[]
                {
                    new FeatResource()
                    {
                        Id = 1,
                        Name = "root",
                        Description = "根资源",
                    },
                    new FeatResource()
                    {
                        Id = 2,
                        ParentId = 1,
                        Name = "index",
                        Description = "主页"
                    },
                    new FeatResource()
                    {
                        Id = 3,
                        ParentId = 1,
                        Name = "system_manage",
                        Description = "系统管理"
                    },
                    new FeatResource()
                    {
                        Id = 4,
                        ParentId = 3,
                        Name = "user_manage",
                        Description = "用户管理"
                    },
                    new FeatResource()
                    {
                        Id = 5,
                        ParentId = 3,
                        Name = "module_manage",
                        Description = "模块管理"
                    }
                };
                return featResources;
            }
        }
        public void Configure(EntityTypeBuilder<FeatResource> builder)
        {
            builder.ToTable("less_feat_resources");
            builder.HasIndex(f => f.Name).IsUnique();
            builder.HasData(InitFeatResources);
        }
    }
}
