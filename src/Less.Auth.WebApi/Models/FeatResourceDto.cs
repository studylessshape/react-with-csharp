using Less.Auth.FeatResources;

namespace Less.Auth.WebApi.Models
{
    public class FeatResourceDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public int? ParentId { get; set; }
        public int Kind { get; set; }
        public string Tag { get; set; } = "";
        public string Url { get; set; } = "";

        public static FeatResourceDto From(FeatResource resource)
        {
            return new FeatResourceDto
            {
                Id = resource.Id,
                Name = resource.Name,
                Description = resource.Description,
                ParentId = resource.ParentId,
                Kind = resource.Kind,
                Tag = resource.Tag,
                Url = resource.Url,
            };
        }
    }
}
