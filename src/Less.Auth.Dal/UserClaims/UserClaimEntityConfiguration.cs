using Less.Auth.Dal.Users;
using Less.Auth.UserClaims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Less.Auth.Dal.UserClaims
{
    internal class UserClaimEntityConfiguration : IEntityTypeConfiguration<UserClaim>
    {
        public void Configure(EntityTypeBuilder<UserClaim> builder)
        {
            builder.ToTable("less_user_claims");
            builder.Property(fc => fc.UserId)
                .HasConversion<UUIDToDatabaseConverter>();
            builder.HasData(new UserClaim()
            {
                Id = Guid.NewGuid(),
                UserId = UserDefines.SYSTEM_GUID.ToUUID(),
                ClaimEntityId = 2
            },
            new UserClaim()
            {
                Id = Guid.NewGuid(),
                UserId = UserDefines.ADMIN_GUID.ToUUID(),
                ClaimEntityId = 3
            },
            new UserClaim()
            {
                Id = Guid.NewGuid(),
                UserId = UserDefines.OPERATOR_GUID.ToUUID(),
                ClaimEntityId = 4
            });
        }
    }
}
