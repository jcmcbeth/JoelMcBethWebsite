namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using Infantry.Client.Directory;
    using Infantry.Directory;
    using JoelMcBethWebsite.Models.Infantry;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    public class InfantryController : ControllerBase
    {
        [HttpGet]
        [Route("[controller]/browser/zones")]
        public async Task<IActionResult> GetZones()
        {
            var hostEntry = await Dns.GetHostEntryAsync("infdir1.aaerox.com");
            var address = hostEntry.AddressList.First();

            using (var directoryClient = new DirectoryClient(address))
            {
                var zones = await directoryClient.GetZonesAsync();

                var models = new List<ZoneModel>();

                foreach (var zone in zones)
                {
                    // TODO: use automapper
                    var model = new ZoneModel()
                    {
                        Description = zone.Description,
                        IsAdvanced = zone.IsAdvanced,
                        Name = zone.Name,
                        ServerAddress = zone.ServerAddress.ToString(),
                        ServerPort = zone.ServerPort
                    };

                    models.Add(model);
                }

                return this.Ok(models);
            }
        }
    }
}