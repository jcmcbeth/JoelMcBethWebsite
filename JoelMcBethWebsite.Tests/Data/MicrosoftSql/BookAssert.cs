namespace JoelMcBethWebsite.Tests.Data.MicrosoftSql
{
    using System.Collections.Generic;
    using System.Linq;
    using JoelMcBethWebsite.Data.Models;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    public static class BookAssert
    {
        public static void AreEqual(Book expected, Book actual)
        {
            if (expected == null)
            {
                Assert.IsNull(actual, "Expected actual book to be null.");

                return;
            }

            Assert.AreEqual(expected.Id, actual.Id, "Expected ids to be equal.");
            Assert.AreEqual(expected.Isbn13, actual.Isbn13, "Expected ISBN13 to be equal.");
            Assert.AreEqual(expected.Order, actual.Order, "Expected order to be equal.");
            Assert.AreEqual(expected.Pages, actual.Pages, "Expected pages to be equal.");
            Assert.AreEqual(expected.Rating, actual.Rating, "Expected rating to be equal.");
            Assert.AreEqual(expected.Title, actual.Title, "Expected title to be equal.");

            AreEquivalent(expected.Authors, actual.Authors);
        }

        public static void AreEquivalent(IEnumerable<Book> expectedBooks, IEnumerable<Book> actualBooks)
        {
            if (expectedBooks == null)
            {
                Assert.IsNull(actualBooks, "Expected list of books to be null.");

                return;
            }

            Assert.AreEqual(expectedBooks.Count(), actualBooks.Count(), "Expected list of books to have the same number of items.");

            foreach (var expectedBook in expectedBooks)
            {
                var actualBook = actualBooks.SingleOrDefault(b => b.Id == expectedBook.Id);

                Assert.IsNotNull(actualBook);

                AreEqual(expectedBook, actualBook);
            }
        }

        public static void AreEquivalent(IEnumerable<Author> expectedAuthors, IEnumerable<Author> actualAuthors)
        {
            if (expectedAuthors == null)
            {
                Assert.IsNull(actualAuthors, "Expected list of authors to be null.");

                return;
            }

            Assert.AreEqual(expectedAuthors.Count(), actualAuthors.Count(), "Expected list of authors to have the same number of items.");

            foreach (var expectedAuthor in expectedAuthors)
            {
                var actualAuthor = actualAuthors.SingleOrDefault(a => a.Id == expectedAuthor.Id);

                Assert.IsNotNull(actualAuthor);

                AreEqual(expectedAuthor, actualAuthor);
            }
        }

        public static void AreEqual(Author expected, Author actual)
        {
            Assert.AreEqual(expected.Id, actual.Id, "Expected author id to be equal.");
            Assert.AreEqual(expected.FirstName, actual.FirstName, "Expected author first name to be equal.");
            Assert.AreEqual(expected.LastName, actual.LastName, "Expected author last name to be equal.");
        }
    }
}
