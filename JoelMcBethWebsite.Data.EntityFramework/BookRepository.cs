namespace JoelMcBethWebsite.Data.EntityFramework
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class BookRepository : IBookRepository
    {
        private readonly JoelMcbethWebsiteDbContext context;

        public BookRepository(JoelMcbethWebsiteDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Book> AddBookAsync(Book book)
        {            
            this.context.Add(book);

            await this.context.SaveChangesAsync();

            return book;
        }

        public async Task<Book> GetBookByIdAsync(int id)
        {
            Book book = await this.context.Books
                .Include(bk => bk.Authors)
                .Include(bk => bk.Reviews)
                .SingleOrDefaultAsync(bk => bk.Id == id);

            return book;
        }

        public async Task<Book> GetBookByIsbn13Async(string isbn)
        {
            Book book = await this.context.Books
                .Include(bk => bk.Authors)
                .Include(bk => bk.Reviews)
                .SingleOrDefaultAsync(bk => bk.Isbn13 == isbn);

            return book;
        }

        public async Task<PagedEnumerable<Book>> GetBooksAsync(BookCriteria criteria)
        {
            IQueryable<Book> books = this.context.Books
                .Include(bk => bk.Authors)
                .Include(bk => bk.Reviews)
                .AsQueryable();

            if (!string.IsNullOrEmpty(criteria.FilterText))
            {
                books = books.Where(b =>
                    (b.Title != null && b.Title.Contains(criteria.FilterText)) ||
                    b.Authors.Any(a =>
                        (a.FirstName != null && a.FirstName.Contains(criteria.FilterText)) ||
                        (a.FirstName != null && a.LastName.Contains(criteria.FilterText)) ||
                        (a.FirstName != null && a.MiddleName.Contains(criteria.FilterText))));
            }

            int count = await books.CountAsync();

            //if (criteria.Sort != BookSort.None)
            //{
            //    Expression<Func<Book, object>> sortSelector;

            //    switch (criteria.Sort)
            //    {
            //        case BookSort.Rating:
            //            sortSelector = b => b.Reviews.SingleOrDefault().Rating;
            //            break;
            //        case BookSort.Title:
            //            sortSelector = b => b.Title;
            //            break;
            //        default:
            //            throw new NotSupportedException($"Unknown sort field {criteria.Sort}.");
            //    }                

            //    if (criteria.SortDirection == SortDirection.Ascending)
            //    {
            //        books = books.OrderBy(sortSelector);
            //    }
            //    else
            //    {
            //        books = books.OrderByDescending(sortSelector);
            //    }
            //}      

            books = books
                .Skip((criteria.Page - 1) * criteria.PageSize)
                .Take(criteria.PageSize);

            return new PagedEnumerable<Book>(
                await books.ToListAsync(),
                new Pagination(criteria.Page, criteria.PageSize, count));
        }

        public async Task<Book> UpdateBookAsync(Book book)
        {
            var originalBook = await this.context.Books
                .Include(bk => bk.Reviews)
                .Include(bk => bk.Authors)
                .SingleAsync(bk => bk.Id == book.Id);

            originalBook.Edition = book.Edition;
            originalBook.Title = book.Title;
            originalBook.Isbn13 = book.Isbn13;
            originalBook.Order = book.Order;
            originalBook.Pages = book.Pages;

            foreach (Author updatedAuthor in book.Authors)
            {
                Author originalAuthor = originalBook.Authors.SingleOrDefault(ath => ath.Id == updatedAuthor.Id);
                if (originalAuthor == null)
                {
                    originalBook.Authors.Add(updatedAuthor);
                }
                else
                {
                    originalAuthor.FirstName = updatedAuthor.FirstName;
                    originalAuthor.LastName = updatedAuthor.LastName;
                    originalAuthor.MiddleName = updatedAuthor.MiddleName;
                }
            }

            IEnumerable<Author> deletedAuthors = originalBook.Authors.Where(oa => !book.Authors.Any(ua => ua.Id == oa.Id)).ToList();
            foreach (Author deletedAuthor in deletedAuthors)
            {
                originalBook.Authors.Remove(deletedAuthor);
            }

            this.context.Update(originalBook);
            await this.context.SaveChangesAsync();

            return book;
        }
    }
}
