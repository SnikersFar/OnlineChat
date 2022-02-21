using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace OnlineChat.SignalRHubs
{
    public class ChatHub : Hub
    {
        public ChatHub()
        {
        }

        public async Task NewMessage(string message, string key)
        {
            await Clients.All.SendAsync("Receive", message, key);
        }
    }
}
