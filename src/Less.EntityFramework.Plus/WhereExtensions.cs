using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Less.EntityFramework.Plus
{
    public static class WhereExtensions
    {
        public static IQueryable<T> WhereNotContains<T>(this IQueryable<T> query, IEnumerable<T> values)
        {
            foreach (var item in values)
            {
                query = query.Where(v => !v.Equals(item));
            }
            return query;
        }

        public static IQueryable<T> WhereNotContains<T, TKey>(this IQueryable<T> query, Expression<Func<T, TKey>> selector, IEnumerable<TKey> keys)
        {
            foreach (var key in keys)
            {
                var para = selector.Parameters.First();
                var predicate = Expression.NotEqual(selector.Body, Expression.Constant(key));
                query = query.Where(Expression.Lambda<Func<T, bool>>(predicate, para));
            }
            return query;
        }
    }
}
