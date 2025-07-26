using System;
using System.Linq;
using System.Linq.Expressions;

namespace Less.EntityFramework.Plus.WhereOrFeat
{
#nullable enable
    internal class WhereOrQueryable<T> : IWhereOrQueryable<T>
    {
        private readonly IQueryable<T> _query;
        private Expression? condition;
        private ParameterExpression? param;
        public WhereOrQueryable(IQueryable<T> query)
        {
            _query = query;
        }

        public IWhereOrQueryable<T> WhereOr(Expression<Func<T, bool>> predicate)
        {
            param ??= Expression.Parameter(typeof(T));

            var invokeExpression = Expression.Invoke(predicate, param);
            if (condition == null)
            {
                condition = invokeExpression;
            }
            else
            {
                condition = Expression.OrElse(condition, invokeExpression);
            }

            return this;
        }

        public IQueryable<T> Build()
        {
            if (condition == null || param == null)
            {
                return _query;
            }
            return _query.Where(Expression.Lambda<Func<T, bool>>(condition, param));
        }
    }

    internal class WhereOrQueryable<T, TKey> : IWhereOrQueryable<T, TKey>
    {
        private readonly IQueryable<T> _query;
        private readonly Expression<Func<T, TKey>> selector;
        private Expression? condition;
        private ParameterExpression? param;
        public WhereOrQueryable(IQueryable<T> query, Expression<Func<T, TKey>> selector)
        {
            _query = query;
            this.selector = selector;
        }

        public IWhereOrQueryable<T, TKey> WhereOr(Expression<Func<TKey, bool>> predicate)
        {
            param ??= Expression.Parameter(typeof(T));

            var keyExpression = Expression.Invoke(selector, param);
            var invokeExpreesion = Expression.Invoke(predicate, keyExpression);

            if (condition == null)
            {
                condition = invokeExpreesion;
            }
            else
            {
                condition = Expression.OrElse(condition, invokeExpreesion);
            }

            return this;
        }

        public IQueryable<T> Build()
        {
            if (condition == null || param == null)
            {
                return _query;
            }

            return _query.Where(Expression.Lambda<Func<T, bool>>(condition, param));
        }
    }
#nullable disable
}
