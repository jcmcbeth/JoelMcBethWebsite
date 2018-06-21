namespace JoelMcBethWebsite.Data
{
    using JoelMcBethWebsite.Data.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<User> AddUserAsync(User user);
        Task<PagedEnumerable<User>> GetUsersAsync(int page, int pageSize);
    }
}
