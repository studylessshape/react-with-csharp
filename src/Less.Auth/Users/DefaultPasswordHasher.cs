using Konscious.Security.Cryptography;
using System;
using System.Text;

namespace Less.Auth.Users
{
    /// <summary>
    /// Hash password by Argon2
    /// </summary>
    internal class DefaultPasswordHasher : IPasswordHasher
    {
        public string GenerateSalt()
        {
            return Guid.NewGuid().ToString();
        }

        private Argon2 BuildArgon(string password, string salt)
        {
            var argon2 = new Argon2d(Encoding.UTF8.GetBytes(password));
            argon2.Salt = Encoding.UTF8.GetBytes(salt);
            argon2.DegreeOfParallelism = 4;
            argon2.Iterations = 40;
            argon2.MemorySize = 8192; // 8mb

            return argon2;
        }

        private string GeneratePasswordHash(string password, string salt)
        {
            var argon2 = BuildArgon(password, salt);

#if NET6_0_OR_GREATER
            return Convert.ToHexString(argon2.GetBytes(128)); // get bytes of length 128
#else
            return BitConverter.ToString(argon2.GetBytes(128)).Replace("-", ""); // get bytes of length 128
#endif
        }

        /// <inheritdoc />
        public string GetPasswordHash(string password, string salt)
        {
            return GeneratePasswordHash(password, salt);
        }

        /// <inheritdoc />
        public PasswordWithSalt GetPasswordHash(string password)
        {
            var salt = GenerateSalt();
            return new PasswordWithSalt(GeneratePasswordHash(password, salt), salt);
        }

        /// <inheritdoc />
        public bool VerifyPassword(string passwordHash, string password, string salt)
        {
            var comparePasswordHash = GeneratePasswordHash(password, salt);
            return passwordHash == comparePasswordHash;
        }
    }
}
