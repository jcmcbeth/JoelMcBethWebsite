namespace JoelMcBethWebsite.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.EntityFramework;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Produces("application/json")]
    [Route("api/Books")]
    public class BookController : Controller
    {
        private readonly LibraryContext libraryContext;

        public BookController(LibraryContext libraryContext)
        {
            this.libraryContext = libraryContext;
        }

        [HttpGet]
        public PagedEnumerable<Book> Get(int? page, int? pageSize, string filter = null)
        {
            var result = this.libraryContext.Books.AsQueryable();

            if (!string.IsNullOrEmpty(filter))
            {
                result = result.Where(bk => bk.Title.IndexOf(filter, StringComparison.CurrentCultureIgnoreCase) >= 0);
            }

            return new PagedEnumerable<Book>(result, page ?? 1, pageSize ?? 10);
        }
    }
}
