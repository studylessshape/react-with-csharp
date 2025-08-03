namespace Less.Auth.WebApi.Models
{
    public class LoginRequest : UserAccountPassword
    {
        /// <summary>
        /// 保持登录状态
        /// </summary>
        public bool SaveStatus { get; set; }
    }
}
