using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using PushServerTest.Persistence;

namespace PushServerTest.Controllers
{
    [ApiController]
    [Route("PushServer")]
    public class PushServerController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "Hello from Push Server API";
        }

        [HttpGet("GetApiClientDatas")]
        public List<ApiClientData> ApiClientDatas()
        {
            return PushServerDatabase.GetApiClientDatas();
        }
        [HttpPost("AddApiClientData")]
        public IActionResult AddApiClientData(ApiClientData apiClientData)
        {
            PushServerDatabase.AddApiClientData(apiClientData);
            return new OkResult();
        }

        [HttpPost("SendPushMessage")]
        public async Task<string> SendPushMessage(PushMessage pushMessage)
        {
            var ret = await PushMessageSender.SendPushMessage(pushMessage);
            PushServerDatabase.UpdateMessageCount(pushMessage);
            return ret;
        }

        [HttpPost("SendPushMessages")]
        public async Task<string> SendPushMessages(List<PushMessage> pushMessages)
        {
            var ret = await PushMessageSender.SendPushMessages(pushMessages);
            PushServerDatabase.UpdateMessagesCount(PushServerLogic.GetMessagesCountsToAdd(pushMessages));
            return ret;
        }

        [HttpGet("GetUserDatas")]
        public List<UserData> GetUserDatas()
        {
            return PushServerDatabase.GetUserDatas();
        }
        [HttpPost("AddUserData")]
        public IActionResult AddUserData(UserData userData)
        {
            PushServerDatabase.AddUserData(userData);
            return new OkResult();
        }
    }

    static class PushServerLogic
    {
        public static List<UserData> GetMessagesCountsToAdd(List<PushMessage> pushMessages)
        {
            var userDatas = pushMessages.Select(v => new UserData{ApiClientId = v.ApiClientId, Id = v.UserId}).ToList();
            var grouped = userDatas.GroupBy(v => new {v.ApiClientId, v.Id}).ToList();
            var ret = new List<UserData>();
            foreach (var group in grouped)
            {
                var userCount = new UserData
                {
                    ApiClientId = group.Key.ApiClientId,
                    Id = group.Key.Id,
                    MessagesCount = group.Count()
                };
                ret.Add(userCount);
            }
            return ret;
        }
    }

    static class PushMessageSender
    {
        public static async Task<string> SendPushMessage(PushMessage pushMessage)
        {
            Init();
            var message = GetMessage(pushMessage);
            string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
            return "Successfully sent message: " + response;
        }

        public static async Task<string> SendPushMessages(List<PushMessage> pushMessages)
        {
            Init();
            var messages = pushMessages.Select(GetMessage).ToList();
            var response = await FirebaseMessaging.DefaultInstance.SendAllAsync(messages);
            return "Success Count: " + response.SuccessCount;
        }

        private static Message GetMessage(PushMessage pushMessage)
        {
            var message = new Message
            {
                Notification = new Notification
                {
                    Title = pushMessage.Title,
                    Body = pushMessage.MessageBody
                },
                Topic = $"ssi-topic-{pushMessage.ApiClientId}--{pushMessage.UserId}"
            };
            return message;
        }

        private static bool _initted;
        public static void Init()
        {
            if (!_initted)
            {
                FirebaseApp.Create(new AppOptions
                {
                    Credential = GoogleCredential.FromFile("pushtesting-d1828-firebase-adminsdk-qpj35-c8ed98a3fe.json")
                });
                _initted = true;
            }
        }
    }
}
