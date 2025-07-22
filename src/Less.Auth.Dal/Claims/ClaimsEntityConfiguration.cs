using Less.Auth.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Security.Claims;

namespace Less.Auth.Dal.Claims
{
    public class ClaimsEntityConfiguration : IEntityTypeConfiguration<ClaimEntity>
    {
        public void Configure(EntityTypeBuilder<ClaimEntity> builder)
        {
            builder.ToTable("less_claims");
            builder.HasIndex(c => new { c.ClaimType, c.ClaimValue });

            ClaimEntity[] claims = new ClaimEntity[]
            {
                new ClaimEntity()
                {
                    Id = 1,
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = "System"
                },
                new ClaimEntity()
                {
                    Id = 2,
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = "Admin"
                },
                new ClaimEntity()
                {
                    Id = 3,
                    ClaimType = ClaimTypes.Role,
                    ClaimValue = "Operator"
                }
            };
        }
    }
}
