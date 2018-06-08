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
    [Route("api/Books")]    
    public class BookController : Controller
    {
        [HttpGet]
        public IEnumerable<Book> Get()
        {
            return new Book[]
            {
                new Book()
                {
                    Title = "Soft Skills: The software developer's life manual",
                    Authors = new List<string>()
                    {
                        "John Sonmez"
                    }                    
                },
                new Book()
                {
                    Title = "Assembly language Step by Step - Programming with Linux",
                    Edition = "3rd",
                    Authors = new List<string>()
                    {
                        "Jeff Duntemann"
                    }
                }
            };
        }               
    }
}
