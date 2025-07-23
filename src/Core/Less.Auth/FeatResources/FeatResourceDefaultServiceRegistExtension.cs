using Microsoft.Extensions.DependencyInjection;

namespace Less.Auth.FeatResources
{
    public static class FeatResourceDefaultServiceRegistExtension
    {
        public static IServiceCollection AddDefaultClaimParser(this IServiceCollection services)
        {
            services.AddTransient<IFeatResourceClaimParser, DefaultFeatResourceClaimParser>();
            return services;
        }
    }
}
