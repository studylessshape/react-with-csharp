using Less.DalCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Less.DalCore.Repository
{
    public interface IRepository<TEntity, TKey>
        where TEntity : class
    {
        Task<TEntity> AddAsync(TEntity entity, bool save);
        Task AddRangeAsync(IEnumerable<TEntity> entities, bool save);
        Task UpdateAsync(TEntity entity, bool save);
        Task<int> UpdateAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> mapQuery, Expression<Func<TEntity, TEntity>> updateExpresion, bool save);
        Task DeleteAsync(TEntity entity, bool save);
        Task DeleteRangeAsync(IEnumerable<TEntity> entities, bool save);
        Task<TEntity?> FirstOrDefaultAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryMap);
        /// <summary>
        /// 根据 <paramref name="id"/> 查找
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<TEntity?> FindAsync(TKey id);
        Task<IList<TEntity>> ListAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>>? map = null);
        /// <summary>
        /// 从 1 开始的页查找
        /// </summary>
        /// <param name="pageIndex">one-based</param>
        /// <param name="pageSize"></param>
        /// <param name="mapQuery"></param>
        /// <param name="countRowsAsync"></param>
        /// <returns></returns>
        Task<PagedList<TEntity>> PaginateAsync(int pageIndex, int pageSize, Func<IQueryable<TEntity>, IQueryable<TEntity>>? mapQuery = null, Func<IQueryable<TEntity>, Task<int>>? countRowsAsync = null);
        Task SaveChangesAsync();
    }
}
