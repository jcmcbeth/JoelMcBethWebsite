namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Produces("application/json")]
    [Route("api/Books")]
    public class BookController : Controller
    {
        private readonly IBookRepository books;

        public BookController(IBookRepository books)
        {
            this.books = books;
        }

        [HttpGet]
        public async Task<PagedEnumerable<Book>> GetAllBooks(int? page, int? pageSize, string filter = null)
        {
            return await this.books.GetBooksAsync(page ?? 1, pageSize ?? 12, filter);
        }

        [HttpGet("{isbn}")]
        public async Task<Book> GetBook(string isbn)
        {
            return await this.books.GetBookByIsbnAsync(isbn);
        }
    }
}
