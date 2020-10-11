using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amcrest.HttpClient;
using JoelMcBethWebsite.Authentication;
using JoelMcBethWebsite.Data;
using JoelMcBethWebsite.Data.EntityFramework;
using JoelMcBethWebsite.Data.MicrosoftSql;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace JoelMcBethWebsite.WebApi
{
    public class Startup
    {
        private const string CorsPolicyName = "WebPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
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

            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicyName, policy =>
                {
                    policy
                        .WithOrigins("https://localhost:44339")
                        .AllowAnyHeader();
                });
            });

            services.AddControllers();

            services.AddDbContext<JoelMcbethWebsiteDbContext>(options => options.UseSqlServer(connectionString));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(CorsPolicyName);
            app.UseGlobalExceptionHandler();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
