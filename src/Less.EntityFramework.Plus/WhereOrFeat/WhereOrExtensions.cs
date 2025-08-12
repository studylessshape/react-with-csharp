using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Less.EntityFramework.Plus
{
    /// <summary>
    /// Contains all extensions or method for query
    /// </summary>
    public static class WhereOrExtensions
    {
        /// <summary>
        /// <para>Add parallel condition with <c>||</c> before call <see cref="IWhereOrQueryable{T}.Build"/></para>
        /// <para><b>Notic: </b>This method is aimed to help LINQ to translate sql.</para>
        /// <para>If is used to <see cref="IEnumerable{T}"/>, you can use <see cref="Enumerable.Intersect{TSource}(IEnumerable{TSource}, IEnumerable{TSource})"/>, <see cref="Enumerable.Except{TSource}(IEnumerable{TSource}, IEnumerable{TSource})"/>, <see cref="Enumerable.Contains{TSource}(IEnumerable{TSource}, TSource)"/> or <see cref="Enumerable.Any{TSource}(IEnumerable{TSource}, Func{TSource, bool})"/> to instead.</para>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public static IWhereOrQueryable<T> WhereOr<T>(this IQueryable<T> query, Expression<Func<T, bool>> predicate)
        {
            var whereOr = new WhereOrQueryable<T>(query);
            return whereOr.WhereOr(predicate);
        }

        /// <summary>
        /// <para>Add the condition that the element exists in the specified sequence.</para>
        /// <para><b>Notic: </b>This method is aimed to help LINQ to translate sql.</para>
        /// <para>If is used to <see cref="IEnumerable{T}"/>, you can use <see cref="Enumerable.Intersect{TSource}(IEnumerable{TSource}, IEnumerable{TSource})"/>, <see cref="Enumerable.Except{TSource}(IEnumerable{TSource}, IEnumerable{TSource})"/>, <see cref="Enumerable.Contains{TSource}(IEnumerable{TSource}, TSource)"/> or <see cref="Enumerable.Any{TSource}(IEnumerable{TSource}, Func{TSource, bool})"/> to instead.</para>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        public static IQueryable<T> WhereAnyContains<T>(this IQueryable<T> query, IEnumerable<T> values)
        {
            var whereOr = new WhereOrQueryable<T>(query);
            foreach (var item in values)
            {
                whereOr.WhereOr(v => v.Equals(item));
            }
            return whereOr.Build();
        }



        /// <summary>
        /// <para>Add the condition that the key property of element exists in the specified sequence.</para>
        /// <para><b>Notic: </b>This method is aimed to help LINQ to translate sql.</para>
        /// <para>If is used to <see cref="IEnumerable{T}"/>, you can use <see cref="Enumerable.Intersect{TSource}(IEnumerable{TSource}, IEnumerable{TSource})"/>, <see cref="Enumerable.Except{TSource}(IEnumerable{TSource}, IEnumerable{TSource})"/>, <see cref="Enumerable.Contains{TSource}(IEnumerable{TSource}, TSource)"/> or <see cref="Enumerable.Any{TSource}(IEnumerable{TSource}, Func{TSource, bool})"/> to instead.</para>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TKey"></typeparam>
        /// <param name="query"></param>
        /// <param name="selector"></param>
        /// <param name="keys"></param>
        /// <returns></returns>
        public static IQueryable<T> WhereAnyContains<T, TKey>(this IQueryable<T> query, IEnumerable<TKey> keys, Expression<Func<T, TKey>> selector)
        {
            var whereOr = new WhereOrQueryable<T, TKey>(query, selector);
            foreach (var key in keys)
            {
                whereOr.WhereOr(k => k.Equals(key));
            }

            return whereOr.Build();
        }

        #region can't be translated to sql
        /// <summary>
        /// <para>Same as <see cref="WhereAnyContains{T}(IQueryable{T}, IEnumerable{T})"/>, but use <paramref name="predicate"/> to be the condition.</para>
        /// <para><b>WARN: </b> Through test, expression built by this method can't be translated to sql.</para>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="values"></param>
        /// <param name="predicate"></param>
        /// <returns></returns>
        //[Obsolete("This method can't be translated to sql")]
        //public static IQueryable<T> WhereAnyContains<T>(this IQueryable<T> query, IEnumerable<T> values, Expression<Func<T, T, bool>> predicate)
        //{
        //    var whereOr = new WhereOrQueryable<T>(query);
        //    var paramT = Expression.Parameter(typeof(T));
        //    foreach (var item in values)
        //    {
        //        whereOr.WhereOr(Expression.Lambda<Func<T, bool>>(Expression.Invoke(predicate, paramT, Expression.Constant(item)), paramT));
        //    }
        //    return whereOr.Build();
        //}

        /// <summary>
        /// <para>Same as <see cref="WhereAnyContains{T}(IQueryable{T}, IEnumerable{T}, Expression{Func{T, T, bool}})"/>, but this method can let developer custom the condition between <typeparamref name="T"/> and <typeparamref name="TOther"/>.</para>
        /// <para><b>WARN: </b> Through test, expression built by this method can't be translated to sql.</para>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TOther"></typeparam>
        /// <param name="query"></param>
        /// <param name="values"></param>
        /// <param name="predicate"></param>
        /// <returns></returns>
        //[Obsolete("This method can't be translated to sql")]
        //public static IQueryable<T> WhereAnyContains<T, TOther>(this IQueryable<T> query, IEnumerable<TOther> values, Expression<Func<T, TOther, bool>> predicate)
        //{
        //    var whereOr = new WhereOrQueryable<T>(query);
        //    var paramT = Expression.Parameter(typeof(T));

        //    foreach (var item in values)
        //    {
        //        whereOr.WhereOr(Expression.Lambda<Func<T, bool>>(Expression.Invoke(predicate, paramT, Expression.Constant(item)), paramT));
        //    }
        //    return whereOr.Build();

        //    #region equivalent implement (pure expressions)
        //    // What I want to build is below: 
        //    //Func<IQueryable<T>> f = () =>
        //    //{
        //    //    var whereOr = new WhereOrQueryable<T>(query);
        //    //    var typeTParam = Expression.Parameter(typeof(T));

        //    //    var valueEnumerator = values.GetEnumerator();

        //    //LabelBreak:
        //    //    {
        //    //        if (valueEnumerator.MoveNext())
        //    //        {
        //    //            var item = valueEnumerator.Current;
        //    //            whereOr.WhereOr(Expression.Lambda<Func<T, bool>>(Expression.Invoke(predicate, typeTParam, Expression.Constant(item)), typeTParam));
        //    //            goto LabelBreak;
        //    //        }
        //    //    }

        //    //    return whereOr.Build();
        //    //};

        //    // Build by Expression
        //    //var whereOrType = typeof(WhereOrQueryable<>).MakeGenericType(typeof(T));
        //    //var whereOrMethod = whereOrType.GetMethod("WhereOr", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        //    //var buildMethod = whereOrType.GetMethod("Build", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);

        //    //var enumeratorType = typeof(IEnumerator<>).MakeGenericType(typeof(TOther));
        //    //var moveNextMethod = enumeratorType.GetInterface(typeof(IEnumerator).Name).GetMethod("MoveNext", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);

        //    //var resultType = typeof(IQueryable<>).MakeGenericType(typeof(T));

        //    //var whereOrParam = Expression.Parameter(whereOrType, "whereOr");
        //    //var valuesEnumeratorParam = Expression.Parameter(enumeratorType, "values");
        //    //var itemParam = Expression.Parameter(typeof(TOther), "item");
        //    //var typeTParam = Expression.Parameter(typeof(T));

        //    //var loopLabel = Expression.Label("loopLabel");
        //    //var returnLabel = Expression.Label(resultType, "returnLabel");

        //    //var loopBody = Expression.Block(new[] { itemParam },
        //    //    Expression.Assign(itemParam, Expression.Property(valuesEnumeratorParam, "Current")),
        //    //    Expression.Call(whereOrParam, whereOrMethod, Expression.Lambda<Func<T, bool>>(Expression.Invoke(predicate, typeTParam, itemParam), typeTParam)));

        //    //var loop = Expression.Loop(Expression.IfThenElse(Expression.Call(valuesEnumeratorParam, moveNextMethod),
        //    //                                                 loopBody,
        //    //                                                 Expression.Break(loopLabel)),
        //    //                           loopLabel);

        //    //var block = Expression.Block(new[] { whereOrParam, valuesEnumeratorParam },
        //    //    Expression.Assign(whereOrParam, Expression.Invoke((Expression<Func<WhereOrQueryable<T>>>)(() => new WhereOrQueryable<T>(query)))),
        //    //    Expression.Assign(valuesEnumeratorParam, Expression.Invoke((Expression<Func<IEnumerator<TOther>>>)(() => values.GetEnumerator()))),
        //    //    loop,
        //    //    Expression.Return(returnLabel, Expression.Call(whereOrParam, buildMethod), resultType),
        //    //    Expression.Label(returnLabel, Expression.Call(whereOrParam, buildMethod)));

        //    //var lambda = Expression.Lambda<Func<IQueryable<T>>>(block);
        //    //return lambda.Compile().Invoke();
        //    #endregion
        //}

        /// <summary>
        /// <para>Same as <see cref="WhereAnyContains{T, TKey}(IQueryable{T}, Expression{Func{T, TKey}}, IEnumerable{TKey})"/>, but use <paramref name="predicate"/> to be the condition.</para>
        /// <para><b>WARN: </b> Through test, expression built by this method can't be translated to sql.</para>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TKey"></typeparam>
        /// <param name="query"></param>
        /// <param name="selector"></param>
        /// <param name="keys"></param>
        /// <param name="predicate"></param>
        /// <returns></returns>
        //[Obsolete("This method can't be translated to sql")]
        //public static IQueryable<T> WhereAnyContains<T, TKey>(this IQueryable<T> query, Expression<Func<T, TKey>> selector, IEnumerable<TKey> keys, Expression<Func<TKey, TKey, bool>> predicate)
        //{
        //    var whereOr = new WhereOrQueryable<T, TKey>(query, selector);
        //    var paramTKey = Expression.Parameter(typeof(TKey));
        //    foreach (var key in keys)
        //    {
        //        whereOr.WhereOr(Expression.Lambda<Func<TKey, bool>>(Expression.Invoke(predicate, paramTKey, Expression.Constant(key)), paramTKey));
        //    }

        //    return whereOr.Build();
        //}
        #endregion
    }
}
