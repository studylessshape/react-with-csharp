using Less.Auth.FeatResourceClaims;
using System.Collections.Generic;

namespace Less.Auth.FeatResources
{
    /// <summary>
    /// 功能资源
    /// </summary>
    public class FeatResource
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public int? ParentId { get; set; }
        public FeatResource? Parent { get; set; }
        public int Kind { get; set; }
        public string Tag { get; set; } = "";
        public string Url { get; set; } = "";
        public bool IsDeleted { get; set; }

        public ICollection<FeatResourceClaim> FeatResourceClaims { get; set; } = new List<FeatResourceClaim>();
    }
}
