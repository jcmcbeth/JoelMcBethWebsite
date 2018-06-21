namespace JoelMcBethWebsite.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;

    public class MemoryUserRepository : IUserRepository
    {
        public static readonly ICollection<User> users = new List<User>();

        public Task<User> AddUserAsync(User user)
        {
            users.Add(user);

            return Task.FromResult(user);
        }

        public Task<User> GetUserByEmailAsync(string email)
        {
            var user = users.Where(u => u.Email.Equals(email, StringComparison.CurrentCultureIgnoreCase))
                .Single();

            return Task.FromResult(user);
        }

        public Task<PagedEnumerable<User>> GetUsersAsync(int page, int pageSize)
        {
            var pagedUsers = users.Skip((page - 1) * pageSize).Take(pageSize);

            var count = users.Count;

            var pagination = new Pagination()
            {
                Count = count,
                Page = page,
                Pages = (int)Math.Ceiling(count / (double)pageSize),
                PageSize = pageSize
            };

            var result = new PagedEnumerable<User>(pagedUsers, pagination);

            return Task.FromResult(result);
        }
    }
}
