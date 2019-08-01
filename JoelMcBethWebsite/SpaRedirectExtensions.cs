namespace JoelMcBethWebsite
{
    using Microsoft.AspNetCore.Builder;

    public static class SpaRedirectExtensions
    {
        public static IApplicationBuilder UseSpaRedirection(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SpaRedirect>();
        }
    }
}
