using Less.DalCore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;

namespace Less.DalCore.Repository
{
    public class BaseRepository<TDbContext, TEntity, TKey> : IRepository<TEntity, TKey>
        where TEntity : class
        where TDbContext : DbContext
    {
        private readonly TDbContext dbContext;
        private DbSet<TEntity>? _dbsetPrv;
        protected DbSet<TEntity> EntitySet => _dbsetPrv ??= dbContext.Set<TEntity>();

        public BaseRepository(TDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<TEntity> AddAsync(TEntity entity, bool save)
        {
            var addEntity = EntitySet.Add(entity);
            if (save) await SaveChangesAsync();

            return addEntity.Entity;
        }

        public async Task AddRangeAsync(IEnumerable<TEntity> entities, bool save)
        {
            EntitySet.AddRange(entities);
            if (save) await SaveChangesAsync();
        }

        public async Task UpdateAsync(TEntity entity, bool save)
        {
            EntitySet.Update(entity);
            if (save) await SaveChangesAsync();
        }

        public async Task<int> UpdateAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> mapQuery, Expression<Func<TEntity, TEntity>> updateExpresion, bool save)
        {
            var query = mapQuery(EntitySet);
            var affect = await query.UpdateAsync(updateExpresion);
            if (save) await SaveChangesAsync();

            return affect;
        }

        public async Task DeleteAsync(TEntity entity, bool save)
        {
            EntitySet.Remove(entity);
            if (save) await SaveChangesAsync();
        }

        public async Task DeleteRangeAsync(IEnumerable<TEntity> entities, bool save)
        {
            EntitySet.RemoveRange(entities);
            if (save) await SaveChangesAsync();
        }

        public async Task<TEntity?> FirstOrDefaultAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryMap)
        {
            return await queryMap(EntitySet).FirstOrDefaultAsync();
        }

        public async Task<TEntity?> FindAsync(TKey id)
        {
            return await EntitySet.FindAsync(id);
        }

        public async Task<IList<TEntity>> ListAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>>? map = null)
        {
            var query = EntitySet.AsQueryable();
            if (map != null)
            {
                query = map(query);
            }
            return await query.ToListAsync();
        }

        public async Task<PagedList<TEntity>> PaginateAsync(int pageIndex, int pageSize, Func<IQueryable<TEntity>, IQueryable<TEntity>>? mapQuery = null, Func<IQueryable<TEntity>, Task<int>>? countRowsAsync = null)
        {
            if (pageIndex <= 0) throw new ArgumentException("pageIndex must be greater than zero!", nameof(pageIndex));

            var query = EntitySet.AsQueryable();
            if (mapQuery != null) query = mapQuery(query);

            var result = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            var total = countRowsAsync != null ? await countRowsAsync(query) : await query.CountAsync();

            return new PagedList<TEntity>(result, total, pageIndex, pageSize);
        }

        public async Task SaveChangesAsync()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}
