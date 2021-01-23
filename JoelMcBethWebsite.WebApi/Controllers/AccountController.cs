namespace JoelMcBethWebsite.Controllers
{
    using JoelMcBethWebsite.Authentication;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.Models;
    using JoelMcBethWebsite.Messaging;
    using JoelMcBethWebsite.Models;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Threading.Tasks;

    [Produces("application/json")]
    [Route("account")]
    public class AccountController : Controller
    {
        private readonly IUserRepository userRepository;
        private readonly ITokenProvider tokenProvider;
        private readonly AuthenticationManager authenticationManager;
        private readonly IEmailClient emailClient;

        public AccountController(
            ITokenProvider tokenProvider,
            IUserRepository userRepository,
            AuthenticationManager authenticationManager,
            IEmailClient emailClient)
        {
            this.userRepository = userRepository;
            this.tokenProvider = tokenProvider;
            this.authenticationManager = authenticationManager;
            this.emailClient = emailClient;
        }

        [HttpPost]
        [Route("Authenticate")]
        public async Task<LoginResponse> Authenticate(string userName, string password)
        {
            var result = await this.authenticationManager.AuthenticateAsync(userName, password);

            var response = new LoginResponse()
            {
                Result = result
            };

            if (result != AuthenticationResult.Success)
            {
                return response;
            }

            var user = await this.userRepository.GetUserByUserNameAsync(userName);

            var expiration = DateTime.UtcNow.AddMinutes(60);

            response.Token = this.tokenProvider.CreateToken(user, expiration);

            await this.emailClient.SendAsync(new EmailMessage()
            {
                To = user.Email,
                Content = "Your user has been authenticated.",
                Subject = "JoelMcBeth.com Notification"
            });

            return response;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody]UserRegistration registration)
        {
            var userName = registration.UserName;

            if (await this.userRepository.GetUserByUserNameAsync(registration.UserName) != null)
            {
                return this.Ok(false);
            }

            var user = new User()
            {
                UserName = userName,
                Email = registration.Email,
            };



            // We want the first user that registers to actually be able to login
            if (await this.userRepository.Any() == false)
            {
                user.IsApproved = true;
            }

            await this.userRepository.AddUserAsync(user);
            await this.authenticationManager.CreateCredentialsAsync(registration.UserName, registration.Password);

            return this.Ok(true);
        }
    }
}
