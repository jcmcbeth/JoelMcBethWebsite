﻿namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Models;
    using Microsoft.AspNetCore.Mvc;

    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : Controller
    {
        [HttpPost]
        [Route("Login")]
        public LoginResponse Login(string userName, string password)
        {
            if (userName == "test@test.com" && password != "test")
            {
                return new LoginResponse()
                {
                    Success = false
                };
            }

            return new LoginResponse()
            {
                Success = true,
                Token = "hello world"
            };
        }
    }
}
