using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Less.Fallback.Middleware
{
    public class FallbackToDefaultMiddleware : IMiddleware
    {
        private readonly IHostingEnvironment env;
        private readonly IOptions<FallbackToDefaultOptions> options;
        private readonly IOptions<DefaultFilesOptions> defaultFileOptions;
        private readonly IFileProvider fileProvider;

        public FallbackToDefaultMiddleware(IHostingEnvironment env, IOptions<FallbackToDefaultOptions> options, IOptions<DefaultFilesOptions> defaultFileOptions)
        {
            this.env = env;
            this.options = options;
            this.defaultFileOptions = defaultFileOptions;
            fileProvider = env.WebRootFileProvider ?? throw new System.InvalidOperationException("Miss FileProvider.");
        }

        private bool IsGetOrHeadMethod(string method)
        {
            return HttpMethods.IsGet(method) || HttpMethods.IsHead(method);
        }

        private bool ResponseNotFoundAndEmpty(HttpResponse response)
        {
            return response.StatusCode == 404 && response.Body.Length == 0;
        }

        private bool NotFallback(PathString path)
        {
            foreach (var pattern in options.Value.NotFallbackPatterns)
            {
                if (path.StartsWithSegments(pattern))
                {
                    return true;
                }
            }
            return false;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            await next(context);

            if (IsGetOrHeadMethod(context.Request.Method)
                && ResponseNotFoundAndEmpty(context.Response)
                && !NotFallback(context.Request.Path))
            {
                foreach (var filePath in defaultFileOptions.Value.DefaultFileNames)
                {
                    var file = fileProvider.GetFileInfo(filePath);
                    if (file.Exists)
                    {
                        await context.Response.SendFileAsync(file);
                        break;
                    }
                }
            }
        }
    }
}
