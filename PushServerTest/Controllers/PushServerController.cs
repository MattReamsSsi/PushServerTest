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

        [HttpGet("GetUserDatas")]
        public List<UserData> GetUserDatas()
        {
            return PushServerDatabase.GetUserDatas();
        }
    }

    static class PushMessageSender
    {
        public static async Task<string> SendPushMessage(PushMessage pushMessage)
        {
            Init();
            var message = new Message
            {
                Notification = new Notification
                {
                    Title = pushMessage.Title,
                    Body = pushMessage.MessageBody
                },
                Topic = $"ssi-topic-{pushMessage.ApiClientId}-{pushMessage.UserId}"
            };
            string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
            return "Successfully sent message: " + response;
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
