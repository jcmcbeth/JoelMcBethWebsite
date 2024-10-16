﻿namespace JoelMcBethWebsite.Controllers
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
    public class BookController : Controller
    {
        private readonly IBookRepository books;

        public BookController(IBookRepository books)
        {
            this.books = books;
        }

        [HttpGet("books")]
        public async Task<PagedEnumerable<Book>> GetAsync(int? page, int? pageSize, BookSort? sort, SortDirection? sortDirection, string filter = null)
        {
            var criteria = new BookCriteria()
            {
                Page = page ?? 1,
                PageSize = pageSize ?? 12,
                Sort = sort ?? BookSort.None,
                SortDirection = sortDirection ?? SortDirection.Ascending,
                FilterText = filter
            };

            return await this.books.GetBooksAsync(criteria);
        }

        [HttpGet(@"books/{isbn:regex(^\d{{13}}$)}")]
        public async Task<Book> GetAsync(string isbn)
        {
            return await this.books.GetBookByIsbn13Async(isbn);
        }

        [HttpGet(@"books/{id:int}")]
        public async Task<Book> GetAsync(int id)
        {
            return await this.books.GetBookByIdAsync(id);
        }

        [HttpPost("books")]
        public async Task<IActionResult> PostAsync([FromBody] Book book)
        {
            book = await this.books.AddBookAsync(book);

            return this.Ok(book);
        }

        [HttpPut("books")]
        public async Task<IActionResult> PutAsync([FromBody] Book book)
        {
            book = await this.books.UpdateBookAsync(book);

            return this.Ok(book);
        }
    }
}
