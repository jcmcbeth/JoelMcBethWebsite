namespace JoelMcBethWebsite.Authentication
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.Models;

    public class AuthenticationManager
    {
        public const int MaxFailedLoginAttempts = 5;

        private readonly IUserRepository userRepository;
        private readonly IPasswordHashProvider hashProvider;

        public AuthenticationManager(IUserRepository userRepository, IPasswordHashProvider hashProvider)
        {
            this.userRepository = userRepository;
            this.hashProvider = hashProvider;
        }

        public async Task<AuthenticationResult> AuthenticateAsync(string userName, string password)
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
                return AuthenticationResult.InvalidCredentials;
            }

            user.LastLoginAttempt = DateTime.UtcNow;

            var result = AuthenticationResult.InvalidCredentials;

            var passwordValid = this.ValidatePassword(password, user);

            if (passwordValid)
            {
                user.FailedLoginAttempts = 0;

                if (!user.IsApproved)
                {
                    result = AuthenticationResult.Unapproved;
                }
                else if (user.IsLocked)
                {
                    result = AuthenticationResult.Locked;
                }
                else
                {
                    result = AuthenticationResult.Success;
                }
            }
            else
            {
                user.FailedLoginAttempts++;

                if (user.FailedLoginAttempts >= MaxFailedLoginAttempts)
                {
                    user.IsLocked = true;
                }
            }

            await this.userRepository.UpdateUserAsync(user);

            return result;
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

        private bool ValidatePassword(string password, User user)
        {
            return this.hashProvider.HashPassword(password, user.PasswordSalt)
                .SequenceEqual(user.HashedPassword);
        }
    }
}
