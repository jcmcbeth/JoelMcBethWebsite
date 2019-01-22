namespace JoelMcBethWebsite
{
    using JoelMcBethWebsite.Authentication;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.EntityFramework;
    using JoelMcBethWebsite.Data.MicrosoftSql;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using System.Text;

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
            var connectionString = this.Configuration.GetConnectionString("MainDatabase");

            var tokenProvider = new JwtTokenProvider("joelmcbeth.com", "https://joelmcbeth.com", Encoding.UTF8.GetBytes("hello world here are some more letters"));
            services.AddSingleton<ITokenProvider>(tokenProvider);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = tokenProvider.GetValidationParameters();
                });

            services.AddAuthorization(auth =>
            {
                auth.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .Build();
            });

            services.AddSingleton<IPasswordHashProvider, Pbkdf2PasswordHashProvider>();
            services.AddTransient<AuthenticationManager>();
            services.AddTransient<IBookRepository, MicrosoftSqlBookRepository>(s => new MicrosoftSqlBookRepository(connectionString));
            services.AddTransient<IUserRepository, EntityFrameworkUserRepository>();
            services.AddTransient<IMediaRepository, MicrosoftSqlMediaRepository>(s => new MicrosoftSqlMediaRepository(connectionString));

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddDbContext<JoelMcbethWebsiteDbContext>(options => options.UseSqlServer(connectionString));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
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
