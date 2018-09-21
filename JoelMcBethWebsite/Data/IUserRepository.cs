namespace JoelMcBethWebsite.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;

    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);

        Task<User> AddUserAsync(User user);

        Task<PagedEnumerable<User>> GetUsersAsync(int page, int pageSize);
    }
}
