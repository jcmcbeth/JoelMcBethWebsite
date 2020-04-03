namespace JoelMcBethWebsite.Chat
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;

    public class ChatHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await this.Clients.All.SendAsync("MessageReceived", message);
        }
    }
}
