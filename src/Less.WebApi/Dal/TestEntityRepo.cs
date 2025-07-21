using Less.DalCore;
using Less.DalCore.Repository;

namespace Less.WebApi.Dal
{
    public class TestEntityRepo : BaseRepository<CoreDbContext, TestEntity, int>
    {
        public TestEntityRepo(CoreDbContext dbContext) : base(dbContext)
        {
        }
    }
}
