namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.IO;
    using System.Threading.Tasks;
    using Amcrest.HttpClient;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Caching.Memory;

    [Produces("application/json")]
    [Route("api/camera")]
    [Authorize]
    public class CameraController : Controller
    {
        private const string SnapshotCacheKey = "_CameraSnapshot";
        private readonly ICameraClient cameraClient;
        private readonly IMemoryCache cache;

        public CameraController(ICameraClient cameraClient, IMemoryCache cache)
        {
            this.cameraClient = cameraClient;
            this.cache = cache;
        }

        [HttpGet]
        [Route("Snapshot")]
        public async Task<IActionResult> GetSnapshot()
        {
            byte[] snapshotData;

            if (!this.cache.TryGetValue(SnapshotCacheKey, out snapshotData))
            {
                // This call takes about 1 second so there is no point in making multiple calls
                // from multiple clients so this is being cached. I do hate storing a whole jpeg
                // in memory after all this effort to stream all the way from the camera client to
                // the web api.
                // The caching does cause the problem of a client making a call immediatly after a
                // snapshot is cached and then making a call one second later. They will have to
                // wait up to 2 seconds before getting a new image.
                using (var stream = await this.cameraClient.GetSnapshotAsync())
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await stream.CopyToAsync(memoryStream);

                        var options = new MemoryCacheEntryOptions()
                        {
                            SlidingExpiration = TimeSpan.FromSeconds(1)
                        };

                        snapshotData = memoryStream.ToArray();

                        this.cache.Set(SnapshotCacheKey, snapshotData, options);
                    }
                }
            }

            return this.File(snapshotData, "image/jpeg");
        }
    }
}
