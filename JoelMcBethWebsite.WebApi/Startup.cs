namespace JoelMcBethWebsite.WebApi
{
    using System.Linq;
    using Amcrest.HttpClient;
    using JoelMcBethWebsite.Authentication;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.EntityFramework;
    using JoelMcBethWebsite.Data.MicrosoftSql;
    using JoelMcBethWebsite.Scheduler;
    using JoelMcBethWebsite.Tasks;
    using JoelMcBethWebsite.Tasks.Todoist;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;

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
            services.AddTransient<ITaskRepository, EntityFrameworkTaskRepository>();

            services.AddSingleton<ICameraClient, AmcrestHttpClient>(srv =>
                new AmcrestHttpClient(
                    System.Net.IPAddress.Parse(this.Configuration["Camera:IPAddress"]),
                    this.Configuration["Camera:UserName"],
                    this.Configuration["Camera:Password"]));            

            var allowedOrigins = GetAllowedOrigins();

            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicyName, policy =>
                {
                    policy.AllowAnyHeader();

                    if (allowedOrigins.Any())
                    {
                        policy.WithOrigins(allowedOrigins);
                    }
                });
            });

            services.AddControllers();

            services.AddDbContext<JoelMcbethWebsiteDbContext>(options => options.UseSqlServer(connectionString));

            services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

            services.AddSingleton<ITaskClient, TodoistRestTaskClient>(
                factory => new TodoistRestTaskClient(this.Configuration["Todoist:Key"]));
            services.AddSingleton<Schedule>(factory => new Schedule()
            {
                //Interval = 60,
                Interval = 10,
                ScheduledJobType = typeof(TaskCountSchedulerJob)
            });
            services.AddTransient<TaskCountSchedulerJob>();
            services.AddHostedService<SchedulerHostedService>();
        }

        private string[] GetAllowedOrigins()
        {
            var allowedOrigin = this.Configuration["AllowedOrigin"];

            if (allowedOrigin != null)
            {
                return new string[] { allowedOrigin };
            }

            return new string[0];
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
