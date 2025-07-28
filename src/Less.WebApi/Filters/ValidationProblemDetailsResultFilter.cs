using Less.Api.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Less.WebApi.Filters
{
    public class ValidationProblemDetailsResultFilter : IResultFilter
    {
        public void OnResultExecuted(ResultExecutedContext context)
        {

        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
            if (context.Result is BadRequestObjectResult badRequest
                && badRequest.Value is ValidationProblemDetails problemDetails)
            {
                context.Result = new ObjectResult(new Resp<None, IDictionary<string, string[]>>(problemDetails.Errors, problemDetails.Title, StatusCodes.Status400BadRequest))
                {
                    StatusCode = badRequest.StatusCode,
                };
            }
        }
    }
}
