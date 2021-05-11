using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PushServerTest
{
    public class ApiClientData
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = "";
        public bool IsDeleted { get; set; }
    }

    public class UserData
    {
        public Guid Id { get; set; }
        public Guid ApiClientId { get; set; }
        public int MessagesCount { get; set; }
        public string Description { get; set; } = "";
    }

    public class PushMessage
    {
        public Guid ApiClientId { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; } = "";
        public string MessageBody { get; set; } = "";
    }
}
