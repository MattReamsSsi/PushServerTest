using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace PushServerTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("DoSomething")]
        public async Task<string> DoSomething()
        {
            NotificationSender.Init();
            var message = new Message()
            {
                Notification = new Notification()
                {
                    Title = "Matt Message Try",
                    Body = "the body of the message.",
                },
                Topic = "matt-topic",
            };
            string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
            return "Successfully sent message: " + response;
        }
    }

    static class NotificationSender
    {
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
