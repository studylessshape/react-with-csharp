using System;
using System.Collections.Generic;

namespace Less.Api.Core
{
    public delegate bool EqualComparerDelegate<T>(T? x, T? y);
    internal class GenericEqualComparer<T> : IEqualityComparer<T>
    {
        private readonly EqualComparerDelegate<T> equalComparer;
        private readonly Func<T, int>? getHashCode;

        public GenericEqualComparer(EqualComparerDelegate<T> equalComparer)
        {
            this.equalComparer = equalComparer;
        }

        public GenericEqualComparer(EqualComparerDelegate<T> equalComparer, Func<T, int> getHashCode)
        {
            this.equalComparer = equalComparer;
            this.getHashCode = getHashCode;
        }

        public bool Equals(T? x, T? y)
        {
            return equalComparer(x, y);
        }

        public int GetHashCode(T obj)
        {
            if (obj == null)
            {
                return 0;
            }

            if (getHashCode != null)
            {
                return getHashCode(obj);
            }

            return obj.GetHashCode();
        }
    }

    public static class GenericEqualComparer
    {
        public static IEqualityComparer<T> Create<T>(EqualComparerDelegate<T> equalComparer)
        {
            return new GenericEqualComparer<T>(equalComparer);
        }
    }
}
