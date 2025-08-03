using Less.Api.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;

namespace Less.DalCore.Repository
{
    /// <summary>
    /// <para>Provide the basic implement for <see cref="IRepository{TEntity, TKey}"/>.</para>
    /// <para>And provide <see cref="dbContext"/> and <see cref="EntitySet"/></para>
    /// </summary>
    /// <typeparam name="TDbContext"></typeparam>
    /// <typeparam name="TEntity"></typeparam>
    /// <typeparam name="TKey"></typeparam>
    public class BaseRepository<TDbContext, TEntity, TKey> : IRepository<TEntity, TKey>
        where TEntity : class
        where TDbContext : DbContext
    {
        /// <summary>
        /// DbContext for this repo
        /// </summary>
        protected readonly TDbContext dbContext;
        private DbSet<TEntity>? _dbsetPrv;
        /// <summary>
        /// which entity this repo serve
        /// </summary>
        protected DbSet<TEntity> EntitySet => _dbsetPrv ??= dbContext.Set<TEntity>();

        /// <summary>
        /// initialize by dbContext
        /// </summary>
        /// <param name="dbContext"></param>
        public BaseRepository(TDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        /// <inheritdoc />
        public virtual async Task<TEntity> AddAsync(TEntity entity, bool save = true)
        {
            var addEntity = EntitySet.Add(entity);
            if (save) await SaveChangesAsync();

            return addEntity.Entity;
        }

        /// <inheritdoc />
        public virtual async Task AddRangeAsync(IEnumerable<TEntity> entities, bool save = true)
        {
            EntitySet.AddRange(entities);
            if (save) await SaveChangesAsync();
        }

        /// <inheritdoc />
        public virtual async Task UpdateAsync(TEntity entity, bool save = true)
        {
            EntitySet.Update(entity);
            if (save) await SaveChangesAsync();
        }

        /// <summary>
        /// update from query by <see cref="Z.EntityFramework.Plus.BatchUpdateExtensions.UpdateAsync{T}(IQueryable{T}, Expression{Func{T, T}}, System.Threading.CancellationToken)"/>
        /// </summary>
        /// <param name="mapQuery"></param>
        /// <param name="updateExpresion"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        public virtual async Task<int> UpdateAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> mapQuery, Expression<Func<TEntity, TEntity>> updateExpresion, bool save = true)
        {
            var query = mapQuery(EntitySet);
            var affect = await query.UpdateAsync(updateExpresion);
            if (save) await SaveChangesAsync();

            return affect;
        }

        /// <inheritdoc />
        public virtual async Task DeleteAsync(TEntity entity, bool save = true)
        {
            EntitySet.Remove(entity);
            if (save) await SaveChangesAsync();
        }

        /// <inheritdoc />
        public virtual async Task DeleteRangeAsync(IEnumerable<TEntity> entities, bool save = true)
        {
            EntitySet.RemoveRange(entities);
            if (save) await SaveChangesAsync();
        }

        /// <summary>
        /// delete query result by <see cref="Z.EntityFramework.Plus.BatchDeleteExtensions.DeleteAsync{T}(IQueryable{T}, System.Threading.CancellationToken)"/>
        /// </summary>
        /// <param name="mapQuery"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        public virtual async Task<int> DeleteAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> mapQuery, bool save = true)
        {
            var query = mapQuery(EntitySet);
            var affect = await query.DeleteAsync();
            if (save) await SaveChangesAsync();

            return affect;
        }

        /// <inheritdoc />
        public virtual async Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> condition)
        {
            return await EntitySet.FirstOrDefaultAsync(condition);
        }

        /// <inheritdoc />
        public virtual async Task<TEntity?> FirstOrDefaultAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryMap)
        {
            return await queryMap(EntitySet).FirstOrDefaultAsync();
        }

        /// <inheritdoc />
        public virtual async Task<TEntity?> FindAsync(TKey id)
        {
            return await EntitySet.FindAsync(id);
        }

        /// <inheritdoc />
        public virtual async Task<IList<TEntity>> ListAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>>? map = null)
        {
            var query = EntitySet.AsQueryable();
            if (map != null)
            {
                query = map(query);
            }
            return await query.ToListAsync();
        }

        /// <inheritdoc />
        public virtual async Task<IList<T>> ListAsync<T>(Func<IQueryable<TEntity>, IQueryable<TEntity>>? map, Expression<Func<TEntity, T>> selector)
        {
            var query = EntitySet.AsQueryable();
            if (map != null)
            {
                query = map(query);
            }
            return await query.Select(selector).ToListAsync();
        }

        /// <inheritdoc />
        public virtual async Task<PagedList<TEntity>> PaginateAsync(int pageIndex, int pageSize, Func<IQueryable<TEntity>, IQueryable<TEntity>>? mapQuery = null, Func<IQueryable<TEntity>, Task<int>>? countRowsAsync = null)
        {
            if (pageIndex <= 0) throw new ArgumentException("pageIndex must be greater than zero!", nameof(pageIndex));

            var query = EntitySet.AsQueryable();
            if (mapQuery != null) query = mapQuery(query);

            var result = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            var total = countRowsAsync != null ? await countRowsAsync(query) : await query.CountAsync();

            return new PagedList<TEntity>(result, total, pageIndex, pageSize);
        }

        /// <inheritdoc />
        public virtual async Task SaveChangesAsync()
        {
            await dbContext.SaveChangesAsync();
        }

        /// <inheritdoc />
        public virtual Task<bool> AnyAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> mapQuery)
        {
            var query = mapQuery(EntitySet);
            return query.AnyAsync();
        }

        /// <inheritdoc />
        public virtual Task<bool> AnyAsync(Expression<Func<TEntity, bool>> condition)
        {
            return EntitySet.AnyAsync(condition);
        }

        /// <inheritdoc />
        public virtual Task<bool> AllAsync(Expression<Func<TEntity, bool>> condition)
        {
            return EntitySet.AllAsync(condition);
        }
    }
}
