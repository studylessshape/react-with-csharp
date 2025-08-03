namespace Less.Auth.FeatResources
{
    /// <summary>
    /// 功能资源
    /// </summary>
    public class FeatResource
    {
        public const int MENU_KIND = 0;
        public const int PERMISSION_KIND = 1;

        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string? Description { get; set; }
        public int? ParentId { get; set; }
        public FeatResource? Parent { get; set; }
        /// <summary>
        /// <list type="table">
        /// <item>0: 菜单</item>
        /// <item>1: 按钮/控件</item>
        /// </list>
        /// </summary>
        public int Kind { get; set; }
        public string Tag { get; set; } = "";
        public string Url { get; set; } = "";
        /// <summary>
        /// 顺序，从小到大
        /// </summary>
        public int Order { get; set; }
        public string? Icon { get; set; }
    }
}
