namespace JoelMcBethWebsite.Data.EntityFramework
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class EntityFrameworkUserRepository : IUserRepository
    {
        private readonly JoelMcbethWebsiteDbContext context;

        public EntityFrameworkUserRepository(JoelMcbethWebsiteDbContext context)
        {
            this.context = context;
        }

        public async Task<User> AddUserAsync(User user)
        {
            this.context.Users.Add(user);
            await this.context.SaveChangesAsync();

            return user;
        }

        public async Task<User> GetUserById(int id)
        {
            return await this.context.Users.SingleAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByUserNameAsync(string userName)
        {
            return await this.context.Users.SingleOrDefaultAsync(u => u.UserName == userName);
        }

        public async Task<PagedEnumerable<User>> GetUsersAsync(int page, int pageSize)
        {
            var count = await this.context.Users.CountAsync();

            var pagination = new Pagination()
            {
                Count = count,
                Page = page,
                Pages = (int)Math.Ceiling(count / (double)pageSize),
                PageSize = pageSize
            };

            var pagedUsers = await this.context.Users
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedEnumerable<User>(pagedUsers, pagination);
        }

        public async Task UpdateUserAsync(User user)
        {
            this.context.Update(user);
            await this.context.SaveChangesAsync();
        }
    }
}
