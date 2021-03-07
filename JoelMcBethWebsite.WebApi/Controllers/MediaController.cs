namespace JoelMcBethWebsite.Controllers
{
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Threading.Tasks;

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
