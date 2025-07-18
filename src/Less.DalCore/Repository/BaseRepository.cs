using Less.DalCore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Less.DalCore.Repository
{
    public class BaseRepository<TDbContext, TEntity, TKey> : IBaseRepository<TEntity, TKey>
        where TEntity : class
        where TDbContext : DbContext
    {
        private readonly TDbContext dbContext;

        public BaseRepository(TDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddAsync(TEntity entity, bool save)
        {
            dbContext.Add(entity);
            if (save) await SaveChangesAsync();
        }

        public async Task AddRangeAsync(IEnumerable<TEntity> entities, bool save)
        {
            dbContext.Set<TEntity>().AddRange(entities);
            if (save) await SaveChangesAsync();
        }

        public async Task DeleteAsync(TEntity entity, bool save)
        {
            dbContext.Remove(entity);
            if (save) await SaveChangesAsync();
        }

        public Task<TEntity?> FindAsync(TKey id)
        {
            throw new NotImplementedException();
        }

        public Task ListAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>>? map = null)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<TEntity>> PaginateAsync(int pageIndex, int pageSize, Func<IQueryable<TEntity>, IQueryable<TEntity>>? mapQuery = null, Func<IQueryable<TEntity>, Task<int>>? countRowsAsync = null)
        {
            throw new NotImplementedException();
        }

        public Task RemoveRangeAsync(IEnumerable<TEntity> entities, bool save)
        {
            throw new NotImplementedException();
        }

        public async Task SaveChangesAsync()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
