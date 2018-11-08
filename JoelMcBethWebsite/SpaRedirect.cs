

namespace JoelMcBethWebsite
{
    using System.IO;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;

    public static class SpaRedirectExtensions
    {
        public static IApplicationBuilder UseSpaRedirection(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SpaRedirect>();
        }
    }

    public class SpaRedirect
    {
        private readonly RequestDelegate next;

        public SpaRedirect(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context, ILogger<SpaRedirect> logger)
        {
            await this.next(context);

            if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
            {
                logger.LogDebug("Request tried to access non-existant path {path} and will be redirected to the SPA index page.", context.Request.Path);

                context.Request.Path = "/index.html";

                await this.next(context);
            }
        }
    }
}
