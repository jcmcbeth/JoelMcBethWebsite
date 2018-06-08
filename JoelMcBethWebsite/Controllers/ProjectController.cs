using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JoelMcBethWebsite.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JoelMcBethWebsite.Controllers
{
    [Produces("application/json")]
    [Route("api/Projects")]
    public class ProjectController : Controller
    {
        // GET: api/Project
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return new Project[]
            {
                new Project()
                {
                    Name = "JoelMcBeth.com",
                    Description = "My personal website. This is where people can find out more about me and what I am doing. It is an AngularJS single page application that uses a ASP.NET Web API and Entity Framework back end.",
                    Url = new Uri("https://www.joelmcbeth.com"),
                    GitHubUrl = new Uri("https://github.com/jcmcbeth/JoelMcBethWebsite/")
                }
            };
        }
    }
}
