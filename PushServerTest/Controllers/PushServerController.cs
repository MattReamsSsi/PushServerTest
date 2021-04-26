using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}
