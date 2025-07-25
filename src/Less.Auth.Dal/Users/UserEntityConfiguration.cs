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
                Password = "62A3519408AA27031DB93EC4425473A32AB23058102E600E7B6C92F7EBBE20B7AA100275DE681109EC0569C2ECD66AF7E823C90F134843E2C01670073E77882D3A467F2DD6883C947C4CFF3CCEBD6335296F236E46AD8F9C4E7E6ED418B92DBD24F9136383556FD1F5C238670136BC08379D66C41037D180A84A0ECD573C2061",
                Salt = "78ec70aa-f6ce-4b0a-8880-ab33500fbf28",
            },
            new User()
            {
                Id = UserDefines.ADMIN_GUID.ToGuid(),
                Name = "管理员",
                Code = "admincode",
                Account = "admin",
                Password = "433487A69E20E90C6EA76F8AA3B636350427F8047A046F4C3AB1F13B30567A0D6B7AAD5127D8590A9176814223556419E55ED98D6C8BACB36EA7CACAD97AA47618F7AF96AC4AACBE75A87B90CD561ADA6231948B845B5DE6161E7CDED7A2BB5EB6CA43ED9C98A7FCB8D045D492668A00F1EBBBFA17FBCE8FF44B86110A040EE7",
                Salt = "6bc01acf-d1b3-402c-97fa-9a9a17dfb7c7",
            },
            new User()
            {
                Id = UserDefines.OPERATOR_GUID.ToGuid(),
                Name = "操作员",
                Code = "operatorcode",
                Account = "operator",
                Password = "4345A64FB5434307218FF56693CD2162C1423697E76670768113CAE4E2EF32129A108B575FEBF35A3570AE8901FA659ACD88CE8C808CFD814EC90C762A847C886161BEE19AB189A337C498491A7B53BBE62EC2BCFE2D33ADFAB7FDD0A7D52D8DD5243B0E4EB2F7D128CDB1AA4F7567758B3FAE20A2B0AF28A347BF5651DAD452",
                Salt = "340311e5-cb25-4fcc-9d62-70bf7c460eb5",
            });
        }
    }
}
