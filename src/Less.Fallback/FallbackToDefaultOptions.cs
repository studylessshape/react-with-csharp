using System.Collections.Generic;

namespace Less.Fallback
{
    public class FallbackToDefaultOptions
    {
        public IList<string> NotFallbackPatterns { get; } = new List<string>();
    }
}
