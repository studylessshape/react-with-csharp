using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace Less.EntityFramework.Plus.WhereOrFeat
{
    public static class WhereOrExtensions
    {
        public static IWhereOrQueryable<T> WhereOr<T>(this IQueryable<T> query, Expression<Func<T, bool>> predicate)
        {
            var whereOr = new WhereOrQueryable<T>(query);
            return whereOr.WhereOr(predicate);
        }

        public static IQueryable<T> WhereAnyContains<T>(this IQueryable<T> query, IEnumerable<T> values)
        {
            var whereOr = new WhereOrQueryable<T>(query);
            foreach (var item in values)
            {
                whereOr.WhereOr(v => v.Equals(item));
            }
            return whereOr.Build();
        }

        public static IQueryable<T> WhereAnyContains<T>(this IQueryable<T> query, IEnumerable<T> values, Expression<Func<T, T, bool>> predicate)
        {
            var whereOr = new WhereOrQueryable<T>(query);
            var paramT = Expression.Parameter(typeof(T));
            foreach (var item in values)
            {
                whereOr.WhereOr(Expression.Lambda<Func<T, bool>>(Expression.Invoke(predicate, paramT, Expression.Constant(item)), paramT));
            }
            return whereOr.Build();
        }

        private class Closure<T>
        {
            public T Value { get; set; }
        }

        public static IQueryable<T> WhereAnyContains<T, TOther>(this IQueryable<T> query, IEnumerable<TOther> values, Expression<Func<T, TOther, bool>> predicate)
        {
            var whereOr = new WhereOrQueryable<T>(query);
            var paramT = Expression.Parameter(typeof(T));
            var type = typeof(Closure<>).MakeGenericType(typeof(TOther));
            var valueProperty = type.GetProperty("Value");

            foreach (var item in values)
            {
                var value = new Closure<TOther> { Value = item };
                var field = Expression.Property(Expression.Constant(value), valueProperty);
                whereOr.WhereOr(Expression.Lambda<Func<T, bool>>(Expression.Invoke(predicate, paramT, field), paramT));
            }
            return whereOr.Build();
        }

        public static IQueryable<T> WhereAnyContains<T, TKey>(this IQueryable<T> query, Expression<Func<T, TKey>> selector, IEnumerable<TKey> keys)
        {
            var whereOr = new WhereOrQueryable<T, TKey>(query, selector);
            foreach (var key in keys)
            {
                whereOr.WhereOr(k => k.Equals(key));
            }

            return whereOr.Build();
        }

        public static IQueryable<T> WhereAnyContains<T, TKey>(this IQueryable<T> query, Expression<Func<T, TKey>> selector, IEnumerable<TKey> keys, Expression<Func<TKey, TKey, bool>> predicate)
        {
            var whereOr = new WhereOrQueryable<T, TKey>(query, selector);
            var paramTKey = Expression.Parameter(typeof(TKey));
            foreach (var key in keys)
            {
                whereOr.WhereOr(Expression.Lambda<Func<TKey, bool>>(Expression.Invoke(predicate, paramTKey, Expression.Constant(key)), paramTKey));
            }

            return whereOr.Build();
        }
    }
}
