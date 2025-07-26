using Less.Auth.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Security.Claims;

namespace Less.Auth.Dal.Claims
{
    public class ClaimsEntityConfiguration : IEntityTypeConfiguration<ClaimEntity>
    {
        private static ClaimEntity[]? claimEntities;
        internal static ClaimEntity[] InitClaimEntities
        {
            get
            {
                claimEntities ??= new ClaimEntity[]
                {
                    new ClaimEntity()
                    {
                        Id = 1,
                        ClaimType = ClaimTypes.Role,
                        ClaimValue = ClaimDefines.ROLE_ALL,
                        CanBeDeleted = false,
                    },
                    new ClaimEntity()
                    {
                        Id = 2,
                        ClaimType = ClaimTypes.Role,
                        ClaimValue = ClaimDefines.ROLE_SYSTEM,
                        CanBeDeleted = false,
                    },
                    new ClaimEntity()
                    {
                        Id = 3,
                        ClaimType = ClaimTypes.Role,
                        ClaimValue = ClaimDefines.ROLE_ADMIN,
                        CanBeDeleted = false,
                    },
                    new ClaimEntity()
                    {
                        Id = 4,
                        ClaimType = ClaimTypes.Role,
                        ClaimValue = ClaimDefines.ROLE_OPERATOR,
                    },
                };
                return claimEntities;
            }
        }

        public void Configure(EntityTypeBuilder<ClaimEntity> builder)
        {
            builder.ToTable("less_claims");
            builder.HasIndex(c => new { c.ClaimType, c.ClaimValue });
            builder.HasData(InitClaimEntities);
        }
    }
}
