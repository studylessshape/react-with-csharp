using Less.Utils;

namespace Less.Api.Core
{
    /// <summary>
    /// Empty object
    /// </summary>
    public class None
    {
        public static None New()
        {
            return new None();
        }

        public static Result<None, TError> Ok<TError>()
        {
            return None.New().ToOk<TError>();
        }

        public static Result<T, None> Err<T>()
        {
            return None.New().ToErr<T>();
        }
    }

    public static class NoneExtensions
    {
        public static Result<None, TError> ToOk<TError>(this None none)
        {
            return none.ToOk<None, TError>();
        }

        public static Result<T, None> ToErr<T>(this None none)
        {
            return none.ToErr<T, None>();
        }
    }
}
