using Less.Auth.FeatResources;
using System.Linq.Expressions;

namespace Less.Auth.WebApi.Models
{
    public class FeatResourceDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string? Description { get; set; }
        public int? ParentId { get; set; }
        /// <inheritdoc cref="FeatResource.Kind"/>
        public int Kind { get; set; }
        public string Tag { get; set; } = "";
        public string Url { get; set; } = "";
        public string? Icon { get; set; }

        public static FeatResourceDto FromData(FeatResource featResource)
        {
            return new FeatResourceDto()
            {
                Id = featResource.Id,
                Name = featResource.Name,
                Description = featResource.Description,
                ParentId = featResource.ParentId,
                Kind = featResource.Kind,
                Tag = featResource.Tag,
                Url = featResource.Url,
                Icon = featResource.Icon,
            };
        }

        public static Expression<Func<FeatResource, FeatResourceDto>> FromDataExpr = featResource => new FeatResourceDto()
        {
            Id = featResource.Id,
            Name = featResource.Name,
            Description = featResource.Description,
            ParentId = featResource.ParentId,
            Kind = featResource.Kind,
            Tag = featResource.Tag,
            Url = featResource.Url,
            Icon = featResource.Icon,
        };
    }
}
