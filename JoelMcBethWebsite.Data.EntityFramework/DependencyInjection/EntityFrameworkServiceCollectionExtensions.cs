namespace JoelMcBethWebsite.Data.EntityFramework.DependencyInjection
{
    using JoelMcBethWebsite.Data.MicrosoftSql;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public static class EntityFrameworkServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services, string connectionString)
        {            
            services.AddTransient<IBookRepository, EntityFrameworkBookRepository>();
            services.AddTransient<IUserRepository, EntityFrameworkUserRepository>();
            services.AddTransient<IMediaRepository, MicrosoftSqlMediaRepository>(s => new MicrosoftSqlMediaRepository(connectionString));
            services.AddTransient<ITaskRepository, EntityFrameworkTaskRepository>();

            services.AddDbContext<JoelMcbethWebsiteDbContext>(options => options.UseSqlite(connectionString));

            return services;
        }
    }
}
