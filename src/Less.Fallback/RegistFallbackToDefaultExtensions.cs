using Less.Fallback.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Less.Fallback
{
    public static class RegistFallbackToDefaultExtensions
    {
        private const string OptionKey = nameof(FallbackToDefaultOptions);
        public static IServiceCollection AddFallbackToDefault(this IServiceCollection services, IConfiguration configuration, string key = OptionKey)
        {
            services.Configure<FallbackToDefaultOptions>(configuration.GetSection(key));
            services.AddScoped<FallbackToDefaultMiddleware>();

            return services;
        }

        public static IApplicationBuilder UseFallbackToDefault(this IApplicationBuilder app)
        {
            app.UseMiddleware<FallbackToDefaultMiddleware>();

            return app;
        }
    }
}
