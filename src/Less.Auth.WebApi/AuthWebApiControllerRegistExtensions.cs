using Less.Auth.WebApi.Controllers;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Less.Auth.WebApi
{
    public static class AuthWebApiControllerRegistExtensions
    {
        /// <summary>
        /// Add default auth with cookies
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static IMvcBuilder AddLessAuthControllerWithCookies(this IMvcBuilder builder)
        {
            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(opts =>
                {
                    opts.LoginPath = "/api/auth/Account/Login";
                    opts.LogoutPath = "/api/auth/Account/Logout";
                });
            builder.Services.AddAuthorization();
            builder.AddApplicationPart(typeof(UserController).Assembly);
            return builder;
        }
    }
}
