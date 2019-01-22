﻿namespace JoelMcBethWebsite.Authentication
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Security.Cryptography;
    using System.Security.Principal;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.IdentityModel.Tokens;

    public class JwtTokenProvider : ITokenProvider
    {
        private SymmetricSecurityKey key;
        private string issuer;
        private string audience;

        public JwtTokenProvider(string issuer, string audience, byte[] key)
        {
            this.key = new SymmetricSecurityKey(key);
            this.issuer = issuer;
            this.audience = audience;
        }

        public string CreateToken(User user, DateTime expiration)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            ClaimsIdentity identity = new ClaimsIdentity(new GenericIdentity(user.UserName, "jwt"));

            SecurityToken token = tokenHandler.CreateJwtSecurityToken(new SecurityTokenDescriptor
            {
                Audience = this.audience,
                Issuer = this.issuer,
                SigningCredentials = new SigningCredentials(this.key, SecurityAlgorithms.HmacSha256),
                Expires = expiration.ToUniversalTime(),
                Subject = identity
            });

            return tokenHandler.WriteToken(token);
        }

        public TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters
            {
                IssuerSigningKey = this.key,
                ValidAudience = this.audience,
                ValidIssuer = this.issuer,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromSeconds(0) // Identity and resource servers are the same.
            };
        }
    }
}
