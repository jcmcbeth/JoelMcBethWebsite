namespace JoelMcBethWebsite.Models
{
    using JoelMcBethWebsite.Authentication;

    public class LoginResponse
    {
        public bool Success { get; set; }

        public string Token { get; set; }
    }
}