namespace JoelMcBethWebsite.Data.Models
{
    using System.Collections.Generic;
    using System.Collections.ObjectModel;

    public class Book
    {
        public Book()
        {
            this.Authors = new Collection<Author>();
            this.Reviews = new Collection<BookReview>();
        }

        public int Id { get; set; }

        public string Isbn13 { get; set; }

        public string Title { get; set; }

        public string Edition { get; set; }

        public int? Pages { get; set; }        

        public int? Order { get; set; }

        public ICollection<Author> Authors { get; set; } = new Collection<Author>();

        public ICollection<BookReview> Reviews { get; set; } = new List<BookReview>();
    }
}
