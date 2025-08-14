using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Less.Auth.WebApi.OpenApiFilters
{
    public class UUIDParameterFilter : IParameterFilter
    {
        public void Apply(OpenApiParameter parameter, ParameterFilterContext context)
        {
            if (parameter.Schema.Title == "UUID" && parameter.Schema.Example != null)
            {
                parameter.Schema.Example = null;
            }
        }
    }
}
