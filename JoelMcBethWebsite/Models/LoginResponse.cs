namespace JoelMcBethWebsite.Models
{
    using JoelMcBethWebsite.Authentication;

    public class LoginResponse
    {
        public AuthenticationResult Result { get; set; }

        public string Token { get; set; }
    }
}