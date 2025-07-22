using System;
using System.ComponentModel;

namespace Less.Auth.Users
{
    public class User
    {
        public const int ENABLE_STATUS = 0;
        public const int DISABLE_STATUS = -1;

        public Guid Id { get; set; }
        [Description("账号")]
        public string Account { get; set; } = "";
        [Description("账号代码")]
        public string Code { get; set; } = "";
        [Description("用户名")]
        public string Name { get; set; } = "";
        [Description("密码")]
        public string Password { get; set; } = "";
        [Description("邮箱")]
        public string? Email { get; set; }
        [Description("电话")]
        public string? Phone { get; set; }
        [Description("性别")]
        public int Sex { get; set; }
        [Description("用户状态")]
        public int Status { get; set; }
        [Description("备注")]
        public string? Remark { get; set; }

        public string Salt { get; set; } = "";
    }
}
