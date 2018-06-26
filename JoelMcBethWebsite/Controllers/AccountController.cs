namespace JoelMcBethWebsite.Controllers
{
    using JoelMcBethWebsite.Models;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : Controller
    {
        [HttpPost]
        [Route("Login")]
        public LoginResponse Login(string userName, string password)
        {
            return new LoginResponse()
            {
                Success = true,
                Token = "hello world"
            };
        }
    }
}
