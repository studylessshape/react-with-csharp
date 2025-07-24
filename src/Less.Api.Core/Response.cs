namespace Less.Api.Core
{
    public class Response<T>
    {
        public int Code { get; set; }
        public bool Success { get; set; }
        public string? Message { get; set; }
        public T? Result { get; set; }
    }
}
