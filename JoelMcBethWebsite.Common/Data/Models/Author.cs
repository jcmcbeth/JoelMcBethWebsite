namespace JoelMcBethWebsite.Data.Models
{
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class Author
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string MiddleName { get; set; }

        [JsonIgnore]
        public ICollection<Book> Books { get; set; }
    }
}
