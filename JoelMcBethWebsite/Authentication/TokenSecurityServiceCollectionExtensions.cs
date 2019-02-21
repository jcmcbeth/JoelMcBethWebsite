namespace JoelMcBethWebsite
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Authentication;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;

    public static class TokenSecurityServiceCollectionExtensions
    {
        public static void AddTokenSecurity(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTokenSecurity(opt => configuration.GetSection("TokenAuthentication").Bind(opt));
        }

        public static void AddTokenSecurity(this IServiceCollection services, Action<TokenSecurityOptions> setup)
        {
            var options = new TokenSecurityOptions();

            setup(options);

            var key = Convert.FromBase64String(options.Key);

            var tokenProvider = new JwtTokenProvider(
                options.Issuer,
                options.Audience,
                key);

            services.AddSingleton<ITokenProvider>(tokenProvider);

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(bearerOptions =>
                {
                    bearerOptions.RequireHttpsMetadata = false;
                    bearerOptions.TokenValidationParameters = new TokenValidationParameters()
                    {
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidAudience = options.Audience,
                        ValidIssuer = options.Issuer,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.FromSeconds(options.ClockSkew)
                    };
                });

            services.AddAuthorization(auth =>
            {
                auth.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .Build();
            });

            services.AddSingleton<IPasswordHashProvider, Pbkdf2PasswordHashProvider>();
        }
    }
}
