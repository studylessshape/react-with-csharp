using Less.Auth.FeatResources;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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
                        Description = "主页",
                        Url = "/",
                        Icon = "IconHome"
                    },
                    new FeatResource()
                    {
                        Id = 3,
                        ParentId = 1,
                        Name = "system_manage",
                        Description = "系统管理",
                        Url = "/manage",
                        Icon = "IconMenu"
                    },
                    new FeatResource()
                    {
                        Id = 4,
                        ParentId = 3,
                        Name = "module_manage",
                        Description = "模块管理",
                        Url = "/manage/module",
                        Icon = "IconLayers"
                    },
                    new FeatResource()
                    {
                        Id = 5,
                        ParentId = 3,
                        Name = "user_manage",
                        Description = "用户管理",
                        Url = "/manage/user",
                        Icon = "IconUserSetting"

                    }
                };
                return featResources;
            }
        }
        public void Configure(EntityTypeBuilder<FeatResource> builder)
        {
            builder.ToTable("less_feat_resources");
            builder.HasIndex(f => new { f.Name, f.Kind, f.ParentId }).IsUnique();
            builder.HasData(InitFeatResources);
        }
    }
}
