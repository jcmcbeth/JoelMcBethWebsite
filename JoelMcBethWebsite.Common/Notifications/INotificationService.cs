namespace JoelMcBethWebsite.Notifications
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;

    public interface INotificationService
    {
        Task SendAsync(IEnumerable<int> userIds, Notification notification);
    }
}
