namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Produces("application/json")]
    [Route("api/Users")]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserRepository users;

        public UserController(IUserRepository users)
        {
            this.users = users;
        }

        [HttpGet]
        public async Task<PagedEnumerable<User>> GetAllUsers(int page, int pageSize = 15)
        {
            return await this.users.GetUsersAsync(page, pageSize);
        }

        [HttpPost]
        public async Task<User> Add([FromBody]User user)
        {
            return await this.users.AddUserAsync(user);
        }
    }
}