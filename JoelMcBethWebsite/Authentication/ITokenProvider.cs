namespace JoelMcBethWebsite.Authentication
{
    using System;
    using JoelMcBethWebsite.Data.Models;

    public interface ITokenProvider
    {
        string CreateToken(User user, DateTime expiration);
    }
}
