namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Amcrest.HttpClient;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Produces("application/json")]
    [Route("api/camera")]
    [Authorize]
    public class CameraController : Controller
    {
        private readonly ICameraClient cameraClient;

        public CameraController(ICameraClient cameraClient)
        {
            this.cameraClient = cameraClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetSnapshot()
        {
            var stream = await this.cameraClient.GetSnapshotAsync();

            return this.File(stream, "image/jpg");
        }
    }
}
