namespace JoelMcBethWebsite.Data
{
    using JoelMcBethWebsite.Data.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public interface IBookRepository
    {
        Task<Book> GetBookByIsbn13Async(string isbn);
        Task<PagedEnumerable<Book>> GetBooksAsync(int page, int pageSize, string filter);
    }
}
