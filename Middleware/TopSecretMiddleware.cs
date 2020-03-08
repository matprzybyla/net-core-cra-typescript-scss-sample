using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Devtronik.Portal.WebApp.Middleware
{
    // This sample middleware checks all ongoing requests and if request is to "TestSecureController" it requires a secret key in header or returns 403
    public class TopSecretMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<TopSecretMiddleware> _logger;

        const string TOP_SECRET_HEADER_KEY = "topsecret";

        public TopSecretMiddleware(RequestDelegate next, ILogger<TopSecretMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments("/api/testsecure"))
            {
                var headerSecretKey = context.Request.Headers["key"];
                if (string.Compare(headerSecretKey, TOP_SECRET_HEADER_KEY, true) != 0)
                {
                    _logger.LogWarning("Invalid token when entering secured route");
                    context.Response.StatusCode = 403; //Forbidden
                    await context.Response.WriteAsync("TopSecret key was not passed in request header");
                    return;
                }
            }

            await _next(context);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseTopSecretMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TopSecretMiddleware>();
        }
    }
}
