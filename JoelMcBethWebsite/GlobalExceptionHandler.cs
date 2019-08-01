namespace JoelMcBethWebsite
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;

    public class GlobalExceptionHandler
    {
        private readonly RequestDelegate next;

        public GlobalExceptionHandler(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext, ILogger<GlobalExceptionHandler> logger)
        {
            try
            {
                await this.next(httpContext);
            }
            catch (Exception exception)
            {
                logger.LogError(exception, "An unhandled exception has occurred when processing a request.");

                var result = JsonConvert.SerializeObject(new { error = exception.Message });

                httpContext.Response.StatusCode = 500;
                httpContext.Response.ContentType = "application/json";

                await httpContext.Response.WriteAsync(result);
            }
        }
    }
}
