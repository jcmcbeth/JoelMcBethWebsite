using JoelMcBethWebsite.Authentication;

namespace JoelMcBethWebsite.Models
{
    public class LoginResponse
    {
        public bool Success { get; set; }

        public string Token { get; set; }
    }
}