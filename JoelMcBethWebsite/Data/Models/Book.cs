namespace JoelMcBethWebsite.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Threading.Tasks;

    public class Book
    {
        public int Id { get; set; }
        public string Isbn13 { get; set; }
        public string Title { get; set; }
        public string Edition { get; set; }
        public string Pages { get; set; }
        public ICollection<Author> Authors { get; set; }

        public Book()
        {
            this.Authors = new Collection<Author>();
        }
    }    
}
