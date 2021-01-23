using JoelMcBethWebsite.Data;
using JoelMcBethWebsite.Notifications;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace JoelMcBethWebsite.Notifications
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository notificationRepository;

        public Task SendAsync(IEnumerable<int> userIds, Notification notification)
        {
            var tasks = new List<Task>();
            throw new NotImplementedException();
        }

        private Task SendAsync(int userId, Notification notification)
        {
            throw new NotImplementedException();
        }
    }
}
