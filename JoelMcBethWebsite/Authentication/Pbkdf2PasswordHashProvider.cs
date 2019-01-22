namespace JoelMcBethWebsite.Authentication
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography;
    using System.Threading.Tasks;

    public class Pbkdf2PasswordHashProvider : IPasswordHashProvider
    {
        public const int SaltLength = 24;

        public const int HashLength = 24;

        public const int Iterations = 10000;

        public byte[] GenerateSalt()
        {
            byte[] salt = new byte[SaltLength];
            using (var random = new RNGCryptoServiceProvider())
            {
                random.GetBytes(salt);
            }

            return salt;
        }

        public byte[] HashPassword(string password, byte[] salt)
        {
            using (var hasher = new Rfc2898DeriveBytes(password, salt, Iterations))
            {
                return hasher.GetBytes(HashLength);
            }
        }
    }
}
