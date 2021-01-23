namespace JoelMcBethWebsite.Messaging
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;

    public interface IEmailClient
    {
        Task SendAsync(EmailMessage message);
    }
}
