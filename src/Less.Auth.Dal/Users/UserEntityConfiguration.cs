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
                Password = "7A8C29782D4BF6301FA4AA2FC73F443F1BFD3F69C73C161EFA29D811DD20338ED1B37E6E297BEDCB21B9CF9922AD1AB1683E6BC6B2003BAACC3F74039C33BA3AC333B3AADCE62CE036F7EEF283F95F409E8A39A17CC265827C6EFD5334AE7093490DCBB3BC09A69E34AD7E7125756090CB97AAA27694D9BD180F78632F225174",
                Salt = "67da58fd-ab16-46c4-a814-4d99f92fa2cb",
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
