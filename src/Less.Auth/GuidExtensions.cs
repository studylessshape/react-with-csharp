using System;

namespace Less.Auth
{
    public static class GuidExtensions
    {
        /// <summary>
        /// Translate <see cref="string"/> to <see cref="UUID"/> by <see cref="UUID.Parse(string)"/>
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="System.ArgumentNullException">input is null.</exception>
        /// <exception cref="System.FormatException">input is not in a recognized format.</exception>
        /// <returns></returns>
        public static UUID ToUUID(this string id)
        {
            return UUID.Parse(id);
        }
    }
}
