using Less.WebApi.Dal;

namespace Less.WebApi.Dto
{
    public class TestEntityDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }

        public static implicit operator TestEntity(TestEntityDto dto)
        {
            return new TestEntity()
            {
                Name = dto.Name,
                Description = dto.Description,
            };
        }
    }
}
