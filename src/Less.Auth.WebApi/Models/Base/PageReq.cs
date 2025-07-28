using System.ComponentModel.DataAnnotations;

namespace Less.Auth.WebApi.Models.Base
{
    public class PageReq
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Page { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int PageSize { get; set; }
    }
}
