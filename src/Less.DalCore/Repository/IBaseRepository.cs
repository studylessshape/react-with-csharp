using Less.DalCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Less.DalCore.Repository
{
    public interface IBaseRepository<TEntity, TKey>
        where TEntity : class
    {
        Task<TEntity?> FindAsync(TKey id);
        Task AddAsync(TEntity entity, bool save);
        Task AddRangeAsync(IEnumerable<TEntity> entities, bool save);
        Task DeleteAsync(TEntity entity, bool save);
        Task RemoveRangeAsync(IEnumerable<TEntity> entities, bool save);
        Task ListAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>>? map = null);
        Task<PagedList<TEntity>> PaginateAsync(int pageIndex, int pageSize, Func<IQueryable<TEntity>, IQueryable<TEntity>>? mapQuery = null, Func<IQueryable<TEntity>, Task<int>>? countRowsAsync = null);
        Task SaveChangesAsync();
    }
}
