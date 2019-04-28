namespace JoelMcBethWebsite
{
    using Amcrest.HttpClient;
    using JoelMcBethWebsite.Authentication;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.EntityFramework;
    using JoelMcBethWebsite.Data.MicrosoftSql;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.StaticFiles;
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

            services.AddSingleton<ICameraClient, AmcrestHttpClient>(srv =>
                new AmcrestHttpClient(
                    System.Net.IPAddress.Parse(this.Configuration["Camera:IPAddress"]),
                    this.Configuration["Camera:UserName"],
                    this.Configuration["Camera:Password"]));

            services.AddMemoryCache();
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddDbContext<JoelMcbethWebsiteDbContext>(options => options.UseSqlServer(connectionString));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment environment)
        {
            if (environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            var contentTypeProvider = new FileExtensionContentTypeProvider();
            contentTypeProvider.Mappings.Add(".exe", "application/vnd.microsoft.portable-executable");
            contentTypeProvider.Mappings.Add(".cfg", "text/plain");

            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseSpaRedirection();
            app.UseStaticFiles(new StaticFileOptions()
            {
                ContentTypeProvider = contentTypeProvider
            });
            app.UseGlobalExceptionHandler();
            app.UseMvc();
        }
    }
}
