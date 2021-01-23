namespace JoelMcBethWebsite.Data
{
    using JoelMcBethWebsite.Data.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface INotificationRepository
    {
        Task<IEnumerable<Notification>> GetNotificationsAsync(int userId);
    }
}
