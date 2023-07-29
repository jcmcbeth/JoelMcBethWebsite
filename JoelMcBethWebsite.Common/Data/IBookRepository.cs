namespace JoelMcBethWebsite.Data
{
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;

    public interface IBookRepository
    {
        Task<Book> GetBookByIsbn13Async(string isbn);

        Task<Book> GetBookByIdAsync(int id);

        Task<PagedEnumerable<Book>> GetBooksAsync(BookCriteria criteria);

        Task<Book> AddBookAsync(Book book);

        Task<Book> UpdateBookAsync(Book book);
    }
}
