using Less.Api.Core;
using Less.Auth.WebApi.Controllers;
using Less.Auth.WebApi.OpenApiFilters;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.OpenApi.Models;

namespace Less.Auth.WebApi
{
    public static class AuthWebApiControllerRegistExtensions
    {
        /// <summary>
        /// Add default auth with cookies
        /// </summary>
        /// <param name="builder"></param>
        /// <returns></returns>
        public static IMvcBuilder AddLessAuthServices(this IMvcBuilder builder)
        {
            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(opts =>
                {
                    opts.LoginPath = "/api/auth/Login";
                    opts.LogoutPath = "/api/auth/Logout";
                    opts.Events.OnRedirectToAccessDenied = async (context) =>
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        await context.Response.WriteAsJsonAsync(new Resp<None>("无操作权限", context.Response.StatusCode));
                    };
                    opts.Events.OnRedirectToLogin = async (context) =>
                    {
                        await context.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsJsonAsync(new Resp<None>("用户未登录", context.Response.StatusCode));
                    };
                });
            builder.Services.AddAuthorization();
            builder.AddJsonOptions(opts =>
            {
                opts.JsonSerializerOptions.Converters.Add(new UUIDConverter());
            });
            builder.Services.AddSwaggerGen(opts =>
            {
                opts.MapType<UUID>(() =>
                {
                    var schema = new OpenApiSchema
                    {
                        Title = "UUID",
                        Type = "string",
                        Format = "uuid",
                    };
                    return schema;
                });
                opts.AddSchemaFilterInstance(new UUIDSchemaFilter());
                opts.AddParameterFilterInstance(new UUIDParameterFilter());
            });
            builder.AddApplicationPart(typeof(UserController).Assembly);
            return builder;
        }
    }
}
