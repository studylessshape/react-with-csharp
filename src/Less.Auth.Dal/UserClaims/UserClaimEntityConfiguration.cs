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
            builder.HasData(new UserClaim()
            {
                Id = Guid.NewGuid(),
                UserId = UserDefines.SYSTEM_GUID.ToGuid(),
                ClaimEntityId = 2
            },
            new UserClaim()
            {
                Id = Guid.NewGuid(),
                UserId = UserDefines.ADMIN_GUID.ToGuid(),
                ClaimEntityId = 3
            },
            new UserClaim()
            {
                Id = Guid.NewGuid(),
                UserId = UserDefines.OPERATOR_GUID.ToGuid(),
                ClaimEntityId = 4
            });
        }
    }
}
