using System;
using System.Threading.Tasks;
using Devtronik.Web.App.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Devtronik.Web.App
{
    public static class Bootstrapper
    {
        private static IServiceCollection _services;

        private static IServiceProvider _servicesProvider;

        public static async Task Bootstrap(IConfiguration configuration, IServiceCollection services)
        {
            // async intentionally - proof that bootstrap is ready for async initialization. Cleanup when not needed.
            await Task.Delay(1);

            if (_services != null)
            {
                throw new InvalidOperationException("Service provider is already initialized!");
            }

            _services = services ?? new ServiceCollection();            
            _services.AddSingleton(configuration);
            _services.AddTransient<TestService>();

            // setup final ServiceProvider that can be available to other classes (but not recommended to use it directly)
            _servicesProvider = _services.BuildServiceProvider(true);
        }

        internal static async Task Init()
        {
            // do some long lasting operations that must finish before continuing with .net core web api conriguration
            await Task.Delay(_servicesProvider.GetRequiredService<TestService>().GetWaitValue());
        }
    }
}