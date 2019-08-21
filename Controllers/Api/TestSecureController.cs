using System.Threading.Tasks;
using Devtronik.Web.App.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Devtronik.Web.App.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestSecureController : ControllerBase
    {
        private readonly TestService _testService;

        public TestSecureController(TestService testService)
        {
            _testService = testService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetTest()
        {
            // add some delay on the line to show that UI waits for data from API
            await Task.Delay(500);

            return Ok($"Value from TestService: {_testService.GetValue()}");
        }
    }
}