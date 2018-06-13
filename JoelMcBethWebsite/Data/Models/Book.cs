namespace JoelMcBethWebsite.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class Book
    {
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string Edition { get; set; }
        public string Pages { get; set; }
        public ICollection<Author> Authors { get; set; }
    }    
}
