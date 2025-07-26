using Less.Auth.Dal.Claims;
using Less.Auth.Dal.FeatResources;
using Less.Auth.FeatResourceClaims;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Linq;
using System.Security.Claims;

namespace Less.Auth.Dal.FeatResourceClaims
{
    public class FeatResourceClaimEntityConfiguration : IEntityTypeConfiguration<FeatResourceClaim>
    {
        private FeatResourceClaim[] BuildFormInitData()
        {
            var featResources = FeatResourceEntityConfiguration.InitFeatResources;
            var claimEntities = ClaimsEntityConfiguration.InitClaimEntities;

            var featResourceManagerClaims = from featResource in featResources
                                            from claimEntity in claimEntities
                                            where claimEntity.ClaimType == ClaimTypes.Role && (claimEntity.ClaimValue == ClaimDefines.ROLE_SYSTEM || claimEntity.ClaimValue == ClaimDefines.ROLE_ADMIN)
                                            select new FeatResourceClaim()
                                            {
                                                ClaimEntityId = claimEntity.Id,
                                                FeatResourceId = featResource.Id,
                                            };
            var featResourceNormalClaims = from featResource in featResources
                                           from claimEntity in claimEntities
                                           where claimEntity.ClaimType == ClaimTypes.Role && (claimEntity.ClaimValue == ClaimDefines.ROLE_ALL || claimEntity.ClaimValue == ClaimDefines.ROLE_OPERATOR)
                                           select new FeatResourceClaim()
                                           {
                                               ClaimEntityId = claimEntity.Id,
                                               FeatResourceId = featResource.Id,
                                           };
            return featResourceManagerClaims.Concat(featResourceNormalClaims).ToArray();
        }

        public void Configure(EntityTypeBuilder<FeatResourceClaim> builder)
        {
            builder.ToTable("less_feat_resource_claims");
            builder.HasIndex(fc => new { fc.FeatResourceId, fc.ClaimEntityId }).IsUnique();
            builder.HasData(BuildFormInitData());
        }
    }
}
