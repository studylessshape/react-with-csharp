using Less.Auth.FeatResources;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Less.Auth.Dal.FeatResources
{
    public class FeatResourceEntityConfiguration : IEntityTypeConfiguration<FeatResource>
    {
        private readonly IFeatResourceClaimParser claimParser;

        public FeatResourceEntityConfiguration(IFeatResourceClaimParser claimParser)
        {
            this.claimParser = claimParser;
        }

        public void Configure(EntityTypeBuilder<FeatResource> builder)
        {
            builder.ToTable("less_feat_resources");
            builder.HasIndex(f => f.Name).IsUnique();
            builder.Property(f => f.AllowClaims)
                   .HasConversion(claims => claimParser.ClaimsToString(claims),
                                  provider => claimParser.StringToClaims(provider));
            var resources = new FeatResource[]
            {
                new FeatResource()
                {
                    Name = "root",
                    Description = "根资源",
                },
                new FeatResource()
                {
                    Name = "user_manage",
                    Description = "用户管理"
                },
                new FeatResource()
                {
                    Name = "module_manage",
                    Description = "模块管理"
                }
            };
            resources[0].AllowClaims.Add(new Claim(ClaimTypes.Role, "ALL"));
            resources[1].AllowClaims.Add(new Claim(ClaimTypes.Role, "System"));
            resources[1].AllowClaims.Add(new Claim(ClaimTypes.Role, "Admin"));
            resources[0].AllowClaims.Add(new Claim(ClaimTypes.Role, "ALL"));
            builder.HasData();
        }
    }
}
