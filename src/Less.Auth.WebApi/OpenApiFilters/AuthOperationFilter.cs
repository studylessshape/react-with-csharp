using Less.Api.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;
using System.Text.Json;

namespace Less.Auth.WebApi.OpenApiFilters
{
    public class AuthOperationFilter : IOperationFilter
    {
        private readonly static string UnauthorizedResponse = JsonSerializer.Serialize(Resp.Err<None>("用户未登录", 401));
        private readonly static string ForbiddenResponse = JsonSerializer.Serialize(Resp.Err<None>("无操作权限", 403));

        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (context.MethodInfo.GetCustomAttribute<EndpointNameAttribute>() == null)
            {
                operation.OperationId = context.ApiDescription.RelativePath;
            }

            var methodAuthAttrs = context.MethodInfo.GetCustomAttributes<AuthorizeAttribute>();
            var classAuthAttrs = context.MethodInfo.ReflectedType?.GetCustomAttributes<AuthorizeAttribute>();
            if (methodAuthAttrs.Any() || classAuthAttrs != null && classAuthAttrs.Any())
            {
                var schema = context.SchemaGenerator.GenerateSchema(typeof(Resp<None>), context.SchemaRepository);
                if (!operation.Responses.ContainsKey("401"))
                {
                    operation.Responses.Add("401", new OpenApiResponse()
                    {
                        Description = "Unauthorized",
                        Content = new Dictionary<string, OpenApiMediaType>()
                        {
                            ["application/json"] = new OpenApiMediaType()
                            {
                                Schema = schema,
                                Example = OpenApiAnyFactory.CreateFromJson(UnauthorizedResponse)
                            }
                        }
                    });
                }
                if (!operation.Responses.ContainsKey("403"))
                {
                    operation.Responses.Add("403", new OpenApiResponse()
                    {
                        Description = "Unauthorized",
                        Content = new Dictionary<string, OpenApiMediaType>()
                        {
                            ["application/json"] = new OpenApiMediaType()
                            {
                                Schema = schema,
                                Example = OpenApiAnyFactory.CreateFromJson(ForbiddenResponse)
                            }
                        }
                    });
                }

                operation.Security.Add(new OpenApiSecurityRequirement()
                {
                    [new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference()
                        {
                            Id = "Cookies",
                            Type = ReferenceType.SecurityScheme
                        }
                    }] = new List<string>()
                });
            }
        }
    }
}
