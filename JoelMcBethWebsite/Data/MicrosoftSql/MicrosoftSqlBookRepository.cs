namespace JoelMcBethWebsite.Data.MicrosoftSql
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Threading.Tasks;
    using Dapper;
    using JoelMcBethWebsite.Data.Models;

    public class MicrosoftSqlBookRepository : IBookRepository
    {
        private readonly string connectionString;

        public MicrosoftSqlBookRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<Book> AddBookAsync(Book book)
        {
            var bookQuery = @"INSERT INTO [dbo].[Books]
                            ([Isbn13],
                             [Title],         
                             [Edition],
                             [Pages],
                             [Order],
                             [Rating])
                          OUTPUT INSERTED.[Id]
                          VALUES
                            (@Isbn13,
			                 @Title,
			                 @Edition,
			                 @Pages,
                             @Order,
                             @Rating)";

            var authorQuery = @"
                INSERT INTO [Authors]
                    ([FirstName], [LastName], [MiddleName])
                OUTPUT INSERTED.[Id]
                VALUES
                    (@FirstName, @LastName, @MiddleName)
                ";

            var bookAuthorQuery = @"
                INSERT INTO [BookAuthors]
                    ([BookId], [AuthorId])
                VALUES
                    (@BookId, @AuthorId)
                ";

            using (var connection = new SqlConnection(this.connectionString))
            {
                book.Id = await connection.QuerySingleAsync<int>(bookQuery, book);

                foreach (var author in book.Authors)
                {
                    author.Id = await connection.QuerySingleAsync<int>(authorQuery, author);

                    await connection.ExecuteAsync(bookAuthorQuery, new { BookId = book.Id, AuthorId = author.Id });
                }
            }

            return book;
        }

        public async Task AddBooksAsync(IEnumerable<Book> books)
        {
            foreach (var book in books)
            {
                await this.AddBookAsync(book);
            }
        }

        public async Task<Book> GetBookByIsbn13Async(string isbn)
        {
            var bookQuery = @"SELECT [Books].[Id]
                            ,[Books].[Isbn13]
                            ,[Books].[Title]
                            ,[Books].[Edition]
                            ,[Books].[Pages]
                        FROM [Books]
                        WHERE [Books].[Isbn13] = @Isbn13";

            var authorsQuery = @"SELECT [Authors].[Id],
                                        [Authors].[FirstName],
                                        [Authors].[LastName],
                                        [Authors].[MiddleName]
                                 FROM [Authors]
                                 INNER JOIN [BookAuthors] ON [BookAuthors].[AuthorId] = [Authors].[Id]
                                 WHERE [BookAuthors].[BookId] = @BookId";

            using (var connection = new SqlConnection(this.connectionString))
            {
                var book = await connection.QuerySingleOrDefaultAsync<Book>(bookQuery, new { Isbn13 = isbn });

                if (book != null)
                {
                    var authors = await connection.QueryAsync<Author>(authorsQuery, new { BookId = book.Id });

                    foreach (var author in authors)
                    {
                        book.Authors.Add(author);
                    }
                }

                return book;
            }
        }

        public async Task<IEnumerable<Book>> GetBooksAsync()
        {
            var query =
                @"
                SELECT
	                [Books].[Id] AS BookId,
                    [Books].[Isbn13],
                    [Books].[Title],
                    [Books].[Edition],
                    [Books].[Pages],
                    [Books].[Rating],
                    [Books].[Order],
	                [Authors].[Id] AS AuthorId,
	                [Authors].[FirstName],
	                [Authors].[LastName],
	                [Authors].[MiddleName]
                FROM
	                [Books]
                LEFT JOIN
	                [BookAuthors] ON [Books].[Id] = [BookAuthors].[BookId]
                LEFT JOIN
	                [Authors] ON [BookAuthors].[AuthorId] = [Authors].[Id]
                ";

            var books = new Dictionary<int, Book>();

            using (var connection = new SqlConnection(this.connectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand(query, connection))
                {
                    using (var reader = command.ExecuteReader())
                    {
                        while (await reader.ReadAsync())
                        {
                            var bookId = reader.GetInt32("BookId");

                            if (!books.TryGetValue(bookId, out Book book))
                            {
                                book = new Book()
                                {
                                    Id = bookId,
                                    Edition = reader.GetNullableString("Edition"),
                                    Isbn13 = reader.GetNullableString("Isbn13"),
                                    Pages = reader.GetNullableInt32("Pages"),
                                    Title = reader.GetNullableString("Title"),
                                    Order = reader.GetNullableInt32("Order"),
                                    Rating = reader.GetNullableByte("Rating")
                                };

                                books.Add(bookId, book);
                            }

                            int? authorId = reader.GetNullableInt32("AuthorId");

                            if (authorId != null)
                            {
                                var author = new Author()
                                {
                                    Id = authorId.Value,
                                    FirstName = reader.GetNullableString("FirstName"),
                                    LastName = reader.GetNullableString("LastName"),
                                    MiddleName = reader.GetNullableString("MiddleName")
                                };

                                book.Authors.Add(author);
                            }
                        }
                    }
                }
            }

            return books.Values;
        }

        public async Task<PagedEnumerable<Book>> GetBooksAsync(BookCriteria criteria)
        {
            if (criteria.Page <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(criteria), criteria.Page, "The page number must be at least 1.");
            }

            if (criteria.PageSize <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(criteria), criteria.PageSize, "The page size must at least be 1.");
            }

            var books = await this.GetBooksAsync();

            if (!string.IsNullOrEmpty(criteria.FilterText))
            {
                books = books.Where(b =>
                    b.Title?.Contains(criteria.FilterText, StringComparison.OrdinalIgnoreCase) == true ||
                    b.Authors.Any(a =>
                        a.FirstName?.Contains(criteria.FilterText, StringComparison.OrdinalIgnoreCase) == true ||
                        a.LastName?.Contains(criteria.FilterText, StringComparison.OrdinalIgnoreCase) == true ||
                        a.MiddleName?.Contains(criteria.FilterText, StringComparison.OrdinalIgnoreCase) == true));
            }

            if (criteria.Sort != BookSort.None)
            {
                Func<Book, object> sortSelector;

                switch (criteria.Sort)
                {
                    case BookSort.Rating:
                        sortSelector = b => b.Rating;
                        break;
                    case BookSort.Title:
                        sortSelector = b => b.Title;
                        break;
                    default:
                        throw new NotSupportedException($"Unknown sort field {criteria.Sort}.");
                }

                if (criteria.SortDirection == SortDirection.Ascending)
                {
                    books = books.OrderBy(sortSelector);
                }
                else
                {
                    books = books.OrderByDescending(sortSelector);
                }
            }

            var count = books.Count();

            var pagination = new Pagination(criteria.Page, criteria.PageSize, count);

            var offset = (criteria.Page - 1) * criteria.PageSize;

            books = books.Skip(offset).Take(criteria.PageSize);

            return new PagedEnumerable<Book>(books, pagination);
        }

        public async Task<IEnumerable<Author>> GetBookAuthorsAsync(params int[] bookIds)
        {
            var idList = "(" + string.Join(", ", bookIds) + ")";

            var authorsQuery = @"SELECT [Authors].[Id],
                                        [Authors].[FirstName],
                                        [Authors].[LastName],
                                        [Authors].[MiddleName]
                                 FROM [Authors]
                                 INNER JOIN [BookAuthors] ON [BookAuthors].[Id] = [Authors].[Id]
                                 WHERE [BookAuthors].[BookId] IN " + idList;

            using (var connection = new SqlConnection(this.connectionString))
            {
                var authors = await connection.QueryAsync<Author>(authorsQuery);

                return authors;
            }
        }

        public async Task<IEnumerable<Author>> GetAuthorsAsync()
        {
            var query =
                @"
                    SELECT
                        [Authors].[Id],
                        [Authors].[FirstName],
                        [Authors].[LastName],
                        [Authors].[MiddleName]
                    FROM [Authors]
                ";

            using (var connection = new SqlConnection(this.connectionString))
            {
                var authors = await connection.QueryAsync<Author>(query);

                return authors;
            }
        }
    }
}
