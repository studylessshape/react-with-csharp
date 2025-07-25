using System.Collections.Generic;
using System.Security.Claims;

namespace Less.Auth.FeatResources
{
    public class FeatResource
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        /// <summary>
        /// 为空则继承父节点的 Claims，有 Claims 则使用给定的 Claims 判断
        /// </summary>
        public IList<Claim> AllowClaims { get; set; } = new List<Claim>();
        public int? ParentId { get; set; }
        public FeatResource? Parent { get; set; }
        public int Kind { get; set; }
        public string Tag { get; set; } = "";
        public string Url { get; set; } = "";
        public bool IsDeleted { get; set; }
    }
}
