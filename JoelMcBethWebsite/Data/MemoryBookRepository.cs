namespace JoelMcBethWebsite.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;

    public class MemoryBookRepository : IBookRepository
    {
        private static readonly ICollection<Book> Books = new List<Book>();

        static MemoryBookRepository()
        {
            Books.Add(new Book()
            {
                Title = "Soft Skills: The software developer's life manual",
                Isbn13 = "9781617292392",
                Authors = new List<Author>()
                {
                    new Author()
                    {
                        FirstName = "John",
                        LastName = "Sonmez"
                    },
                    new Author()
                    {
                        FirstName = "McBeth",
                        LastName = "Joel"
                    }
                }
            });

            Books.Add(new Book()
            {
                Title = "Pro AngularJS",
                Isbn13 = "9781430264484",
                Authors = new List<Author>()
                {
                    new Author()
                    {
                        FirstName = "Adam",
                        LastName = "Freeman"
                    }
                }
            });
        }

        public MemoryBookRepository()
        {
        }

        public Task<Book> AddBookAsync(Book book)
        {
            Books.Add(book);

            return Task.FromResult(book);
        }

        public Task<Book> GetBookByIsbn13Async(string isbn)
        {
            var result = Books.Single(b => b.Isbn13 == isbn);

            return Task.FromResult(result);
        }

        public Task<Book> GetBookByIdAsync(int id)
        {
            var result = Books.Single(b => b.Id == id);

            return Task.FromResult(result);
        }

        public Task<PagedEnumerable<Book>> GetBooksAsync(BookCriteria criteria)
        {
            var filteredBooks = Books.AsEnumerable();
            var pagination = new Pagination()
            {
                Page = criteria.Page,
                PageSize = criteria.PageSize
            };

            if (!string.IsNullOrEmpty(criteria.FilterText))
            {
                filteredBooks = filteredBooks.Where(b => b.Title.IndexOf(criteria.FilterText, StringComparison.CurrentCultureIgnoreCase) >= 0 || b.Authors.Any(a =>
                    a.FirstName.IndexOf(criteria.FilterText, StringComparison.CurrentCultureIgnoreCase) >= 0 ||
                    a.LastName.IndexOf(criteria.FilterText, StringComparison.CurrentCultureIgnoreCase) >= 0));
            }

            filteredBooks = filteredBooks.Skip((criteria.Page - 1) * criteria.PageSize).Take(criteria.PageSize);

            var result = new PagedEnumerable<Book>(filteredBooks, pagination);

            return Task.FromResult(result);
        }
    }
}
