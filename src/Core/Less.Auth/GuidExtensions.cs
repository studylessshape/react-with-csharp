using System;

namespace Less.Auth
{
    public static class GuidExtensions
    {
        /// <summary>
        /// Translate <see cref="string"/> to <see cref="Guid"/> by <see cref="Guid.Parse(string)"/>
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="System.ArgumentNullException">input is null.</exception>
        /// <exception cref="System.FormatException">input is not in a recognized format.</exception>
        /// <returns></returns>
        public static Guid ToGuid(this string id)
        {
            return new Guid(id);
        }
    }
}
