using Less.Auth.FeatResources;
using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Models
{
    public class FeatResourceDetail
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; } = "";
        public string? Description { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int ParentId { get; set; }
        public string Tag { get; set; } = "";
        public string Url { get; set; } = "";
        public string? Icon { get; set; }

        public FeatResource ToMenuData()
        {
            return new FeatResource()
            {
                Name = Name,
                Description = Description,
                ParentId = ParentId,
                Kind = 0,
                Tag = Tag,
                Url = Url,
                Icon = Icon,
            };
        }

        public FeatResource ToPermissionData()
        {
            return new FeatResource()
            {
                Name = Name,
                Description = Description,
                ParentId = ParentId,
                Kind = 1,
                Tag = Tag,
                Url = Url,
                Icon = Icon,
            };
        }
    }
}
