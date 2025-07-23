using Less.Auth.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Security.Claims;

namespace Less.Auth.Dal.Claims
{
    public class ClaimsEntityConfiguration : IEntityTypeConfiguration<ClaimEntity>
    {
        public const string SYSTEM_ROLE = "System";
        public void Configure(EntityTypeBuilder<ClaimEntity> builder)
        {
            builder.ToTable("less_claims");
            builder.HasIndex(c => new { c.ClaimType, c.ClaimValue });
            var idInc = 1;
            ClaimEntity[] claims = new ClaimEntity[]
            {
                new ClaimEntity()
                {
                    Id = idInc ++,
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = ClaimDefines.ROLE_ALL,
                },
                new ClaimEntity()
                {
                    Id = idInc ++,
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = ClaimDefines.ROLE_SYSTEM
                },
                new ClaimEntity()
                {
                    Id = idInc ++,
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = ClaimDefines.ROLE_ADMIN
                },
                new ClaimEntity()
                {
                    Id = idInc ++,
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = ClaimDefines.ROLE_OPERATOR
                },
            };
        }
    }
}
