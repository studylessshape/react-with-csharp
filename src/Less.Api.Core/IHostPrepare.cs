using System.Threading.Tasks;

namespace Less.Api.Core
{
    public interface IHostPrepare
    {
        int Priority { get; }
        Task PrepareAsync();
    }
}
