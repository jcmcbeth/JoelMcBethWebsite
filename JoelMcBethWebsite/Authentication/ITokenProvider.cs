namespace JoelMcBethWebsite.Authentication
{
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface ITokenProvider
    {
        string CreateToken(User user, DateTime expiration);

        TokenValidationParameters GetValidationParameters();
    }
}
