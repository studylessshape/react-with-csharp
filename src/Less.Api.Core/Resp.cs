using Less.Utils;

namespace Less.Api.Core
{
    public class Resp<T, TError>
    {
        public int Code { get; }
        public bool Success { get; }
        public virtual string? Message { get; }
        public TError? Error { get; }
        public T? Data { get; }

        public Resp()
        {
            Code = 200;
            Success = true;
            Data = default;
        }

        public Resp(T result)
        {
            Code = 200;
            Success = true;
            Data = result;
        }

        public Resp(T result, string? message)
        {
            Code = 200;
            Success = true;
            Data = result;
            Message = message;
        }

        public Resp(TError? error, string? message, int code = 500)
        {
            Success = false;
            Error = error;
            Message = message;
            Code = code;
        }

        public Resp(Result<T, TError> result) : this(result, "操作成功", "操作失败")
        {
        }

        public Resp(Result<T, TError> result, string? okMessage, string? errMessage) : this(result, 500, okMessage, errMessage)
        {
        }

        public Resp(Result<T, TError> result, int errCode, string? okMessage, string? errMessage)
        {
            if (result.IsOk)
            {
                Code = 200;
                Success = true;
                Message = okMessage;
                Data = result.ResultValue;
            }
            else
            {
                Code = errCode;
                Success = false;
                Message = errMessage;
                Error = result.ErrorValue;
            }
        }

        public Resp(Result<T, TError> result, string? errMessage)
        {
            if (result.IsOk)
            {
                Code = 200;
                Success = true;
                Message = "操作成功";
                Data = result.ResultValue;
            }
            else
            {
                Code = 500;
                Success = false;
                Error = result.ErrorValue;
                Message = errMessage;
            }
        }
    }

    public class Resp<T> : Resp<T, string>
    {
        public Resp() : base()
        {

        }

        public Resp(T result) : base(result)
        {
        }

        public Resp(Result<T, string> result) : base(result, result.ErrorValue)
        {
        }

        public Resp(string? message, int code = 500) : base(null, message, code)
        {
        }
    }

    public static class Resp
    {
        public static Resp<T, TError> Ok<T, TError>(T result)
        {
            return new Resp<T, TError>(result);
        }

        public static Resp<T> Ok<T>(T result)
        {
            return new Resp<T>(result);
        }

        public static Resp<T, TError> Err<T, TError>(TError? error, string? message, int code = 500)
        {
            return new Resp<T, TError>(error, message, code);
        }

        public static Resp<T> Err<T>(string? message, int code = 500)
        {
            return new Resp<T>(message, code);
        }

        public static Resp<T, TError> FromResult<T, TError>(Result<T, TError> result)
        {
            return new Resp<T, TError>(result);
        }

        public static Resp<T, TError> FromResult<T, TError>(Result<T, TError> result, string? message)
        {
            return new Resp<T, TError>(result, message);
        }

        public static Resp<T> FromResult<T>(Result<T, string> result)
        {
            return new Resp<T>(result);
        }
    }
}
