using System;
using System.Collections.Generic;
using System.Linq;

namespace PushServerTest
{
    public class ApiClientData
    {
        public string NodeId { get; set; }//this will be the primary key.
        public string Description { get; set; } = "";
        public bool IsDeleted { get; set; }
    }

    public class UserData
    {
        public Guid Id { get; set; }
        public string ApiNodeId { get; set; }
        public int MessagesCount { get; set; }
        public string Description { get; set; } = "";
    }

    public class PushMessage
    {
        public string ApiNodeId { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; } = "";
        public string MessageBody { get; set; } = "";
    }
}
