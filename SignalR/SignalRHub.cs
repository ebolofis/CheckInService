using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.Extensions.Primitives;
using Microsoft.Extensions.Logging;


namespace CheckinFront.SignalR
{

    public class SignalRHub : Hub
    {
        ILogger<SignalRHub> logger;
        //HubParticipants<ChatHub> participants;

        private HubParticipants hubParticipants = new HubParticipants();

        public SignalRHub() : base()
        {
            // this.participants = participants;
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
        public Task SendMessage(string user, string message)
        {
            return Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public Task AddUserToGroup(string group)
        {
            if (string.IsNullOrWhiteSpace(group))
            {
                logger.LogWarning("SignalR Groupd must not be empty string");
                return null;
            }
            else
                return Groups.AddToGroupAsync(GetConnectionId(), group);
        }

        /// <summary>
        ///  sends a message to All Other connected clients, using Clients.All
        /// </summary>
        /// <param name="user"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public Task SendOthersMessage(string user, string message)
        {
            return Clients.Others.SendAsync("ReceiveMessage", user, message);
        }

        /// <summary>
        /// ends a message back to the caller, using Clients.Caller.
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public Task SendMessageToCaller(string message)
        {
            return Clients.Caller.SendAsync("ReceiveMessage", message);
        }

        /// <summary>
        /// sends a message to all clients in a group.
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public Task SendMessageToGroup(string group, string message)
        {
            return Clients.Group(group).SendAsync("ReceiveMessage", message);
        }

        /// <summary>
        /// sends a message to other clients in a group.
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>

        public Task SendMessageToOthersInGroup(string group, string message)
        {
            return Clients.OthersInGroup(group).SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            string name = GetClientName();
            string conId = Context.ConnectionId;     //get client's unique id

            await base.OnConnectedAsync();
        }


        /// <summary>
        /// Get username from QueryString or Headers. 
        /// Client Name is expected into QueryString or Header.
        /// </summary>
        /// <returns>the client name or 'Console'</returns>
        private string GetClientName()
        {
            var res = Context.GetHttpContext().Request.Query["name"];
            string name = null;
            if (res != default(StringValues) && res.Count > 0)
                name = res[0];

            if (name == null)
                name = Context.GetHttpContext().Request.Headers["name"];

            if (name == null)
                name = "Console";

            return name;
        }

    }
}

