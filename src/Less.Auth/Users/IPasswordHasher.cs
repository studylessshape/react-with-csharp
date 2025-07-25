namespace Less.Auth.Users
{
    /// <summary>
    /// Password hash and the salt used by hash
    /// </summary>
    /// <param name="password"></param>
    /// <param name="salt"></param>
    public class PasswordWithSalt
    {
        /// <summary>
        /// New
        /// </summary>
        /// <param name="password"></param>
        /// <param name="salt"></param>
        public PasswordWithSalt(string password, string salt)
        {
            Password = password;
            Salt = salt;
        }

        /// <summary>
        /// Password hash value
        /// </summary>
        public string Password { get; }
        /// <summary>
        /// Hash Salt
        /// </summary>
        public string Salt { get; }
    }
    
    /// <summary>
    /// Provide method to translate password to hash value
    /// </summary>
    public interface IPasswordHasher
    {
        /// <summary>
        /// Hash password
        /// </summary>
        /// <param name="password"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        string GetPasswordHash(string password, string salt);
        /// <summary>
        /// Hash password and auto set Salt
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        PasswordWithSalt GetPasswordHash(string password);
        /// <summary>
        /// Generate Salt
        /// </summary>
        /// <returns></returns>
        string GenerateSalt();
        /// <summary>
        /// Verify password
        /// </summary>
        /// <param name="passwordHash"></param>
        /// <param name="password"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        bool VerifyPassword(string passwordHash, string password, string salt);
    }
}
