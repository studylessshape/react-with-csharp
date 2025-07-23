using Less.Auth.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Less.Auth.Dal.Users
{
    internal class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("less_users");
            builder.HasIndex(u => u.Account).IsUnique();
            builder.HasIndex(u => u.Code).IsUnique();
            builder.HasData(new User()
            {
                Id = UserDefines.SYSTEM_GUID.ToGuid(),
                Name = "系统管理员",
                Code = "systemcode",
                Account = "system",
                Password = "system",
                Salt = "system",
            },
            new User()
            {
                Id = UserDefines.ADMIN_GUID.ToGuid(),
                Name = "管理员",
                Code = "admincode",
                Account = "admin",
                Password = "admin",
                Salt = "admin",
            },
            new User()
            {
                Id = UserDefines.OPERATOR_GUID.ToGuid(),
                Name = "操作员",
                Code = "operatorcode",
                Account = "operator",
                Password = "operator",
                Salt = "operator",
            });
        }
    }
}
