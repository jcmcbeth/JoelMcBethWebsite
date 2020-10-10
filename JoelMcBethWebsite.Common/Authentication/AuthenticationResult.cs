namespace JoelMcBethWebsite.Authentication
{
    public enum AuthenticationResult
    {
        Unknown = 0,
        Success = 1,
        InvalidCredentials = 2,
        Locked = 3,
        Unapproved = 4
    }
}
