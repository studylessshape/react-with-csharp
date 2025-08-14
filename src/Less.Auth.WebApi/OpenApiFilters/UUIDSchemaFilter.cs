using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Less.Auth.WebApi.OpenApiFilters
{
    public class UUIDSchemaFilter : ISchemaFilter
    {
        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            if (context.Type == typeof(UUID))
            {
                if (context.MemberInfo?.ReflectedType != null)
                {
                    schema.Example = new OpenApiString(UUID.New().ToString());
                }
            }
        }
    }
}
