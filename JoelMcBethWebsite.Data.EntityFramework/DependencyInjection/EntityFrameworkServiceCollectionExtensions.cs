namespace JoelMcBethWebsite.Data.EntityFramework.DependencyInjection
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public static class EntityFrameworkServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services, string connectionString)
        {            
            services.AddTransient<IBookRepository, BookRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IMediaRepository, MediaRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();

            services.AddDbContext<JoelMcbethWebsiteDbContext>(options => options.UseSqlite(connectionString));

            return services;
        }
    }
}
