namespace JoelMcBethWebsite.Authentication
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data;

    public class AuthenticationManager
    {
        private readonly IUserRepository userRepository;
        private readonly IPasswordHashProvider hashProvider;

        public AuthenticationManager(IUserRepository userRepository, IPasswordHashProvider hashProvider)
        {
            this.userRepository = userRepository;
            this.hashProvider = hashProvider;
        }

        public async Task<bool> AuthenticateAsync(string userName, string password)
        {
            if (userName == null)
            {
                throw new ArgumentNullException(nameof(userName));
            }

            if (password == null)
            {
                throw new ArgumentNullException(nameof(password));
            }

            var user = await this.userRepository.GetUserByUserNameAsync(userName);

            if (user == null)
            {
                return false;
            }

            var hashedPassword = this.hashProvider.HashPassword(password, user.PasswordSalt);

            return hashedPassword.SequenceEqual(user.HashedPassword);
        }

        public async Task CreateCredentialsAsync(string userName, string password)
        {
            if (userName == null)
            {
                throw new ArgumentNullException(nameof(userName));
            }

            if (password == null)
            {
                throw new ArgumentNullException(nameof(password));
            }

            var user = await this.userRepository.GetUserByUserNameAsync(userName);

            var salt = this.hashProvider.GenerateSalt();

            user.PasswordSalt = salt;
            user.HashedPassword = this.hashProvider.HashPassword(password, salt);

            await this.userRepository.UpdateUserAsync(user);
        }
    }
}
