using Less.Api.Core;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Less.Api.Services
{
    public static class PrepareRunner
    {
        public static async Task RunPrepare(IServiceProvider services)
        {
            var prepareServices = services.GetServices<IHostPrepare>();
            if (prepareServices != null)
            {
                foreach (var parpare in prepareServices.OrderBy(p => p.Priority))
                {
                    await parpare.PrepareAsync();
                }
            }
        }
    }
}
