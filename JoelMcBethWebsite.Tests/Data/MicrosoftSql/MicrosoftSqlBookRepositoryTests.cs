﻿namespace JoelMcBethWebsite.Tests.Data.MicrosoftSql
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using JoelMcBethWebsite.Data.MicrosoftSql;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class MicrosoftSqlBookRepositoryTests : MicrosoftSqlTestBase<MicrosoftSqlBookRepository>
    {
        protected override void SetupFixture(Fixture fixture)
        {
            fixture.Customizations.Add(
                new IsbnSpecimenBuilder<Book>(b => b.Isbn13));
        }

        [TestMethod]
        [TestCategory("Integration")]
        public async Task AddBook_ValidBook_BookAdded()
        {
            var book = new Book()
            {
                Title = "Test",
                Isbn13 = "9783161484100",
                Authors = new List<Author>
                {
                    new Author()
                    {
                        FirstName = "Joe",
                        LastName = "Bob",
                        MiddleName = "Timothy"
                    },
                    new Author()
                    {
                        FirstName = "Tim",
                        LastName = "Horton"
                    },
                }
            };

            await this.Target.AddBookAsync(book);

            var actual = await this.Target.GetBookByIsbn13Async("9783161484100");

            BookAssert.AreEqual(book, actual);
        }

        [TestMethod]
        [TestCategory("Integration")]
        public async Task GetBooksAsync_AllBooksReturned()
        {
            // Arrange
            var books = new List<Book>()
            {
                new Book()
                {
                    Title = "Test",
                    Isbn13 = "9783161484100",
                    Authors = new List<Author>
                    {
                        new Author()
                        {
                            FirstName = "Joe",
                            LastName = "Bob"
                        },
                        new Author()
                        {
                            FirstName = "Tim",
                            LastName = "Horton",
                            MiddleName = "Timothy"
                        },
                    }
                },
                new Book()
                {
                    Title = "Test2",
                    Isbn13 = "1234567890123",
                    Authors = new List<Author>
                    {
                        new Author()
                        {
                            FirstName = "Bill",
                            LastName = "Smith"
                        }
                    }
                }
            };

            await this.Target.AddBooksAsync(books);

            // Act
            var actual = await this.Target.GetBooksAsync();

            // Assert
            BookAssert.AreEquivalent(books, actual);
        }

        [TestMethod]
        [TestCategory("Integration")]
        public async Task GetBooksAsync_NumberOfItemsLargerThanPageSize_PageSizeNumberOfItemsReturned()
        {
            // Arrange
            var books = this.Fixture.Build<Book>()
                .CreateMany(4);

            await this.Target.AddBooksAsync(books);

            // Act
            var actual = await this.Target.GetBooksAsync(1, 2, null);

            // Assert
            Assert.AreEqual(2, actual.Data.Count());
        }

        [TestMethod]
        [TestCategory("Integration")]
        public async Task GetBooksAsync_LastPage_ItemFromLastPageReturned()
        {
            // Arrange
            var books = this.Fixture.Build<Book>()
                .CreateMany(3);

            await this.Target.AddBooksAsync(books);

            // Act
            var actual = await this.Target.GetBooksAsync(2, 2, null);

            // Assert
            var expected = books.Last();

            BookAssert.AreEqual(expected, actual.Data.Single());
        }

        [DataTestMethod]
        [TestCategory("Integration")]
        [DataRow("john")]
        [DataRow("John")]
        [DataRow("title")]
        [DataRow("Title")]
        [DataRow("smith")]
        [DataRow("Smith")]
        [DataRow("carver")]
        [DataRow("Carver")]
        public async Task GetBooksAsync_FilterTextThatShouldMatch_MatchingBookReturned(
            string filter)
        {
            var expected = new Book()
            {
                Title = "Title",
                Authors = new List<Author>
                {
                    new Author()
                    {
                        FirstName = "John",
                        LastName = "Smith",
                        MiddleName = "Carver"
                    }
                }
            };

            // Arrange
            var books = new List<Book>()
            {
                expected,
                new Book()
                {
                    Title = "xxxxx",
                    Authors = new List<Author>
                    {
                        new Author()
                        {
                            FirstName = "xxxxx",
                            LastName = "xxxxx",
                            MiddleName = "xxxxx"
                        }
                    }
                },
            };

            await this.Target.AddBooksAsync(books);

            // Act
            var actual = await this.Target.GetBooksAsync(1, int.MaxValue, filter);

            // Assert
            Assert.AreEqual(
                1,
                actual.Data.Count(),
                $"Expected exactly one book to be returned for filter text '{filter}'. Actual number of books returned was {actual.Data.Count()}.");

            BookAssert.AreEqual(expected, actual.Data.Single());
        }

        protected override async Task Reset()
        {
            await this.Database.DeleteAllFromTableAsync("BookAuthors");
            await this.Database.DeleteAllFromTableAsync("Books", resetIdentity: true);
            await this.Database.DeleteAllFromTableAsync("Authors", resetIdentity: true);
        }

        protected override MicrosoftSqlBookRepository CreateTarget(string connectionString)
        {
            return new MicrosoftSqlBookRepository(connectionString);
        }
    }
}
