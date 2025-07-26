using System;
using System.Collections.Generic;

namespace Less.Api.Core
{
    public class PagedList<T> : List<T>
    {
        /// <summary>
        /// 总数
        /// </summary>
        public int Total { get; }

        /// <summary>
        /// 当前页索引
        /// </summary>
        public int PageIndex { get; }

        /// <summary>
        /// 总页数
        /// </summary>
        public int TotalPages { get; }

        /// <summary>
        /// 页大小
        /// </summary>
        public int PageSize { get; }

        /// <summary>
        /// 是否有前一页
        /// </summary>
        public bool HasPreviousPage => PageIndex > 1;

        /// <summary>
        /// 是否有后一页
        /// </summary>
        public bool HasNextPage => PageIndex < TotalPages;

        public PagedList(IEnumerable<T> items, int total, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            Total = total;
            TotalPages = (int)Math.Ceiling(total / (double)pageSize);
            PageSize = pageSize;
            AddRange(items);
        }
    }
}
