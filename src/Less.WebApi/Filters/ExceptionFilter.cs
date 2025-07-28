using Less.Api.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Less.WebApi.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<ExceptionFilter> logger;

        public ExceptionFilter(ILogger<ExceptionFilter> logger)
        {
            this.logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            logger.LogError(context.Exception.ToString());
            context.Result = new ObjectResult(Resp.Err<None>($"Internal Server Error: {context.Exception.Message}"))
            {
                StatusCode = 500,
            };
            context.ExceptionHandled = true;
        }
    }
}
