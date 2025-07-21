using Less.WebApi.Dal;
using Less.WebApi.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Less.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestEntityController : ControllerBase
    {
        private readonly TestEntityRepo repo;

        public TestEntityController(TestEntityRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<TestEntity?> Get(int id)
        {
            return await repo.FindAsync(id);
        }

        [HttpPut]
        public async Task<TestEntity> Add(TestEntityDto dto)
        {
            return await repo.AddAsync(dto, true);
        }

        [HttpPost]
        public async Task Update(int id, TestEntityDto dto)
        {
            await repo.UpdateAsync(query => query.Where(e => e.Id == id), entity => new TestEntity
            {
                Name = dto.Name,
                Description = dto.Description
            }, true);
        }
    }
}
