﻿using System;
using System.Collections.Generic;

namespace Less.DalCore.Models
{
    public class PagedList<T> : List<T>
    {
        public int TotalCounts { get; }

        public int PageIndex { get; }

        public int TotalPages { get; }

        public int PageSize { get; }

        public bool HasPreviousPage => PageIndex > 1;

        public bool HasNextPage => PageIndex < TotalPages;

        public PagedList(IEnumerable<T> items, int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            TotalCounts = count;
            TotalPages = (int)Math.Ceiling((double)count / (double)pageSize);
            PageSize = pageSize;
            AddRange(items);
        }
    }
}
