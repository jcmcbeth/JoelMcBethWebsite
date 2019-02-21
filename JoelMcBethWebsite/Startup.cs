namespace JoelMcBethWebsite
{
    using JoelMcBethWebsite.Authentication;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.EntityFramework;
    using JoelMcBethWebsite.Data.MicrosoftSql;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = this.Configuration.GetConnectionString("MainDatabase");

            services.Configure<TokenSecurityOptions>(this.Configuration.GetSection("TokenAuthentication"));

            services.AddTokenSecurity(this.Configuration);

            services.AddTransient<AuthenticationManager>();
            services.AddTransient<IBookRepository, MicrosoftSqlBookRepository>(s => new MicrosoftSqlBookRepository(connectionString));
            services.AddTransient<IUserRepository, EntityFrameworkUserRepository>();
            services.AddTransient<IMediaRepository, MicrosoftSqlMediaRepository>(s => new MicrosoftSqlMediaRepository(connectionString));

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddDbContext<JoelMcbethWebsiteDbContext>(options => options.UseSqlServer(connectionString));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();
            app.UseSpaRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseGlobalExceptionHandler();
            app.UseMvc();
        }
    }
}
