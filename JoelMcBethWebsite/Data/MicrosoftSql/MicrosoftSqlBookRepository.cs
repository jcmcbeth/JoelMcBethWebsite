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

        public async Task<Book> AddBook(Book book)
        {
            var query = @"INSERT INTO [dbo].[Books]
                            ([Isbn13],
                             [Title],         
                             [Edition],
                             [Pages])
                          OUTPUT INSERTED.[Id]
                          VALUES
                            (@Isbn13,
			                 @Title,
			                 @Edition,
			                 @Pages)";

            using (var connection = new SqlConnection(this.connectionString))
            {
                //await connection.OpenAsync();

                //using (var command = new SqlCommand(query, connection))
                //{
                //    command.Parameters.AddWithValue("@Isbn13", book.Isbn13);
                //    command.Parameters.AddWithValue("@Title", book.Title);
                //    command.Parameters.AddWithValue("@Edition", book.Edition);
                //    command.Parameters.AddWithValue("@Pages", book.Pages);

                //    book.Id = (int)await command.ExecuteScalarAsync();
                //}

                book.Id = await connection.QuerySingleAsync<int>(query, book, commandTimeout: 30);
            }

            return book;
        }

        public async Task<Book> GetBookByIsbn13Async(string isbn)
        {
            var bookQuery = @"SELECT [Books].[Id]
                            ,[Books].[Isbn13]
                            ,[Books].[Title]
                            ,[Books].[Edition]
                            ,[Books].[Pages]
                        FROM [Books]
                        WHERE [Books].[Isbn] = @Isbn13";

            var authorsQuery = @"SELECT [Authors].[Id],
                                        [Authors].[FirstName],
                                        [Authors].[LastName],
                                        [Authors].[MiddleName]
                                 FROM [Authors]
                                 INNER JOIN [BookAuthors] ON [BookAuthors].[Id] = [Authors].[Id]
                                 WHERE [BookAuthors].[Id] = @BookId";

            using (var connection = new SqlConnection(this.connectionString))
            {
                var book = await connection.QuerySingleOrDefaultAsync<Book>(bookQuery);

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
            throw new NotImplementedException();
            var bookQuery =
                @"
                SELECT [Books].[Id] AS BookId
                    ,[Books].[Isbn13]
                    ,[Books].[Title]
                    ,[Books].[Edition]
                    ,[Books].[Pages]
                    ,[Books].[Rating]
                    ,[Books].[Order]
                FROM [Books]
                ";

            var books = new List<Book>();

            using (var connection = new SqlConnection(this.connectionString))
            {
            }
        }

        public async Task<PagedEnumerable<Book>> GetBooksAsync(int page, int pageSize, string filter)
        {
            if (page <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(page), page, "The page number must be at least 1.");
            }

            if (pageSize <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(pageSize), pageSize, "The page size must at least be 1.");
            }

            throw new NotImplementedException();

            var offset = (page - 1) * pageSize;

            var countQuery =
                @"
                    SELECT COUNT(DISTINCT([Books].[Id]))
                    FROM [Books]
                    LEFT JOIN [BookAuthors] on [Books].[Id] = [BookAuthors].[BookId]
                    LEFT JOIN [Authors] ON [BookAuthors].[AuthorId] = [Authors].[Id]
                    WHERE [Books].[Title] LIKE @Filter OR [Authors].[FirstName] LIKE @Filter OR [Authors].[LastName] LIKE @Filter
                ";

            var query = string.Format(
                @"
                SELECT [Books].[Id]
                    ,[Books].[Isbn13]
                    ,[Books].[Title]
                    ,[Books].[Edition]
                    ,[Books].[Pages]
                    ,[Books].[Rating]
                    ,[Books].[Order]
                FROM [Books]
                ");

            var mappedBooks = new Dictionary<int, Book>();

            using (var connection = new SqlConnection(this.connectionString))
            {
                var count = (int)await connection.ExecuteScalarAsync(countQuery, new { Filter = "%" + filter + "%" });
                var pagination = new Pagination(page, pageSize, count);

                var books = await connection.QueryAsync<Book, Author, Book>(query, (book, author) =>
                {
                    if (!mappedBooks.TryGetValue(book.Id, out Book existingBook))
                    {
                        existingBook = book;

                        mappedBooks.Add(existingBook.Id, existingBook);
                    }

                    existingBook.Authors.Add(author);

                    return existingBook;
                }, param: new { Offset = offset, PageSize = pageSize, Filter = "%" + filter + "%" });

                return new PagedEnumerable<Book>(books, pagination);
            }
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
