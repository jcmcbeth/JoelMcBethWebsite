namespace JoelMcBethWebsite.Authentication
{
    public interface IPasswordHashProvider
    {
        byte[] GenerateSalt();

        byte[] HashPassword(string password, byte[] salt);
    }
}
