﻿namespace JoelMcBethWebsite
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.MicrosoftSql;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            //    .AddCookie();
            services.AddTransient<IBookRepository, MicrosoftSqlBookRepository>(s => new MicrosoftSqlBookRepository(@"Data Source=.\SQLEXPRESS;Initial Catalog=JoelMcBethWebsite;Integrated Security=True"));
            services.AddTransient<IUserRepository, MemoryUserRepository>();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDefaultFiles();
            app.UseStaticFiles();
            //app.UseAuthentication();
            app.UseGlobalExceptionHandler();
            app.UseMvc();
        }
    }
}
