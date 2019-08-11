using Microsoft.Extensions.Configuration;

namespace Devtronik.Web.App.Services
{
    public class TestService
    {
        private readonly string _message;

        public TestService(IConfiguration configurationSettings)
        {
            _message = configurationSettings["testConfigMessage"];
        }

        public string GetValue()
        {
            return _message;
        }

        public int GetWaitValue()
        {
            return 1000;
        }
    }
}
