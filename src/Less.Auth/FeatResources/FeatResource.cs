using System.Collections.Generic;
using System.Security.Claims;

namespace Less.Auth.FeatResources
{
    public class FeatResource
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public IList<Claim> AllowClaims { get; set; } = new List<Claim>();
        public int? ParentId { get; set; }
        public FeatResource? Parent { get; set; }
        public int Kind { get; set; }
        public string Tag { get; set; } = "";
        public string Url { get; set; } = "";
        public bool IsDeleted { get; set; }
    }
}
