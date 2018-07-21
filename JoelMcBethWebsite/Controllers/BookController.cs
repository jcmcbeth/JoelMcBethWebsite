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
    //[Route("api/Books")]
    public class BookController : Controller
    {
        private readonly IBookRepository books;

        public BookController(IBookRepository books)
        {
            this.books = books;
        }

        [HttpGet("api/books")]
        public async Task<PagedEnumerable<Book>> Get(int? page, int? pageSize, string filter = null)
        {
            return await this.books.GetBooksAsync(page ?? 1, pageSize ?? 12, filter);
        }

        [HttpGet(@"api/books/{isbn:regex(^\d{{13}}$)}")]
        public async Task<Book> Get(string isbn)
        {
            return await this.books.GetBookByIsbn13Async(isbn);
        }

        [HttpPost("api/books")]
        public async Task<IActionResult> Post([FromBody]Book book)
        {
            var books = await this.books.AddBook(book);

            return this.Ok(books);
        }
    }
}
