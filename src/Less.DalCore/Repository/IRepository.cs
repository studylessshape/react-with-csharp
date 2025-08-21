using Less.Api.Core;
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
        /// <summary>
        /// add entity.
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        Task<TEntity> AddAsync(TEntity entity, bool save = true);
        /// <summary>
        /// add bulk eneties.
        /// </summary>
        /// <param name="entities"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        Task AddRangeAsync(IEnumerable<TEntity> entities, bool save = true);
        /// <summary>
        /// update entity tracked.
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        Task UpdateAsync(TEntity entity, bool save = true);
        /// <summary>
        /// update from query.
        /// </summary>
        /// <param name="mapQuery"></param>
        /// <param name="updateExpresion"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        Task<int> UpdateAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> mapQuery, Expression<Func<TEntity, TEntity>> updateExpresion, bool save = true);
        /// <summary>
        /// delete entity.
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        Task DeleteAsync(TEntity entity, bool save = true);
        /// <summary>
        /// delete bulk entities.
        /// </summary>
        /// <param name="entities"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        Task DeleteRangeAsync(IEnumerable<TEntity> entities, bool save = true);
        /// <summary>
        /// delete entities from query.
        /// </summary>
        /// <param name="mapQuery"></param>
        /// <param name="save"></param>
        /// <returns></returns>
        Task<int> DeleteAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> mapQuery, bool save = true);
        /// <summary>
        /// Same as Any
        /// </summary>
        /// <param name="mapQuery"></param>
        /// <returns></returns>
        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> condition);
        /// <summary>
        /// Same as Any
        /// </summary>
        /// <param name="mapQuery"></param>
        /// <returns></returns>
        Task<bool> AnyAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> mapQuery);
        /// <summary>
        /// Same as All
        /// </summary>
        /// <param name="mapQuery"></param>
        /// <returns></returns>
        Task<bool> AllAsync(Expression<Func<TEntity, bool>> condition);
        /// <summary>
        /// find first entity. it will return <see langword="null"/> if not have
        /// </summary>
        /// <param name="queryMap"></param>
        /// <returns></returns>
        Task<TEntity?> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> condition);
        /// <summary>
        /// find first entity. it will return <see langword="null"/> if not have
        /// </summary>
        /// <param name="queryMap"></param>
        /// <returns></returns>
        Task<TEntity?> FirstOrDefaultAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>> queryMap);
        /// <summary>
        /// find by <paramref name="id"/>
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<TEntity?> FindAsync(TKey id);
        /// <summary>
        /// list all from query
        /// </summary>
        /// <param name="map"></param>
        /// <returns></returns>
        Task<IList<TEntity>> ListAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>>? map = null);
        /// <summary>
        /// list all from query with selector
        /// </summary>
        /// <param name="map"></param>
        /// <returns></returns>
        Task<IList<T>> ListAsync<T>(Func<IQueryable<TEntity>, IQueryable<TEntity>>? map, Expression<Func<TEntity, T>> selector);
        /// <summary>
        /// query by page
        /// </summary>
        /// <param name="pageIndex">one-based</param>
        /// <param name="pageSize"></param>
        /// <param name="mapQuery"></param>
        /// <param name="countRowsAsync"></param>
        /// <returns></returns>
        Task<PagedList<TEntity>> PaginateAsync(int pageIndex, int pageSize, Func<IQueryable<TEntity>, IQueryable<TEntity>>? mapQuery = null, Func<IQueryable<TEntity>, Task<int>>? countRowsAsync = null);
        /// <summary>
        /// custom return type by <paramref name="select"/>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="select"></param>
        /// <param name="mapQuery"></param>
        /// <param name="countRowsAsync"></param>
        /// <returns></returns>
        Task<PagedList<T>> PaginateAsync<T>(int pageIndex, int pageSize, Expression<Func<TEntity, T>> select, Func<IQueryable<TEntity>, IQueryable<TEntity>>? mapQuery = null, Func<IQueryable<TEntity>, Task<int>>? countRowsAsync = null);
        /// <summary>
        /// save all changes
        /// </summary>
        /// <returns></returns>
        Task SaveChangesAsync();

        /// <summary>
        /// auto commit or rollback process. If return false, will rollback, or commit.
        /// </summary>
        /// <param name="proc"></param>
        /// <returns></returns>
        Task Execute(Func<Task<bool>> proc);
    }
}
