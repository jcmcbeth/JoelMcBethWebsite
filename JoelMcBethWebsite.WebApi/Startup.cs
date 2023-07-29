namespace JoelMcBethWebsite.WebApi
{
    using System.Linq;
    using Amcrest.HttpClient;
    using JoelMcBethWebsite.Authentication;
    using JoelMcBethWebsite.Data.EntityFramework;
    using JoelMcBethWebsite.Data.EntityFramework.DependencyInjection;
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
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = this.Configuration.GetConnectionString("MainDatabase");
            services.AddRepositories(connectionString);

            services.Configure<TokenSecurityOptions>(this.Configuration.GetSection("TokenAuthentication"));

            services.AddTokenSecurity(this.Configuration);

            services.AddTransient<AuthenticationManager>();

            services.AddSingleton<ICameraClient, AmcrestHttpClient>(srv =>
                new AmcrestHttpClient(
                    System.Net.IPAddress.Parse(this.Configuration["Camera:IPAddress"]),
                    this.Configuration["Camera:UserName"],
                    this.Configuration["Camera:Password"]));

            services.AddCors();

            services.AddControllers();            

            services.AddMemoryCache();

            services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

            AddTodoistScheduler(services);
            
            services.AddHostedService<SchedulerHostedService>();            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            var allowedOrigins = this.GetAllowedOrigins();
            app.UseCors(options =>
            {
                options.AllowAnyHeader();
                options.AllowAnyMethod();

                if (allowedOrigins.Any())
                {
                    options.WithOrigins(allowedOrigins);
                }
            });

            app.UseHttpsRedirection();

            app.UseRouting();            
            app.UseGlobalExceptionHandler();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            using (IServiceScope scope = app.ApplicationServices.CreateScope())
            {
                JoelMcbethWebsiteDbContext dbContext = scope.ServiceProvider.GetRequiredService<JoelMcbethWebsiteDbContext>();

                dbContext.Database.Migrate();
            }                
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

        private void AddTodoistScheduler(IServiceCollection services)
        {
            var todoistToken = this.Configuration["Todoist:Key"];

            if (!string.IsNullOrWhiteSpace(todoistToken))
            {
                services.AddSingleton<ITaskClient, TodoistRestTaskClient>(
                    factory => new TodoistRestTaskClient(todoistToken));

                // TODO: I need to develop a better way to register and configure schedules.
                // This should be driven by the config file.
                services.AddSingleton(factory => new Schedule()
                {
                    Interval = 60,
                    ScheduledJobType = typeof(TaskCountSchedulerJob)
                });
                services.AddTransient<TaskCountSchedulerJob>();
            }
        }
    }
}
