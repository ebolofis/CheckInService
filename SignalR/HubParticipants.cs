using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheckinFront.SignalR
{
    public class HubParticipants
    {
        /// <summary>
        /// class that handles the list of clients into a SignalR Hub T
        /// </summary>
        private static HashSet<SignalRClientModel> clients;

        public HubParticipants()
        {
            clients = new HashSet<SignalRClientModel>();
        }

        /// <summary>
        /// Return the list of ConnectionIds for users belonging to the given group
        /// </summary>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public List<string> GetUsersInGroup(string groupName)
        {
            return clients.Where(x => x.Groups.ToList<string>().Exists(y => y == groupName)).Select(i => i.ConnectionId).ToList<string>();
        }


        /// <summary>
        /// Return the participant model of a given ConnectionId
        /// </summary>
        /// <param name="ConnectionId"></param>
        /// <returns></returns>
        public SignalRClientModel GetParticipantById(string ConnectionId)
        {
            return clients.FirstOrDefault(x => x.ConnectionId == ConnectionId);
        }

        /// <summary>
        /// check if client exists, based on ConnectionId
        /// </summary>
        /// <param name="ConnectionId">ConnectionId</param>
        /// <returns></returns>
        public bool ClientExists(string ConnectionId)
        {
            return clients.ToList().Exists(x => x.ConnectionId == ConnectionId);
        }

        public List<SignalRClientModel> GetClients()
        {
            return clients.ToList();
        }

        /// <summary>
        /// Add a client to list (ConnectionId and Name are unique)
        /// </summary>
        /// <param name="ConnectionId"></param>
        /// <param name="name">the unique name</param>
        public SignalRClientModel AddClient(string ConnectionId)
        {
            var SignalRClientModel = GetParticipantById(ConnectionId);
            if (SignalRClientModel != null)
            {
                SignalRClientModel.ConnectionId = ConnectionId;
                SignalRClientModel.ReconnectionTime = DateTime.Now;
                SignalRClientModel.Reconnections++;
                return SignalRClientModel;
            }

            SignalRClientModel = GetParticipantById(ConnectionId);
            if (SignalRClientModel != null)
            {
                SignalRClientModel.ReconnectionTime = DateTime.Now;
                SignalRClientModel.Reconnections++;
                return SignalRClientModel;
            }
            lock (clients)
            {
                SignalRClientModel = new SignalRClientModel(ConnectionId);
                clients.Add(SignalRClientModel);
            }
            return SignalRClientModel;
        }

        /// <summary>
        /// Remove a client from list based on ConnectionId
        /// </summary>
        /// <param name="ConnectionId">ConnectionId</param>
        public void RemoveClient(string ConnectionId)
        {
            lock (clients)
            {
                clients.RemoveWhere(x => x.ConnectionId == ConnectionId);
            }

        }



    }


    /// <summary>
    /// Model representing a SignalR client. Every client has :
    ///   a name (to be recognised from others), 
    ///   a unique connectionId (provided by sugnalR) 
    /// and belons to many groups.
    /// </summary>
    public class SignalRClientModel
    {

        public SignalRClientModel(string ConnectionId)
        {
            this.ConnectionId = ConnectionId;
            this.ConnectionTime = DateTime.Now;
            Groups = new HashSet<string>();
        }

        public string ConnectionId { get; set; }

        /// <summary>
        /// the first time user connected to hub
        /// </summary>
        public DateTime ConnectionTime { get; set; }

        /// <summary>
        /// The last time user connected to hub
        /// </summary>
        public DateTime ReconnectionTime { get; set; }

        /// <summary>
        /// keep the number of reconnections
        /// </summary>
        public int Reconnections { get; set; }

        public HashSet<string> Groups { get; set; }


        public void AddGroup(string groupName)
        {
            if (Groups.FirstOrDefault(x => x == groupName) == null)
            {
                lock (Groups)
                {
                    Groups.Add(groupName);
                }
            }
        }

        public void RemoveGroup(string groupName)
        {
            lock (Groups)
            {
                Groups.Remove(groupName);
            }
        }
    }

}
