namespace JoelMcBethWebsite.Tests.Data.MicrosoftSql
{
    using System;
    using System.Text;
    using System.Collections.Generic;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using JoelMcBethWebsite.Data.MicrosoftSql;
    using System.IO;
    using System.Reflection;
    using Microsoft.SqlServer.Dac;
    using System.Data.SqlClient;
    using JoelMcBethWebsite.Data.Models;
    using System.Threading.Tasks;

    [TestClass]
    public class MicrosoftSqlBookRepositoryTests : MicrosoftSqlTestBase<MicrosoftSqlBookRepository>
    {
        public override MicrosoftSqlBookRepository CreateTarget(string connectionString)
        {
            return new MicrosoftSqlBookRepository(connectionString);
        }

        [TestMethod]
        [TestCategory("Integration")]
        public async Task AddBook_ValidBook_BookAdded()
        {
            var book = new Book()
            {
                Isbn13 = "asdf"
            };

            await this.Target.AddBook(book);

            var actual = await this.Target.GetBookByIsbn13Async("asdf");

            this.AssertEqual(book, actual);
        }

        private void AssertEqual(Book expected, Book actual)
        {
            Assert.AreEqual(expected.Id, actual.Id);
            Assert.AreEqual(expected.Isbn13, actual.Isbn13);
            Assert.AreEqual(expected.Order, actual.Order);
            Assert.AreEqual(expected.Pages, actual.Pages);
            Assert.AreEqual(expected.Rating, actual.Rating);
            Assert.AreEqual(expected.Title, actual.Title);
        }
    }
}
