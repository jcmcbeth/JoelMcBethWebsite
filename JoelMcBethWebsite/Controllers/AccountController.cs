namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Authentication;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.Models;
    using JoelMcBethWebsite.Models;
    using Microsoft.AspNetCore.Mvc;

    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly IUserRepository userRepository;
        private readonly ITokenProvider tokenProvider;
        private readonly AuthenticationManager authenticationManager;

        public AccountController(ITokenProvider tokenProvider, IUserRepository userRepository, AuthenticationManager authenticationManager)
        {
            this.userRepository = userRepository;
            this.tokenProvider = tokenProvider;
            this.authenticationManager = authenticationManager;
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

            var expiration = DateTime.UtcNow.AddMinutes(20);

            response.Token = this.tokenProvider.CreateToken(user, expiration);

            return response;
        }

        [HttpPost]
        [Route("Register")]
        public async Task Register([FromBody]UserRegistration registration)
        {
            var user = new User()
            {
                UserName = registration.UserName,
                Email = registration.Email
            };

            await this.userRepository.AddUserAsync(user);
            await this.authenticationManager.CreateCredentialsAsync(registration.UserName, registration.Password);
        }
    }
}
