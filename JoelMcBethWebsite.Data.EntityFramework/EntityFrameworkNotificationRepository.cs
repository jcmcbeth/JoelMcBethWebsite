namespace JoelMcBethWebsite.Data.EntityFramework
{
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class EntityFrameworkNotificationRepository : INotificationRepository
    {
        private readonly JoelMcbethWebsiteDbContext context;

        public EntityFrameworkNotificationRepository(JoelMcbethWebsiteDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Notification>> GetNotificationsAsync(int userId)
        {
            return await this.context.Notifications
                .Where(not => not.Users.Any(usr => usr.Id == userId))
                .ToListAsync();
        }
    }
}
