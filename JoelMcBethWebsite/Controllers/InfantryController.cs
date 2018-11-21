namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    public class InfantryController : ControllerBase
    {
        [HttpGet]
        [Route("api/[controller]/browser/zones")]
        public IActionResult GetZones()
        {
            return this.Ok(new[]
            {
                new
                {
                    Name = "[I:CTFPL] Twin Peaks 2016",
                    PlayerCount = 1,
                    Description = "It's twin peaks yo."
                },
                new
                {
                    Name = "[I:League] USL KR",
                    PlayerCount = 43,
                    Description = "It's kilest ridge yo."
                }
            });
        }
    }
}