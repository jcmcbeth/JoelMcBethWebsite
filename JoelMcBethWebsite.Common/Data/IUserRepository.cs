namespace JoelMcBethWebsite.Data
{
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;

    public interface IUserRepository
    {
        Task<User> GetUserByUserNameAsync(string userName);

        Task<User> AddUserAsync(User user);

        Task<PagedEnumerable<User>> GetUsersAsync(int page, int pageSize);

        Task UpdateUserAsync(User user);

        Task<User> GetUserById(int id);

        Task<bool> Any();
    }
}
