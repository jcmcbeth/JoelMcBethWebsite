namespace JoelMcBethWebsite.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Threading.Tasks;

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

        public ICollection<Author> Authors { get; set; }

        public int? Order { get; set; }

        public ICollection<BookReview> Reviews { get; set; }
    }
}
