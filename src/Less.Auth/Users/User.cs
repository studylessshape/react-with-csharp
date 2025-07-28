using Less.Auth.UserClaims;
using System;
using System.Collections.Generic;

namespace Less.Auth.Users
{
    public class User
    {
        public const int ENABLE_STATUS = 0;
        public const int DISABLE_STATUS = -1;

        public Guid Id { get; set; } = Guid.NewGuid();
        /// <summary>
        /// 账号
        /// </summary>
        public string Account { get; set; } = "";
        /// <summary>
        /// 账号代码
        /// </summary>
        public string Code { get; set; } = "";
        /// <summary>
        /// 用户名
        /// </summary>
        public string Name { get; set; } = "";
        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; } = "";
        /// <summary>
        /// 邮箱
        /// </summary>
        public string? Email { get; set; }
        /// <summary>
        /// 电话
        /// </summary>
        public string? PhoneNum { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public int Sex { get; set; }
        /// <summary>
        /// 用户状态
        /// </summary>
        public int Status { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string? Remark { get; set; }
        public string Salt { get; set; } = "";

        public virtual IList<UserClaim> UserClaims { get; } = new List<UserClaim>();
    }
}
