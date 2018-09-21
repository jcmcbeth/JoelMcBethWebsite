namespace JoelMcBethWebsite.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;

    public interface IBookRepository
    {
        Task<Book> GetBookByIsbn13Async(string isbn);

        Task<PagedEnumerable<Book>> GetBooksAsync(int page, int pageSize, string filter);

        Task<Book> AddBook(Book book);
    }
}
