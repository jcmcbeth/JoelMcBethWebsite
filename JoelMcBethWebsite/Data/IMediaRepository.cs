namespace JoelMcBethWebsite.Data
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;

    public interface IMediaRepository
    {
        Task<IEnumerable<Media>> GetMediaAsync(string titleSearch);
    }
}