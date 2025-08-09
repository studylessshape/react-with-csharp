using Less.Auth.Claims;
using System.Linq.Expressions;

namespace Less.Auth.WebApi.Models.ClaimEntities
{
    public class ClaimEntityDto
    {
        public int Id { get; set; }
        public string ClaimType { get; set; } = "";
        public string ClaimValue { get; set; } = "";

        public static ClaimEntityDto FromData(ClaimEntity entity)
        {
            return new ClaimEntityDto
            {
                Id = entity.Id,
                ClaimType = entity.ClaimType,
                ClaimValue = entity.ClaimValue,
            };
        }

        public static Expression<Func<ClaimEntityDto, ClaimEntity>> ToUpdateDataExpr { get; } = c => new ClaimEntity()
        {
            ClaimType = c.ClaimType,
            ClaimValue = c.ClaimValue,
        };

        public static Expression<Func<ClaimEntity, ClaimEntityDto>> FromDataExpr { get; } = c => new ClaimEntityDto()
        {
            Id = c.Id,
            ClaimType = c.ClaimType,
            ClaimValue = c.ClaimValue,
        };
    }
}
