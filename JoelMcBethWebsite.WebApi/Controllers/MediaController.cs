namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Produces("application/json")]
    [Route("Media")]
    public class MediaController : Controller
    {
        private readonly IMediaRepository mediaRepository;

        public MediaController(IMediaRepository mediaRepository)
        {
            this.mediaRepository = mediaRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Media>> Get(string filter)
        {
            return await this.mediaRepository.GetMediaAsync(filter);
        }
    }
}
