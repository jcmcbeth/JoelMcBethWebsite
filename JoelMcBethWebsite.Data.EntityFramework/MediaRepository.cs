namespace JoelMcBethWebsite.Data.EntityFramework
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class MediaRepository : IMediaRepository
    {
        private readonly JoelMcbethWebsiteDbContext context;

        public MediaRepository(JoelMcbethWebsiteDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Media>> GetMediaAsync(string titleSearch)
        {
            return await this.context.Media.ToListAsync();
        }
    }
}
