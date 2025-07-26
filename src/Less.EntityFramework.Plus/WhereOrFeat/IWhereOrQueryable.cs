using System;
using System.Linq;
using System.Linq.Expressions;

namespace Less.EntityFramework.Plus.WhereOrFeat
{
    public interface IWhereOrQueryable<T>
    {
        IWhereOrQueryable<T> WhereOr(Expression<Func<T, bool>> predicate);
        IQueryable<T> Build();
    }

    public interface IWhereOrQueryable<T, TKey>
    {
        IWhereOrQueryable<T, TKey> WhereOr(Expression<Func<TKey, bool>> predicate);
        IQueryable<T> Build();
    }
}
