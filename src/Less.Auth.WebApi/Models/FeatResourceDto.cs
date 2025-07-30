using Less.Auth.FeatResources;

namespace Less.Auth.WebApi.Models
{
    [Less.Utils.Mapper.MapTo(typeof(FeatResource))]
    public class FeatResourceDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public int? ParentId { get; set; }
        public int Kind { get; set; }
        public string Tag { get; set; } = "";
        public string Url { get; set; } = "";
        public string? Icon { get; set; }
    }
}
